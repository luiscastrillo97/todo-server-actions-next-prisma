import { string, z } from "zod";

export const TodoZodZshema = z.object({
    title: z.string().trim().min(1, {message: "Title is too short"}).max(100, {message: "Title is too long"}),
})