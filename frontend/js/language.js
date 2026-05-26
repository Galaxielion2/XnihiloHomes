document.addEventListener("DOMContentLoaded", function () {
    const languageLinks = document.querySelectorAll(".language-menu a");
    const languageButtonText = document.querySelector(".language-button span");
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";

    function updateActiveLanguage(language) {
        languageLinks.forEach(function (link) {
            link.classList.remove("active-language");
            if (link.getAttribute("data-lang") === language) {
                link.classList.add("active-language");
                if (languageButtonText) {
                    languageButtonText.textContent = link.textContent;
                }
            }
        });
    }

    updateActiveLanguage(savedLanguage);

    languageLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const selectedLanguage = link.getAttribute("data-lang");
            localStorage.setItem("selectedLanguage", selectedLanguage);
            updateActiveLanguage(selectedLanguage);
        });
    });
});
