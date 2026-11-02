/**
 * Dữ liệu Hệ Chuyên Gia Nông Nghiệp Tây Nguyên (AgriExpert DSS)
 * Cập nhật cấu hình và nội dung quy trình của 6 hệ chuyên gia
 */

const EXPERTS_DATA = [
  {
    id: "coffee",
    order: 1,
    name: "Hệ Chuyên Gia DSS Cà Phê Tây Nguyên",
    level: "COFFEE-MASTER v1",
    role: "Trợ lý Chuyên gia Nông học (WASI)",
    category: "cong-nghiep",
    categoryName: "Cây công nghiệp",
    icon: "☕",
    themeColor: "#8b5a2b",
    gradient: "linear-gradient(135deg, #78350f 0%, #b45309 50%, #d97706 100%)",
    tagline: "Đúng thời điểm - Đúng liều lượng - Tối ưu kinh tế",
    summary: "Quản lý dinh dưỡng, điều tiết nước tưới siết nước làm bông, xử lý phân hóa mầm hoa và chống suy kiệt cà phê Robusta.",
    defaultShareUrl: "https://share.gemini.google/5KFAUIJHMoVf",
    statusText: "Đã kết nối Gemini",
    agents: [
      { name: "Agent 1: Water & Climate", desc: "Đo ứng suất siết nước, thời điểm và lượng tưới phá miên trạng hoa (350-500L/gốc)." },
      { name: "Agent 2: Nutrition Engine", desc: "Kê đơn NPK giai đoạn ra hoa, nuôi trái non, bổ sung Canxi-Bo chống rụng sinh lý." },
      { name: "Agent 3: Agri-Lab Stress Test", desc: "Giả lập mưa trái mùa (hoa chanh/nghẹn hoa), đất chua pH<4.5, gió khô nóng." }
    ],
    protocolSteps: [
      "Bước 1: Trích xuất dữ liệu hiện trạng (Tuổi cây, vùng trồng, pH/EC, cành dự trữ, khí tượng).",
      "Bước 2: Kích hoạt Agent 1 - Điều tiết nước siết hoa & cảnh báo mưa ông bấc.",
      "Bước 3: Kích hoạt Agent 2 - Lên phác đồ dinh dưỡng NPK & vi lượng (Kèm Ra-đa tự tin).",
      "Bước 4: Phòng thí nghiệm rủi ro - Bảng đối kháng thời tiết cực đoan và sốc nhiệt.",
      "Bước 5: Xuất bản quyết định - Lệnh tưới, châm phân và cảnh báo tác động thực địa."
    ],
    quickPrompts: [
      "Cà phê Robusta 8 năm tuổi tại Cư M'gar (Đắk Lắk), vừa thu hoạch xong lá hơi vàng, đất bazan pH 4.8. Xin quy trình siết nước và thời điểm tưới đợt 1.",
      "Đang trong giai đoạn siết nước cà phê thì gặp mưa rào trái mùa khoảng 15mm, nụ hoa mới cương hạt gạo. Cần xử lý tưới đuổi như thế nào?",
      "Cà phê sau khi đậu trái non bị rụng sinh lý nhiều, xin đơn phân bón và vi lượng Canxi - Bo - Kẽm chống rụng."
    ],
    markdownFile: "1. HỆ CHUYÊN GIA DSS CÀ PHÊ TÂY NGUYÊN.md",
    ruleSystem: "ATOMIC EXECUTION (01 bước duy nhất mỗi câu trả lời) | Khóa trạng thái [LOCKED] | Cần từ khóa xác nhận để mở bước tiếp theo."
  },
  {
    id: "pepper",
    order: 2,
    name: "Hệ Chuyên Gia DSS Bảo Vệ Thực Vật Hồ Tiêu",
    level: "PEPPER-DOCTOR v1",
    role: "Trợ lý Chuyên gia BVTV & Dược lý học",
    category: "cong-nghiep",
    categoryName: "Cây công nghiệp",
    icon: "🌿",
    themeColor: "#15803d",
    gradient: "linear-gradient(135deg, #14532d 0%, #15803d 50%, #22c55e 100%)",
    tagline: "Phòng bệnh hơn chữa bệnh - Đúng thuốc, Đúng liều, Chống kháng",
    summary: "Chẩn đoán lâm sàng bệnh Chết nhanh (Phytophthora) & Chết chậm (Tuyến trùng + Fusarium), lên phác đồ IPM và an toàn sinh học.",
    defaultShareUrl: "",
    statusText: "Chờ cấu hình link",
    agents: [
      { name: "Agent 1: Plant Pathology", desc: "Chẩn đoán phân biệt nấm Phytophthora (chết nhanh) và Tuyến trùng Meloidogyne (chết chậm)." },
      { name: "Agent 2: Pharmacology & IPM", desc: "Kê đơn hoạt chất BVTV theo danh mục Bộ NN, thiết lập chu kỳ luân phiên chống kháng." },
      { name: "Agent 3: Red Team Biosecurity", desc: "Cảnh báo sai lầm pha thuốc, cấm kỵ pha đạm/vô cơ khi thối rễ, rãnh cách ly nước bệnh." }
    ],
    protocolSteps: [
      "Bước 1: Trích xuất bệnh án lâm sàng (Lá non/già, rụng đốt, cổ rễ thối ướt, nốt sưng rễ tơ).",
      "Bước 2: Kích hoạt Agent 1 - Chẩn đoán nguyên nhân bệnh lý (Chỉ số tự tin % theo rễ/thân).",
      "Bước 3: Kích hoạt Agent 2 - Kê đơn phác đồ IPM đa điểm (Hoạt chất, liều lượng, luân phiên).",
      "Bước 4: Phòng thí nghiệm rủi ro - Bảng cảnh báo độc tính, tương tác thuốc và rửa trôi.",
      "Bước 5: Xuất bản quyết định - Đơn thuốc BVTV tiêu chuẩn kèm hướng dẫn đào rãnh tiêu hủy."
    ],
    quickPrompts: [
      "Vườn tiêu 500 trụ tại Chư Sê (Gia Lai) có 10 trụ bị rụng đốt ồ ạt, lá héo xanh rụng nhanh trong 5 ngày sau đợt mưa dầm, bới gốc cổ rễ thối đen ướt. Xin chẩn đoán khẩn cấp.",
      "Tiêu có hiện tượng vàng lá từ dưới lên, cây còi cọc chậm lớn, moi rễ tơ thấy nhiều nốt sưng sần sùi. Xin phác đồ trị tuyến trùng và nấm cơ hội.",
      "Vừa tưới thuốc nấm Metalaxyl xong có được tưới nấm Trichoderma luôn không? Khoảng cách thời gian cách ly bao nhiêu ngày?"
    ],
    markdownFile: "2. HỆ CHUYÊN GIA DSS BẢO VỆ THỰC VẬT HỒ TIÊU.md",
    ruleSystem: "ATOMIC EXECUTION (01 bước duy nhất) | Khóa trạng thái [LOCKED] | Gọi đích danh hoạt chất khoa học, không dùng tên dân dã."
  },
  {
    id: "durian",
    order: 3,
    name: "Hệ Chuyên Gia DSS Sầu Riêng",
    level: "DURIAN-MASTER v1",
    role: "Trợ lý Chuyên gia Sinh lý Cây ăn quả nhiệt đới",
    category: "an-trai",
    categoryName: "Cây ăn trái",
    icon: "🍈",
    themeColor: "#b45309",
    gradient: "linear-gradient(135deg, #713f12 0%, #a16207 50%, #eab308 100%)",
    tagline: "Bảo vệ Mắt cua - Quản lý Đọt non - Cân bằng Dinh dưỡng",
    summary: "Xử lý làm bông nghịch vụ (đậy bạt, siết nước), kỹ thuật chặn đọt non khi xả nhụy, chống sốc nhiệt và hạn chế rụng trái non.",
    defaultShareUrl: "",
    statusText: "Chờ cấu hình link",
    agents: [
      { name: "Agent 1: Climate & Water Control", desc: "Tạo khô hạn nhân tạo, tính toán đậy bạt nilon, điều tiết tưới nhấp chống sốc nước." },
      { name: "Agent 2: PGR & Nutrition Engine", desc: "Liều lượng Paclobutrazol, KNO3 phá miên trạng, phác đồ MKP chặn đọt khẩn cấp." },
      { name: "Agent 3: Red Team Stress Test", desc: "Kịch bản mắt cua bị nín, sốc nhiệt rụng bông, mưa đêm lúc xả nhụy làm vỡ hạt phấn." }
    ],
    protocolSteps: [
      "Bước 1: Khám nghiệm sinh lý lâm sàng (Dàn lá cơi mấy, mắt cua, xả nhụy, trái non, lịch sử Paclo).",
      "Bước 2: Kích hoạt Agent 1 - Kiểm soát môi trường: Đậy bạt, siết nước, tưới nhấp giữ ẩm.",
      "Bước 3: Kích hoạt Agent 2 - Điều hòa sinh trưởng: Đơn Paclo, rước mắt cua, kỹ thuật chặn đọt.",
      "Bước 4: Phòng thí nghiệm rủi ro - Đối kháng cháy đọt, nín mắt cua, mưa đêm xả nhụy.",
      "Bước 5: Xuất bản báo cáo kỹ thuật - Lệnh kiểm soát nước và đơn hóa chất chuẩn."
    ],
    quickPrompts: [
      "Sầu riêng Dona 6 năm tuổi cơi đọt 2 đã già lá lụa, thời tiết Tây Nguyên chuẩn bị dứt mưa, xin quy trình đậy bạt và nồng độ phun Paclobutrazol.",
      "Sầu riêng đang xả nhụy rộ thì đọt le non (đi đọt le lói cơi 3), nguy cơ rụng trái non rất cao. Xin phác đồ chặn đọt khẩn cấp không làm cháy lá.",
      "Đêm qua vườn sầu riêng đang nở hoa gặp mưa rào lớn, sáng ra cánh hoa bết dính. Cần phun xịt rửa bông bằng thuốc gì để cứu thụ phấn?"
    ],
    markdownFile: "3. HỆ CHUYÊN GIA DSS SẦU RIÊNG.md",
    ruleSystem: "ATOMIC EXECUTION (01 bước duy nhất) | Khóa trạng thái [LOCKED] | Tuyệt đối không kê đơn Paclobutrazol tùy tiện khi chưa rõ tuổi cây."
  },
  {
    id: "soil",
    order: 4,
    name: "Hệ Chuyên Gia DSS Cải Tạo Đất Bazan",
    level: "SOIL-MASTER v1",
    role: "Trợ lý Chuyên gia Thổ nhưỡng & Vi sinh Nông nghiệp",
    category: "tho-nhuong",
    categoryName: "Thổ nhưỡng & Đất",
    icon: "🌱",
    themeColor: "#854d0e",
    gradient: "linear-gradient(135deg, #451a03 0%, #78350f 50%, #15803d 100%)",
    tagline: "Đất khỏe thì rễ khỏe - Trả lại hệ sinh thái tự nhiên cho đất",
    summary: "Hạ chua nâng pH, giải phóng Lân khó tiêu, tái tạo mùn hữu cơ và cấy tổ hợp nấm đối kháng Trichoderma trên đất đỏ bazan suy thoái.",
    defaultShareUrl: "",
    statusText: "Chờ cấu hình link",
    agents: [
      { name: "Agent 1: Pedology & Chemistry", desc: "Giải mã pH, EC, ngộ độc Nhôm tự do (Al3+), tính toán lượng Vôi nung / Dolomite nâng pH." },
      { name: "Agent 2: Microbial Ecology", desc: "Kê đơn nấm đối kháng Trichoderma, vi khuẩn phân giải lân Bacillus, quy chuẩn phân ủ hoai." },
      { name: "Agent 3: Red Team Timing Test", desc: "Cảnh báo sai lầm rải vôi chung với vi sinh, phơi phân lộ thiên, lạm dụng thuốc diệt cỏ." }
    ],
    protocolSteps: [
      "Bước 1: Trích xuất hồ sơ thổ nhưỡng (pH, EC, độ nén dẽ, rêu xanh, giun đất, lịch sử NPK).",
      "Bước 2: Kích hoạt Agent 1 - Đánh giá Lý - Hóa đất, kê đơn Vôi nâng pH và Humic giải độc.",
      "Bước 3: Kích hoạt Agent 2 - Tái thiết vi sinh: Kê đơn phân chuồng hoai mục + Trichoderma/Bacillus.",
      "Bước 4: Phòng thí nghiệm rủi ro - Rào chắn cấm kỵ trộn Vôi với Vi sinh, nuôi cỏ giữ ẩm.",
      "Bước 5: Xuất bản lộ trình tái thiết - Bảng phân kỳ 30 ngày (Ngày 1: Vôi -> Ngày 10: Humic -> Ngày 20: Vi sinh)."
    ],
    quickPrompts: [
      "Đất rẫy bazan trồng tiêu nhiều năm đo pH chỉ còn 4.1, mặt đất đóng váng cứng, mọc rêu xanh, tưới nước khó thấm. Xin lộ trình cải tạo.",
      "Tôi có sẵn 5 khối phân bò và 3 tấn vỏ cà phê tươi tại vườn, xin công thức phối trộn men vi sinh và quy trình ủ hoai yếm khí đạt nhiệt độ 60°C.",
      "Sau khi rải vôi nông nghiệp nâng pH thì bao nhiêu ngày sau mới được tưới phân Humic và nấm Trichoderma?"
    ],
    markdownFile: "4. HỆ CHUYÊN GIA DSS CẢI TẠO ĐẤT BAZAN.md",
    ruleSystem: "ATOMIC EXECUTION (01 bước duy nhất) | Khóa trạng thái [LOCKED] | Tuyệt đối không kê đơn NPK hóa học khi đất chưa hồi phục sinh lý."
  },
  {
    id: "fine-robusta",
    order: 5,
    name: "Hệ Chuyên Gia DSS Chế Biến Fine Robusta",
    level: "BREW-MASTER v1",
    role: "Chuyên gia Công nghệ Thực phẩm & Q-Grader",
    category: "che-bien",
    categoryName: "Chế biến sâu",
    icon: "🍷",
    themeColor: "#991b1b",
    gradient: "linear-gradient(135deg, #701a75 0%, #991b1b 50%, #b91c1c 100%)",
    tagline: "Lên men có kiểm soát - Tôn vinh hương vị bản địa - Tối ưu giá trị thương mại",
    summary: "Quy chuẩn lên men Yếm khí (Anaerobic) & Honey, kiểm soát độ Brix/pH/nhiệt độ, đạt chuẩn Cupping SCA và định giá thương mại cao cấp.",
    defaultShareUrl: "",
    statusText: "Chờ cấu hình link",
    agents: [
      { name: "Agent 1: Fermentation Biochemist", desc: "Thiết lập profile ủ yếm khí/hiếu khí, điểm chốt pH 3.8-4.2, kỹ thuật phơi giàn lưới châu Phi." },
      { name: "Agent 2: Cupping & Market Valuator", desc: "Dự phóng hương vị (Winey, Jackfruit), hồ sơ rang Medium, định vị giá Premium so sàn London." },
      { name: "Agent 3: Red Team Defect Defense", desc: "Ngăn chặn lỗi Over-fermented (chua giấm), mốc Phenolic, Case-hardening khi sấy phơi." }
    ],
    protocolSteps: [
      "Bước 1: Trích xuất dữ liệu nguyên liệu (Tỷ lệ chín >95%, độ ngọt Brix >18, phương pháp ủ).",
      "Bước 2: Kích hoạt Agent 1 - Thiết lập ngưỡng lên men: Thời gian (48-72h), nhiệt độ bồn <35°C, điểm dừng pH 4.0.",
      "Bước 3: Kích hoạt Agent 2 - Dự phóng hương vị Cupping notes, khuyến nghị mức rang và định giá thị trường.",
      "Bước 4: Phòng thí nghiệm rủi ro - Cảnh báo lỗi SCA nghiêm trọng và phương án cấp cứu mẻ ủ.",
      "Bước 5: Xuất bản hồ sơ chế biến - Hộ chiếu lô cà phê Fine Robusta (Batch ID Profile)."
    ],
    quickPrompts: [
      "Mẻ cà phê Robusta hái chín 98%, đo Brix 21. Tôi muốn làm Anaerobic Natural (ủ yếm khí nguyên trái). Xin thông số nhiệt độ bồn và thời điểm dừng ủ.",
      "Bồn ủ yếm khí sau 36 giờ kiểm tra thấy nhiệt độ tăng lên 38°C, mùi chua nồng như giấm. Xin phương án xử lý cấp cứu khẩn cấp.",
      "Cà phê Fine Robusta phơi giàn lưới bao nhiêu ngày thì đạt độ ẩm 11-12% và thời gian nghỉ (resting) trong bao lâu trước khi rang thương mại?"
    ],
    markdownFile: "5. HỆ CHUYÊN GIA DSS CHẾ BIẾN FINE ROBUSTA.md",
    ruleSystem: "ATOMIC EXECUTION (01 bước duy nhất) | Khóa trạng thái [LOCKED] | Dùng thuật ngữ tiêu chuẩn SCA/CQI, không dùng từ dân dã."
  },
  {
    id: "goat",
    order: 6,
    name: "Hệ Chuyên Gia DSS Chăn Nuôi Dê Tây Nguyên",
    level: "GOAT-MASTER v1",
    role: "Trợ lý Chuyên gia Chăn nuôi Thú y (Caprine)",
    category: "chan-nuoi",
    categoryName: "Chăn nuôi thú y",
    icon: "🐐",
    themeColor: "#c2410c",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)",
    tagline: "Vệ sinh sạch - Dinh dưỡng đủ - Phòng bệnh định kỳ",
    summary: "Dinh dưỡng & khẩu phần thức ăn thô xanh/tinh cho giống Boer, Bách Thảo; xử lý cấp cứu chướng hơi dạ cỏ, viêm ruột hoại tử, tụ huyết trùng.",
    defaultShareUrl: "",
    statusText: "Chờ cấu hình link",
    agents: [
      { name: "Agent 1: Veterinary Pathology", desc: "Chẩn đoán lâm sàng phân biệt chướng hơi dạ cỏ, tụ huyết trùng sốt cao, cầu trùng dê con." },
      { name: "Agent 2: Pharmacology & Nutrition", desc: "Phác đồ cấp cứu chướng hơi, kê đơn kháng sinh điều trị, điều chỉnh tỷ lệ thô/tinh và FCR." },
      { name: "Agent 3: Red Team Safety Test", desc: "Cảnh báo tư thế dốc thuốc chống sặc vào phổi, kiêng tiêm Ivermectin cho dê đang mang thai." }
    ],
    protocolSteps: [
      "Bước 1: Trích xuất bệnh án lâm sàng (Thân nhiệt, đặc điểm phân, nhịp thở hô hấp, khẩu phần ăn).",
      "Bước 2: Kích hoạt Agent 1 - Chẩn đoán nguyên nhân bệnh lý (Tiêu hóa, Hô hấp, Ký sinh trùng).",
      "Bước 3: Kích hoạt Agent 2 - Kê đơn thuốc thú y & phác đồ dinh dưỡng phục hồi nhu động ruột.",
      "Bước 4: Phòng thí nghiệm rủi ro - Bảng cảnh báo rủi ro thao tác tiêm, cho uống và cỏ ướt mưa.",
      "Bước 5: Xuất bản quyết định - Đơn thuốc thú y chi tiết (hoạt chất, liều tiêm, cách dùng, men vi sinh)."
    ],
    quickPrompts: [
      "Dê Boer 5 tháng tuổi bụng bên trái căng phồng như quả bóng, thở dốc, đứng ngồi không yên sau khi ăn cỏ non dính mưa. Xin hướng dẫn cấp cứu khẩn cấp.",
      "Đàn dê có vài con sốt cao 40.5°C, chảy nước mũi đặc, thở khò khè, bỏ ăn khi Tây Nguyên vào mùa mưa lạnh. Xin chẩn đoán và đơn kháng sinh.",
      "Công thức phối trộn khẩu phần thức ăn vỗ béo cho dê thịt giữa cỏ Voi, cỏ Ghine và cám ngô/đậm đặc để đạt tăng trọng tối ưu."
    ],
    markdownFile: "6. HỆ CHUYÊN GIA DSS CHĂN NUÔI DÊ TÂY NGUYÊN.md",
    ruleSystem: "ATOMIC EXECUTION (01 bước duy nhất) | Khóa trạng thái [LOCKED] | Bắt buộc kiểm tra thân nhiệt và tình trạng mang thai trước khi kê đơn."
  }
];

// Hàm nạp dữ liệu với cấu hình lưu trong LocalStorage (cho phép người dùng tùy biến link)
function getExperts() {
  const savedLinks = getSavedLinks();
  return EXPERTS_DATA.map(exp => {
    const customUrl = savedLinks[exp.id];
    const activeUrl = customUrl !== undefined ? customUrl : exp.defaultShareUrl;
    return {
      ...exp,
      shareUrl: activeUrl,
      hasLink: !!(activeUrl && activeUrl.trim().length > 0 && activeUrl.startsWith("http"))
    };
  });
}

// Lấy danh sách link từ LocalStorage
function getSavedLinks() {
  try {
    const raw = localStorage.getItem("agri_expert_links");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Lỗi khi đọc link từ localStorage:", e);
  }
  return {};
}

// Lưu một link cho một chuyên gia
function saveExpertLink(expertId, url) {
  try {
    const current = getSavedLinks();
    current[expertId] = url ? url.trim() : "";
    localStorage.setItem("agri_expert_links", JSON.stringify(current));
    return true;
  } catch (e) {
    console.error("Lỗi lưu link:", e);
    return false;
  }
}

// Lưu tất cả links
function saveAllLinks(linksMap) {
  try {
    localStorage.setItem("agri_expert_links", JSON.stringify(linksMap));
    return true;
  } catch (e) {
    console.error("Lỗi lưu tất cả link:", e);
    return false;
  }
}

// Khôi phục mặc định
function resetLinksToDefault() {
  try {
    localStorage.removeItem("agri_expert_links");
    return true;
  } catch (e) {
    return false;
  }
}

