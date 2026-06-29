// =========================
// ELEMENTS
// =========================
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const glow = document.querySelector(".cursor-glow");

const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("date");

// =========================
// MENU (SAFE TOGGLE)
// =========================
if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

// =========================
// CLOCK + DATE
// =========================
function updateTime() {
    const now = new Date();

    if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString("en-GB", {
            hour12: false
        });
    }

    if (dateEl) {
        dateEl.textContent = now.toISOString().split("T")[0];
    }
}

updateTime();
setInterval(updateTime, 1000);

// =========================
// CURSOR GLOW (FIXED ALIGNMENT)
// =========================
if (glow) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    // mouse tracking
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animate() {

        // smooth follow (lerp)
        currentX += (mouseX - currentX) * 0.18;
        currentY += (mouseY - currentY) * 0.18;

        // IMPORTANT: we center manually in JS (no CSS transform needed)
        glow.style.transform =
            `translate(${currentX - 160}px, ${currentY - 160}px)`;

        requestAnimationFrame(animate);
    }

    animate();
}
console.log("MENU READY");
// =========================
// SCROLL PROGRESS BAR
// =========================

const progressBar =
    document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percent =
        (scrollTop / docHeight) * 100;

    if(progressBar){
        progressBar.style.width =
            percent + "%";
    }
});

// =========================
// ACTIVE MENU SECTION
// =========================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if(
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ){
            current = section.id;
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href") ===
            "#" + current
        ){
            link.classList.add("active");
        }
    });

});
// =========================
// BACK TO TOP BUTTON
// =========================

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"
    });

});
/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");

const sunIcon = `
<svg stroke="currentColor" fill="none" stroke-width="2"
viewBox="0 0 24 24" stroke-linecap="round"
stroke-linejoin="round" width="20" height="20">

    <circle cx="12" cy="12" r="5"></circle>

    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>

    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>

    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>

    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>

</svg>
`;

const moonIcon = `
<svg stroke="currentColor" fill="none" stroke-width="2"
viewBox="0 0 24 24" stroke-linecap="round"
stroke-linejoin="round" width="20" height="20">

    <path d="M21 12.79A9 9 0 1 1 11.21 3
             7 7 0 0 0 21 12.79z">
    </path>

</svg>
`;

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        themeToggle.innerHTML = moonIcon;

    }else{

        themeToggle.innerHTML = sunIcon;

    }

});
