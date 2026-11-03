/**
 * Logic Ứng Dụng AgriExpert DSS - Quản lý Hệ Chuyên Gia Nông Nghiệp
 */

// Trạng thái ứng dụng
const AppState = {
  experts: [],
  currentCategory: "all",
  searchKeyword: "",
  activeExpertModal: null,
  activeDocExpert: null,
  docCategory: "all",
  docKeyword: "",
  theme: localStorage.getItem("agri_theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
};

// Khởi tạo khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadData();
  setupEventListeners();
  registerServiceWorker();
  updateStats();
});

// 1. Quản lý Theme (Sáng/Tối)
function initTheme() {
  document.documentElement.setAttribute("data-theme", AppState.theme);
  updateThemeIcon();
}

function toggleTheme() {
  AppState.theme = AppState.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", AppState.theme);
  localStorage.setItem("agri_theme", AppState.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const iconWrap = document.getElementById("themeIconWrap");
  if (!iconWrap) return;
  if (AppState.theme === "dark") {
    iconWrap.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>`;
  } else {
    iconWrap.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>`;
  }
}

// 2. Nạp dữ liệu
function loadData() {
  AppState.experts = getExperts();
  renderCards();
  updateStats();
}

// 3. Cập nhật số liệu thống kê
function updateStats() {
  const totalEl = document.getElementById("totalExpertsCount");
  const linkedEl = document.getElementById("linkedExpertsCount");
  if (totalEl) totalEl.textContent = AppState.experts.length;
  if (linkedEl) {
    const linkedCount = AppState.experts.filter(e => e.hasLink).length;
    linkedEl.textContent = linkedCount;
  }
}

// 4. Render danh sách thẻ
function renderCards() {
  const container = document.getElementById("cardsContainer");
  const emptyState = document.getElementById("emptyState");
  if (!container) return;

  // Lọc theo danh mục và từ khóa
  const filtered = AppState.experts.filter(item => {
    const matchCat = AppState.currentCategory === "all" || item.category === AppState.currentCategory;
    const kw = removeVietnameseTones(AppState.searchKeyword.toLowerCase().trim());
    if (!kw) return matchCat;

    const targetStr = removeVietnameseTones(
      `${item.name} ${item.level} ${item.role} ${item.tagline} ${item.summary} ${item.categoryName} ${item.agents.map(a => a.name + " " + a.desc).join(" ")}`.toLowerCase()
    );
    return matchCat && targetStr.includes(kw);
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  container.innerHTML = filtered.map(expert => {
    const isLinked = expert.hasLink;
    const statusClass = isLinked ? "connected" : "missing";
    const statusLabel = isLinked ? "Đã liên kết Gemini" : "Chưa có Share Link";

    return `
      <div class="expert-card" data-id="${expert.id}">
        <!-- Header Banner -->
        <div class="card-banner" style="background: ${expert.gradient}; cursor: pointer;" onclick="handleCardBannerClick('${expert.id}')" title="Bấm để xem chi tiết / tài liệu chuyên gia">
          <div class="card-banner-pattern"></div>
          <div class="card-banner-content">
            <div class="expert-icon-wrap">
              <span>${expert.icon}</span>
            </div>
            <div class="expert-meta">
              <span class="expert-level">${expert.level}</span>
              <div class="expert-role">${expert.role}</div>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="card-body">
          <h3 class="expert-title" style="cursor: pointer;" onclick="handleCardBannerClick('${expert.id}')">${expert.name}</h3>
          <div class="expert-tagline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>${expert.tagline}</span>
          </div>
          <p class="expert-summary">${expert.summary}</p>

          <!-- Vệ tinh Agents -->
          <div class="agent-chips">
            ${expert.agents.map(agent => `
              <div class="agent-chip-item">
                <span class="agent-chip-dot"></span>
                <span class="agent-chip-name">${agent.name}:</span>
                <span>${agent.desc.substring(0, 52)}...</span>
              </div>
            `).join("")}
          </div>

          <!-- Trạng thái Link -->
          <div class="link-status-badge ${statusClass}">
            <div style="display:flex; align-items:center;">
              <span class="link-status-dot"></span>
              <span>${statusLabel}</span>
            </div>
            <span style="font-size: 0.72rem; opacity: 0.85;">${isLinked ? 'Gemini Share' : 'Cần thêm link'}</span>
          </div>

          ${expert.hasDocuments ? `
            <!-- Pill tài liệu nguồn của chuyên gia -->
            <div class="card-doc-pill" onclick="openDocumentsModal('${expert.id}')" title="Xem danh mục ${expert.documentsCount || 31} tài liệu chuyên khảo & quy chuẩn làm nền tảng tri thức">
              <span class="doc-pill-icon">📚</span>
              <span class="doc-pill-text"><strong>${expert.documentsCount || 31} Tài liệu nguồn:</strong> Giáo trình, WASI, VietGAP, UTZ</span>
              <span class="doc-pill-action">Xem ➔</span>
            </div>
          ` : ''}

          <!-- Quick Prompts (Mẫu câu hỏi) -->
          <div class="card-quick-prompts">
            <button class="quick-prompts-toggle" onclick="toggleQuickPrompts('${expert.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Xem câu hỏi mẫu thực tế (${expert.quickPrompts.length})</span>
            </button>
            <div class="quick-prompts-list" id="quick-prompts-${expert.id}">
              ${expert.quickPrompts.map((q, idx) => `
                <button class="quick-prompt-btn" onclick="handleQuickPromptClick('${expert.id}', ${idx})">
                  <span style="font-weight:700; color:var(--primary); font-size:0.75rem;">Q${idx+1}:</span>
                  <span>${q}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="card-actions">
          <button class="btn-gemini-chat ${isLinked ? 'ai-style' : ''}" onclick="handleOpenGemini('${expert.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10-1.82 0-3.53-.484-5-1.332L2 22l1.332-5C2.484 15.53 2 13.82 2 12a10 10 0 0 1 10-10zm0 2a8 8 0 0 0-8 8c0 1.54.436 2.98 1.196 4.208l-.517 1.942 1.942-.517A7.96 7.96 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8zm-1 4h2v2h-2V8zm0 4h2v6h-2v-6z"/>
            </svg>
            <span>${isLinked ? 'Mở Trò Chuyện Gemini' : 'Cài Đặt Link & Mở'}</span>
          </button>

          <div class="card-sub-actions">
            <button class="btn-outline" onclick="openDetailModal('${expert.id}')" title="Xem 5 Bước quy trình & System Prompt">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>Quy trình</span>
            </button>

            ${expert.hasDocuments ? `
              <button class="btn-outline btn-doc-action" onclick="openDocumentsModal('${expert.id}')" title="Xem ${expert.documentsCount || 31} tài liệu cơ sở tri thức">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <span>Tài liệu (${expert.documentsCount || 31})</span>
              </button>
            ` : ''}

            <button class="btn-outline btn-link-edit" onclick="openSingleEditModal('${expert.id}')" title="Cập nhật link Gemini">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span>Đổi link</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// 5. Xử lý mở Gemini Chat
function handleOpenGemini(expertId) {
  const expert = AppState.experts.find(e => e.id === expertId);
  if (!expert) return;

  if (expert.hasLink) {
    // Đã có link -> mở trực tiếp
    window.open(expert.shareUrl, "_blank");
  } else {
    // Chưa có link -> Mở modal cài đặt link
    openSingleEditModal(expertId, true);
  }
}

// Toggle ẩn hiện câu hỏi mẫu trên từng thẻ
function toggleQuickPrompts(expertId) {
  const el = document.getElementById(`quick-prompts-${expertId}`);
  if (el) {
    el.classList.toggle("open");
  }
}

// Xử lý khi bấm vào câu hỏi mẫu
function handleQuickPromptClick(expertId, promptIdx) {
  const expert = AppState.experts.find(e => e.id === expertId);
  if (!expert) return;
  const promptText = expert.quickPrompts[promptIdx];

  navigator.clipboard.writeText(promptText).then(() => {
    showToast(`Đã sao chép câu hỏi Q${promptIdx + 1}!`);
    if (expert.hasLink) {
      setTimeout(() => {
        if (confirm(`Đã sao chép câu hỏi vào bộ nhớ tạm!\n\nBạn có muốn mở ngay Gemini của "${expert.name}" để dán câu hỏi không?`)) {
          window.open(expert.shareUrl, "_blank");
        }
      }, 300);
    }
  }).catch(() => {
    prompt("Sao chép câu hỏi:", promptText);
  });
}

// 6. Xử lý Modal Chi Tiết Quy Trình & Prompt
function openDetailModal(expertId) {
  const expert = AppState.experts.find(e => e.id === expertId);
  if (!expert) return;

  AppState.activeExpertModal = expertId;
  const titleEl = document.getElementById("detailModalTitle");
  const contentEl = document.getElementById("detailModalContent");
  const fullText = (typeof EXPERTS_FULLTEXT !== "undefined" && EXPERTS_FULLTEXT[expertId]) || "";

  if (titleEl) {
    titleEl.innerHTML = `<span>${expert.icon}</span> <span>${expert.name}</span>`;
  }

  if (contentEl) {
    contentEl.innerHTML = `
      <div style="background:var(--bg-secondary); padding:12px 16px; border-radius:var(--radius-md); border-left:4px solid var(--primary); margin-bottom:14px;">
        <div style="font-weight:700; color:var(--text-primary); font-size:0.9rem;">${expert.level} • ${expert.role}</div>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">${expert.tagline}</div>
        <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px;"><strong>Luật hệ thống:</strong> ${expert.ruleSystem}</div>
      </div>

      ${expert.hasDocuments ? `
        <!-- Banner liên kết sang tủ tài liệu -->
        <div class="kb-banner" onclick="openDocumentsModal('${expert.id}')" title="Bấm để xem toàn bộ danh mục tài liệu">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:1.5rem;">📚</span>
            <div>
              <div style="font-weight:750; font-size:0.88rem; color:var(--text-primary);">Cơ Sở Tri Thức: ${expert.documentsCount || 31} tài liệu & quy chuẩn</div>
              <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">Giáo trình ĐH, WASI, VietGAP, tiêu chuẩn UTZ, nghiên cứu thổ nhưỡng...</div>
            </div>
          </div>
          <button class="btn-outline" style="font-size:0.75rem; padding:4px 10px; pointer-events:none;">
            <span>Xem 31 tài liệu ➔</span>
          </button>
        </div>
      ` : ''}

      <div style="margin-bottom:14px;">
        <h4 style="font-size:0.9rem; font-weight:750; margin-bottom:8px; color:var(--text-primary);">Quy trình 5 Cửa Sắt (5-Step Protocol):</h4>
        <ul style="padding-left:18px; font-size:0.82rem; line-height:1.6; color:var(--text-secondary);">
          ${expert.protocolSteps.map(step => `<li style="margin-bottom:4px;">${step}</li>`).join("")}
        </ul>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h4 style="font-size:0.9rem; font-weight:750; color:var(--text-primary);">Toàn văn Gem Instruction / System Prompt:</h4>
        <button class="btn-outline" style="padding:4px 10px; font-size:0.75rem;" onclick="copyFullInstruction('${expertId}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Sao chép Prompt</span>
        </button>
      </div>

      <div class="prompt-box">
        <pre class="prompt-content">${escapeHtml(fullText)}</pre>
      </div>
    `;
  }

  const footerEl = document.querySelector("#detailModal .modal-footer");
  if (footerEl) {
    footerEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; width:100%; flex-wrap:wrap; gap:8px;">
        <div>
          ${expert.hasDocuments ? `
            <button class="btn-outline btn-doc-action" onclick="openDocumentsModal('${expertId}')">
              <span>📚 Xem ${expert.documentsCount || 31} Tài Liệu Tham Khảo</span>
            </button>
          ` : ''}
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn-outline" onclick="hideModal('detailModal')">Đóng</button>
          <button class="btn-header primary" onclick="handleOpenGemini('${expertId}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10-1.82 0-3.53-.484-5-1.332L2 22l1.332-5C2.484 15.53 2 13.82 2 12a10 10 0 0 1 10-10zm0 2a8 8 0 0 0-8 8c0 1.54.436 2.98 1.196 4.208l-.517 1.942 1.942-.517A7.96 7.96 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8zm-1 4h2v2h-2V8zm0 4h2v6h-2v-6z"/>
            </svg>
            <span>Mở Trò Chuyện Gemini</span>
          </button>
        </div>
      </div>
    `;
  }

  showModal("detailModal");
}

function copyFullInstruction(expertId) {
  const fullText = (typeof EXPERTS_FULLTEXT !== "undefined" && EXPERTS_FULLTEXT[expertId]) || "";
  if (!fullText) return;

  navigator.clipboard.writeText(fullText).then(() => {
    showToast("Đã sao chép toàn bộ System Prompt vào bộ nhớ tạm!");
  }).catch(() => {
    showToast("Vui lòng bôi đen và sao chép thủ công.");
  });
}

// 7. Modal Đổi link cho 1 chuyên gia (hoặc khi bấm mở mà chưa có link)
function openSingleEditModal(expertId, autoOpenAfterSave = false) {
  const expert = AppState.experts.find(e => e.id === expertId);
  if (!expert) return;

  const titleEl = document.getElementById("singleEditModalTitle");
  const inputEl = document.getElementById("singleEditInput");
  const descEl = document.getElementById("singleEditDesc");
  const expertIdHidden = document.getElementById("singleEditExpertId");
  const autoOpenHidden = document.getElementById("singleEditAutoOpen");

  if (titleEl) {
    titleEl.innerHTML = `<span>${expert.icon}</span> <span>Cấu hình Link: ${expert.name}</span>`;
  }
  if (descEl) {
    descEl.textContent = `Dán đường link Share Chat từ Google Gemini của chuyên gia này (VD: https://share.gemini.google/xxx).`;
  }
  if (inputEl) {
    inputEl.value = expert.shareUrl || "";
    inputEl.placeholder = "https://share.gemini.google/...";
  }
  if (expertIdHidden) expertIdHidden.value = expertId;
  if (autoOpenHidden) autoOpenHidden.value = autoOpenAfterSave ? "1" : "0";

  showModal("singleEditModal");
  setTimeout(() => { if (inputEl) inputEl.focus(); }, 150);
}

function saveSingleEdit() {
  const expertIdHidden = document.getElementById("singleEditExpertId");
  const inputEl = document.getElementById("singleEditInput");
  const autoOpenHidden = document.getElementById("singleEditAutoOpen");

  if (!expertIdHidden || !inputEl) return;
  const expertId = expertIdHidden.value;
  const url = inputEl.value.trim();
  const autoOpen = autoOpenHidden && autoOpenHidden.value === "1";

  if (url && !url.startsWith("http")) {
    alert("Đường dẫn phải bắt đầu bằng http:// hoặc https://");
    return;
  }

  saveExpertLink(expertId, url);
  loadData();
  hideModal("singleEditModal");
  showToast("Đã lưu liên kết thành công!");

  if (autoOpen && url) {
    setTimeout(() => {
      window.open(url, "_blank");
    }, 200);
  }
}

// 8. Modal Quản Lý Tất Cả Link Tập Trung
function openAllLinksModal() {
  const listContainer = document.getElementById("allLinksList");
  if (!listContainer) return;

  listContainer.innerHTML = AppState.experts.map(expert => {
    return `
      <div class="link-manager-item">
        <div class="link-item-header">
          <div class="link-item-title">
            <span>${expert.icon}</span>
            <span>${expert.name}</span>
          </div>
          <span class="expert-level" style="font-size:0.68rem;">${expert.level}</span>
        </div>
        <div class="link-item-input-wrap">
          <input type="url" 
                 class="form-input all-link-input" 
                 data-expert-id="${expert.id}" 
                 value="${expert.shareUrl || ''}" 
                 placeholder="https://share.gemini.google/..." />
          ${expert.hasLink ? `
            <a href="${expert.shareUrl}" target="_blank" class="btn-outline" style="padding:0 10px;" title="Mở thử link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join("");

  showModal("allLinksModal");
}

function saveAllLinksFromModal() {
  const inputs = document.querySelectorAll(".all-link-input");
  const linksMap = {};
  inputs.forEach(input => {
    const id = input.getAttribute("data-expert-id");
    const val = input.value.trim();
    if (id) {
      linksMap[id] = val;
    }
  });

  saveAllLinks(linksMap);
  loadData();
  hideModal("allLinksModal");
  showToast("Đã cập nhật toàn bộ danh sách liên kết!");
}

// 9. Xuất file linksES.txt mới
function downloadLinksFile() {
  const lines = [
    "# ========================================================",
    "# DANH SÁCH SHARE LINK GEMINI CÁC HỆ CHUYÊN GIA NÔNG NGHIỆP",
    `# Xuất lúc: ${new Date().toLocaleString("vi-VN")}`,
    "# ========================================================\n"
  ];

  AppState.experts.forEach((exp, idx) => {
    lines.push(`${idx + 1}) Chuyên gia ${exp.name.replace("Hệ Chuyên Gia DSS ", "")} (${exp.level})`);
    lines.push(exp.shareUrl ? exp.shareUrl : "[Chưa cập nhật link]");
    lines.push("");
  });

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "linksES.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Đã tải xuống file linksES.txt!");
}

// 10. Khôi phục mặc định
function handleResetDefaults() {
  if (confirm("Bạn có chắc chắn muốn khôi phục danh sách link về mặc định ban đầu không?")) {
    resetLinksToDefault();
    loadData();
    hideModal("allLinksModal");
    showToast("Đã khôi phục cài đặt link mặc định.");
  }
}

// 11. Modal PWA Hướng dẫn cài đặt
function openPwaGuideModal() {
  showModal("pwaModal");
}

// 12. Helper Modal
function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function hideModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// 13. Toast Notification
function showToast(message) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 2800);
}

// 14. Thiết lập sự kiện
function setupEventListeners() {
  // Tìm kiếm
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchKeyword = e.target.value;
      if (clearBtn) {
        if (e.target.value.length > 0) {
          clearBtn.classList.add("visible");
        } else {
          clearBtn.classList.remove("visible");
        }
      }
      renderCards();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      AppState.searchKeyword = "";
      clearBtn.classList.remove("visible");
      renderCards();
      searchInput.focus();
    });
  }

  // Tabs danh mục
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.currentCategory = btn.getAttribute("data-category") || "all";
      renderCards();
    });
  });

  // Đóng modal khi bấm vào nền overlay
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        hideModal(overlay.id);
      }
    });
  });

  // Bấm Escape để đóng modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.active").forEach(m => hideModal(m.id));
    }
  });
}

// Helper: Bỏ dấu tiếng Việt phục vụ tìm kiếm thông minh
function removeVietnameseTones(str) {
  if (!str) return "";
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  return str;
}

// Helper: Escape HTML
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJs(str) {
  if (!str) return "";
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

// 15. Xử lý khi nhấn vào Banner hoặc Tiêu đề Chuyên gia
function handleCardBannerClick(expertId) {
  const expert = AppState.experts.find(e => e.id === expertId);
  if (expert && expert.hasDocuments) {
    openDocumentsModal(expertId);
  } else {
    openDetailModal(expertId);
  }
}

// 16. Quản lý Modal Danh Mục Tài Liệu (Knowledge Base)
function openDocumentsModal(expertId, initialCategory = "all") {
  const expert = AppState.experts.find(e => e.id === expertId);
  const docData = typeof EXPERTS_DOCUMENTS !== "undefined" && EXPERTS_DOCUMENTS[expertId];
  if (!docData) {
    showToast("Chưa có danh mục tài liệu cho chuyên gia này.");
    return;
  }

  AppState.activeDocExpert = expertId;
  AppState.docCategory = initialCategory;
  AppState.docKeyword = "";

  const titleEl = document.getElementById("documentsModalTitle");
  if (titleEl) {
    titleEl.innerHTML = `<span>${docData.icon}</span> <span>Cơ Sở Tri Thức: ${expert ? expert.name : docData.expertName}</span>`;
  }

  renderDocumentsModalContent();
  showModal("documentsModal");
}

function renderDocumentsModalContent() {
  const expertId = AppState.activeDocExpert;
  const expert = AppState.experts.find(e => e.id === expertId);
  const docData = typeof EXPERTS_DOCUMENTS !== "undefined" && EXPERTS_DOCUMENTS[expertId];
  const container = document.getElementById("documentsModalContent");
  const footerEl = document.getElementById("documentsModalFooter");
  if (!docData || !container) return;

  const kw = removeVietnameseTones((AppState.docKeyword || "").toLowerCase().trim());
  const selectedCat = AppState.docCategory || "all";

  // Lọc theo nhóm và từ khóa
  let totalFiltered = 0;
  const filteredCategories = docData.categories.map(cat => {
    if (selectedCat !== "all" && cat.id !== selectedCat) {
      return { ...cat, filteredItems: [] };
    }
    const matchingItems = cat.items.filter(item => {
      if (!kw) return true;
      const targetStr = removeVietnameseTones(`${item.title} ${item.author} ${item.type} ${item.desc}`.toLowerCase());
      return targetStr.includes(kw);
    });
    totalFiltered += matchingItems.length;
    return { ...cat, filteredItems: matchingItems };
  }).filter(cat => cat.filteredItems.length > 0);

  // Render HTML
  container.innerHTML = `
    <!-- Header tóm tắt -->
    <div class="docs-header-summary">
      <div style="font-size:2.2rem; line-height:1;">${docData.icon}</div>
      <div style="flex:1;">
        <div style="font-weight:750; font-size:0.95rem; color:var(--text-primary);">${docData.expertName}</div>
        <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:3px; line-height:1.45;">
          ${docData.summary}
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">
          <span class="group-badge" style="background:var(--badge-bg); color:var(--badge-text); font-size:0.72rem; padding:3px 8px; border-radius:12px; font-weight:600;">
            📚 Tổng cộng: ${docData.totalCount} tài liệu
          </span>
          <span class="group-badge" style="background:rgba(245,158,11,0.15); color:#b45309; font-size:0.72rem; padding:3px 8px; border-radius:12px; font-weight:600;">
            🏛️ Nguồn: WASI, VnSAT, Bộ NN&PTNT, UTZ, Wiley
          </span>
          <span class="group-badge" style="background:rgba(16,185,129,0.15); color:#047857; font-size:0.72rem; padding:3px 8px; border-radius:12px; font-weight:600;">
            📁 File: ${docData.filePath}
          </span>
        </div>
      </div>
    </div>

    <!-- Thanh tìm kiếm tài liệu -->
    <div class="docs-search-bar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input type="text" 
             id="docSearchInputField" 
             placeholder="Tìm nhanh theo tên giáo trình, tác giả, WASI, VietGAP, UTZ, tưới nước..." 
             value="${escapeHtml(AppState.docKeyword)}"
             oninput="handleDocSearch(this.value)" />
      ${AppState.docKeyword ? `
        <button style="background:none; border:none; cursor:pointer; color:var(--text-muted);" onclick="handleDocSearch('')" title="Xóa tìm kiếm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      ` : ''}
    </div>

    <!-- Category filter chips -->
    <div class="docs-cat-tabs">
      <button class="docs-cat-chip ${selectedCat === 'all' ? 'active' : ''}" onclick="setDocCategory('all')">
        Tất cả (${docData.totalCount})
      </button>
      ${docData.categories.map(cat => `
        <button class="docs-cat-chip ${selectedCat === cat.id ? 'active' : ''}" onclick="setDocCategory('${cat.id}')">
          ${cat.icon} ${cat.name} (${cat.count})
        </button>
      `).join("")}
    </div>

    <!-- Danh sách tài liệu -->
    ${filteredCategories.length === 0 ? `
      <div style="text-align:center; padding:40px 16px; color:var(--text-muted);">
        <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
        <div style="font-weight:700; color:var(--text-primary); font-size:0.95rem;">Không tìm thấy tài liệu phù hợp</div>
        <div style="font-size:0.82rem; margin-top:4px;">Thử từ khóa khác hoặc bấm nút "Tất cả" để xem toàn bộ danh mục.</div>
      </div>
    ` : filteredCategories.map(cat => `
      <div class="docs-group">
        <div class="docs-group-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </div>
          <span class="group-badge">${cat.filteredItems.length} tài liệu</span>
        </div>

        <div class="docs-group-items">
          ${cat.filteredItems.map(item => `
            <div class="doc-item-card">
              <div class="doc-item-main">
                <div class="doc-item-title-row">
                  <span class="doc-item-num">${item.index}.</span>
                  <div class="doc-item-title">${escapeHtml(item.title)}</div>
                </div>
                <div class="doc-item-meta">
                  <span class="doc-type-badge">${escapeHtml(item.type)}</span>
                  <span>✍️ ${escapeHtml(item.author)}</span>
                </div>
                <div class="doc-item-desc">${escapeHtml(item.desc)}</div>
              </div>
              <button class="btn-copy-doc" onclick="copySingleDocTitle('${escapeJs(item.title)}')" title="Sao chép tên tài liệu">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Sao chép</span>
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("")}
  `;

  // Render Footer Buttons
  if (footerEl) {
    footerEl.innerHTML = `
      <div style="display:flex; gap:8px; flex-wrap:wrap; width:100%; justify-content:space-between; align-items:center;">
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn-outline" onclick="copyDocMarkdown('${expertId}')" title="Sao chép toàn bộ danh mục dạng Markdown">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Sao chép Markdown</span>
          </button>
          <button class="btn-outline" onclick="downloadDocFile('${expertId}')" title="Tải file ${docData.fileName} về máy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Tải file .md</span>
          </button>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn-outline" onclick="hideModal('documentsModal')">Đóng</button>
          ${(expert && expert.hasLink) ? `
            <a href="${expert.shareUrl}" target="_blank" class="btn-header primary" style="text-decoration:none;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10-1.82 0-3.53-.484-5-1.332L2 22l1.332-5C2.484 15.53 2 13.82 2 12a10 10 0 0 1 10-10zm0 2a8 8 0 0 0-8 8c0 1.54.436 2.98 1.196 4.208l-.517 1.942 1.942-.517A7.96 7.96 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8zm-1 4h2v2h-2V8zm0 4h2v6h-2v-6z"/>
              </svg>
              <span>Hỏi Gemini Về Tài Liệu</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }
}

function handleDocSearch(val) {
  AppState.docKeyword = val || "";
  renderDocumentsModalContent();
  const inputEl = document.getElementById("docSearchInputField");
  if (inputEl) {
    inputEl.focus();
    inputEl.selectionStart = inputEl.selectionEnd = inputEl.value.length;
  }
}

function setDocCategory(catId) {
  AppState.docCategory = catId;
  renderDocumentsModalContent();
}

function copySingleDocTitle(title) {
  navigator.clipboard.writeText(title).then(() => {
    showToast(`Đã sao chép: "${title.substring(0, 35)}..."`);
  }).catch(() => {
    prompt("Sao chép tên tài liệu:", title);
  });
}

function copyDocMarkdown(expertId) {
  const docData = typeof EXPERTS_DOCUMENTS !== "undefined" && EXPERTS_DOCUMENTS[expertId];
  if (!docData || !docData.rawMarkdown) return;

  navigator.clipboard.writeText(docData.rawMarkdown).then(() => {
    showToast(`Đã sao chép toàn bộ ${docData.totalCount} tài liệu của ${docData.expertName}!`);
  }).catch(() => {
    showToast("Không thể sao chép, vui lòng thử lại!");
  });
}

function downloadDocFile(expertId) {
  const docData = typeof EXPERTS_DOCUMENTS !== "undefined" && EXPERTS_DOCUMENTS[expertId];
  if (!docData || !docData.rawMarkdown) return;

  const blob = new Blob([docData.rawMarkdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = docData.fileName || "taiLieu_coffee.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Đã tải xuống file ${docData.fileName}!`);
}

// Đăng ký Service Worker
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").then(reg => {
        console.log("AgriDSS Service Worker đã kích hoạt!", reg.scope);
      }).catch(err => {
        console.log("Service Worker đăng ký thất bại:", err);
      });
    });
  }
}

