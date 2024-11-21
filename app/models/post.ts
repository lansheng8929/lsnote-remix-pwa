import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export type { Post } from '@prisma/client'

export const getPosts = () => prisma.post.findMany()

export const findPostByNotionId = (notionId: string) => prisma.post.findFirst({ where: { notionId } })
