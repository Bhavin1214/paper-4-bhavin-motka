import  * as z  from 'zod'
export const createBlogSchema = z.object({
    title: z.string({message:"enter title"}).min(2, { message: "Title cannot be empty" }),
    content:z.string({message:"enter content"}).min(2, { message: "content cannot be empty" }),
    CategoryId:z.string({message:"enter categoryId"}).uuid({message:"enter valid categoryid"}),
    tags:z.array(z.string({message:"enter tags"}).uuid({message:"enter valid tagid"})).min(1,{message:"enter minimun one"}).optional()
});

export const updateBlogSchema = z.object({
    blogId:z.string({message:"enter BlogId"}).uuid({message:"enter valid BlogId"}),
    title: z.string({message:"enter title"}).min(2, { message: "Title cannot be empty" }).optional(),
    content:z.string({message:"enter content"}).min(2, { message: "content cannot be empty" }).optional(),
    CategoryId:z.string({message:"enter categoryId"}).uuid({message:"enter valid categoryid"}).optional(),
    tags:z.array(z.string({message:"enter tags"}).uuid({message:"enter valid tagid"})).min(1,{message:"enter minimun one"}).optional()
});

export const DeleteBlogSchema = z.object({
    blogId:z.string({message:"enter BlogId"}).uuid({message:"enter valid BlogId"}),
})