import {z} from "zod";

export const orderSchema = z.object({
    customer_name: z.string().min(1, "Customer name is required"),
    table_id: z.string().min(1, "Please select a table"),
    status: z.string().min(1, "Status is required"),
})

export type OrderForm = z.infer<typeof orderSchema>;