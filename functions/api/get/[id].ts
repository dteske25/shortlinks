import { IShortenedLink } from "../../../types";

export const onRequest = async (context) => {
  const id = context.params.id;
  const data = await context.env.SHORTLINKS.get(id);

  const link = JSON.parse(data);
  link.clicks += 1;

  await context.env.SHORTLINKS.put(id, JSON.stringify(link));

  return new Response(JSON.stringify({ id, ...link }));
};
