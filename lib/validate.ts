import { z } from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }).max(50, {
        message: "Title must be less than 50 characters.",
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    venue: z.string().min(5, {
        message: "Venue must be at least 5 characters.",
    }).max(100, {
        message: "Venue must be less than 100 characters.",
    }),
    host: z.string().min(5, {
        message: "Host must be at least 5 characters.",
    }),
    dpImage: z.string(),
    image: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
})