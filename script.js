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

      // 33 Verified Branches Directory (Informational + Maps + Phone)
      var BRANCHES = [
        { province: "Hồ Chí Minh", title: "Quận 5 (Chi Nhánh 1)", address: "04 Lô B chung cư Nguyễn Biểu, P.1, Quận 5, TP.HCM", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hồ Chí Minh", title: "Quận Phú Nhuận (Chi Nhánh 2)", address: "337 Phan Đình Phùng, P.15, Quận Phú Nhuận, TP.HCM", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hồ Chí Minh", title: "Quận Gò Vấp (Chi Nhánh 3)", address: "312 Lê Văn Thọ, P.11, Quận Gò Vấp, TP.HCM", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hồ Chí Minh", title: "Quận Bình Thạnh (Chi Nhánh 6)", address: "213/1 Nguyễn Gia Trí (D2), P.25, Quận Bình Thạnh, TP.HCM", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hồ Chí Minh", title: "TP. Thủ Đức (Chi Nhánh 7)", address: "29 Hoàng Diệu 2, TP. Thủ Đức, TP.HCM", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        { province: "Hà Nội", title: "Hoàn Kiếm (Chi Nhánh 23)", address: "49 Hàng Bài, Quận Hoàn Kiếm, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", title: "Đống Đa (Chi Nhánh 24)", address: "36A Ô Chợ Dừa, Quận Đống Đa, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", title: "Ba Đình (Chi Nhánh 25)", address: "69 Đội Cấn, Quận Ba Đình, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", title: "Long Biên (Chi Nhánh 26)", address: "177 Ngọc Lâm, Quận Long Biên, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", title: "Nam Từ Liêm (Chi Nhánh 27)", address: "193 Hồ Tùng Mậu, P. Cầu Diễn, Nam Từ Liêm, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hà Nội", title: "Đại Mỗ / Thanh Xuân (Chi Nhánh 28)", address: "388 Nguyễn Trãi, P. Đại Mỗ, Hà Nội", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        { province: "Cần Thơ", title: "Ninh Kiều (Chi Nhánh 8)", address: "124 Mậu Thân, P. An Phú, Q. Ninh Kiều, Cần Thơ", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Cần Thơ", title: "Nguyễn Văn Cừ (Chi Nhánh 9)", address: "96 Nguyễn Văn Cừ nối dài, P. An Bình, Cần Thơ", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        { province: "Đà Nẵng", title: "Hải Châu (Chi Nhánh 17)", address: "260 Trưng Nữ Vương, Q. Hải Châu, Đà Nẵng", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Đà Nẵng", title: "Đống Đa (Chi Nhánh 18)", address: "238 Đống Đa, Đà Nẵng", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Đà Nẵng", title: "Ngũ Hành Sơn (Chi Nhánh 19)", address: "71 Châu Thị Vĩnh Tế, Q. Ngũ Hành Sơn, Đà Nẵng", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        { province: "Đồng Tháp", group: "mientay", title: "TP. Cao Lãnh (Chi Nhánh 11)", address: "10 Nguyễn Huệ, P.1, TP. Cao Lãnh, Đồng Tháp", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Bạc Liêu", group: "mientay", title: "TP. Bạc Liêu (Chi Nhánh 13)", address: "228 Trần Phú, P.7, Khóm 3, TP. Bạc Liêu", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Kiên Giang", group: "mientay", title: "TP. Rạch Giá (Chi Nhánh 15)", address: "87 Nguyễn Trung Trực, P. Vĩnh Bảo, TP. Rạch Giá", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Tiền Giang", group: "mientay", title: "Mỹ Tho (Chi Nhánh 16)", address: "33 Lê Thị Hồng Gấm, P.4, TP. Mỹ Tho, Tiền Giang", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "An Giang", group: "mientay", title: "Long Xuyên (Chi Nhánh 20)", address: "290 Lý Thái Tổ nối dài, TP. Long Xuyên, An Giang", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "An Giang", group: "mientay", title: "Châu Đốc (Chi Nhánh 21)", address: "Tổ 12, Phan Đình Phùng, P. Châu Phú B, Châu Đốc, An Giang", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Vĩnh Long", group: "mientay", title: "TP. Vĩnh Long (Chi Nhánh 29)", address: "77/1 Trưng Nữ Vương, P.1, TP. Vĩnh Long", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        { province: "Bình Dương", group: "dongnam_taynguyen", title: "Thủ Dầu Một (Chi Nhánh 31)", address: "228 Phú Lợi, P. Phú Hòa, Thủ Dầu Một, Bình Dương", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Đồng Nai", group: "dongnam_taynguyen", title: "Biên Hòa (Chi Nhánh 33)", address: "163 Phan Trung, KP 2, P. Tân Mai, TP. Biên Hòa, Đồng Nai", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Đắk Lắk", group: "dongnam_taynguyen", title: "Buôn Ma Thuột (Chi Nhánh 39)", address: "120 Y Jut, TP. Buôn Ma Thuột, Đắk Lắk", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Gia Lai", group: "dongnam_taynguyen", title: "Pleiku (Chi Nhánh 40)", address: "51 Lê Lợi, TP. Pleiku, Gia Lai", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },

        { province: "Quảng Ninh", group: "bac_trung", title: "TP. Hạ Long (Chi Nhánh 30)", address: "20B Cao Xanh, TP. Hạ Long, Quảng Ninh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hải Phòng", group: "bac_trung", title: "Lê Chân (Chi Nhánh 32)", address: "58 Hồ Sen, Dư Hàng, Lê Chân, Hải Phòng", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Thanh Hóa", group: "bac_trung", title: "TP. Thanh Hóa (Chi Nhánh 35)", address: "468A Trần Phú, Ba Đình, TP. Thanh Hóa", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Thái Nguyên", group: "bac_trung", title: "TP. Thái Nguyên (Chi Nhánh 36)", address: "19A Minh Cầu, Phan Đình Phùng, TP. Thái Nguyên", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Hải Dương", group: "bac_trung", title: "TP. Hải Dương (Chi Nhánh 37)", address: "18A Phạm Ngũ Lão, P. Lê Thanh Nghị, Hải Dương", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" },
        { province: "Bắc Ninh", group: "bac_trung", title: "TP. Bắc Ninh (Chi Nhánh 38)", address: "19 Nguyễn Hữu Nghiêm, TP. Bắc Ninh", time: "7h00 - 23h00 (kể cả CN và ngày lễ)", phone: "0939999132" }
      ];

      var activeRegion = "all";
      var branchGrid = document.getElementById("branchGrid");
      var branchCount = document.getElementById("branchCount");
      var searchInput = document.getElementById("branchSearch");

      function normalize(str) {
        return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }

      function renderBranches() {
        var q = normalize(searchInput.value.trim());
        var list = BRANCHES.filter(function (b) {
          var regionMatch = activeRegion === "all" || b.province === activeRegion || b.group === activeRegion;
          var textMatch = !q || normalize(b.province + " " + b.title + " " + b.address).indexOf(q) !== -1;
          return regionMatch && textMatch;
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

      document.querySelectorAll("#regionChips .chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          document.querySelectorAll("#regionChips .chip").forEach(function (c) { c.classList.remove("active"); });
          chip.classList.add("active");
          activeRegion = chip.getAttribute("data-region");
          renderBranches();
        });
      });

      searchInput.addEventListener("input", renderBranches);
      renderBranches();
    })();
