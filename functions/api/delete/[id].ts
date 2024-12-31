export const onRequestDelete = async (context) => {
  const id = context.params.id;
  console.log("Deleting id: %s", id);
  await context.env.SHORTLINKS.delete(id);
  return new Response("");
};
