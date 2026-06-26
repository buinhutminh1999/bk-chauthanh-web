import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTABanner } from "@/components/shared/CTABanner";
import { getSiteConfig } from "@/lib/content";
import { readFile } from "fs/promises";
import path from "path";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

type PrivacyMeta = {
  updatedAt: string;
  legalBasis: string;
};

async function getPrivacyMeta(): Promise<PrivacyMeta> {
  try {
    const raw = await readFile(
      path.join(process.cwd(), "content/privacy-policy.json"),
      "utf-8",
    );
    return JSON.parse(raw) as PrivacyMeta;
  } catch {
    return {
      updatedAt: "26/06/2026",
      legalBasis: "Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15",
    };
  }
}

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Chính sách bảo mật — ${site.shortName}`,
    description: `Chính sách bảo mật và xử lý thông tin liên hệ của ${site.companyName} — nhà máy thuộc hệ sinh thái Công ty Cổ phần Xây dựng Bách Khoa.`,
    path: "/chinh-sach-bao-mat",
    siteName: site.shortName,
  });
}

export default async function PrivacyPolicyPage() {
  const [site, meta] = await Promise.all([getSiteConfig(), getPrivacyMeta()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bachkhoachauthanh.vn";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Chính sách bảo mật", path: "/chinh-sach-bao-mat" },
        ])}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Chính sách bảo mật" },
        ]}
        title="Chính sách bảo mật thông tin"
        subtitle="Cam kết bảo vệ thông tin khách hàng và đối tác khi liên hệ qua website"
      />

      <section className="py-16 lg:py-20">
        <Container size="narrow" className="prose-content max-w-none text-ink-muted leading-relaxed">
          <p className="text-sm text-steel">Cập nhật lần cuối: {meta.updatedAt}</p>

          <p className="mt-6">
            {site.companyName} (sau đây gọi là &ldquo;Chúng tôi&rdquo;) là nhà máy sản xuất bê tông
            thuộc hệ sinh thái{" "}
            <strong className="text-ink">{site.parentCompany ?? "Công ty Cổ phần Xây dựng Bách Khoa"}</strong>
            . Chúng tôi tôn trọng quyền riêng tư và cam kết bảo mật thông tin mà quý khách cung cấp
            khi truy cập website, gửi yêu cầu báo giá hoặc liên hệ tư vấn sản phẩm.
          </p>
          <p>
            Chính sách này được xây dựng phù hợp tinh thần {meta.legalBasis}, quy định cách chúng
            tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân qua website{" "}
            {siteUrl.replace(/^https?:\/\//, "")}.
          </p>

          <h2>1. Đơn vị quản lý thông tin</h2>
          <p>
            <strong className="text-ink">{site.companyName}</strong>
            <br />
            Địa chỉ: {site.address}
            <br />
            Email:{" "}
            <a href={`mailto:${site.email}`} className="text-brand-700 hover:text-brand-900">
              {site.email}
            </a>
            <br />
            Điện thoại: {site.phone}
            <br />
            Website: {siteUrl.replace(/^https?:\/\//, "")}
          </p>
          <p>
            Trụ sở Công ty mẹ — {site.parentCompany ?? "Công ty Cổ phần Xây dựng Bách Khoa"}: Số 39
            đường Trần Hưng Đạo, Phường Long Xuyên, Tỉnh An Giang · Email:{" "}
            <a
              href="mailto:bachkhoa_lx@yahoo.com.vn"
              className="text-brand-700 hover:text-brand-900"
            >
              bachkhoa_lx@yahoo.com.vn
            </a>{" "}
            · Điện thoại:{" "}
            <a href="tel:02963835787" className="text-brand-700 hover:text-brand-900">
              02963.835.787
            </a>
          </p>

          <h2>2. Phạm vi áp dụng</h2>
          <p>Chính sách này áp dụng khi bạn:</p>
          <ul>
            <li>Truy cập và xem nội dung trên website</li>
            <li>Gửi form báo giá, form liên hệ hoặc yêu cầu tư vấn sản phẩm</li>
            <li>Liên hệ qua điện thoại, email, Zalo hoặc Facebook được công bố trên website</li>
            <li>Tải tài liệu kỹ thuật, catalog hoặc bản vẽ (nếu yêu cầu thông tin liên hệ)</li>
          </ul>

          <h2>3. Thông tin chúng tôi thu thập</h2>
          <ul>
            <li>
              <strong>Thông tin liên hệ bạn cung cấp:</strong> họ tên, số điện thoại, email, tên
              công ty/dự án, sản phẩm quan tâm, nội dung yêu cầu báo giá hoặc tư vấn.
            </li>
            <li>
              <strong>Thông tin kỹ thuật:</strong> địa chỉ IP, loại trình duyệt, thiết bị, trang đã
              xem, thời gian truy cập (khi sử dụng công cụ thống kê website).
            </li>
            <li>
              <strong>Thông tin trao đổi:</strong> nội dung cuộc gọi, email, Zalo liên quan tư vấn
              sản phẩm và chăm sóc khách hàng.
            </li>
          </ul>
          <p>
            Chúng tôi chỉ thu thập thông tin cần thiết cho mục đích tư vấn, báo giá và phục vụ khách
            hàng. Chúng tôi không cố ý thu thập thông tin của trẻ em dưới 16 tuổi.
          </p>

          <h2>4. Mục đích sử dụng thông tin</h2>
          <p>Thông tin được sử dụng để:</p>
          <ul>
            <li>Tư vấn kỹ thuật, báo giá và chăm sóc khách hàng theo yêu cầu</li>
            <li>Liên hệ lại qua điện thoại, email hoặc Zalo khi bạn đồng ý</li>
            <li>Giao hàng, nghiệm thu và thực hiện hợp đồng (nếu phát sinh giao dịch)</li>
            <li>Lưu trữ hồ sơ theo quy định kế toán, thuế và pháp luật hiện hành</li>
            <li>Cải thiện nội dung website và trải nghiệm người dùng</li>
            <li>Thống kê lượt truy cập (Google Analytics / Tag Manager — khi được bật)</li>
          </ul>
          <p>
            Chúng tôi <strong>không bán</strong> hoặc cho thuê thông tin cá nhân của khách hàng cho
            bên thứ ba vì mục đích thương mại.
          </p>

          <h2>5. Cookie và công nghệ theo dõi</h2>
          <p>Website có thể sử dụng cookie để:</p>
          <ul>
            <li>
              <strong>Vận hành website:</strong> duy trì phiên quản trị, bảo mật hệ thống.
            </li>
            <li>
              <strong>Thống kê truy cập:</strong> Google Analytics 4 hoặc Google Tag Manager — giúp
              hiểu cách khách truy cập sử dụng website.
            </li>
            <li>
              <strong>Quảng cáo online:</strong> Meta (Facebook) Pixel — chỉ khi được cấu hình trên
              hệ thống.
            </li>
          </ul>
          <p>
            Bạn có thể tắt cookie trong trình duyệt hoặc dùng{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 hover:text-brand-900"
            >
              công cụ tắt Google Analytics
            </a>
            . Việc tắt cookie phân tích không ảnh hưởng đến chức năng gửi form liên hệ.
          </p>

          <h2>6. Chia sẻ thông tin với bên thứ ba</h2>
          <p>Chúng tôi có thể chia sẻ thông tin với:</p>
          <ul>
            <li>
              <strong>Đơn vị cung cấp dịch vụ:</strong> hosting, email (SMTP), Google (Analytics),
              Meta (Pixel) — chỉ trong phạm vi vận hành website và chăm sóc khách hàng.
            </li>
            <li>
              <strong>Công ty mẹ và các đơn vị trong hệ sinh thái Bách Khoa:</strong> khi cần phối
              hợp tư vấn, báo giá hoặc thực hiện hợp đồng liên quan.
            </li>
            <li>
              <strong>Cơ quan nhà nước:</strong> khi có yêu cầu hợp pháp theo quy định pháp luật.
            </li>
          </ul>

          <h2>7. Thời gian lưu trữ</h2>
          <ul>
            <li>Yêu cầu báo giá chưa thành giao dịch: tối đa <strong>24 tháng</strong></li>
            <li>
              Hợp đồng, khách hàng: theo thời hạn luật kế toán, thuế (thường 5–10 năm nếu có phát
              sinh)
            </li>
            <li>Dữ liệu thống kê website: theo cấu hình Google (thường 2–14 tháng)</li>
          </ul>
          <p>
            Hết thời hạn lưu trữ, thông tin sẽ được xóa hoặc ẩn danh hóa nếu không còn nghĩa vụ pháp
            lý.
          </p>

          <h2>8. Biện pháp bảo mật</h2>
          <p>
            Chúng tôi áp dụng các biện pháp hợp lý để bảo vệ thông tin: kết nối HTTPS, mật khẩu quản
            trị, phân quyền truy cập nội bộ và sao lưu dữ liệu định kỳ. Chỉ nhân sự được phân công
            mới được tiếp cận thông tin khách hàng phục vụ tư vấn và giao dịch.
          </p>

          <h2>9. Quyền của khách hàng</h2>
          <p>Theo quy định pháp luật về bảo vệ dữ liệu cá nhân, bạn có quyền:</p>
          <ul>
            <li>Được thông báo về việc thu thập và sử dụng thông tin</li>
            <li>Yêu cầu truy cập, chỉnh sửa hoặc cập nhật thông tin cá nhân</li>
            <li>Yêu cầu xóa, hạn chế xử lý hoặc rút lại sự đồng ý (trong phạm vi pháp luật cho phép)</li>
            <li>Khiếu nại tới cơ quan có thẩm quyền nếu cho rằng quyền bị xâm phạm</li>
          </ul>
          <p>
            Gửi yêu cầu qua email{" "}
            <a href={`mailto:${site.email}`} className="text-brand-700 hover:text-brand-900">
              {site.email}
            </a>{" "}
            hoặc gọi {site.phone}. Chúng tôi phản hồi trong vòng <strong>72 giờ làm việc</strong>.
          </p>

          <h2>10. Thay đổi chính sách</h2>
          <p>
            Chúng tôi có thể cập nhật chính sách khi thay đổi tính năng website hoặc quy định pháp
            luật. Phiên bản mới sẽ ghi rõ ngày cập nhật ở đầu trang. Việc tiếp tục sử dụng website
            sau khi công bố được hiểu là bạn đã nắm được nội dung thay đổi.
          </p>

          <h2>11. Liên hệ</h2>
          <p>
            Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:
            <br />
            <strong className="text-ink">{site.companyName}</strong>
            <br />
            {site.address}
            <br />
            Điện thoại: {site.phone} · Email: {site.email}
          </p>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
