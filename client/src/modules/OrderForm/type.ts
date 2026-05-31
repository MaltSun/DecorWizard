import * as z from 'zod';



export const OrderUserSchema = z.object({
  img: z.string().nonempty(),
  flaworId: z.string().nonempty(),
  weight: z.string().min(1.5, 'Минимальный вес 1.5 кг').max(50, 'Максимальный вес 50 кг'),
  date: z.date().default(new Date()),
  quantity: z.number().min(1, 'Минимальное количество 1'),
  design: z.string().nonempty(),
  comment: z.string().nonempty(),  
});


export const OrderFormSchema = z.object({
  date: z
    .string()
    .min(1, 'Укажите дату готовности')
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, { message: 'Дата не может быть в прошлом' }),

  items: z.record(
    z.string(),
    z.object({
      weight: z
        .number({ message: 'Вес должен быть числом' })
        .min(0.1, 'Минимальный вес 0.1 кг')
        .max(50, 'Максимальный вес 50 кг'),
    })
  ),

  design: z.string(),
  comment: z.string(),
});

export type OrderFormData = z.infer<typeof OrderFormSchema>;