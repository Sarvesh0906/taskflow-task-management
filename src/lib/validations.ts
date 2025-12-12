import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const taskSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(200),
  description: z.string().trim().max(1000).optional(),
  status: z.enum(['pending', 'in_progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
