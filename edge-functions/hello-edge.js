export default function onRequest(context) {
  const {geo} = context;

  return new Response(JSON.stringify({
    message: 'Hello Edge!',
    geo: geo,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}