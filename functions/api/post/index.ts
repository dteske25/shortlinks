export const onRequestPost = async (context) => {
  console.log(context.request.body);
  const data = await context.request.json();
  return new Response(JSON.stringify(data));
};
