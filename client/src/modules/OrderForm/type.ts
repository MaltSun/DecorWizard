import * as z from 'zod';

export type OrderFormData = {
  img: string;
  flaworId: string;
  weight: number;
  date: Date;
  quantity: number;
};

export const OrderUserSchema = z.object({
  img: z.string().nonempty(),
  flaworId: z.string().nonempty(),
  weight: z.string().min(1.5, 'Минимальный вес 1.5 кг').max(50, 'Максимальный вес 50 кг'),
  date: z.date().default(new Date()),
  quantity: z.number().min(1, 'Минимальное количество 1'),
});
