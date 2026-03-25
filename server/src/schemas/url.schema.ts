import { z } from "zod";

export const createUrlSchema = z.object({
  body: z.object({
    fullUrl: z.url({
      message: "Invalid URL format. Please include http:// or https://",
    }),
  }),
});

export const getUrlSchema = z.object({
  params: z.object({
    shortId: z
      .string({ message: "Short ID is required" })
      .length(8, "Short ID must be exactly 8 characters"),
  }),
});

export type CreateUrlInput = z.infer<typeof createUrlSchema>["body"];
export type GetUrlParams = z.infer<typeof getUrlSchema>["params"];
