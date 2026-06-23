# Mobile Responsive Audit — bk-chauthanh-web

**Ngày audit:** 23/06/2026  
**Breakpoint ưu tiên:** 360px → 390–414px → 768px → 1024px+

---

## 1. Foundation (Layout & UI primitives)

| # | File | Vùng | Mô tả | Breakpoint | Mức độ |
|---|------|------|-------|------------|--------|
| F1 | `globals.css` | `.brand-line-2`, `.brand-line-3` | `white-space: nowrap` trên BrandMark ngang — khi hiện chữ ở `md` (768px) nhưng nav vẫn ẩn đến `lg`, logo + text dài có thể tràn ngang header | 768–1023px | **High** |
| F2 | `Header.tsx` | `BrandMark showTextFrom="md"` | Text brand hiện sớm hơn nav desktop → grid 3 cột bóp vùng giữa, cộng với F1 gây overflow | 768–1023px | **High** |
| F3 | `Button.tsx` | `size="sm"` | `min-h-10` (40px) < 44px tap target yêu cầu | <1024px | **Medium** |
| F4 | `globals.css` | `.pb-mobile-cta` | `4.5rem` có thể chưa đủ khi StickyMobileCTA `min-h-[52px]` + safe-area — nội dung cuối trang bị che một phần | 360–414px | **Medium** |
| F5 | `SiteShell.tsx` | — | Đã có `pb-mobile-cta` trên `<main>` — OK sau khi fix F4 | — | — |
| F6 | `StickyMobileCTA.tsx` | — | Grid 3 cột, `min-h-[52px]`, `aria-label` — OK | — | — |
| F7 | `Container.tsx` | — | `px-4` mobile, max-width hợp lý — OK | — | — |
| F8 | `BrandMark.tsx` | Logo `<img>` | Dùng `<img>` thay `next/image` — không gây CLS (có kích thước cố định h-11 w-11) — chấp nhận được | — | — |

## 2. Trang chủ & `components/home/*`

| # | File | Vùng | Mô tả | Breakpoint | Mức độ |
|---|------|------|-------|------------|--------|
| H1 | `page.tsx` | Stats grid `grid-cols-2` | `text-2xl` stat value trên 2 cột 360px — hơi chật với label dài | 360px | **Low** |
| H2 | `TrustStrip.tsx` | Grid `grid-cols-2` | 4 mục 2×2 trên 360px — icon + 3 dòng text chật, khó đọc | 360px | **Medium** |
| H3 | `TrustStrip.tsx` | Nút đóng modal | `p-2` (~36px) không đạt 44×44px tap target | <640px | **Medium** |
| H4 | `CertificationsSection.tsx` | `md:grid-cols-3` | 1 cột mobile — OK | — | — |
| H5 | `CategoryShowcase.tsx` | CTA link | Thiếu `min-h-11` cho nút "Xem toàn bộ danh mục" | <1024px | **Medium** |
| H6 | `MapContactSection.tsx` | Email `truncate` | Email dài bị cắt thay vì wrap/break | 360px | **Low** |
| H7 | `FacebookSection.tsx` | iframe 400px | OK trên mobile | — | — |

## 3. Sản phẩm & ImageGallery

| # | File | Vùng | Mô tả | Breakpoint | Mức độ |
|---|------|------|-------|------------|--------|
| P1 | `ProductCatalog.tsx` | Chip filter scroll ngang | Có `overflow-x-auto` nhưng không có chỉ báo scroll — user có thể không biết vuốt được | 360–414px | **Medium** |
| P2 | `ProductContentTabs.tsx` | Tab bar scroll ngang | Tương tự P1 | 360–414px | **Medium** |
| P3 | `ImageGallery.tsx` | Thumbnail strip | Có scroll ngang — thiếu chỉ báo scroll | 360px | **Low** |
| P4 | `RelatedProducts.tsx` | Card ngang | `min-[414px]` grid — 1 cột ở 360px OK | — | — |
| P5 | `san-pham/[slug]/page.tsx` | H1 `text-2xl` | OK với responsive scale | — | — |

## 4. Công trình, Tin tức, Hỏi đáp

| # | File | Vùng | Mô tả | Breakpoint | Mức độ |
|---|------|------|-------|------------|--------|
| B1 | `globals.css` | `.prose-content table` | `display:block; overflow-x:auto` — OK nhưng thiếu `-webkit-overflow-scrolling` và visual cue scroll | 360px | **Medium** |
| B2 | `tin-tuc/[slug]/page.tsx` | H1 `text-3xl` | Hơi lớn trên 360px với tiêu đề dài | 360px | **Low** |
| B3 | `FaqAccordion.tsx` | Câu hỏi trong button | Thiếu `min-w-0` trên text — câu hỏi dài có thể đẩy icon hoặc tràn | 360px | **Medium** |
| B4 | `hoi-dap/page.tsx` | Link "Xem sản phẩm" | `py-2.5` không có `min-h-11` | <1024px | **Medium** |
| B5 | `ProjectCard.tsx` | — | Aspect ratio, 1 cột mobile — OK | — | — |

## 5. Liên hệ & shared components

| # | File | Vùng | Mô tả | Breakpoint | Mức độ |
|---|------|------|-------|------------|--------|
| C1 | `ContactPageClient.tsx` | Input email | Không dùng `.form-input` (`font-size: 1rem`) — iOS zoom khi focus | 360–414px | **High** |
| C2 | `ContactPageClient.tsx` | Form wrapper `p-8` | Padding lớn trên 360px bóp nội dung form | 360px | **Medium** |
| C3 | `ContactPageClient.tsx` | Grid `gap-12` | Khoảng cách lớn trên mobile | 360px | **Low** |
| C4 | `ContactPageClient.tsx` | Email hiển thị | Không `break-words` — email dài có thể tràn | 360px | **Medium** |
| C5 | `SalesContactsList.tsx` | `sm:whitespace-nowrap` embedded | Label vai trò không wrap ở footer/grid hẹp → overflow ngang tiềm ẩn | 360–768px | **Medium** |
| C6 | `SalesContactsList.tsx` | Nút phone/zalo | `min-h-10` (40px) < 44px | <1024px | **Medium** |
| C7 | `CTABanner.tsx` | `px-8` | Padding ngang lớn trên 360px | 360px | **Low** |
| C8 | `QuoteFormCompact.tsx` | — | Dùng `.form-input` — OK | — | — |

## 6. Admin

| # | File | Vùng | Mô tả | Breakpoint | Mức độ |
|---|------|------|-------|------------|--------|
| A1 | `admin/*/page.tsx` | Mobile card list | Đã có card-list `md:hidden` — OK | — | — |
| A2 | `admin/*/page.tsx` | Link "Chỉnh sửa" | `min-h-10` < 44px | <768px | **Medium** |
| A3 | `FaqEditor.tsx` | Nút xóa câu hỏi | `min-h-10` < 44px | <768px | **Medium** |
| A4 | `AdminFormActions.tsx` | Sticky save | Đã có sticky bottom mobile — OK | — | — |
| A5 | `AdminChrome.tsx` | Mobile drawer | Touch targets OK | — | — |

## 7. Trang Giới thiệu (ngoài scope list nhưng liên quan)

| # | File | Vùng | Mô tả | Breakpoint | Mức độ |
|---|------|------|-------|------------|--------|
| G1 | `gioi-thieu/page.tsx` | Stats `text-3xl` + `grid-cols-2` | Stat value lớn trên 2 cột 360px | 360px | **Medium** |

---

## Đã sửa

### Foundation (F1–F4, F3)
| ID | Trạng thái | Ghi chú |
|----|------------|---------|
| F1 | ✅ Fixed | Thêm `.brand-mark-header` — cho phép wrap brand text dưới `lg`, giữ `nowrap` từ `lg` |
| F2 | ✅ Fixed | `Header` đổi `showTextFrom="lg"` + `context="header"` trên `BrandMark` |
| F3 | ✅ Fixed | `Button` size `sm` → `min-h-11` (44px) |
| F4 | ✅ Fixed | `.pb-mobile-cta` tăng từ `4.5rem` → `5rem` (+ safe-area) |

### Trang chủ (H1–H6)
| ID | Trạng thái | Ghi chú |
|----|------------|---------|
| H1 | ✅ Fixed | Stats hero: `text-xl sm:text-2xl lg:text-3xl` |
| H2 | ✅ Fixed | `TrustStrip` grid `grid-cols-1 sm:grid-cols-2` |
| H3 | ✅ Fixed | Nút đóng modal dùng `touch-target` |
| H5 | ✅ Fixed | CTA CategoryShowcase thêm `min-h-11` |
| H6 | ✅ Fixed | Email `break-all` thay `truncate` |

### Sản phẩm (P1–P3)
| ID | Trạng thái | Ghi chú |
|----|------------|---------|
| P1 | ✅ Fixed | `ProductCatalog` chip filter bọc `.scroll-hint-x` |
| P2 | ✅ Fixed | `ProductContentTabs` tab bar bọc `.scroll-hint-x` |
| P3 | ✅ Fixed | `ImageGallery` thumbnail strip bọc `.scroll-hint-x` |

### Công trình, Tin tức, Hỏi đáp (B1–B4, G1)
| ID | Trạng thái | Ghi chú |
|----|------------|---------|
| B1 | ✅ Fixed | `.prose-content table` thêm `-webkit-overflow-scrolling: touch`, `min-width` cell |
| B2 | ✅ Fixed | Post detail H1: `text-2xl sm:text-3xl lg:text-4xl` |
| B3 | ✅ Fixed | `FaqAccordion` câu hỏi thêm `min-w-0 flex-1` |
| B4 | ✅ Fixed | Link "Xem sản phẩm" thêm `min-h-11` |
| G1 | ✅ Fixed | Giới thiệu stats responsive font size |

### Liên hệ & shared (C1–C7)
| ID | Trạng thái | Ghi chú |
|----|------------|---------|
| C1 | ✅ Fixed | Input email dùng `.form-input` (16px, tránh iOS zoom) |
| C2 | ✅ Fixed | Form wrapper `p-5 sm:p-8` |
| C3 | ✅ Fixed | Grid gap `gap-8 sm:gap-12`, section `py-12 sm:py-16` |
| C4 | ✅ Fixed | Email hiển thị `break-all` |
| C5 | ✅ Fixed | Bỏ `sm:whitespace-nowrap` trên label embedded |
| C6 | ✅ Fixed | Nút phone/zalo `min-h-11` |
| C7 | ✅ Fixed | `CTABanner` padding `px-5 py-10 sm:px-8` |

### Admin (A2–A3)
| ID | Trạng thái | Ghi chú |
|----|------------|---------|
| A2 | ✅ Fixed | Link "Chỉnh sửa" mobile card `min-h-11` (products/posts/projects) |
| A3 | ✅ Fixed | `FaqEditor` nút Xóa `min-h-11` |

### Không sửa / chấp nhận
| ID | Lý do |
|----|-------|
| F8 | Logo header dùng `<img>` có kích thước cố định — không gây CLS đáng kể |
| P4, P5, B5, A1, A4, A5, C8, H4, H7 | Đã responsive đúng từ trước |

### CSS utility mới
- `.scroll-hint-x` — gradient phải gợi ý vuốt ngang (ẩn từ `sm`)
- `.brand-mark-header` — wrap brand text an toàn trên tablet

### Kiểm tra build
- `pnpm lint` — pass (2 warning cũ trong `scripts/scrape-old-site.mjs`, không liên quan)
- `pnpm build` — pass, 44 routes generated

---

## Bổ sung — Fix scroll ngang toàn trang (lần 2)

**Nguyên nhân gốc (page-level horizontal scroll):**

| # | Nguyên nhân | Ảnh hưởng |
|---|-------------|-----------|
| O1 | Flex chip/tab strip thiếu `min-w-0` → flex container nở theo nội dung thay vì scroll nội bộ | `/san-pham`, chi tiết SP |
| O2 | `ProductCatalog` dùng `-mx-4` kéo vùng scroll ra ngoài padding container | `/san-pham` |
| O3 | Bảng markdown `.prose-content table` `display:block` làm table nở parent | Chi tiết SP, tin tức |
| O4 | `html`/`main`/grid thiếu `overflow-x: clip` + `min-w-0` | Toàn site |
| O5 | `whitespace-nowrap` trên nút gọi mobile menu | Header mobile |

**Đã sửa:**

| ID | Trạng thái | Chi tiết |
|----|------------|----------|
| O1 | ✅ | `.scroll-hint-x` + flex con thêm `min-w-0`, `overflow: hidden` trên wrapper |
| O2 | ✅ | Bỏ `-mx-4` ở `ProductCatalog` |
| O3 | ✅ | `MarkdownContent` bọc `<table>` trong `.prose-table-wrap` scroll nội bộ |
| O4 | ✅ | `html`, `body`, `main`, `Container`, `header`, `footer` thêm clip/min-w-0 |
| O5 | ✅ | Bỏ `whitespace-nowrap` nút gọi mobile menu |
| O6 | ✅ | `.prose-content` thêm `overflow-x: clip`, `pre` scroll nội bộ |
| O7 | ✅ | Grid chi tiết SP + trang chủ liên hệ thêm `min-w-0` |

**Lưu ý:** Chip filter, tab SP, thumbnail gallery vẫn **scroll ngang có chủ đích** bên trong vùng của chúng — không còn kéo cả trang scroll ngang.

### Lần 3 — Fix scroll ngang triệt để (theo Playwright @ 360px)

**Kiểm tra tự động:** 9 trang (`/`, `/san-pham`, 2 trang chi tiết SP, `/tin-tuc`, `/lien-he`, `/hoi-dap`, `/gioi-thieu`, `/cong-trinh`) — tất cả `scrollWidth === clientWidth === 360`.

| Thay đổi | Mục đích |
|----------|----------|
| `overflow-x: hidden` trên `html`, `body`, `SiteShell` wrapper, `main`, `header`, `footer`, `Container` | Chặn page-level horizontal scroll |
| `contain: inline-size` trên `.prose-table-wrap`, `.scroll-hint-x` | Bảng markdown / chip strip không nở layout cha |
| `overscroll-behavior-x: contain` trên vùng scroll ngang chủ đích | Vuốt chip/tab không kéo cả trang (iOS scroll chaining) |
| Bọc iframe Maps/Facebook `max-w-full overflow-hidden` | iframe Google Maps hay gây min-width ẩn |
| Grid liên hệ trang chủ: `min-w-0 max-w-full` từng cột | Form/map không tràn 360px |

**Vùng vẫn scroll ngang (cố ý):** chip lọc `/san-pham`, tab nội dung SP, thumbnail gallery, bảng kỹ thuật trong bài — chỉ scroll trong khung riêng.
