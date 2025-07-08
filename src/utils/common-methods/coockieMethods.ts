// Set a cookie
export function setCookie(
  name: string,
  value: string,
  minutes: number = 15,
  path: string = "/",
  secure: boolean = true,
  sameSite: "Strict" | "Lax" | "None" = "Lax"
) {
  const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=${path}; SameSite=${sameSite}`;

  if (secure && location.protocol === "https:") {
    cookieString += "; Secure";
  }

  document.cookie = cookieString;
}

// Get a cookie by name
export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

// Delete a cookie
export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Check if a cookie exists
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
