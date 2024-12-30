export const onRequestDelete = async (context) => {
  const id = context.params.id;
  await context.env.SHORTLINKS.delete(id);
  return new Response("");
};
