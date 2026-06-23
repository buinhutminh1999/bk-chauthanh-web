import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/content";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  location: z.string().min(1),
  productTypes: z.array(z.string()),
  description: z.string(),
  images: z.array(z.string()),
  year: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
});

async function requireAuth() {
  const authed = await verifySession();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

function revalidateProjectPaths() {
  revalidatePath("/cong-trinh");
  revalidatePath("/");
}

export async function GET() {
  const projects = await getProjects(false);
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  const body = projectSchema.parse(await request.json());
  const projects = await getProjects(false);

  if (projects.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const project = {
    id: `proj-${Date.now()}`,
    ...body,
    createdAt: now,
    updatedAt: now,
  };

  await saveProjects([...projects, project]);
  revalidateProjectPaths();

  return NextResponse.json(project, { status: 201 });
}
