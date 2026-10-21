import nodemailer from "nodemailer";

const FIELD_LABELS: Record<string, string> = {
  org: "Clinic / hospital",
  person: "Contact person",
  email: "Email",
  phone: "Mobile / WhatsApp",
  kind: "Type",
  date: "Preferred date",
  time: "Preferred time (IST)",
  notes: "Requirements",
  clinicName: "Clinic name",
  ownerName: "Owner name",
  city: "City",
  state: "State",
  clinicType: "Practice type",
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max = 1000) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");

// Small in-memory limiter: at most 5 requests per IP per 10 minutes (per server instance).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return Response.json({ error: "Email delivery is not configured on the server." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const kind = clean(body.kind, 20) === "trial" ? "trial" : "demo";
  const email = clean(body.email, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Invalid email." }, { status: 400 });

  const rows = Object.keys(FIELD_LABELS)
    .map((k) => [FIELD_LABELS[k], clean(body[k], k === "notes" ? 2000 : 200)] as const)
    .filter(([, v]) => v);
  const name = clean(body.org, 120) || clean(body.clinicName, 120) || "Unknown clinic";

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: (Number(SMTP_PORT) || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: `VetOS website <${SMTP_USER}>`,
      to: LEAD_TO_EMAIL || "motivebuilders@gmail.com",
      replyTo: email,
      subject: `New VetOS ${kind === "trial" ? "trial request" : "demo booking"}: ${name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<h2>New VetOS ${kind === "trial" ? "trial request" : "demo booking"}</h2><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
        .join("")}</table>`,
    });
  } catch {
    return Response.json({ error: "Could not send the email." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
