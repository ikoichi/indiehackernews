import { Footer } from "@/components/Footer/Footer";
import { Box, Container } from "@chakra-ui/react";
import ArticlePreview from "@/components/Blog/ArticlePreview/ArticlePreview";
import { api } from "@/data/blog/blogData";
import { ArticleType } from "./blog.types";
import { Header } from "@/components/Header/Header";

function Blog() {
  const articles: Array<ArticleType> = api.getAllArticles([
    "slug",
    "title",
    "description",
    "date",
    "coverImage",
    "excerpt",
    "timeReading",
    "ogImage",
    "content",
  ]);

  return (
    <Box bgColor="gray.50" overflow="hidden" minH="100vh">
      <Header />
      <Container maxW="container.lg" pb="64px">
        <Box my="64px">
          {articles.map((article: ArticleType) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Blog;
