import { IShortenedLink } from "../../../types";

export const onRequestGet = async (context) => {
  const id = context.params.id;
  console.log("Loading data for id: %s", id);
  const data = await context.env.SHORTLINKS.get(id);
  const link = JSON.parse(data);

  console.log("Returning id: %s, link: %j", id, link);
  return new Response(JSON.stringify({ id, ...link }));
};
