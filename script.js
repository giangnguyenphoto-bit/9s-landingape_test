(function () {
      // Mega menu toggle
      var megaToggle = document.getElementById("megaToggle");
      var megaMenu = document.getElementById("megaMenu");
      if (megaToggle && megaMenu) {
        megaToggle.addEventListener("click", function (e) {
          e.stopPropagation();
          var open = megaMenu.classList.toggle("open");
          megaToggle.setAttribute("aria-expanded", String(open));
        });
        document.addEventListener("click", function (e) {
          if (!megaMenu.contains(e.target) && e.target !== megaToggle) {
            megaMenu.classList.remove("open");
            megaToggle.setAttribute("aria-expanded", "false");
          }
        });
      }

      // Scroll-Reveal Observer
      var reveals = document.querySelectorAll(".reveal");
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        reveals.forEach(function (r) { io.observe(r); });
      } else {
        reveals.forEach(function (r) { r.classList.add("in-view"); });
      }

      // Hero 3D Stage Tilt (parent container so child CSS cartoon bounce runs freely)
      var heroStage3d = document.getElementById("heroStage3d");
      var mouseX = 0, mouseY = 0;
      if (heroStage3d && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", function (e) {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
          heroStage3d.style.transform = "rotateY(" + (mouseX * 10).toFixed(2) + "deg) rotateX(" + (-mouseY * 8).toFixed(2) + "deg)";
        });
      }

      // Click / Tap cartoon jump & quote cycling on the 2 tigers
      document.querySelectorAll(".tiger-actor").forEach(function (actor) {
        var quotes = [];
        try { quotes = JSON.parse(actor.getAttribute("data-quotes") || "[]"); } catch (e) {}
        var qi = 0;
        var bubble = actor.querySelector(".tiger-bubble");
        actor.addEventListener("click", function () {
          actor.classList.remove("jumping");
          void actor.offsetWidth;
          actor.classList.add("jumping");
          if (bubble && quotes.length) {
            qi = (qi + 1) % quotes.length;
            bubble.textContent = quotes[qi];
          }
        });
      });

      // Scroll-Driven Ambient Canvas
      var canvas = document.getElementById("scene-canvas");
      var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (canvas && !reduceMotion) {
        var ctx = canvas.getContext("2d");
        var W = 0, H = 0, t = 0;
        var orbs = [
          { x: 0.22, y: 0.30, r: 220, speed: 0.4, color: "rgba(247, 198, 29, 0.24)", drift: 90 },
          { x: 0.78, y: 0.45, r: 260, speed: 0.3, color: "rgba(46, 139, 34, 0.28)", drift: 110 },
          { x: 0.48, y: 0.72, r: 190, speed: 0.5, color: "rgba(255, 225, 105, 0.16)", drift: 80 },
          { x: 0.85, y: 0.82, r: 150, speed: 0.6, color: "rgba(230, 46, 45, 0.11)", drift: 60 }
        ];
        var sparks = [];
        for (var i = 0; i < 42; i++) {
          sparks.push({ x: Math.random(), y: Math.random(), size: Math.random() * 2.4 + 0.8, vy: Math.random() * 0.00025 + 0.00008, phase: Math.random() * Math.PI * 2 });
        }
        function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
        window.addEventListener("resize", resize);
        resize();

        function drawFrame() {
          t += 0.012;
          var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          var scrollRatio = window.scrollY / maxScroll;
          ctx.clearRect(0, 0, W, H);

          orbs.forEach(function (o, idx) {
            var cx = W * o.x + Math.sin(t * o.speed + scrollRatio * 6.5 + idx) * o.drift + mouseX * 28;
            var cy = H * o.y + Math.cos(t * o.speed * 0.9 + scrollRatio * 4.5 + idx) * (o.drift * 0.7) + mouseY * 22;
            var rad = o.r * (W < 720 ? 0.65 : 1);
            var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
            g.addColorStop(0, o.color);
            g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(cx, cy, rad, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.save();
          ctx.strokeStyle = "rgba(247, 198, 29, 0.12)";
          ctx.lineWidth = 1.4;
          for (var k = 0; k < 3; k++) {
            ctx.beginPath();
            var baseY = H * (0.25 + k * 0.25) - (scrollRatio * 140) % H;
            ctx.moveTo(0, baseY);
            ctx.bezierCurveTo(W * 0.33, baseY + Math.sin(t + k) * 90, W * 0.66, baseY - Math.cos(t + k) * 90, W, baseY + Math.sin(t * 0.7 + k) * 50);
            ctx.stroke();
          }
          ctx.restore();

          sparks.forEach(function (s) {
            s.y -= s.vy;
            if (s.y < -0.02) s.y = 1.02;
            var alpha = 0.25 + 0.45 * Math.sin(t * 2 + s.phase);
            ctx.fillStyle = "rgba(255, 225, 105, " + Math.max(0.05, alpha).toFixed(2) + ")";
            ctx.beginPath();
            ctx.arc(s.x * W + Math.sin(t + s.phase) * 8, s.y * H, s.size, 0, Math.PI * 2);
            ctx.fill();
          });

          requestAnimationFrame(drawFrame);
        }
        requestAnimationFrame(drawFrame);
      }

      // 33 Verified Branches Directory grouped by 5 intuitive regions
      var BRANCHES = [
        // 1. TP.HCM & Lân cận (7): TP.HCM (5), Bình Dương, Đồng Nai
        { province: "TP.HCM", region: "hcm_lancan", title: "Quận 5", address: "04, Lô B Chung cư Nguyễn Biểu, P.1, Quận 5, TP. Hồ Chí Minh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "TP.HCM", region: "hcm_lancan", title: "Quận Phú Nhuận", address: "337 Phan Đình Phùng, P.15, Quận Phú Nhuận, TP. Hồ Chí Minh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "TP.HCM", region: "hcm_lancan", title: "Quận Gò Vấp", address: "312 Lê Văn Thọ, P.11, Quận Gò Vấp, TP. Hồ Chí Minh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "TP.HCM", region: "hcm_lancan", title: "TP. Thủ Đức (Linh Trung)", address: "29 Hoàng Diệu 2, P. Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "TP.HCM", region: "hcm_lancan", title: "TP. Thủ Đức (TTTM Gigamall)", address: "L5 - Booth 8, Tầng 5, TTTM GIGAMALL Thủ Đức, 240 - 242 Phạm Văn Đồng, P. Hiệp Bình, TP. Hồ Chí Minh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Bình Dương", region: "hcm_lancan", title: "TP. Thủ Dầu Một", address: "228 Phú Lợi, P. Phú Hòa, TP. Thủ Dầu Một, Bình Dương", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Đồng Nai", region: "hcm_lancan", title: "TP. Biên Hoà", address: "163 Phan Trung, KP 2, P. Tân Mai, TP. Biên Hoà, Đồng Nai", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        // 2. Miền Tây (10): Cần Thơ (2), An Giang (2), Vĩnh Long, Kiên Giang, Đồng Tháp, Tiền Giang, Bạc Liêu, Cà Mau
        { province: "Cần Thơ", region: "mientay", title: "Ninh Kiều", address: "124 Mậu Thân, P. An Phú, Q. Ninh Kiều, Cần Thơ", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Cần Thơ", region: "mientay", title: "An Bình", address: "96 Nguyễn Văn Cừ nối dài, P. An Bình, Cần Thơ", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "An Giang", region: "mientay", title: "TP. Long Xuyên", address: "290 Lý Thái Tổ nối dài, TP. Long Xuyên, An Giang", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "An Giang", region: "mientay", title: "Châu Đốc", address: "Tổ 12, Phan Đình Phùng, P. Châu Phú B, Châu Đốc, An Giang", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Vĩnh Long", region: "mientay", title: "TP. Vĩnh Long", address: "77/1 Trưng Nữ Vương, Phường 1, TP. Vĩnh Long", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Kiên Giang", region: "mientay", title: "TP. Rạch Giá", address: "87 Nguyễn Trung Trực, P. Vĩnh Bảo, TP. Rạch Giá, Kiên Giang", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Đồng Tháp", region: "mientay", title: "TP. Cao Lãnh", address: "10 Nguyễn Huệ, Phường 1, TP. Cao Lãnh, Đồng Tháp", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Tiền Giang", region: "mientay", title: "TP. Mỹ Tho", address: "33 Lê Thị Hồng Gấm, P.4, TP. Mỹ Tho, Tiền Giang", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Bạc Liêu", region: "mientay", title: "TP. Bạc Liêu", address: "228 Trần Phú, Phường 7, Khóm 3, TP. Bạc Liêu", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Cà Mau", region: "mientay", title: "TP. Cà Mau", address: "16 Trần Hưng Đạo, Phường 5, TP. Cà Mau", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        // 3. Hà Nội (6)
        { province: "Hà Nội", region: "hanoi", title: "Hoàn Kiếm", address: "49 Hàng Bài, Quận Hoàn Kiếm, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", region: "hanoi", title: "Đống Đa", address: "36A Ô Chợ Dừa, Quận Đống Đa, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", region: "hanoi", title: "Ba Đình", address: "69B Đội Cấn, Quận Ba Đình, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", region: "hanoi", title: "Long Biên", address: "177 Ngọc Lâm, Quận Long Biên, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", region: "hanoi", title: "Nam Từ Liêm", address: "193 Hồ Tùng Mậu, P. Cầu Diễn, Q. Nam Từ Liêm, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", region: "hanoi", title: "Hà Đông", address: "11 Trần Phú, Quận Hà Đông, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        // 4. Miền Bắc khác (5): Quảng Ninh, Bắc Ninh, Hải Phòng, Hải Dương, Thái Nguyên
        { province: "Quảng Ninh", region: "mienbac_khac", title: "TP. Hạ Long", address: "20B Cao Xanh, TP. Hạ Long, Quảng Ninh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Bắc Ninh", region: "mienbac_khac", title: "TP. Bắc Ninh", address: "Số 1 Nguyễn Hữu Nghiêm, TP. Bắc Ninh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hải Phòng", region: "mienbac_khac", title: "Lê Chân", address: "58 Hồ Sen, Dư Hàng, Lê Chân, Hải Phòng", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hải Dương", region: "mienbac_khac", title: "TP. Hải Dương", address: "18A Phạm Ngũ Lão, P. Lê Thanh Nghị, Hải Dương", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Thái Nguyên", region: "mienbac_khac", title: "TP. Thái Nguyên", address: "19A Minh Cầu, Phan Đình Phùng, TP. Thái Nguyên", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        // 5. Trung - Tây Nguyên (5): Đà Nẵng (3), Thanh Hóa, Gia Lai
        { province: "Đà Nẵng", region: "trung_taynguyen", title: "Hải Châu", address: "260 Trưng Nữ Vương, Quận Hải Châu, Đà Nẵng", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Đà Nẵng", region: "trung_taynguyen", title: "Đống Đa", address: "238 Đống Đa, Đà Nẵng", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Đà Nẵng", region: "trung_taynguyen", title: "Ngũ Hành Sơn", address: "71 Châu Thị Vĩnh Tế, P. Ngũ Hành Sơn, Đà Nẵng", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Thanh Hóa", region: "trung_taynguyen", title: "TP. Thanh Hóa", address: "468A Trần Phú, Ba Đình, TP. Thanh Hóa", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Gia Lai", region: "trung_taynguyen", title: "Pleiku", address: "51 Lê Lợi, Pleiku, Gia Lai", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" }
      ];

      var activeRegion = "all";
      var activeProvince = "all";
      var branchGrid = document.getElementById("branchGrid");
      var branchCount = document.getElementById("branchCount");
      var searchInput = document.getElementById("branchSearch");
      var subChipRow = document.getElementById("provinceSubChips");

      function normalize(str) {
        return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }

      function renderSubChips() {
        if (!subChipRow) return;
        if (activeRegion === "all") {
          subChipRow.hidden = true;
          subChipRow.innerHTML = "";
          return;
        }
        var regionItems = BRANCHES.filter(function (b) { return b.region === activeRegion; });
        var counts = {};
        var order = [];
        regionItems.forEach(function (b) {
          if (!counts[b.province]) {
            counts[b.province] = 0;
            order.push(b.province);
          }
          counts[b.province] += 1;
        });
        if (order.length <= 1) {
          subChipRow.hidden = true;
          subChipRow.innerHTML = "";
          return;
        }
        subChipRow.hidden = false;
        subChipRow.innerHTML = "";

        var allBtn = document.createElement("button");
        allBtn.type = "button";
        allBtn.className = "subchip" + (activeProvince === "all" ? " active" : "");
        allBtn.textContent = "Tất cả khu vực (" + regionItems.length + ")";
        allBtn.addEventListener("click", function () {
          activeProvince = "all";
          renderSubChips();
          renderBranches();
        });
        subChipRow.appendChild(allBtn);

        order.forEach(function (prov) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "subchip" + (activeProvince === prov ? " active" : "");
          btn.textContent = prov + " (" + counts[prov] + ")";
          btn.addEventListener("click", function () {
            activeProvince = prov;
            renderSubChips();
            renderBranches();
          });
          subChipRow.appendChild(btn);
        });
      }

      function renderBranches() {
        var q = normalize(searchInput.value.trim());
        var list = BRANCHES.filter(function (b) {
          var regionMatch = activeRegion === "all" || b.region === activeRegion;
          var provMatch = activeProvince === "all" || b.province === activeProvince;
          var textMatch = !q || normalize(b.province + " " + b.title + " " + b.address).indexOf(q) !== -1;
          return regionMatch && provMatch && textMatch;
        });

        branchCount.textContent = "Đang hiển thị " + list.length + " / " + BRANCHES.length + " chi nhánh";
        branchGrid.innerHTML = "";

        if (list.length === 0) {
          branchGrid.innerHTML = '<p style="color:var(--text-muted); margin:0;">Không tìm thấy chi nhánh khớp từ khóa. Vui lòng thử tên quận hoặc tỉnh thành khác.</p>';
          return;
        }

        list.forEach(function (b) {
          var card = document.createElement("article");
          card.className = "branch-card";
          var mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Bánh Sầu Riêng 9 Sạch " + b.address);
          var phoneFmt = b.phone.replace(/(\d{3})(\d{4})(\d{3})/, "$1 $2 $3");

          card.innerHTML =
            '<div class="branch-top">' +
              '<h4 class="branch-name">' + b.title + '</h4>' +
              '<span class="branch-tag">' + b.province + '</span>' +
            '</div>' +
            '<p class="branch-meta">📍 ' + b.address + '</p>' +
            '<p class="branch-meta">🕒 ' + b.time + '</p>' +
            '<div class="branch-actions">' +
              '<a class="act-map" href="' + mapUrl + '" target="_blank" rel="noopener">🗺️ Chỉ đường Google Maps</a>' +
              '<a href="tel:' + b.phone + '">📞 ' + phoneFmt + '</a>' +
            '</div>';

          branchGrid.appendChild(card);
        });
      }

      function selectRegion(region) {
        activeRegion = region || "all";
        activeProvince = "all";
        document.querySelectorAll("#regionChips .chip").forEach(function (c) {
          c.classList.toggle("active", c.getAttribute("data-region") === activeRegion);
        });
        renderSubChips();
        renderBranches();
      }

      document.querySelectorAll("#regionChips .chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          selectRegion(chip.getAttribute("data-region"));
        });
      });

      document.querySelectorAll("[data-jump-region]").forEach(function (link) {
        link.addEventListener("click", function () {
          selectRegion(link.getAttribute("data-jump-region"));
        });
      });

      searchInput.addEventListener("input", renderBranches);
      renderSubChips();
      renderBranches();
    })();
