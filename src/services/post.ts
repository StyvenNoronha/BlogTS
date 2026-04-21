import { v4 } from "uuid";
import fs from "fs/promises";
import slug from "slug";
import { prisma } from "../libs/prisma";

export const handleCover = async (filePath: string) => {
  try {
    const coverName = `${v4()}.jpg`;
    await fs.rename(filePath, `./public/images/covers/${coverName}`);
    return coverName;
  } catch (error) {
    console.error(error);
  }
};

export const createPostSlug = async (title: string) => {
  let newSlug = slug(title);
  let keepTrying = true;
  let postCount = 1;

  while (keepTrying) {
    const post = await getPostBySlug(newSlug);
    if (!post) {
      keepTrying = false;
    } else {
      newSlug = slug(`${title}${++postCount}`);
    }
  }
  return newSlug;
};

export const getPostBySlug = async (slug: string) => {
  return await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};
