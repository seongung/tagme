export default {
  async fetch(request, env, ctx) {
    // Simply forward the request to the built worker
    const worker = await import('./.vercel/output/static/_worker.js/index.js');
    return worker.default.fetch(request, env, ctx);
  }
}

// Set compatibility flags
export const config = {
  compatibility_flags: ["nodejs_compat"]
}