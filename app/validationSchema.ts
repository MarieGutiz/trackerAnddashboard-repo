import { z } from 'zod';

// Define the shape of the issue object
export const issueSchema = z.object({
    title: z.string().min(3, 'Title is required.').max(255),
    description: z.string().min(3, 'Description is required.'),
    // status: z.enum(["open", "closed", "in-progress"]),
});
