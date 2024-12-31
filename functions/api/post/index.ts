export const onRequestPost = async (context) => {
  const { id, ...link } = await context.request.json();
  console.log("id: %s, link: %j", id, link);
  const alreadyExists = await context.env.SHORTLINKS.get(id);
  if (alreadyExists) {
    return new Response(null, {
      status: 400,
      statusText: "id already exists",
    });
  }
  await context.env.SHORTLINKS.put(id, JSON.stringify(link));
  return new Response("");
};
