import  * as z  from 'zod'
export const createBlogSchema = z.object({
    title: z.string().min(2, { message: "Title cannot be empty" }),
    content:z.string().min(2, { message: "content cannot be empty" }),
    CategoryId:z.string().uuid({message:"enter valid categoryid"}),
    tags:z.array(z.string().uuid({message:"enter valid tagid"})).min(1,{message:"enter minimun one"}).optional()
});