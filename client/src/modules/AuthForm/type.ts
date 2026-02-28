import * as z from 'zod';

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginUserSchema = z.object({
  email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  password: z.string().min(1, 'Пароль обязателен'),
});
