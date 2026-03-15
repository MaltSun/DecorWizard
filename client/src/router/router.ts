export const AppRoutes = {
  Login: '/auth/login',
  Registration: '/auth/signup',
  ForgotPassword: '/auth/forgot-password',
  Main: '/',
  Questions: '/questions',
  Result: '/result',
  History: '/history',
  Order: '/order',
  Catalog: '/catalog',
  Profile: {
    Path: '/profile',
    Children: {
      Order: '/profile/order',
      Review: '/profile/marks',
      Answer: '/profile/answers',
    },
  },
} as const;

export type AppRoute = keyof typeof AppRoutes;
