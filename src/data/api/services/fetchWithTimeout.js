export const fetchWithTimeout = async (url, timeLimit = 0) => {
  const controller = new AbortController();
  let timeout;

  if (timeLimit !== 0) {
    timeout = setTimeout(() => {
      controller.abort();
      throw {
        ok: false,
        status: 444,
        message: "Connection Closed Without Response",
      };
    }, timeLimit);
  }

  const response = await fetch(url, { signal: controller.signal });

  if (timeLimit !== 0) {
    clearTimeout(timeout);
  }

  if (response.ok) {
    return await response.json();
  } else {
    throw { ok: false, status: response.status, message: response.message };
  }
};
