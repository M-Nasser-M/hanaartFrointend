import { AspectRatio, Box, Flex, Heading } from "@radix-ui/themes";
import { getBlogPostUsingSlug } from "@/services/server/BlogServiceServer";
import { blogsSchema } from "@/types/blog";
import { safeParse } from "valibot";
import Image from "next/image";

import { DataValidationError } from "@/lib/exceptions";

type Props = { params: { slug: string } };

const Page = async ({ params: { slug } }: Props) => {
  const blog = await getBlogPostUsingSlug(slug);
  const validatedDate = safeParse(blogsSchema, blog);
  if (!validatedDate.success) throw new DataValidationError(`blog ${slug}`);

  return (
    <Flex gap="4" direction="column">
      <AspectRatio ratio={16 / 9}>
        <Image
          fill
          src={validatedDate.output.data[0].cover.url}
          alt={validatedDate.output.data[0].cover.alternativeText || ""}
          priority
          quality={100}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={validatedDate.output.data[0].cover.placeholder}
        />
      </AspectRatio>
      <Heading size="7">{validatedDate.output.data[0].title}</Heading>
      <article
        className="p-4"
        dangerouslySetInnerHTML={{
          __html: validatedDate.output.data[0].article,
        }}
      />
    </Flex>
  );
};

export default Page;
