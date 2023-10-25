import { getBlogPostUsingSlug } from "@/services/BlogService";
import React from "react";

type Props = { params: { slug: string } };

const Page = async ({ params: { slug } }: Props) => {
  const blog = await getBlogPostUsingSlug(slug);
  console.log(blog);

  return <div>BlogPage</div>;
};

export default Page;
