/**
 * Password gate for Cloudflare Pages.
 *
 * Every request passes through here before a page is served. Visitors without
 * the access cookie get a password page; the right password sets the cookie
 * for 30 days. The password lives in Cloudflare as the SITE_PASSWORD
 * environment variable, never in this repo.
 *
 * If SITE_PASSWORD is not set, the site stays locked (fail closed).
 */
const COOKIE = "mf_access";
const MAX_AGE = 60 * 60 * 24 * 30;

async function token(secret) {
  const data = new TextEncoder().encode(`manuel-site:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeDestination(value) {
  const dest = typeof value === "string" ? value : "/";
  return dest.startsWith("/") && !dest.startsWith("//") ? dest : "/";
}

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function loginPage({ dest, error, status }) {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Manuel Fernández</title>
<style>
  :root { --bg:#ffffff; --surface:#e3f6f5; --ink:#272643; --muted:#4a4a68; --accent:#2c698d; --soft:#bae8e8; --error:#b4233c; }
  @media (prefers-color-scheme: dark) { :root { --bg:#1c1b31; --surface:#272643; --ink:#e3f6f5; --muted:#b3cfd2; --accent:#bae8e8; --soft:#2c698d; --error:#ff8fa3; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100dvh; display:grid; place-items:center; padding:24px; background:var(--bg); color:var(--ink);
         font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-font-smoothing:antialiased; }
  main { width:100%; max-width:420px; }
  .name { font-size:15px; color:var(--muted); margin:0 0 28px; }
  h1 { font-size:34px; line-height:1.08; letter-spacing:-0.03em; font-weight:700; margin:0 0 12px; }
  p.lead { font-size:16px; line-height:1.6; color:var(--muted); margin:0 0 28px; }
  label { display:block; font-size:14px; font-weight:600; color:var(--accent); margin-bottom:8px; }
  input { width:100%; font:inherit; font-size:17px; padding:14px 16px; border-radius:10px; border:1.5px solid var(--soft);
          background:var(--surface); color:var(--ink); outline:none; }
  input:focus { border-color:var(--accent); }
  button { margin-top:14px; width:100%; font:inherit; font-size:16px; font-weight:600; padding:14px 16px; border:0; border-radius:10px;
           background:var(--ink); color:var(--bg); cursor:pointer; }
  button:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
  .error { color:var(--error); font-size:14px; margin:10px 0 0; }
</style>
</head>
<body>
<main>
  <p class="name">Manuel Fernández</p>
  <h1>Private portfolio</h1>
  <p class="lead">Enter the password from my CV to see my work.</p>
  <form method="post" action="/__access">
    <input type="hidden" name="next" value="${escapeHtml(dest)}">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required autofocus>
    ${error ? '<p class="error" role="alert">That password didn’t work. Check the one on my CV.</p>' : ""}
    <button type="submit">View portfolio</button>
  </form>
</main>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function onRequest({ request, env, next }) {
  const password = env.SITE_PASSWORD;
  const url = new URL(request.url);

  if (!password) {
    return new Response("This site is not available yet.", { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  const expected = await token(password);

  if (url.pathname === "/__access" && request.method === "POST") {
    const form = await request.formData();
    const dest = safeDestination(form.get("next"));
    const entered = String(form.get("password") || "");
    if ((await token(entered)) === expected) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: dest,
          "Set-Cookie": `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
          "Cache-Control": "no-store",
        },
      });
    }
    return loginPage({ dest, error: true, status: 401 });
  }

  if (readCookie(request, COOKIE) === expected) {
    const response = await next();
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  return loginPage({ dest: url.pathname + url.search, error: false, status: 401 });
}
