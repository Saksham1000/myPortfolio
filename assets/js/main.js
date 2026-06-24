function myMenuFunction() {
    const menuBtn = document.getElementById("myNavMenu");
    menuBtn.classList.toggle("responsive");
}

function headerShadow() {
    const navHeader = document.getElementById("header");
    const isScrolled = document.body.scrollTop > 50 || document.documentElement.scrollTop > 50;

    navHeader.style.borderColor = isScrolled ? "rgba(148, 163, 184, 0.2)" : "transparent";
    navHeader.style.height = isScrolled ? "72px" : "";
    navHeader.style.background = isScrolled ? "rgba(9, 12, 18, 0.9)" : "";
}

window.addEventListener("scroll", headerShadow);

const typingEffect = new Typed(".typedText", {
    strings: ["frontend experiences", "full-stack projects", "developer tools", "AI-ready ideas"],
    loop: true,
    typeSpeed: 72,
    backSpeed: 44,
    backDelay: 1600
});

const sr = ScrollReveal({
    origin: "top",
    distance: "54px",
    duration: 1100,
    reset: false
});

sr.reveal(".status-pill", {});
sr.reveal(".featured-name", { delay: 80 });
sr.reveal(".featured-text-info", { delay: 140 });
sr.reveal(".hero-stats", { delay: 180 });
sr.reveal(".featured-text-btn", { delay: 220 });
sr.reveal(".social_icons", { delay: 260 });
sr.reveal(".featured-image", { delay: 160 });
sr.reveal(".top-header", {});
sr.reveal(".about-info", { origin: "left" });
sr.reveal(".skills-box", { origin: "right", interval: 110 });
sr.reveal(".project-box", { interval: 120 });
sr.reveal(".contact-info", { origin: "left" });
sr.reveal(".form-control", { origin: "right" });

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 90;
        const sectionId = current.getAttribute("id");
        const link = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (!link) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add("active-link");
        } else {
            link.classList.remove("active-link");
        }
    });
}

window.addEventListener("scroll", scrollActive);

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        document.getElementById("myNavMenu").classList.remove("responsive");
    });
});

emailjs.init("teaEtSGiMERv7lll9");

document.getElementById("submitButton").addEventListener("click", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    emailjs.send("service_ar12htg", "template_3c6k8sr", {
        from_name: name,
        email_id: email,
        message: message
    }).then(function (response) {
        console.log("Email sent successfully:", response);
        alert("Message sent successfully!");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
    }).catch(function (error) {
        console.error("Error sending email:", error);
        alert(`Error sending email: ${error.text || "Please check your EmailJS configuration."}`);
    });
});
