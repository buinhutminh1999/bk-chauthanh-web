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

function revalidateProjectPaths() {
  revalidatePath("/cong-trinh");
  revalidatePath("/");
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = projectSchema.parse(await request.json());
  const projects = await getProjects(false);
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  projects[index] = {
    ...projects[index],
    ...body,
    updatedAt: new Date().toISOString(),
  };

  await saveProjects(projects);
  revalidateProjectPaths();

  return NextResponse.json(projects[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const projects = await getProjects(false);

  if (!projects.some((p) => p.id === id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await saveProjects(projects.filter((p) => p.id !== id));
  revalidateProjectPaths();

  return NextResponse.json({ ok: true });
}
