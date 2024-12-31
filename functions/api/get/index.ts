import { IShortenedLink } from "../../../types";

export const onRequestGet = async (context) => {
  const results = await context.env.SHORTLINKS.list();
  console.log("Loading %d results", results?.keys?.length);
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
  console.log("Loaded all results: %j", shortlinks);
  return new Response(JSON.stringify(shortlinks));
};
