// /audio/tts/<hash>.mp3 → R2 bucket (binding AUDIO) から配信。URL は従来と同じなので tts.js は無変更。
// R2 に無い / 未バインド → 従来どおり Pages の静的ファイル(ASSETS)へフォールバック（移行期間の保険）。
// 音檔名は md5/sha1 ハッシュ＝内容が変われば名前も変わる → 1 年 immutable キャッシュで OK。
export async function onRequest(context) {
  const { request, env, params } = context;
  const parts = Array.isArray(params.file) ? params.file : [params.file];
  const name = parts.join("/");
  if (!/^[A-Za-z0-9._-]+\.mp3$/.test(name)) return new Response("not found", { status: 404 });
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("method", { status: 405 });

  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString(), { method: "GET" });
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  let res = null;
  if (env.AUDIO) {
    try {
      const obj = await env.AUDIO.get(name);
      if (obj) {
        const h = new Headers();
        h.set("Content-Type", "audio/mpeg");
        h.set("Cache-Control", "public, max-age=31536000, immutable");
        h.set("Accept-Ranges", "bytes");
        h.set("Access-Control-Allow-Origin", "*");
        h.set("x-audio-source", "r2");
        if (obj.httpEtag) h.set("ETag", obj.httpEtag);
        res = new Response(obj.body, { status: 200, headers: h });
      }
    } catch (e) { /* R2 障害時は静的へ */ }
  }
  if (!res) {
    const fb = await env.ASSETS.fetch(request);
    if (fb.status !== 200) return fb;
    res = new Response(fb.body, fb);
    res.headers.set("x-audio-source", "assets");
    res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }
  context.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}
