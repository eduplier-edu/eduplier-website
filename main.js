
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        document.getElementById("navLinks").classList.remove("active");
    });
});

var leadForm = document.getElementById("leadForm");
if (leadForm) {
    leadForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("name").value.trim();
        var phone = document.getElementById("phone").value.trim();
        if (name === "" || phone === "") {
            alert("Please enter your name and mobile number.");
            return;
        }
        document.getElementById("formMessage").style.display = "block";
        leadForm.reset();
    });
}

var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll(
    ".university-card, .program-card, .why-item, .process-card, .related-card"
).forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(el);
});
