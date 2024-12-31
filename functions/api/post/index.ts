export const onRequestPost = async (context) => {
  const { id, ...link } = await context.request.json();
  console.log("id: %s, link: %j", id, link);
  await context.env.SHORTLINKS.put(id, JSON.stringify(link));
  return new Response("");
};
