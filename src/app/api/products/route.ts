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

async function requireAuth() {
  const authed = await verifySession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

function revalidateProductPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/san-pham");
  if (slug) revalidatePath(`/san-pham/${slug}`);
}

export async function GET() {
  const products = await getProducts(false);
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = productSchema.parse(await request.json());
  const products = await getProducts(false);

  if (products.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const product = {
    id: `prod-${Date.now()}`,
    ...body,
    specs: body.specs ?? {},
    documents: body.documents ?? [],
    createdAt: now,
    updatedAt: now,
  };

  await saveProducts([...products, product]);
  revalidateProductPaths(product.slug);

  return NextResponse.json(product, { status: 201 });
}
