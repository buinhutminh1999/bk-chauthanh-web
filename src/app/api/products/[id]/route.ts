import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/auth";
import { getProducts, saveProducts } from "@/lib/content";

const documentSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  type: z.enum(["pdf", "drawing", "catalog"]),
});

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string(),
  category: z.string(),
  images: z.array(z.string()),
  documents: z.array(documentSchema).optional(),
  featured: z.boolean(),
  published: z.boolean(),
  specs: z.record(z.string(), z.string()).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

function revalidateProductPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/san-pham");
  if (slug) revalidatePath(`/san-pham/${slug}`);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = productSchema.parse(await request.json());
  const products = await getProducts(false);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const oldSlug = products[index].slug;
  products[index] = {
    ...products[index],
    ...body,
    specs: body.specs ?? {},
    documents: body.documents ?? [],
    updatedAt: new Date().toISOString(),
  };

  await saveProducts(products);
  revalidateProductPaths(oldSlug);
  revalidateProductPaths(body.slug);

  return NextResponse.json(products[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const products = await getProducts(false);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await saveProducts(products.filter((p) => p.id !== id));
  revalidateProductPaths(product.slug);

  return NextResponse.json({ ok: true });
}
