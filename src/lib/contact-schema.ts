import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "Số điện thoại không hợp lệ")
    .max(20)
    .regex(/^[0-9+\s().-]+$/, "Số điện thoại không hợp lệ"),
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal("")),
  product: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5, "Nội dung quá ngắn").max(5000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
