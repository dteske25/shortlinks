import { IShortenedLink } from "../../../types";

export const onRequest = async (context) => {
  const results = await context.env.SHORTLINKS.list();
  const ids = results.keys.map((k) => k.name);
  const shortlinks: IShortenedLink[] = [];
  for (const id of ids) {
    const link = await context.env.SHORTLINKS.get(id);
    if (link) {
      shortlinks.push({
        id,
        ...JSON.parse(link),
      });
    }
  }
  return new Response(JSON.stringify(shortlinks));
};
