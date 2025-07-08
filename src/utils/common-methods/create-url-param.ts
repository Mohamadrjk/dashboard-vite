export function createUrlSearchParams(params: object): string {
  const obj: Record<string, any> = {};
  let ArrayStr = "&";
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          ArrayStr += `${key}` + "=" + val + "&"; // Append array values with [] to indicate they are part of an array
        });
      } else {
        obj[key] = value;
      }
    }
  });

  const queryParams = new URLSearchParams(obj).toString();
  const queryStr = ArrayStr.endsWith("&")
    ? queryParams + ArrayStr.slice(0, ArrayStr.length - 1)
    : queryParams + ArrayStr;
  return queryStr.length > 0 ? "?" + queryStr : "";
}
