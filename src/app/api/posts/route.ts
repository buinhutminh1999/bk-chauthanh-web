import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/auth";
import { getPosts, savePosts } from "@/lib/content";

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  tags: z.array(z.string()),
  published: z.boolean(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

function revalidatePostPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/tin-tuc");
  if (slug) revalidatePath(`/tin-tuc/${slug}`);
}

export async function GET() {
  const posts = await getPosts(false);
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = postSchema.parse(await request.json());
  const posts = await getPosts(false);

  if (posts.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const post = {
    id: `post-${Date.now()}`,
    ...body,
    createdAt: now,
    updatedAt: now,
  };

  await savePosts([...posts, post]);
  revalidatePostPaths(post.slug);

  return NextResponse.json(post, { status: 201 });
}
