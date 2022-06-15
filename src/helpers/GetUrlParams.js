const getUrlParams = (selectedParam) => {
  const regResults = (param) => {
    const regex = new RegExp("[?&]" + param + "=([^&#]*)", "g");
    return Array.from(window.location.href.matchAll(regex));
  };

  let param;
  if (selectedParam) {
    if (typeof selectedParam === "string") {
      const results = regResults(selectedParam);

      if (results.length === 0) return null;
      else return regResults(selectedParam)[0][1];
    } else {
      throw TypeError(selectedParam + " is not a String");
    }
  } else {
    const results = regResults("(\\w+)");
    if (results.length === 0) {
      return null;
    } else {
      const urlParams = new Object();
      results.forEach((result, index) => {
        urlParams[results[index][1]] = results[index][2];
      });
      return urlParams;
    }
  }
};

const getNewParamsString = (params, ignorePreviousParams) => {
  const currentParams = ignorePreviousParams ? null : getUrlParams();

  if (params !== null && typeof params === "object") {
    let newParams;

    if (currentParams) newParams = { ...currentParams, ...params };
    else newParams = params;

    let paramsString = "?";
    for (const param in newParams) {
      if (newParams[param]) {
        let ampersand = "&";
        if (paramsString.slice(-1) === "?") ampersand = "";
        paramsString =
          paramsString + ampersand + param + "=" + newParams[param];
      }
    }
    return paramsString;
  } else {
    throw TypeError(params + " is not an Object");
  }
};

export { getUrlParams, getNewParamsString };
