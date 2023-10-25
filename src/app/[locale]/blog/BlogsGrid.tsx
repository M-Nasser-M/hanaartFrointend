import NextLink from "@/components/NextLink";
import { Blogs } from "@/types/blog";
import {
  AspectRatio,
  Card,
  Grid,
  Heading,
  Inset,
  Link,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

type Props = { blogs: Blogs };

const BlogsGrid = ({ blogs }: Props) => {
  return (
    <Grid
      columns={{ initial: "1", md: "2", lg: "3" }}
      mb="9"
      gap="3"
      width="100%"
    >
      {blogs.data.map((blog) => (
        <Card className="h-full" key={blog.id}>
          <Inset clip="padding-box" side="top" pb="current">
            <AspectRatio ratio={16 / 9}>
              <Image
                alt={blog.cover?.alternativeText || ""}
                fill
                src={blog.cover?.url || ""}
              />
            </AspectRatio>
          </Inset>
          <Link asChild>
            <NextLink href={`/blog/${blog.slug}`}>
              <Heading as="h3">{blog.title}</Heading>
            </NextLink>
          </Link>
          <Text as="p">{blog.description}</Text>
        </Card>
      ))}
    </Grid>
  );
};

export default BlogsGrid;
