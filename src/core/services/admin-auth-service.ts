export const ADMIN_USERNAME = "danilo";
export const ADMIN_PASSWORD = "123";
export const ADMIN_SESSION_COOKIE = "dicere_admin_session";

export function isAdminCredentialsValid(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
