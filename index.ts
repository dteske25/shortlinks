/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface IShortenedLink {
  id: string;
  originalUrl: string;
  createdAt: string;
  clicks: number;
}

const getId = (url: string) => {
  const uri = new URL(url);
  const id = uri.searchParams.get("id");
  return id;
};

export default {
  async fetch(request, env, ctx): Promise<Response> {
    if (request.method === "GET") {
      const id = getId(request.url);
      if (id) {
        const link = await env.SHORTLINKS.get(id);
        if (link) {
          const shortlink = JSON.parse(link);
          if (request.url.includes("/api/follow")) {
            await env.SHORTLINKS.put(
              id,
              JSON.stringify({ ...shortlink, clicks: shortlink.clicks + 1 })
            );
          }
          return new Response(JSON.stringify({ id, ...shortlink }));
        }
      }

      const results = await env.SHORTLINKS.list();
      const ids = results.keys.map((k) => k.name);
      const shortlinks = [];
      for (const id of ids) {
        const link = await env.SHORTLINKS.get(id);
        if (link) {
          shortlinks.push({
            id,
            ...JSON.parse(link),
          });
        }
      }
      return new Response(JSON.stringify(shortlinks));
    } else if (request.method === "POST") {
      // create a new shortlink redirect
      const { id, ...rest } = await request.json<IShortenedLink>();
      await env.SHORTLINKS.put(id, JSON.stringify(rest));
    } else if (request.method === "DELETE") {
      const id = getId(request.url);
      if (id) {
        await env.SHORTLINKS.delete(id);
      }
    }
    return new Response(``);
  },
} satisfies ExportedHandler<Env>;
