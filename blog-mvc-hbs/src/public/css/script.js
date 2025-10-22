document.addEventListener("DOMContentLoaded", () => {
  // Truncate blog previews
  const cards = document.querySelectorAll(".card p");
  cards.forEach((card) => {
    const fullText = card.textContent;
    if (fullText.length > 150) {
      const preview = fullText.slice(0, 150) + "... ";
      card.textContent = preview;

      const readMore = document.createElement("a");
      readMore.href = "#";
      readMore.textContent = "Read More";
      readMore.className = "blog-link";
      readMore.addEventListener("click", (e) => {
        e.preventDefault();
        card.textContent = fullText;
      });
      card.appendChild(readMore);
    }
  });

  // Dark/Light Mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
});
