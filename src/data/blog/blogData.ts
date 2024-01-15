import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { API, ArticleType } from "@/app/blog/blog.types";

const articlesDirectory = join(process.cwd(), "blogposts");

function getRawArticleBySlug(slug: string): matter.GrayMatterFile<string> {
  const fullPath = join(articlesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents);
}

function getAllSlugs(): Array<string> {
  return fs.readdirSync(articlesDirectory);
}

function getArticleBySlug(slug: string, fields: string[] = []): ArticleType {
  const realSlug = slug.replace(/\.mdx$/, "");
  const { data, content } = getRawArticleBySlug(realSlug);
  const timeReading: any = readingTime(content);
  const items: Partial<ArticleType> = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "timeReading") {
      items[field] = timeReading;
    }
    if (data[field]) {
      // @ts-ignore
      items[field] = data[field];
    }
  });

  return items as ArticleType;
}

function getAllArticles(fields: string[] = []): Array<ArticleType> {
  return getAllSlugs()
    .map((slug) => getArticleBySlug(slug, fields))
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
}

function getArticlesByTag(
  tag: string,
  fields: string[] = []
): Array<ArticleType> {
  return getAllArticles(fields).filter((article) => {
    const tags = article.tags ?? [];
    return tags.includes(tag);
  });
}

function getAllTags(): Array<string> {
  const articles = getAllArticles(["tags"]);
  const allTags = new Set<string>();
  articles.forEach((article) => {
    const tags = article.tags as Array<string>;
    tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
}

export const api: API = {
  getRawArticleBySlug,
  getAllSlugs,
  getAllArticles,
  getArticlesByTag,
  getArticleBySlug,
  getAllTags,
};
