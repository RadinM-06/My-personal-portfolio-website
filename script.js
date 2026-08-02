// ======================================================
// RADINSUT - MAIN SCRIPT
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // ELEMENTS
    // =====================

    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");

    const progressBar = document.querySelector(".scroll-progress");
    const glow = document.querySelector(".cursor-glow");

    const clock = document.getElementById("clock");
    const date = document.getElementById("date");

    const backToTop = document.getElementById("backToTop");

    const themeToggle = document.getElementById("themeToggle");

    // =====================
    // MENU
    // =====================

    if (menuBtn && menu) {

        menuBtn.addEventListener("click", () => {

            menu.classList.toggle("active");

        });

    }

    // =====================
    // CLOCK + DATE
    // =====================

    function updateTime() {

        const now = new Date();

        if (clock) {

            clock.textContent = now.toLocaleTimeString("en-GB", {
                hour12: false
            });

        }

        if (date) {

            date.textContent = now.toLocaleDateString("en-GB", {

                year: "numeric",
                month: "long",
                day: "numeric"

            });

        }

    }

    updateTime();

    setInterval(updateTime, 1000);

    // =====================
    // CURSOR GLOW
    // =====================

    if (glow) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;

        window.addEventListener("mousemove", e => {

            mouseX = e.clientX;
            mouseY = e.clientY;

        });

        function animateGlow() {

            currentX += (mouseX - currentX) * 0.18;
            currentY += (mouseY - currentY) * 0.18;

            glow.style.transform =
                `translate(${currentX - 160}px, ${currentY - 160}px)`;

            requestAnimationFrame(animateGlow);

        }

        animateGlow();

    }
        // =====================
    // SCROLL PROGRESS
    // =====================

    if (progressBar) {

        window.addEventListener("scroll", () => {

            const scrollTop = window.scrollY;

            const docHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percent =
                (scrollTop / docHeight) * 100;

            progressBar.style.width =
                percent + "%";

        });

    }

    // =====================
    // BACK TO TOP
    // =====================

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

   // =====================
// THEME TOGGLE
// =====================

if (themeToggle) {

    const sunIcon = `
        <i data-lucide="sun"></i>
    `;

    const moonIcon = `
        <i data-lucide="moon"></i>
    `;

    function applyTheme(theme) {

        if (theme === "light") {

            document.body.classList.add("light-mode");
            themeToggle.innerHTML = moonIcon;

        } else {

            document.body.classList.remove("light-mode");
            themeToggle.innerHTML = sunIcon;

        }

        if (window.lucide) {
            lucide.createIcons();
        }

    }

    // بارگذاری تم ذخیره شده
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {

        const newTheme =
            document.body.classList.contains("light-mode")
                ? "dark"
                : "light";

        localStorage.setItem("theme", newTheme);

        applyTheme(newTheme);

    });

}

 // =====================
// LEARNING ACCORDION
// =====================

const learningCards = document.querySelectorAll(".learning-card");

learningCards.forEach(card => {

    card.addEventListener("click", function () {

        const section = this.getAttribute("data-section");

        const content = document.getElementById(section);

        if (!content) return;


        const isOpen = content.classList.contains("show");


        // بستن همه
        document.querySelectorAll(".learning-content")
        .forEach(item => {

            item.classList.remove("show");

        });


        document.querySelectorAll(".learning-card")
        .forEach(item => {

            item.classList.remove("active");

        });


        // باز کردن انتخاب شده
        if (!isOpen) {

            content.classList.add("show");

            this.classList.add("active");

        }


        if(window.lucide){

            lucide.createIcons();

        }

    });

});
        // =====================
    // LUCIDE ICONS
    // =====================

    if (window.lucide) {

        lucide.createIcons();

    }

});
// =====================
// ABOUT TITLE SCRAMBLE (on hover)
// =====================

const aboutTitle = document.getElementById("aboutTitle");

if (aboutTitle) {

    const originalText = aboutTitle.textContent;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    let scrambleInterval = null;

    function randomChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function runScramble() {

        if (scrambleInterval) clearInterval(scrambleInterval);

        let reveal = 0;
        let frame = 0;

        scrambleInterval = setInterval(() => {

            aboutTitle.textContent = originalText
                .split("")
                .map((c, i) => {

                    if (c === " ") return " ";

                    return i < reveal ? c : randomChar();

                })
                .join("");

            frame++;

            if (frame >= 3) {
                reveal++;
                frame = 0;
            }

            if (reveal > originalText.length) {

                clearInterval(scrambleInterval);
                scrambleInterval = null;

                aboutTitle.textContent = originalText;

            }

        }, 35);

    }

    aboutTitle.addEventListener("mouseenter", runScramble);

}
