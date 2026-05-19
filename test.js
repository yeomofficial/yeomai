// === Spot Button Toggle Logic ===
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('spot-btn')) {
    const btn = e.target;
    
    if (btn.innerText === "Spot") {
      btn.innerText = "Spotted";
      btn.style.background = "white";
      btn.style.color = "black";
      btn.style.border = "2px solid black";
    } else {
      btn.innerText = "Spot";
      btn.style.background = "black";
      btn.style.color = "white";
      btn.style.border = "none";
    }
  }
});
