import z from "zod/v3";

export const createPostValidator = z.object({
    title: z.string().min(1, "Title is required").max(60, "Max 60 chars are allowed"),
    body: z.string().min(1, "Body id required")
})

export type CreatePostType = z.infer<typeof createPostValidator>