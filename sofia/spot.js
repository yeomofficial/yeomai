const spotButton = document.querySelector(".spot-btn");

spotButton.addEventListener("click", function () {

  if (spotButton.innerText === "Spot") {

    spotButton.innerText = "Spotted";

    spotButton.style.background = "white";
    spotButton.style.color = "black";
    spotButton.style.border = "2px solid black";

  } else {

    spotButton.innerText = "Spot";

    spotButton.style.background = "black";
    spotButton.style.color = "white";
    spotButton.style.border = "2px solid black";
  }

});
