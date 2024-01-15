import matter from "gray-matter";

export interface AuthorType {
  name: string;
  picture: string;
}

export interface ArticleType {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  author: AuthorType;
  excerpt: string;
  timeReading: {
    text: string;
  };
  ogImage: {
    url: string;
  };
  content: string;
  tags: string[];
}

export interface API {
  getRawArticleBySlug: (slug: string) => matter.GrayMatterFile<string>;
  getAllSlugs: () => Array<string>;
  getAllArticles: (fields: string[]) => Array<ArticleType>;
  getArticlesByTag: (tag: string, fields: string[]) => Array<ArticleType>;
  getArticleBySlug: (slug: string, fields: string[]) => ArticleType;
  getAllTags: () => Array<string>;
}
