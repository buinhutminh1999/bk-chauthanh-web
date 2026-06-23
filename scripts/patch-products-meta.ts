import { readFile, writeFile } from "fs/promises";
import path from "path";

const productsPath = path.join(process.cwd(), "content", "products.json");

const UPDATES: Record<
  string,
  { shortDescription: string; documents: { title: string; url: string; type: string }[] }
> = {
  "prod-001": {
    shortDescription:
      "Ống cống bê tông ly tâm theo TCVN 9113-2012, đường kính 200–3600mm. Phục vụ thoát nước, viễn thông và hạ tầng.",
    documents: [
      { title: "Bản vẽ cống bê tông", url: "/images/imported/ong-cong-be-tong-ly-tam/3-cong-be-tong.png", type: "drawing" },
      { title: "Giấy chứng nhận ống cống ly tâm", url: "/images/imported/ong-cong-be-tong-ly-tam/4-chung-nhan-ong-cong-be-tong-ly-tam.jpg", type: "catalog" },
    ],
  },
  "prod-002": {
    shortDescription:
      "Cọc bê tông ly tâm dự ứng lực theo TCVN 7888:2014, đường kính 300–500mm. Sản xuất linh hoạt theo thiết kế.",
    documents: [
      { title: "Bản vẽ cọc ly tâm", url: "/images/imported/coc-be-tong-ly-tam-du-ung-luc/3-ban-ve-coc-be-tong-ly-tam.jpg", type: "drawing" },
      { title: "Giấy chứng nhận cọc ly tâm", url: "/images/imported/coc-be-tong-ly-tam-du-ung-luc/2-chung-nhan-coc-be-trong-ly-tam.jpg", type: "catalog" },
      { title: "Bảng thông số PC-PHC A300", url: "/images/imported/coc-be-tong-ly-tam-du-ung-luc/4-PC-PHC-A300.jpg", type: "drawing" },
    ],
  },
  "prod-003": {
    shortDescription:
      "Cọc ván bê tông dự ứng lực tiết diện hình chữ I, phục vụ nền công trình và hạ tầng.",
    documents: [
      { title: "Bản vẽ cọc ván điển hình", url: "/images/imported/coc-van-be-tong-du-ung-luc/2-ban-ve-dien-hinh-cu-van.jpg", type: "drawing" },
      { title: "Giấy chứng nhận cọc ván", url: "/images/imported/coc-van-be-tong-du-ung-luc/1-chung-nhan-coc-van-be-tong-du-ung-luc.jpg", type: "catalog" },
      { title: "Bảng thông số SW-400A", url: "/images/imported/coc-van-be-tong-du-ung-luc/3-sw-400a.jpg", type: "drawing" },
    ],
  },
  "prod-004": {
    shortDescription:
      "Cọc vuông bê tông dự ứng lực 200×200–500×500mm, chiều dài theo yêu cầu dự án.",
    documents: [
      { title: "Bảng thông số kỹ thuật", url: "/images/imported/coc-vuong-be-tong-du-ung-luc/2-bang-thong-so-ky-thuat.jpg", type: "drawing" },
    ],
  },
  "prod-005": {
    shortDescription:
      "Gạch block bê tông các kích thước phổ biến, sản xuất công nghiệp, đạt tiêu chuẩn TCVN về gạch xây.",
    documents: [
      { title: "Giấy chứng nhận gạch bê tông", url: "/images/imported/gach-be-tong/4-chung-nhan-gach-be-tong.jpg", type: "catalog" },
      { title: "Bảng thông số kỹ thuật", url: "/images/imported/gach-be-tong/5-bang-thong-so-ky-thuat.jpg", type: "drawing" },
    ],
  },
  "prod-006": {
    shortDescription:
      "Gạch vỉa hè terrazzo đa màu, ma sát tốt, phục vụ hạ tầng đô thị và công trình công cộng.",
    documents: [
      { title: "Giấy chứng nhận gạch terrazzo", url: "/images/imported/gach-via-he/2-chung-nhan-gach-terrazzo.jpg", type: "catalog" },
    ],
  },
  "prod-007": {
    shortDescription:
      "Bê tông nhựa nóng cấp phối C9.5–C19 theo yêu cầu, phục vụ mặt đường và hạ tầng giao thông.",
    documents: [
      { title: "Giấy chứng nhận bê tông nhựa", url: "/images/imported/be-tong-nhua-nong/2-chung-nhan-be-tong-nhua-nong.jpg", type: "catalog" },
      { title: "Cấp phối C12.5", url: "/images/imported/be-tong-nhua-nong/4-be-tong-nhua-nong-c12.5.jpg", type: "drawing" },
    ],
  },
  "prod-008": {
    shortDescription:
      "Bê tông UHPC cường độ ≥120 MPa — nắp hố ga, gạch trang trí và công trình đặc biệt.",
    documents: [
      { title: "Yêu cầu cơ bản về UHPC", url: "/images/imported/be-tong-sieu-tinh-nang-uhpc/0-yeu-cau-co-ban-ve-uhpc.jpg", type: "catalog" },
      { title: "Tiêu chuẩn liên quan", url: "/images/imported/be-tong-sieu-tinh-nang-uhpc/5-xay-dung-bo-tieu-chuan-viet-nam.jpg", type: "catalog" },
    ],
  },
};

const raw = await readFile(productsPath, "utf-8");
const products = JSON.parse(raw);

for (const product of products) {
  const patch = UPDATES[product.id];
  if (patch) {
    product.shortDescription = patch.shortDescription;
    product.documents = patch.documents;
    product.updatedAt = new Date().toISOString();
  }
}

await writeFile(productsPath, JSON.stringify(products, null, 2) + "\n", "utf-8");
console.log("Updated shortDescription and documents for 8 products");
