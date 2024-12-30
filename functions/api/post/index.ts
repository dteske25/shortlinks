export const onRequestPost = (context) => {
  const sample = JSON.stringify(context.data);
  return new Response(sample);
};
