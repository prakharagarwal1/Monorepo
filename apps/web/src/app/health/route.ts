const GET = async () => {
  return Response.json({
    status: "ok",
    service: "academy-web",
    timestamp: new Date().toISOString(),
  });
};

export { GET };
