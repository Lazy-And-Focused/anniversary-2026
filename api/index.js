export default async (req, res) => {
  const { reqHandler } = await import('../dist/anniversary-2026/server/server.mjs');
  return reqHandler(req, res);
};
