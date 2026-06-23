import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/auth";
import { getFaqs, saveFaqs } from "@/lib/content";

const faqSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      question: z.string().min(1),
      answer: z.string().min(1),
      order: z.number(),
    }),
  ),
});

export async function GET() {
  const items = await getFaqs();
  return NextResponse.json(items);
}

export async function PUT(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items } = faqSchema.parse(await request.json());
  await saveFaqs(items);
  revalidatePath("/hoi-dap");
  revalidatePath("/lien-he");

  return NextResponse.json({ ok: true });
}
