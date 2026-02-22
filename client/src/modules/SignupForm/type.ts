// import * as z from 'zod';

// export type SignupFormData = {
//   email: string;
//   password: string;
//   name: string;
//   role: 'CUSTOMER' | "OWNER",
//   phone: string,
//   bakeryName?: string,
//   confirmPassword: string,
// };

// export const SignupUserSchema = z.object({
//   email: z.string().email({ message: 'Некорректный email' }),
//   name: z.string().min(2, { message: 'Минимум 2 символа' }),
//   phone: z.string().min(9, { message: 'Некорректный номер' }).optional(),
//   password: z.string().min(6, { message: 'Минимум 6 символов' }),
//   role: z.enum(['CUSTOMER', 'OWNER']),
//   bakeryName: z.string().optional(),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Пароли не совпадают",
//   path: ["confirmPassword"], 
// });

import * as z from 'zod';

export const SignupUserSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  name: z.string().min(2, { message: 'Минимум 2 символа' }),
  phone: z.string().min(9, { message: 'Некорректный номер' }).optional(),
  password: z.string().min(6, { message: 'Минимум 6 символов' }),
  role: z.enum(['CUSTOMER', 'OWNER']),
  bakeryName: z.string().optional(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

// ← Это заменяет ручной тип
export type SignupFormData = z.infer<typeof SignupUserSchema>;