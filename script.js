const carousel = document.querySelector(".carousel")
  

let isDragging = false, startX, scrollLeft;


carousel.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mousemove", e => {
  if (isDragging) carousel.scrollLeft = scrollLeft - (e.pageX - startX) * 2;
});

carousel.addEventListener("mouseup", () => isDragging = false);

