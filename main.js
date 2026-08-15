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
        var email = document.getElementById("email").value.trim();
        var program = document.getElementById("program").value.trim();
        var message = document.getElementById("message").value.trim();

        if (name === "" || phone === "") {
            alert("Please enter your name and mobile number.");
            return;
        }

        var submitBtn = leadForm.querySelector(".form-submit");
        var originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Submitting...";
        submitBtn.disabled = true;

        var payload = {
            access_key: "3cd09dad-2949-4e5d-96e9-9f44b808c492",
            subject: "New Enquiry from Eduplier Website",
            from_name: "Eduplier Website",
            name: name,
            phone: phone,
            email: email || "Not provided",
            program_interested: program || "Not specified",
            message: message || "No additional message",
            page_source: window.location.pathname
        };

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                if (data.success) {
                    document.getElementById("formMessage").style.display = "block";
                    leadForm.reset();
                } else {
                    alert("Something went wrong. Please try again or reach us at info@eduplier.com.");
                }
            })
            .catch(function () {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                alert("Something went wrong. Please try again or reach us at info@eduplier.com.");
            });
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
