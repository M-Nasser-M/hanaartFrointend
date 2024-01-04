import { BlogMainPage } from "@/types/mainPages";
import { Locale } from "@/types/sharedTypes";
import { Blog, Blogs } from "@/types/blog";
import { serverApiAuth } from "./ServerApi";
import qs from "qs";

export async function getBlogMainPage(locale: Locale) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
    locale,
  });

  try {
    const response = await serverApiAuth.get<BlogMainPage>(
      `/blog-main-page?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export async function getBlogPage(
  locale: Locale,
  page: number = 1,
  pageSize: number = 9
) {
  const queryString = qs.stringify({
    populate: { cover: true },
    locale,
    pagination: { page, pageSize },
  });

  try {
    const response = await serverApiAuth.get<Blogs>(`/blogs?${queryString}`);

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export async function getBlogPostUsingID(id: number) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
  });

  try {
    const response = await serverApiAuth.get<Blog>(
      `/blogs/${id}?${queryString}`
    );

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export async function getBlogPostUsingSlug(slug: string) {
  const queryString = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      seo: { populate: ["metaImage"] },
      cover: true,
    },
  });

  try {
    const response = await serverApiAuth.get<Blogs>(`/blogs?${queryString}`);

    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}
