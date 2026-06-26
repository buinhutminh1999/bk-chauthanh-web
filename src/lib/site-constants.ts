export const PRODUCT_SLUG_PRIORITY = [
  "coc-van-be-tong-du-ung-luc",
  "coc-be-tong-ly-tam-du-ung-luc",
  "ong-cong-be-tong-ly-tam",
  "coc-vuong-be-tong-du-ung-luc",
  "gach-via-he",
  "gach-be-tong",
  "be-tong-nhua-nong",
  "be-tong-sieu-tinh-nang-uhpc",
] as const;

export const PRODUCT_LINE_FILTERS = [
  { slug: "coc-van-be-tong-du-ung-luc", label: "Cọc ván bê tông dự ứng lực" },
  { slug: "coc-be-tong-ly-tam-du-ung-luc", label: "Cọc bê tông ly tâm" },
  { slug: "ong-cong-be-tong-ly-tam", label: "Cống bê tông ly tâm" },
  { slug: "coc-vuong-be-tong-du-ung-luc", label: "Cọc vuông dự ứng lực, BTCT" },
  { slug: "gach-via-he", label: "Gạch terrazzo" },
  { slug: "gach-be-tong", label: "Gạch không nung" },
  { slug: "be-tong-nhua-nong", label: "Bê tông nhựa nóng" },
] as const;

export const PRODUCT_CATEGORIES = [
  { id: "coc-be-tong", label: "Cọc bê tông", filter: "Cọc bê tông" },
  { id: "ong-cong-be-tong", label: "Cống bê tông", filter: "Cống bê tông" },
  { id: "gach-be-tong", label: "Gạch bê tông", filter: "Gạch bê tông" },
  { id: "be-tong-nhua", label: "Bê tông nhựa", filter: "Bê tông nhựa" },
  { id: "be-tong-dac-biet", label: "Bê tông đặc biệt", filter: "Bê tông đặc biệt" },
] as const;

export function sortProductsByPriority<T extends { slug: string }>(products: T[]): T[] {
  const order = new Map(PRODUCT_SLUG_PRIORITY.map((slug, index) => [slug, index]));
  return [...products].sort((a, b) => {
    const left = order.get(a.slug as (typeof PRODUCT_SLUG_PRIORITY)[number]) ?? 999;
    const right = order.get(b.slug as (typeof PRODUCT_SLUG_PRIORITY)[number]) ?? 999;
    return left - right;
  });
}

export const TRUST_ITEMS = [
  {
    id: "tcvn",
    title: "Tiêu chuẩn TCVN",
    desc: "Sản phẩm theo quy chuẩn kỹ thuật hiện hành",
    details: {
      summary:
        "Sản phẩm sản xuất và nghiệm thu theo tiêu chuẩn Việt Nam, có giấy chứng nhận và hồ sơ kỹ thuật minh bạch.",
      points: [
        "Cọc Ván Bê Tông dự ứng lực theo JIS A 5373:2016",
        "Cọc Bê tông ly tâm phù hợp theo TCVN 7888:2014",
        "Cống bê tông ly tâm phù hợp theo TCVN 9113:2012",
        "Cọc vuông dự ứng lực theo TCVN 9114:2019",
        "Gạch terrazzo phù hợp theo TCVN 7744:2013",
        "Gạch bê tông phù hợp theo QCVN 16: 2019/BXD",
        "Bê tông nhựa nóng phù hợp theo TCVN 13567-1: 2022",
      ],
    },
  },
  {
    id: "nha-may",
    title: "Nhà máy Châu Thành",
    desc: "Sản xuất công nghiệp, kiểm soát chất lượng",
    details: {
      summary:
        "Nhà máy bê tông Châu Thành trang bị dây chuyền ly tâm hiện đại, quy trình kiểm soát chất lượng xuyên suốt từ nguyên liệu đến thành phẩm.",
      points: [
        "Sản xuất công nghiệp cống, cọc, gạch, bê tông nhựa và UHPC",
        "Kiểm soát nguyên liệu đầu vào và cấp phối theo tiêu chuẩn",
        "Kiểm định định kỳ, hồ sơ sản xuất và nghiệm thu rõ ràng",
        "Đội ngũ kỹ thuật — công nhân lành nghề tại An Giang",
        "Thuộc hệ thống Công ty Cổ phần Xây dựng Bách Khoa",
      ],
    },
  },
  {
    id: "giao-hang",
    title: "Giao hàng tận nơi",
    desc: "Giao hàng đến công trình, phối hợp tiến độ thi công và bố trí vận chuyển phù hợp từng loại sản phẩm.",
    details: {
      summary:
        "Giao hàng đến công trình, phối hợp tiến độ thi công và bố trí vận chuyển phù hợp từng loại sản phẩm.",
      points: [
        "Giao cống, cọc, gạch và bê tông nhựa theo lịch công trình",
        "Phục vụ An Giang và các tỉnh khu vực Miền Tây",
        "Tư vấn phương án bốc xếp, chất hàng an toàn cho cọc và cống",
        "Hỗ trợ báo giá vận chuyển khi khách hàng yêu cầu",
        "Liên hệ kinh doanh để lên kế hoạch giao theo khối lượng đơn hàng",
      ],
    },
  },
  {
    id: "tu-van",
    title: "Tư vấn kỹ thuật",
    desc: "Hỗ trợ chọn quy cách và giải đáp kỹ thuật",
    details: {
      summary:
        "Đội ngũ kỹ thuật tư vấn lựa chọn chủng loại, quy cách sản phẩm phù hợp hồ sơ thiết kế và điều kiện thi công tại công trường.",
      points: [
        "Tư vấn chọn cọc ván, cọc ly tâm, cọc vuông và cống theo tải trọng, địa chất",
        "Cung cấp bảng thông số, bản vẽ điển hình và hồ sơ nghiệm thu theo yêu cầu",
        "Giải đáp kỹ thuật về gạch terrazzo, gạch bê tông, bê tông nhựa và sản phẩm đặc biệt",
        "Báo giá và phản hồi nhanh qua điện thoại, Zalo hoặc email trong giờ làm việc",
        "Hỗ trợ sản xuất theo hồ sơ thiết kế trong phạm vi dây chuyền nhà máy",
      ],
      contacts: [
        { role: "Tư vấn", name: "Anh Tài", phone: "0913.877.184" },
        { role: "Tư vấn", name: "Anh Sang", phone: "0913.877.408" },
      ],
    },
  },
] as const;

export function zaloLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? digits.slice(1) : digits;
  return `https://zalo.me/84${normalized}`;
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

const MAP_ADDRESS =
  "Ấp Bình Phú 2, xã Bình Hòa, An Giang";

export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
