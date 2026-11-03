/**
 * Danh mục Tài liệu Tham khảo & Cơ sở Tri thức (Knowledge Base)
 * Nguồn tài liệu cho các Hệ Chuyên Gia Nông Nghiệp Tây Nguyên
 */

const EXPERTS_DOCUMENTS = {
  coffee: {
    expertId: "coffee",
    expertName: "Hệ Chuyên Gia DSS Cà Phê Tây Nguyên",
    level: "COFFEE-MASTER v1",
    icon: "☕",
    themeColor: "#8b5a2b",
    fileName: "taiLieu_coffee.md",
    filePath: "Data/taiLieu_coffee.md",
    totalCount: 31,
    summary: "Hệ thống 31 tài liệu chuyên khảo, giáo trình đại học, quy chuẩn kỹ thuật WASI/VietGAP, tiêu chuẩn UTZ và nghiên cứu khoa học làm nền tảng tri thức cho COFFEE-MASTER v1.",
    categories: [
      {
        id: "cat-1",
        name: "Giáo trình, Sách Chuyên khảo & Sổ tay Hướng dẫn",
        icon: "📖",
        count: 6,
        items: [
          {
            index: 1,
            title: "Giáo trình Sinh lý thực vật",
            author: "Hoàng Thị Kim Hồng",
            type: "Giáo trình đại học",
            desc: "Cơ sở sinh lý dinh dưỡng, quang hợp, hô hấp và quá trình phân hóa mầm hoa cây trồng nhiệt đới."
          },
          {
            index: 2,
            title: "Giáo trình Nông hóa - Thổ nhưỡng",
            author: "Chuyên ngành Nông học",
            type: "Giáo trình chuyên ngành",
            desc: "Tính chất lý - hóa đất đỏ bazan Tây Nguyên, sự chuyển hóa dinh dưỡng N-P-K, Canxi, Magie và vi lượng."
          },
          {
            index: 3,
            title: "Sách chuyên khảo quốc tế: \"Coffee: Growing, Processing, Sustainable Production\"",
            author: "Jean Nicolas Wintgens (Chủ biên) - NXB Wiley-VCH",
            type: "Sách chuyên khảo quốc tế",
            desc: "Tác phẩm kinh điển toàn cầu về kỹ thuật canh tác, chế biến sâu và chuỗi giá trị cà phê bền vững."
          },
          {
            index: 4,
            title: "Sách chuyên khảo quốc tế: \"Coffee: Botany, Biochemistry and Production of Beans and Beverage\"",
            author: "M. N. Clifford & K. C. Willson (Chủ biên)",
            type: "Sách chuyên khảo quốc tế",
            desc: "Sinh hóa học hạt cà phê, biến đổi sinh lý trong quá trình chín và công nghệ sản xuất đồ uống."
          },
          {
            index: 5,
            title: "Sổ tay Hướng dẫn tiếp cận thị trường Châu Âu",
            author: "Tổ chức xúc tiến thương mại nông sản",
            type: "Sổ tay thương mại",
            desc: "Tiêu chuẩn kỹ thuật, dư lượng thuốc BVTV (MRLs), quy định chống phá rừng (EUDR) cho cà phê xuất khẩu."
          },
          {
            index: 6,
            title: "Phương pháp khuyến nông theo định hướng thị trường - Viet-SHEP: Hướng dẫn kỹ thuật cho nông dân (GAP / An toàn thực phẩm)",
            author: "Trung tâm Khuyến nông Quốc gia - NXB Nông nghiệp",
            type: "Sổ tay khuyến nông",
            desc: "Định hướng thị trường, thực hành nông nghiệp tốt GAP và nâng cao năng lực kinh tế nông hộ."
          }
        ]
      },
      {
        id: "cat-2",
        name: "Văn bản Quy định, Quyết định & Quy trình Kỹ thuật Canh tác",
        icon: "📜",
        count: 8,
        items: [
          {
            index: 1,
            title: "Bộ tài liệu Hướng dẫn Sản xuất Cà phê bền vững",
            author: "Bộ Nông nghiệp và PTNT, VCCB & WASI - NXB Nông nghiệp, 2016",
            type: "Quy chuẩn quốc gia",
            desc: "Khung chuẩn canh tác cà phê bền vững cho toàn vùng Tây Nguyên."
          },
          {
            index: 2,
            title: "Bộ tài liệu Hướng dẫn Sản xuất Cà phê bền vững - Hợp phần 1: Canh tác bền vững",
            author: "Ban Điều phối VCCB & Viện WASI, 2016",
            type: "Quy trình kỹ thuật WASI",
            desc: "Kỹ thuật tạo hình, tỉa cành, quản lý cây che bóng và điều tiết nước tưới tiết kiệm."
          },
          {
            index: 3,
            title: "Tài liệu đào tạo (TOT): Kỹ thuật sản xuất cà phê vối bền vững và tái canh cà phê vối",
            author: "Trung tâm Khuyến nông Quốc gia & Ban Quản lý dự án VnSAT, 2018",
            type: "Tài liệu đào tạo VnSAT",
            desc: "Quy chuẩn tái canh cà phê vối, xử lý đất suy thoái và quy trình chọn giống vô tính."
          },
          {
            index: 4,
            title: "Quyết định số 80/QĐ-VNLT (SPQG) ban hành Quy trình kỹ thuật: \"Quy trình trồng xen cà phê vối tăng hiệu quả sản xuất và thích ứng với biến đổi khí hậu\"",
            author: "Viện Khoa học Kỹ thuật Nông Lâm nghiệp Tây Nguyên (WASI), 2020",
            type: "Quyết định kỹ thuật WASI",
            desc: "Quy trình chuẩn trồng xen sầu riêng, bơ, hồ tiêu trong vườn cà phê vối."
          },
          {
            index: 5,
            title: "Quy trình tạm thời canh tác cà phê vối hữu cơ trên địa bàn tỉnh Lâm Đồng",
            author: "Ban hành kèm theo Quyết định số 759/QĐ-SNN của Sở NN&PTNT tỉnh Lâm Đồng",
            type: "Quy định Sở NN&PTNT",
            desc: "Canh tác hữu cơ, kiểm soát phân bón vi sinh và an toàn sinh học."
          },
          {
            index: 6,
            title: "Quyết định Ban hành Quy trình sản xuất cà phê theo Thực hành nông nghiệp tốt (VietGAP)",
            author: "Áp dụng tại vùng trồng HTX Nông nghiệp Du lịch Sơn Tây Thượng (Mã QT-CP-VG-01)",
            type: "Quy chuẩn VietGAP",
            desc: "Quản lý vật tư đầu vào, truy xuất nguồn gốc và vệ sinh an toàn thực phẩm."
          },
          {
            index: 7,
            title: "Tài liệu Hướng dẫn kỹ thuật sản xuất cây ăn quả / cây trồng theo VietGAP vùng nguyên liệu",
            author: "Cục Trồng trọt - Bộ NN&PTNT",
            type: "Hướng dẫn kỹ thuật VietGAP",
            desc: "Bộ chỉ số an toàn thực hành nông nghiệp tốt theo tiêu chuẩn VietGAP vùng nguyên liệu."
          },
          {
            index: 8,
            title: "Tài liệu Hướng dẫn kỹ thuật phòng chống hạn cho cây trồng",
            author: "Cục Trồng trọt & Viện WASI",
            type: "Kỹ thuật ứng phó hạn",
            desc: "Kỹ thuật tưới tiết kiệm, tưới nhỏ giọt và phủ bổi giữ ẩm mùa khô hạn Tây Nguyên."
          }
        ]
      },
      {
        id: "cat-3",
        name: "Bộ Tiêu chuẩn, Chứng nhận & Quy trình Đánh giá",
        icon: "🏅",
        count: 6,
        items: [
          {
            index: 1,
            title: "Bộ Nguyên tắc UTZ CERTIFIED Good Inside",
            author: "UTZ Certified (Phiên bản Tháng 1/2009)",
            type: "Tiêu chuẩn quốc tế",
            desc: "Bộ nguyên tắc trách nhiệm xã hội, bảo vệ môi trường và quản lý trang trại cà phê."
          },
          {
            index: 2,
            title: "Bộ nguyên tắc UTZ - Mô đun Cà phê",
            author: "UTZ Certified (Phiên bản 1.1 - 2015)",
            type: "Tiêu chuẩn UTZ",
            desc: "Tiêu chí bắt buộc và khuyến khích cho nông hộ và nhóm nông hộ sản xuất cà phê."
          },
          {
            index: 3,
            title: "Quy trình đánh giá chứng nhận UTZ",
            author: "Mã quy trình: PM-16-UC, áp dụng từ 01/05/2019",
            type: "Quy trình thẩm định",
            desc: "Phương pháp thanh tra nội bộ, kiểm toán hiện trường và cấp chứng chỉ UTZ/Rainforest."
          },
          {
            index: 4,
            title: "Báo cáo chuyên đề: \"Sản xuất cà phê bền vững có chứng nhận / kiểm tra\"",
            author: "Tác giả: Trịnh Đức Minh",
            type: "Báo cáo chuyên gia",
            desc: "Đánh giá hiệu quả kinh tế và thị trường của cà phê có chứng nhận 4C, UTZ, RFA."
          },
          {
            index: 5,
            title: "Quy trình / Hướng dẫn chứng nhận nông sản an toàn thực phẩm (VietGAP / ATTP)",
            author: "Cơ quan Quản lý Chất lượng Nông sản",
            type: "Hướng dẫn chứng nhận",
            desc: "Hồ sơ lưu trữ canh tác, kiểm nghiệm mẫu đất, mẫu nước và kiểm soát tồn dư hóa chất."
          },
          {
            index: 6,
            title: "Tài liệu dự án: \"Chiến lược chuyển đổi ngành hàng cà phê bền vững (Dự án BRIDGE / SNV / IDH)\"",
            author: "Tổ chức SNV & Quỹ IDH Hà Lan",
            type: "Dự án phát triển quốc tế",
            desc: "Mô hình hợp tác công tư (PPP) trong chuỗi cung ứng cà phê bền vững cảnh quan."
          }
        ]
      },
      {
        id: "cat-4",
        name: "Báo cáo Nghiên cứu Khoa học & Bài báo Chuyên ngành",
        icon: "🔬",
        count: 6,
        items: [
          {
            index: 1,
            title: "Bài báo nghiên cứu: \"Nghiên cứu một số biện pháp kỹ thuật phòng trừ mọt đục quả cà phê chè tại vùng Tây Bắc\"",
            author: "Nguyễn Quang Trung - Tạp chí KH&CN Nông nghiệp Việt Nam",
            type: "Bài báo khoa học",
            desc: "Đặc tính sinh học mọt đục quả và các biện pháp IPM phòng trừ sinh học kết hợp hóa học."
          },
          {
            index: 2,
            title: "Bài báo nghiên cứu: \"Đánh giá hiệu quả kinh tế sản xuất cà phê ứng dụng công nghệ tưới tiết kiệm\"",
            author: "Đề tài ĐTĐL.CN-18/18 - Tạp chí KH&CN Nông nghiệp",
            type: "Đề tài cấp Nhà nước",
            desc: "So sánh định lượng giữa tưới tràn truyền thống và tưới phun mưa gốc, tưới nhỏ giọt que cắm."
          },
          {
            index: 3,
            title: "Báo cáo đề tài: \"Nghiên cứu nguyên nhân chính gây chết cà phê tái canh và đề xuất giải pháp khắc phục\"",
            author: "Bộ Nông nghiệp và PTNT",
            type: "Báo cáo nghiệm thu Bộ",
            desc: "Xác định tuyến trùng Pratylenchus, Meloidogyne và nấm Fusarium trong đất tái canh."
          },
          {
            index: 4,
            title: "Báo cáo khoa học: \"Nghiên cứu biện pháp sinh học và hóa học trong phòng trừ sâu bệnh hại cà phê\"",
            author: "Kỷ yếu Hội nghị khoa học Bảo vệ thực vật",
            type: "Kỷ yếu khoa học",
            desc: "Hiệu lực của nấm đối kháng Trichoderma và các hoạt chất sinh học phòng rỉ sắt, thối nứt thân."
          },
          {
            index: 5,
            title: "Bài báo báo cáo khoa học tại Hội thảo Tây Nguyên 2 (Năm 2017)",
            author: "Hội đồng Khoa học Chương trình Tây Nguyên 2",
            type: "Hội thảo quốc gia",
            desc: "Giải pháp phát triển nông nghiệp công nghệ cao và kinh tế tuần hoàn trong ngành cà phê."
          },
          {
            index: 6,
            title: "Tạp chí Khoa học & Công nghệ Nông nghiệp (Số 6.1.8)",
            author: "Viện Khoa học Nông nghiệp Việt Nam (VAAS)",
            type: "Tạp chí chuyên ngành",
            desc: "Các công bố mới về nông hóa, độ phì đất bazan và sinh lý dinh dưỡng khoáng cây cà phê."
          }
        ]
      },
      {
        id: "cat-5",
        name: "Nghiên cứu Thổ nhưỡng, Địa lý & Hệ sinh thái",
        icon: "🌱",
        count: 5,
        items: [
          {
            index: 1,
            title: "Báo cáo tổng kết công trình xuất bản / nghiên cứu - Phòng Địa lý Thổ nhưỡng và Tài nguyên đất",
            author: "Viện Địa lý / Viện Hàn lâm KH&CN Việt Nam",
            type: "Công trình Viện Hàn lâm",
            desc: "Bản đồ thổ nhưỡng, đặc tính tầng đất đỏ bazan và hiện trạng thoái hóa dinh dưỡng."
          },
          {
            index: 2,
            title: "Báo cáo nghiên cứu: \"Thực trạng sản xuất nông nghiệp trên đất lâm nghiệp\"",
            author: "Viện Điều tra Quy hoạch Rừng",
            type: "Báo cáo điều tra",
            desc: "Phân tích xung đột đất đai, giải pháp nông lâm kết hợp che bóng cho cà phê."
          },
          {
            index: 3,
            title: "Báo cáo đánh giá: \"Thực trạng và tác động của việc sử dụng đất đai đến môi trường và sản xuất nông nghiệp\"",
            author: "Tổng cục Môi trường & Viện Địa lý",
            type: "Báo cáo môi trường",
            desc: "Đánh giá ô nhiễm dư lượng phân vô cơ, xói mòn rửa trôi và giải pháp thảm phủ sinh học."
          },
          {
            index: 4,
            title: "Tài liệu nghiên cứu: \"Tiếp cận địa lý tổng hợp trong xây dựng và phát triển vùng / quản lý không gian\"",
            author: "Viện Địa lý",
            type: "Tài liệu phương pháp luận",
            desc: "Quy hoạch vùng trồng cà phê thích ứng với tiểu khí hậu và tài nguyên nước."
          },
          {
            index: 5,
            title: "Báo cáo nghiên cứu: \"Đánh giá tính tổn thương của hệ sinh thái rừng ở khu vực Tây Nguyên\"",
            author: "Viện Hàn lâm Khoa học và Công nghệ Việt Nam",
            type: "Báo cáo sinh thái",
            desc: "Tác động của suy giảm nguồn nước ngầm đối với an ninh tưới cà phê mùa khô."
          }
        ]
      }
    ],
    rawMarkdown: `### **1. Giáo trình, Sách Chuyên khảo & Sổ tay Hướng dẫn** *(6 tài liệu)*
1. **Giáo trình Sinh lý thực vật** *(Tác giả: Hoàng Thị Kim Hồng)*.
2. **Giáo trình Nông hóa - Thổ nhưỡng**.
3. **Sách chuyên khảo quốc tế:** *"Coffee: Growing, Processing, Sustainable Production"* *(Chủ biên: Jean Nicolas Wintgens, NXB Wiley-VCH)*.
4. **Sách chuyên khảo quốc tế:** *"Coffee: Botany, Biochemistry and Production of Beans and Beverage"* *(Chủ biên: M. N. Clifford & K. C. Willson)*.
5. **Sổ tay Hướng dẫn tiếp cận thị trường Châu Âu** *(Dành cho ngành hàng nông sản / cà phê)*.
6. **Phương pháp khuyến nông theo định hướng thị trường - Viet-SHEP: Hướng dẫn kỹ thuật cho nông dân (GAP / An toàn thực phẩm)** *(Trung tâm Khuyến nông Quốc gia - NXB Nông nghiệp)*.

---

### **2. Văn bản Quy định, Quyết định & Quy trình Kỹ thuật Canh tác** *(8 tài liệu)*
1. **Bộ tài liệu Hướng dẫn Sản xuất Cà phê bền vững** *(Bộ Nông nghiệp và PTNT, Ban Điều phối Ngành hàng Cà phê Việt Nam - VCCB & WASI, NXB Nông nghiệp, 2016)*.
2. **Bộ tài liệu Hướng dẫn Sản xuất Cà phê bền vững - Hợp phần 1: Canh tác bền vững** *(VCCB & WASI, 2016)*.
3. **Tài liệu đào tạo (TOT): Kỹ thuật sản xuất cà phê vối bền vững và tái canh cà phê vối** *(Trung tâm Khuyến nông Quốc gia & Ban Quản lý các dự án Nông nghiệp - Dự án VnSAT, 2018)*.
4. **Quyết định số 80/QĐ-VNLT (SPQG) ban hành Quy trình kỹ thuật:** *"Quy trình trồng xen cà phê vối tăng hiệu quả sản xuất và thích ứng với biến đổi khí hậu"* *(Viện Khoa học Kỹ thuật Nông Lâm nghiệp Tây Nguyên - WASI, 2020)*.
5. **Quy trình tạm thời canh tác cà phê vối hữu cơ trên địa bàn tỉnh Lâm Đồng** *(Ban hành kèm theo Quyết định số 759/QĐ-SNN của Sở NN&PTNT tỉnh Lâm Đồng)*.
6. **Quyết định Ban hành Quy trình sản xuất cà phê theo Thực hành nông nghiệp tốt (VietGAP)** *(Áp dụng tại vùng trồng của Hợp tác xã Nông nghiệp Du lịch Sơn Tây Thượng, Mã QT-CP-VG-01)*.
7. **Tài liệu Hướng dẫn kỹ thuật sản xuất cây ăn quả / cây trồng theo VietGAP vùng nguyên liệu**.
8. **Tài liệu Hướng dẫn kỹ thuật phòng chống hạn cho cây trồng**.

---

### **3. Bộ Tiêu chuẩn, Chứng nhận & Quy trình Đánh giá** *(6 tài liệu)*
1. **Bộ Nguyên tắc UTZ CERTIFIED Good Inside** *(Phiên bản Tháng 1/2009)*.
2. **Bộ nguyên tắc UTZ - Mô đun Cà phê** *(Phiên bản 1.1 - 2015, UTZ Certified)*.
3. **Quy trình đánh giá chứng nhận UTZ** *(Mã quy trình: PM-16-UC, áp dụng từ 01/05/2019)*.
4. **Báo cáo chuyên đề:** *"Sản xuất cà phê bền vững có chứng nhận / kiểm tra"* *(Tác giả: Trịnh Đức Minh)*.
5. **Quy trình / Hướng dẫn chứng nhận nông sản an toàn thực phẩm (VietGAP / ATTP)**.
6. **Tài liệu dự án:** *"Chiến lược chuyển đổi ngành hàng cà phê bền vững (Dự án BRIDGE / SNV / IDH)"*.

---

### **4. Báo cáo Nghiên cứu Khoa học & Bài báo Chuyên ngành** *(6 tài liệu)*
1. **Bài báo nghiên cứu:** *"Nghiên cứu một số biện pháp kỹ thuật phòng trừ mọt đục quả cà phê chè tại vùng Tây Bắc"* *(Tác giả: Nguyễn Quang Trung - Tạp chí KH&CN Nông nghiệp Việt Nam)*.
2. **Bài báo nghiên cứu:** *"Đánh giá hiệu quả kinh tế sản xuất cà phê ứng dụng công nghệ tưới tiết kiệm"* *(Thuộc Đề tài ĐTĐL.CN-18/18, Tạp chí KH&CN Nông nghiệp)*.
3. **Báo cáo đề tài:** *"Nghiên cứu nguyên nhân chính gây chết cà phê tái canh và đề xuất giải pháp khắc phục"* *(Bộ Nông nghiệp và PTNT)*.
4. **Báo cáo khoa học:** *"Nghiên cứu biện pháp sinh học và hóa học trong phòng trừ sâu bệnh hại cà phê"* *(Kỷ yếu Hội nghị khoa học Bảo vệ thực vật)*.
5. **Bài báo báo cáo khoa học tại Hội thảo Tây Nguyên 2 (Năm 2017)**.
6. **Tạp chí Khoa học & Công nghệ Nông nghiệp** *(Số 6.1.8)*.

---

### **5. Nghiên cứu Thổ nhưỡng, Địa lý & Hệ sinh thái** *(5 tài liệu)*
1. **Báo cáo tổng kết công trình xuất bản / nghiên cứu - Phòng Địa lý Thổ nhưỡng và Tài nguyên đất** *(Viện Địa lý / Viện Hàn lâm KH&CN Việt Nam)*.
2. **Báo cáo nghiên cứu:** *"Thực trạng sản xuất nông nghiệp trên đất lâm nghiệp"*.
3. **Báo cáo đánh giá:** *"Thực trạng và tác động của việc sử dụng đất đai đến môi trường và sản xuất nông nghiệp"*.
4. **Tài liệu nghiên cứu:** *"Tiếp cận địa lý tổng hợp trong xây dựng và phát triển vùng / quản lý không gian"*.
5. **Báo cáo nghiên cứu:** *"Đánh giá tính tổn thương của hệ sinh thái rừng ở khu vực Tây Nguyên"*.\n`
  }
};

