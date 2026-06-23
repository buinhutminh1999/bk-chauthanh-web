# UI/UX Audit — Bách Khoa Châu Thành

**Ngày audit:** 23/06/2026  
**Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, design tokens trong `globals.css`

---

## Tổng quan

Website có nền tảng thiết kế khá tốt (brand palette, typography, component structure). Các vấn đề chính tập trung ở: touch target mobile, token màu chưa thống nhất (hex rải rác), admin không responsive, thiếu `prefers-reduced-motion`, filter sản phẩm dài trên mobile, và form/CTA bị che bởi sticky bar.

---

## PHASE 1 — Foundation & Layout Shell

### `globals.css`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Thiếu token `--color-danger`, `--color-success`, `--color-zalo`, `--color-facebook` — hex hardcode trong nhiều component | High | Thêm vào `@theme`, dùng utility `text-danger`, `bg-zalo` |
| Không có `scroll-padding-top` — sticky header che heading khi anchor | Medium | `html { scroll-padding-top: ... }` |
| Animation `.animate-fade-up` không tôn trọng `prefers-reduced-motion` | Medium | `@media (prefers-reduced-motion: reduce)` disable animation |
| Class `.scrollbar-thin` được dùng nhưng chưa định nghĩa | Low | Thêm utility scrollbar |
| `.pb-mobile-cta` 3.5rem có thể hơi chật với StickyMobileCTA + safe area | Medium | Tăng lên ~4.5rem |

### `Header.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Nút menu mobile `p-2` (~32px) dưới ngưỡng 44px | High | `min-h-11 min-w-11`, `focus-visible:ring` |
| Dropdown desktop không đóng bằng Escape | Low | `useEffect` keydown Escape |
| Nav desktop dày trên 1024–1280px | Medium | Giảm padding, `text-[13px]` xl breakpoint |
| Thiếu `aria-expanded` trên nút Sản phẩm | Medium | Thêm ARIA |

### `StickyMobileCTA.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Link thiếu `aria-label` mô tả hành động | Medium | aria-label cho từng CTA |
| `py-3` — vùng chạm ~48px OK nhưng có thể tăng `min-h` | Low | `min-h-[52px]` |

### `Footer.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Cột sales contacts `sm:col-span-2` có thể quá rộng trên tablet | Low | Điều chỉnh grid 768px |
| Email `break-all` gây vỡ từ xấu | Low | `break-words` |

### `Container.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| `wide` và `default` cùng `max-w-7xl` | Low | `2xl:max-w-[90rem]` cho wide |
| Desktop 1536px+ padding có thể rộng hơn | Low | `2xl:px-10` |

### `Button.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Size `sm` `py-1.5` quá nhỏ cho mobile | High | `min-h-10` sm, `min-h-11` md/lg |
| Variant `danger` dùng `red-*` Tailwind default | Medium | Dùng token `danger` |
| Thiếu `active:` state | Low | `active:scale-[0.98]` |

### `BrandMark.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Dùng `<img>` thay vì `next/image` | Low | Giữ img (logo nhỏ, đã có width/height) — OK |
| Text brand có thể tràn trên mobile 360px | Medium | Đã có clamp — kiểm tra stacked layout |

---

## PHASE 2 — Trang chủ

### `page.tsx` (Home)
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Hero có 4 CTA trên mobile (2 button + phone + zalo) — rối | High | Nhóm phone/zalo thành hàng phụ, ưu tiên 2 CTA chính |
| Hex Zalo hardcode | Medium | Token `zalo` |
| Stats 2 cột trên mobile — số lớn có thể wrap | Low | `text-2xl sm:text-3xl` |

### `TrustStrip.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Modal dùng `animate-fade-up` không reduced-motion | Medium | Kế thừa global fix |
| Touch target OK với `p-3` | — | — |

### `CategoryShowcase.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Grid 1 cột mobile — OK | — | Thêm `min-[414px]:grid-cols-2` nếu đủ không gian |
| Title dài có `line-clamp-2` — OK | — | — |

### `MapContactSection` / Home contact block
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Grid 3 cột form trên desktop — form compact hợp lý | — | Mobile stack OK |
| iframe `min-h-[320px]` — OK | — | `aspect-video` wrapper |

### `FacebookSection.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Facebook blue hardcode | Medium | Token `facebook` |
| iframe fixed 400px — OK responsive width | — | — |

---

## PHASE 3 — Sản phẩm

### `ProductCatalog.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Filter chips wrap nhiều dòng trên mobile — chiếm fold | High | Horizontal scroll `snap-x` trên `<md` |
| Chip `py-2` touch ~36px | High | `min-h-11`, `shrink-0` |

### `ProductCard.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Grid chỉ `sm:grid-cols-2` — 414px vẫn 1 cột | Medium | `min-[414px]:grid-cols-2` |
| Aspect 5/4 nhất quán — OK | — | — |

### `san-pham/[slug]/page.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| ProductQuoteBox không sticky trên mobile — CTA dưới fold | High | Thêm mobile CTA bar inline sau gallery |
| Thứ tự mobile: gallery → info → quote — OK | — | — |

### `ImageGallery.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Không hỗ trợ swipe touch | High | Touch handlers prev/next |
| Thumbnail `w-20 h-16` nhỏ cho touch | Medium | `w-24 h-18` mobile |
| Lightbox nút `p-2` nhỏ | Medium | `min-h-11 min-w-11` |

### `ProductContentTabs.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Tab `py-2.5` borderline touch | Medium | `min-h-11` |
| Horizontal scroll OK | — | Định nghĩa `scrollbar-thin` |

### `ProductDocuments.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Link row `p-3` — tăng `min-h-11` | Medium | Padding + icon |

---

## PHASE 4 — Công trình, Tin tức, Hỏi đáp

### `ProjectCard.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Overlay gradient contrast OK | — | — |
| Grid responsive chuẩn | — | `min-[414px]:grid-cols-2` |

### `PostCard.tsx` / `tin-tuc`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Empty state chỉ text — thiếu visual | Medium | EmptyState component |
| Prose tables — `overflow-x: auto` đã có | — | Xác nhận OK |

### `FaqAccordion.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Mở/đóng đột ngột, không animation | Medium | CSS transition max-height/grid |
| Thiếu `aria-expanded`, `id` panel | High | ARIA accordion pattern |
| Button full width — touch OK | — | `min-h-11` |

---

## PHASE 5 — Liên hệ & Form

### `ContactPageClient.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Input `py-2.5` ~40px | High | `min-h-11` form fields |
| Form cuối trang có thể bị StickyMobileCTA che khi scroll submit | Medium | `pb-mobile-cta` đã trên main — OK; thêm margin form bottom |
| Zalo hex hardcode | Medium | Token |

### `QuoteFormCompact.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Error dùng `red-*` | Medium | Token danger |
| Input sizing | High | Shared `form-input` class |

### `SalesContactsList.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Link phone/zalo nhỏ, khó bấm | High | Button-style chips `min-h-10` |
| Zalo hex | Medium | Token |

### `CTABanner.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Lặp trên nhiều trang — acceptable cho conversion | Low | Giữ, đảm bảo responsive padding |

---

## PHASE 6 — Khu Admin

### `admin/layout.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Sidebar cố định 256px — không dùng được trên mobile | Critical | Mobile top nav + drawer |
| Không có padding bottom cho form dài | High | Sticky save bar |

### List pages (`products`, `posts`, `projects`)
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Table overflow ngang trên mobile | Critical | Card list `<md` |
| Status badge `green-100`/`gray-100` hardcode | Medium | Token success |

### Forms (`ProductForm`, `PostForm`, `ProjectForm`, `FaqEditor`)
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Không nhóm section | Medium | `fieldset` + heading sections |
| Save button cuối form — scroll nhiều | High | `AdminFormActions` sticky |
| FaqEditor nút Xóa quá nhỏ | Medium | `min-h-10` destructive |

### `LoginForm.tsx`
| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Layout centered — OK | — | Input `min-h-11`, focus ring |

---

## PHASE 7 — Polish

| Vấn đề | Mức độ | Đề xuất |
|--------|--------|---------|
| Không có shared EmptyState | Medium | Component + dùng list pages |
| Horizontal overflow tiềm ẩn từ wide content | Medium | `overflow-x: clip` trên body optional |
| `PageHeader` không có scroll-margin cho anchor | Low | Kế thừa html scroll-padding |

---

## Đã sửa

### PHASE 1 — Foundation & Layout Shell
- **`globals.css`**: Thêm design tokens (`danger`, `success`, `zalo`, `facebook`), `scroll-padding-top`, `prefers-reduced-motion`, `.scrollbar-thin`, `.form-input`, `.form-error`, `.touch-target`; tăng `.pb-mobile-cta` lên 4.5rem.
- **`Container.tsx`**: Padding `2xl:px-10`, `wide` mở rộng `2xl:max-w-[90rem]`.
- **`Button.tsx`**: `min-h` touch-friendly, variants `zalo`/`accent`, `active:` state, danger dùng token.
- **`Header.tsx`**: Touch target menu 44px, ARIA dropdown/mobile nav, Escape đóng dropdown, nav compact 1024px.
- **`StickyMobileCTA.tsx`**: `min-h-[52px]`, `aria-label` từng CTA.
- **`Footer.tsx`**: `break-words` email, tinh chỉnh grid sales contacts.

### PHASE 2 — Trang chủ
- **Hero**: Nhóm CTA phone/Zalo riêng, dùng token `zalo`; stats responsive `text-2xl→4xl`.
- **`CategoryShowcase`**: Grid `min-[414px]:2 cột`.
- **`FacebookSection`**: Token `facebook`.
- **`MapContactSection`**: iframe `aspect-video` mobile.

### PHASE 3 — Sản phẩm
- **`ProductCatalog`**: Filter horizontal scroll + snap mobile, chip `min-h-11`, ARIA tabs.
- **`ImageGallery`**: Swipe touch, thumbnail lớn hơn, lightbox a11y + touch nav.
- **`ProductContentTabs`**: Tab `min-h-11`, ARIA.
- **`ProductQuoteBox`**: Nổi bật mobile (border accent), token zalo.
- **`ProductDocuments`**: Link `min-h-11`.
- **`RelatedProducts`**: Grid `min-[414px]:2 cột`.

### PHASE 4 — Công trình, Tin tức, Hỏi đáp
- **`FaqAccordion`**: Animation grid-rows, `aria-expanded`/`aria-controls`.
- **`EmptyState`**: Component mới cho danh sách trống.
- **`tin-tuc`**, **`cong-trinh`**, **`san-pham`**: Dùng `EmptyState`, grid responsive.
- **`ProjectCard`**: Grid trang công trình cải thiện.

### PHASE 5 — Liên hệ & Form
- **`QuoteFormCompact`**, **`ContactPageClient`**: Class `.form-input`, `.form-error`, token zalo.
- **`SalesContactsList`**: Nút phone/Zalo dạng chip `min-h-10`.
- **`ContactPageClient`**: `useSearchParams` + `Suspense`, bỏ effect lint error.

### PHASE 6 — Khu Admin
- **`AdminChrome`**: Sidebar desktop + drawer mobile, nav active state.
- **`AdminFormActions`**, **`AdminFormSection`**, **`AdminStatusBadge`**: Form sections + sticky save mobile.
- **Forms** (`ProductForm`, `PostForm`, `ProjectForm`, `FaqEditor`, `LoginForm`): Sections, sticky actions, tokens.
- **List pages**: Card list `<md`, table `≥md`, badge token success.

### PHASE 7 — Polish
- **`layout.tsx`**: `overflow-x-clip` body.
- **Lint/build**: `pnpm lint` (0 errors), `pnpm build` thành công (44 routes).
