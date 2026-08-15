const editButton = document.getElementById("editProfile");

editButton.addEventListener("click", () => {
  editButton.textContent =
    editButton.textContent === "Edit Profile" ? "Editing..." : "Edit Profile";
});

// Small touch-friendly horizontal card scrolling.
// The cards can also be swiped naturally on mobile.
const friendScroll = document.querySelector(".friend-scroll");

friendScroll.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      friendScroll.scrollLeft += event.deltaY;
    }
  },
  { passive: false }
);
