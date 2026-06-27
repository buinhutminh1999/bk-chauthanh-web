import type { Product, ProductDocument } from "@/types/content";

export type ProductDocumentEntry = ProductDocument & {
  productName: string;
  productSlug: string;
  category: string;
};

export function collectProductDocuments(products: Product[]): ProductDocumentEntry[] {
  return products.flatMap((product) =>
    (product.documents ?? []).map((doc) => ({
      ...doc,
      productName: product.name,
      productSlug: product.slug,
      category: product.category,
    })),
  );
}

export function collectCertificationDocuments(products: Product[]): ProductDocumentEntry[] {
  return collectProductDocuments(products).filter(
    (doc) =>
      doc.type === "catalog" ||
      /chứng nhận|chung nhan|tcvn/i.test(doc.title),
  );
}

export const TCVN_STANDARDS = [
  {
    code: "TCVN 9113:2012",
    name: "Ống và hộp cống bê tông cốt thép",
    products: ["Cống bê tông ly tâm"],
  },
  {
    code: "TCVN 7888:2014",
    name: "Cọc bê tông ly tâm",
    products: ["Cọc bê tông ly tâm", "Cọc ván bê tông dự ứng lực"],
  },
  {
    code: "TCVN 6475:2011",
    name: "Gạch bê tông không nung",
    products: ["Gạch block bê tông", "Gạch vỉa hè terrazzo"],
  },
  {
    code: "TCVN 7570:2005",
    name: "Bê tông nhựa — Phối trộn và thi công",
    products: ["Bê tông nhựa nóng"],
  },
] as const;
