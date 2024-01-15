import React from "react";
import readingTime from "reading-time";
// @ts-ignore
import mdxPrism from "mdx-prism";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
// @ts-ignore
import remarkCapitalize from "remark-capitalize";
import rehypeExternalLinks from "rehype-external-links";
import remarkImages from "remark-images";
import { compileMDX } from "next-mdx-remote/rsc";
import { api } from "@/data/blog/blogData";
import { YouTubeEmbed } from "@/components/Blog/Article/YouTubeEmbed";
import { LoomEmbed } from "@/components/Blog/Article/LoomEmbed";
import { Metadata } from "next";
import Article from "@/components/Blog/Article/Article";
import { Footer } from "@/components/Footer/Footer";
import {
  openGraphImageUrl,
  twitterHandle,
  twitterMakerHandle,
  websiteUrl,
} from "@/config";
import { TweetEmbed } from "@/components/Blog/Article/TweetEmbed";
import { getOpenGraph } from "@/components/OpenGraph/OpenGraph";
import { getSEOTags } from "@/components/SEOTags/SEOTags";

const getBlogData = async (slug: string) => {
  const { content, data } = api.getRawArticleBySlug(slug);
  const mdxSource = await compileMDX({
    source: content,
    components: customComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkCapitalize, remarkImages],
        rehypePlugins: [
          mdxPrism,
          rehypeAutolinkHeadings,
          rehypeSlug,
          rehypeCodeTitles,
          rehypeExternalLinks,
        ],
      },
    },
  });
  const tags = data.tags ?? [];

  const readTime = readingTime(content);
  const source = mdxSource;
  const frontMatter = data;

  return {
    readTime,
    source,
    frontMatter,
    tags,
  };
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const { frontMatter } = await getBlogData(slug);

  return {
    ...getSEOTags({
      metadataBase: new URL(websiteUrl),
      title: frontMatter.title,
      description: frontMatter.description,
    }),
    ...getOpenGraph({
      websiteUrl: `/blog/${slug}`,
      title: frontMatter.title,
      description: frontMatter.description,
      imageUrl: `${frontMatter.ogImage.url}`,
      twitterImageUrl: openGraphImageUrl,
      twitterHandle: twitterHandle,
      twitterMakerHandle: twitterMakerHandle,
    }),
  };
}

const customComponents = {
  YouTube: YouTubeEmbed,
  Tweet: TweetEmbed,
  Loom: LoomEmbed,
};

const BlogPage = async ({ params }: Props) => {
  const slug = params.slug;

  const { readTime, source, frontMatter } = await getBlogData(slug);

  return (
    <>
      <Article
        readingTime={readTime}
        title={frontMatter.title}
        description={frontMatter.description}
        date={frontMatter.date}
        content={source.content}
        ogImage={frontMatter.ogImage}
        slug={slug}
      />
      <Footer />
    </>
  );
};

export default BlogPage;
