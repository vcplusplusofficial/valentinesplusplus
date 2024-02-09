document.addEventListener("DOMContentLoaded", function () {
  const valentinesDayCard = document.querySelector(".container");
  const card = document.querySelector(".card");

  function animateCardUp() {
    card.style.transition = "top 0.5s ease-in-out";
    card.style.top = "-90px";
  }

  function animateCardDown() {
    card.style.transition = "top 0.5s ease-in-out";
    card.style.top = "0";
  }

  // Add event listeners to animate card on mouse enter and mouse leave
  valentinesDayCard.addEventListener("mouseenter", animateCardUp);
  valentinesDayCard.addEventListener("mouseleave", animateCardDown);
});
