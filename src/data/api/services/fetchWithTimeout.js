export const fetchWithTimeout = async (url, timeLimit = 0) => {
  const controller = new AbortController();
  let timeout, didTimedOut;

  // throw {
  //   ok: false,
  //   status: 444,
  //   message: "Connection Closed Without Response",
  // };

  try {
    if (timeLimit !== 0) {
      timeout = setTimeout(() => {
        didTimedOut = true;
        controller.abort();
      }, timeLimit);
    }

    const response = await fetch(url, { signal: controller.signal });

    if (timeLimit !== 0) {
      clearTimeout(timeout);
    }

    if (didTimedOut) {
      throw {
        status: 499,
        message: "Connection Closed Without Response",
      };
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: response.statusText,
      };
    }

    return await response.json();
  } catch (error) {
    const isNetworkError = error.message.startsWith("NetworkError");

    throw {
      ok: false,
      status: isNetworkError ? 499 : error.status || 400,
      message: error.message || "",
    };
  }
};
