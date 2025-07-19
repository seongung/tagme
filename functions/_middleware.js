export const onRequest = async (context) => {
  // This middleware ensures the nodejs_compat flag is recognized
  return context.next();
};