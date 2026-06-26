# Bách Khoa Châu Thành — Website Marketing

Website marketing cho **Công ty CP Sản xuất Bách Khoa Châu Thành** — giới thiệu sản phẩm vật liệu xây dựng, tin tức và SEO.

Dựa trên danh mục sản phẩm từ [bachkhoaangiang.com/san-xuat](https://bachkhoaangiang.com/san-xuat) (cống BT ly tâm, cọc BT dự ứng lực, gạch BT, UHPC…).

## Tính năng

- Trang chủ, giới thiệu, danh mục sản phẩm, chi tiết sản phẩm
- Tin tức / bài PR (Markdown)
- Liên hệ (form demo)
- **Admin** (`/admin`) — đăng bài, thêm/sửa sản phẩm
- SEO: meta tags, Open Graph, sitemap, robots, Schema.org

## Tech stack

- Next.js 16 (App Router) + React 19
- TypeScript + Tailwind CSS 4
- Nội dung JSON (`content/`) — không cần database

## Quick start

```bash
cd e:\Project\bk-chauthanh-web
cp .env.example .env.local
pnpm install
pnpm dev
```

Mở http://localhost:3000

### Admin

1. Đặt `ADMIN_PASSWORD` và `ADMIN_SECRET` trong `.env.local`
2. Vào http://localhost:3000/admin
3. Đăng nhập và quản lý sản phẩm / bài viết

## Biến môi trường

| Biến | Mô tả |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | URL production (SEO, sitemap) — đổi khi có domain |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (tùy chọn) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (tùy chọn, ưu tiên hơn GA trực tiếp) |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta Pixel cho quảng cáo Facebook (tùy chọn) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Mã xác minh Search Console |
| `ADMIN_PASSWORD` | Mật khẩu đăng nhập admin |
| `ADMIN_SECRET` | Secret ký session cookie (chuỗi random dài) |

## Deploy

### Vercel (khuyến nghị)

1. Push repo lên GitHub
2. Import project trên Vercel
3. Set env vars
4. **Lưu ý:** Vercel serverless không ghi file — admin chỉ hoạt động khi deploy trên VPS/PM2 hoặc dùng Git-based workflow

### VPS / PM2 (admin ghi file JSON)

```bash
pnpm build
pnpm start
```

Chạy trên port 3000, reverse proxy qua Caddy/Nginx khi có domain.

## Cấu trúc

```
content/           # site.json, products.json, posts.json
src/app/(site)/    # Trang công khai
src/app/admin/     # Quản trị nội dung
src/app/api/       # API CRUD + auth
```

## Domain (sau khi mua)

1. Cập nhật `NEXT_PUBLIC_SITE_URL=https://your-domain.vn` trong env
2. Trỏ DNS A/CNAME tới Vercel hoặc VPS
3. Bật HTTPS
4. Làm theo checklist **[GO-LIVE.md](./GO-LIVE.md)** (Analytics, Search Console, sitemap)

## Liên kết nhóm

- Website cũ (Xây dựng Bách Khoa): https://bachkhoaangiang.com
- ERP nội bộ: `bk-erp` (repo riêng)
