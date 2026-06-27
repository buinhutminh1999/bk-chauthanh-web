export type ProductProcess = {
  banner: string;
  title: string;
  steps: string[];
  layout: "zigzag-2" | "grid-3x3" | "prestress";
};

export const PRODUCT_PROCESSES: Record<string, ProductProcess> = {
  "be-tong-nhua-nong": {
    banner: "Bê tông nhựa",
    title: "Quy trình sản xuất bê tông nhựa",
    layout: "zigzag-2",
    steps: [
      "Đốt lò, sấy nhựa",
      "Chuẩn bị cốt liệu, nung nóng cốt liệu",
      "Kiểm tra nhiệt độ cốt liệu",
      "Trộn cốt liệu với nhựa",
      "Kiểm tra nhiệt độ hỗn hợp bê tông nhựa",
      "Thành phẩm",
    ],
  },
  "ong-cong-be-tong-ly-tam": {
    banner: "Cống bê tông ly tâm",
    title: "Quy trình sản xuất cống",
    layout: "prestress",
    steps: [
      "Chuẩn bị khuôn, thép, cốt liệu",
      "Lắp nòng thép, trộn bê tông",
      "Nạp bê tông",
      "Siết bulong",
      "Quay ly tâm",
      "Hấp bê tông cống",
      "Tháo khuôn",
      "Thành phẩm",
    ],
  },
  "coc-be-tong-ly-tam-du-ung-luc": {
    banner: "Cọc bê tông ly tâm",
    title: "Quy trình sản xuất cọc",
    layout: "grid-3x3",
    steps: [
      "Chuẩn bị khuôn, thép, cốt liệu",
      "Lắp nòng thép, trộn bê tông",
      "Nạp bê tông vào khuôn",
      "Đậy nắp khuôn, siết bulong",
      "Căng thép dự ứng lực",
      "Quay ly tâm",
      "Hấp bê tông cọc",
      "Tháo khuôn cọc",
      "Thành phẩm",
    ],
  },
  "gach-be-tong": {
    banner: "Gạch bê tông",
    title: "Quy trình sản xuất gạch bê tông",
    layout: "zigzag-2",
    steps: [
      "Vệ sinh khuôn, trộn bê tông",
      "Nạp bê tông",
      "Ép, rung",
      "Tập kết ra bãi chứa tạm",
      "Đóng kiện, tưới bảo dưỡng",
      "Thành phẩm",
    ],
  },
  "gach-via-he": {
    banner: "Gạch terrazzo",
    title: "Quy trình sản xuất gạch vĩa hè",
    layout: "zigzag-2",
    steps: [
      "Vệ sinh khuôn, trộn bê tông",
      "Nạp bê tông",
      "Ép, rung",
      "Tập kết ra bãi chứa tạm",
      "Đóng kiện, tưới bảo dưỡng",
      "Thành phẩm",
    ],
  },
  "coc-vuong-be-tong-du-ung-luc": {
    banner: "Cọc vuông dự ứng lực",
    title: "Quy trình sản xuất cọc vuông dự ứng lực",
    layout: "prestress",
    steps: [
      "Vệ sinh khuôn",
      "Lắp cáp ứng lực, thép đai...",
      "Căng cáp",
      "Đổ bê tông",
      "Cắt cáp, bóc, tách sản phẩm",
      "Tập kết ra bãi chứa tạm + bảo dưỡng",
      "Thành phẩm",
    ],
  },
  "coc-van-be-tong-du-ung-luc": {
    banner: "Cọc ván dự ứng lực",
    title: "Quy trình sản xuất cọc ván",
    layout: "prestress",
    steps: [
      "Vệ sinh khuôn",
      "Lắp cáp ứng lực, thép đai...",
      "Căng cáp",
      "Đổ bê tông",
      "Cắt cáp, bóc, tách sản phẩm",
      "Tập kết ra bãi chứa tạm + bảo dưỡng",
      "Thành phẩm",
    ],
  },
};

export function getProductProcess(slug: string): ProductProcess | undefined {
  return PRODUCT_PROCESSES[slug];
}

export function hasProductProcess(slug: string): boolean {
  return slug in PRODUCT_PROCESSES;
}
