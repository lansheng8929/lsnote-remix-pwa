import { getAllNotionPosts } from "../models/notionPost";
import { findPostByNotionId, getPosts, Post } from "../models/post";
import dayjs from "dayjs";

export const getAllPosts = async () => {
  const notionData = await getAllNotionPosts();

  const posts: Omit<Post, "id">[] = notionData.results.map((page) => ({
    notionId: page.id,
    title: page.properties.Name.title[0].plain_text,
    content: page.properties.Content.rich_text[0].plain_text,
    published: false,
    authorId: "",
    tags: page.properties.Tags.multi_select.map((tag) => tag.name),
    likes: 0,
    createdAt: dayjs(page.created_time).toDate(),
    updatedAt: dayjs(page.last_edited_time).toDate(),
    cover: page.cover.file.url,
    url: page.url,
  }));

  return posts;
};
