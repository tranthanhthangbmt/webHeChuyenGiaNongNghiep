/**
 * Logic Ứng Dụng AgriExpert DSS - Quản lý Hệ Chuyên Gia Nông Nghiệp
 */

// Trạng thái ứng dụng
const AppState = {
  experts: [],
  currentCategory: "all",
  searchKeyword: "",
  activeExpertModal: null,
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
        <div class="card-banner" style="background: ${expert.gradient};">
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
          <h3 class="expert-title">${expert.name}</h3>
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
            <button class="btn-outline" onclick="openDetailModal('${expert.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>Quy trình & Prompt</span>
            </button>
            <button class="btn-outline" onclick="openSingleEditModal('${expert.id}')" title="Cập nhật link Gemini">
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

