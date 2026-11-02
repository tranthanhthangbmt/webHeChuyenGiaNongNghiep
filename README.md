# 🌿 CỔNG HỆ CHUYÊN GIA NÔNG NGHIỆP TÂY NGUYÊN (AGRIEXPERT DSS)

Trang web ứng dụng hỗ trợ quyết định (Decision Support System - DSS) trong nông nghiệp công nghệ cao vùng Tây Nguyên, tích hợp Google Gemini AI và kiến trúc Multi-Agent Antigravity.

---

## 📌 1. Danh Sách 6 Hệ Chuyên Gia Cốt Lõi

1. **☕ Hệ Chuyên Gia Cà Phê Tây Nguyên (COFFEE-MASTER v1)**
   - *Lĩnh vực:* Quản lý dinh dưỡng, điều tiết nước tưới siết hoa & phục hồi cà phê Robusta.
   - *Link Gemini:* [Mở Chat Gemini](https://share.gemini.google/5KFAUIJHMoVf)
2. **🌿 Hệ Chuyên Gia Bảo Vệ Thực Vật Hồ Tiêu (PEPPER-DOCTOR v1)**
   - *Lĩnh vực:* Chẩn đoán bệnh Chết nhanh (Phytophthora), Chết chậm (Tuyến trùng/Fusarium) & phác đồ IPM luân phiên.
3. **🍈 Hệ Chuyên Gia Sầu Riêng (DURIAN-MASTER v1)**
   - *Lĩnh vực:* Xử lý làm bông nghịch vụ (đậy bạt, siết nước), kỹ thuật chặn đọt non khi xả nhụy & chống rụng trái non.
4. **🌱 Hệ Chuyên Gia Cải Tạo Đất Bazan (SOIL-MASTER v1)**
   - *Lĩnh vực:* Hạ chua nâng pH, giải phóng Lân cố định, tái tạo mùn và cấy tổ hợp vi sinh Trichoderma/Bacillus.
5. **🍷 Hệ Chuyên Gia Chế Biến Fine Robusta (BREW-MASTER v1)**
   - *Lĩnh vực:* Lên men yếm khí (Anaerobic), kiểm soát nhiệt độ bồn/Brix/pH, đạt tiêu chuẩn thử nếm SCA/CQI và định giá xuất khẩu.
6. **🐐 Hệ Chuyên Gia Chăn Nuôi Dê Tây Nguyên (GOAT-MASTER v1)**
   - *Lĩnh vực:* Dinh dưỡng giống dê Boer/Bách Thảo, cấp cứu chướng hơi dạ cỏ, điều trị tụ huyết trùng và an toàn chuồng trại.

---

## 🚀 2. Hướng Dẫn Đưa Trang Web Lên GitHub Pages Để Chạy

Trang web được thiết kế 100% tĩnh (HTML5, CSS3, Vanilla JS ES6+), không cần cài đặt Node.js hay build server, tải siêu tốc và hỗ trợ chạy trên cả điện thoại.

### Cách 1: Tự động chạy với Repository hiện tại (`AIAgri_2026`) - KHUYÊN DÙNG ⭐

Đã được tạo sẵn file tự động hóa GitHub Actions tại `.github/workflows/deploy-web.yml`. Bạn chỉ cần:

1. **Commit và Push lên GitHub:**
   Mở terminal tại thư mục gốc và chạy:
   ```bash
   git add .
   git commit -m "Thêm trang web Hệ Chuyên Gia Nông Nghiệp Tây Nguyên và cấu hình GitHub Pages"
   git push origin main
   ```

2. **Kích hoạt GitHub Pages trên GitHub:**
   - Truy cập vào repo của bạn: `https://github.com/tranthanhthangbmt/AIAgri_2026`
   - Vào **Settings** ➔ **Pages** (ở cột menu bên trái).
   - Tại mục **Build and deployment** ➔ **Source**: Chọn **`GitHub Actions`**.
   - Chờ khoảng 1 - 2 phút, GitHub Actions sẽ tự động build và xuất bản trang web tại:
     👉 **`https://tranthanhthangbmt.github.io/AIAgri_2026/`**

---

### Cách 2: Tạo Repository Riêng cho Trang Web (Ví dụ: `he-chuyen-gia-nong-nghiep`)

Nếu bạn muốn trang web có đường link ngắn gọn riêng (ví dụ `https://tranthanhthangbmt.github.io/he-chuyen-gia-nong-nghiep/`):

1. Tạo một repository mới trên GitHub đặt tên là `he-chuyen-gia-nong-nghiep` (chọn Public).
2. Sao chép toàn bộ các file trong thư mục `webHeChuyenGiaNongNghiep` vào repo đó.
3. Push lên branch `main`.
4. Vào **Settings** ➔ **Pages** ➔ **Source**: Chọn **Deploy from a branch** ➔ Branch **`main`** / folder **`/(root)`** ➔ Bấm **Save**.

---

## 📱 3. Hướng Dẫn Cài Đặt Vào Màn Hình Điện Thoại (PWA)

Trang web hỗ trợ chuẩn PWA (Progressive Web App), bạn có thể ghim ra màn hình điện thoại như ứng dụng app thông thường:

### Trên iPhone (Safari):
1. Mở link trang web trên trình duyệt **Safari**.
2. Nhấn vào biểu tượng **Chia sẻ (Share)** (hình vuông có mũi tên đi lên).
3. Chọn **"Thêm vào MH chính" (Add to Home Screen)**.
4. Bấm **Thêm (Add)**. Một biểu tượng app AgriDSS màu xanh lục sẽ xuất hiện trên màn hình điện thoại!

### Trên Android (Google Chrome):
1. Mở link trang web trên trình duyệt **Chrome**.
2. Nhấn vào menu **dấu 3 chấm ⋮** ở góc trên bên phải.
3. Chọn **"Thêm vào màn hình chính"** hoặc **"Cài đặt ứng dụng"**.
4. Xác nhận cài đặt.

---

## 🔗 4. Cách Lấy Share Link Chat Trên Google Gemini Và Dán Vào Web

Để liên kết một chuyên gia trên trang web với Gemini:

1. Mở [Google Gemini](https://gemini.google.com).
2. Tạo cuộc trò chuyện hoặc chọn Custom Gem chuyên gia tương ứng.
3. Bấm nút **Chia sẻ (Share)** ở góc phải cuộc trò chuyện ➔ Chọn **Tạo liên kết chia sẻ (Create public link)** ➔ Bấm **Sao chép liên kết**.
4. Mở trang web này (trên máy tính hoặc điện thoại):
   - Cách A: Nhấn nút **"Đổi link"** trên thẻ của chuyên gia đó ➔ Dán link vào ➔ Bấm **Lưu**.
   - Cách B: Nhấn nút **"Quản lý Link"** trên thanh menu để cập nhật đồng loạt cả 6 chuyên gia.
   - Dữ liệu link sẽ tự động được lưu trên thiết bị của bạn. Bạn cũng có thể bấm **"Tải file linksES.txt"** để lưu về máy tính.

---

## 📂 5. Cấu Trúc Thư Mục Dự Án

```
webHeChuyenGiaNongNghiep/
├── index.html                   # Giao diện chính Responsive & PWA
├── manifest.json                # Cấu hình PWA cho điện thoại
├── sw.js                        # Service Worker hỗ trợ tải nhanh & offline
├── linksES.txt                  # Danh sách lưu trữ Share Link Gemini
├── README.md                    # Hướng dẫn chi tiết
├── css/
│   └── style.css                # Bộ kiểu dáng hiện đại (Dark/Light mode, Mobile-First)
├── js/
│   ├── experts-data.js          # Dữ liệu 6 chuyên gia & cấu hình lưu trữ
│   ├── experts-fulltext.js      # Toàn văn quy trình 5 Cửa Sắt & System Prompt
│   └── app.js                   # Logic điều hướng, tìm kiếm, lọc, modal & quản lý link
├── assets/
│   └── icons/
│       └── icon.svg             # Biểu tượng vector thương hiệu AgriDSS
└── *.md                         # Các hồ sơ kiến thức hệ chuyên gia gốc
```

