// Pages Function：staytw.pages.dev/api/* → Service Binding 內部轉發到 staytw-api Worker。
// 用途：某些網路連不到 workers.dev，但 pages.dev 通；後台/網頁改打同源即可繞過。
// live iOS App 仍直接打 workers.dev，不受影響。
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const init = {
    method: request.method,
    headers: request.headers,
    body: (request.method === "GET" || request.method === "HEAD") ? undefined : request.body,
    redirect: "manual",
  };
  const inner = new Request("https://staytw-api.internal" + url.pathname + url.search, init);
  const resp = await env.API.fetch(inner);
  const headers = new Headers(resp.headers);
  headers.set("x-proxied-by", "pages-fn-sb");
  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers });
}
