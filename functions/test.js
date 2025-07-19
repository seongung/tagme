export async function onRequest(context) {
  return new Response('Test function is working!', {
    headers: { 'Content-Type': 'text/plain' },
  });
}