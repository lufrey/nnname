import type { APIRoute } from "astro";

const get: APIRoute = async ({ params }) => {
  const words = await import(`../words/${params.letter?.toLowerCase()}.json`)
    .then((data) => data.default);
  const word = words[Math.floor(Math.random() * words.length)];

  return new Response(
    JSON.stringify({
      word,
    }),
  );
};
export { get };
