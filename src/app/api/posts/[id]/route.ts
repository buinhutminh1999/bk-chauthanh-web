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
});

function revalidatePostPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/tin-tuc");
  if (slug) revalidatePath(`/tin-tuc/${slug}`);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = postSchema.parse(await request.json());
  const posts = await getPosts(false);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const oldSlug = posts[index].slug;
  posts[index] = {
    ...posts[index],
    ...body,
    updatedAt: new Date().toISOString(),
  };

  await savePosts(posts);
  revalidatePostPaths(oldSlug);
  revalidatePostPaths(body.slug);

  return NextResponse.json(posts[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const posts = await getPosts(false);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await savePosts(posts.filter((p) => p.id !== id));
  revalidatePostPaths(post.slug);

  return NextResponse.json({ ok: true });
}
