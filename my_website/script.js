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