export const getRequestObject = (request) => {
  const isOk = request.status >= 200 && request.status < 300;
  return {
    ok: isOk,
    status: request.status ? request.status : isOk ? 200 : 400,
    message: request.message ? request.message : "",
    results: request.results ? request.results : [],
  };
};
