import * as z from "zod";

export const productSchema = z.object({
  id: z.uuidv4(),
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(100, {
      message: "name must be less than 100 characters.",
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "price must be a positive number.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
});

// export const imageSchema = z
//   .file()
//   .refine((file) => {
//     return !file || file.size <= 1024 * 1024;
//   }, `File size must be less than 1 MB`)
//   .refine((file) => {
//     return !file || ["image/"].some((type) => file.type.startsWith(type));
//   }, "File must be an image");

export const imageSchema = z.file();
