export const AppRoutes = {
  Login: "/auth/login",
  Registration: "/auth/signup",
  ForgotPassword: "/auth/forgot-password",
  Main: "/",
  Questions: "/questions",
  Result: "/result",
  History: "/history",
  Profile: "/profile",
  Catalog: "/catalog"
} as const;

export type AppRoute = keyof typeof AppRoutes;