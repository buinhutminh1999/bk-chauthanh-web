# Go-live — Deploy, Analytics & Google Search Console

Hướng dẫn triển khai **bachkhoachauthanh.vn** và bật đo lường.

---

## 1. Deploy production (VPS + PM2)

```bash
# Trên server
git clone https://github.com/buinhutminh1999/bk-chauthanh-web.git
cd bk-chauthanh-web
pnpm install
cp config/production.env.template .env
# Sửa .env: mật khẩu admin, analytics ID (mục 2)

pnpm build
pnpm start   # port 3000
```

Reverse proxy (Nginx/Caddy) trỏ domain → `localhost:3000`, bật HTTPS.

**Kiểm tra sau deploy:**

```bash
NEXT_PUBLIC_SITE_URL=https://bachkhoachauthanh.vn pnpm run go-live:check
```

---

## 2. Tạo Analytics ID (làm một lần)

### Google Analytics 4

1. Vào [Google Analytics](https://analytics.google.com/) → **Admin** → **Create property**
2. Tên: `Bê tông Châu Thành` · múi giờ `Asia/Ho_Chi_Minh`
3. **Data stream** → Web → URL: `https://bachkhoachauthanh.vn`
4. Copy **Measurement ID** dạng `G-XXXXXXXXXX`
5. Ghi vào `.env` production:

   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

6. GA4 → **Admin** → **Events** → đánh dấu `generate_lead` là **Key event** (conversion)

### Google Tag Manager (tuỳ chọn — thay GA trực tiếp)

1. [tagmanager.google.com](https://tagmanager.google.com/) → Container Web
2. Copy `GTM-XXXXXXX` → `NEXT_PUBLIC_GTM_ID=...`
3. Trong GTM cấu hình GA4 tag — **không** set cả GA và GTM cùng lúc trừ khi GA nằm trong GTM

### Meta Pixel (tuỳ chọn — chạy quảng cáo FB)

1. [Meta Events Manager](https://business.facebook.com/events_manager) → Create Pixel
2. Copy Pixel ID → `NEXT_PUBLIC_FB_PIXEL_ID=...`

Sau khi sửa `.env`, chạy lại: `pnpm build && pm2 restart ...`

---

## 3. Google Search Console

### Bước A — Xác minh quyền sở hữu

1. Mở [Google Search Console](https://search.google.com/search-console)
2. **Add property** → chọn **URL prefix**: `https://bachkhoachauthanh.vn`
3. Chọn **HTML tag** → copy mã `content="..."`
4. Ghi vào `.env`:

   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123...
   ```

5. Deploy lại → bấm **Verify** trên GSC

### Bước B — Submit sitemap

1. GSC → **Sitemaps** (menu trái)
2. Nhập: `sitemap.xml` → **Submit**
3. URL đầy đủ: `https://bachkhoachauthanh.vn/sitemap.xml`

### Bước C — Theo dõi (sau 3–7 ngày)

- **Pages** → trang đã index
- **Sitemaps** → trạng thái Success
- Tìm Google: `site:bachkhoachauthanh.vn`

---

## 4. Google Business Profile (ngoài website)

1. [business.google.com](https://business.google.com/)
2. Tạo/cập nhật hồ sơ **Bê tông Châu Thành**
3. NAP khớp website: SĐT `079 555 5777`, địa chỉ Ấp Bình Phú 2, xã Bình Hòa, An Giang
4. Thêm ảnh nhà máy, link website

---

## 5. Checklist nhanh

- [ ] HTTPS hoạt động
- [ ] `pnpm run go-live:check` pass
- [ ] GA4 ID trong `.env` production
- [ ] GSC verified + sitemap submitted
- [ ] Form liên hệ gửi email (SMTP nếu cần)
- [ ] Google Business Profile cập nhật
