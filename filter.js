// JavaScript for image swiping
const container = document.getElementById("image-container");
const images = container.getElementsByClassName("image");
const numImages = images.length;
let centerIndex = 1; // Set the initial center image index to 1

function makeImageActive(index) {
  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove("center");
    images[i].querySelector("button").classList.remove("active");
    images[i].style.zIndex = 0; // Reset the z-index of all images
  }
  images[index].classList.add("center");
  images[index].querySelector("button").classList.add("active");
  images[index].style.zIndex = 1; // Set the z-index of the center image

  // Call the API based on the selected filterId
  const filterId = images[index].dataset.filterId;
  const deviceId = "111";
  callFilterAPI(deviceId, filterId);
}

// Click event listener to make an image active when clicked
container.addEventListener("click", function (event) {
  const clickedImage = event.target.closest(".image");
  if (clickedImage) {
    const index = Array.from(images).indexOf(clickedImage);
    makeImageActive(index);
  }
});

// Swipe functionality
container.addEventListener("touchstart", handleTouchStart, false);
container.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(event) {
  const firstTouch = event.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!xDown || !yDown) {
    return;
  }

  const xUp = event.touches[0].clientX;
  const yUp = event.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      swipeImage("left");
    } else {
      swipeImage("right");
    }
  }

  xDown = null;
  yDown = null;
}

function swipeImage(direction) {
  images[centerIndex].classList.remove("center");
  images[centerIndex].querySelector("button").classList.remove("active");
  images[centerIndex].style.zIndex = 0; // Reset the z-index of the current center image

  if (direction === "left") {
    centerIndex = (centerIndex + 1) % numImages;
  } else {
    centerIndex = (centerIndex - 1 + numImages) % numImages;
  }

  images[centerIndex].classList.add("center");
  images[centerIndex].querySelector("button").classList.add("active");
  images[centerIndex].style.zIndex = 1; // Set the z-index of the new center image

  // Call the API based on the selected filterId
  const filterId = images[centerIndex].dataset.filterId;
  const deviceId = "111";
  callFilterAPI(deviceId, filterId);
}

function callFilterAPI(deviceId, filterId) {
  // Make a request to the backend API
  fetch(`http://localhost:3000/api/filter/${deviceId}/${filterId}`)
    .then((response) => {
      if (response.ok) {
        console.log(
          `Filter API called for deviceId: ${deviceId}, filterId: ${filterId}`
        );
      } else {
        console.error("Failed to call the Filter API");
      }
    })
    .catch((error) => {
      console.error("Error calling the Filter API:", error);
    });
}

var seconds = 120;
var countdown = setInterval(function () {
  var timerElement = document.getElementById("timer");
  timerElement.innerText = formatTime(seconds);

  if (seconds <= 30) {
    timerElement.style.color = "#fe0000";
    timerElement.style.textShadow = "3px 3px 6px rgba(0, 0, 0, 0.5)";
  }

  if (seconds <= 0) {
    clearInterval(countdown);
    timerElement.innerText = "Time up! 😔";
    timerElement.style.color = "black";
    timerElement.style.textShadow = "none";
    var endMsgElement = document.getElementById("end-msg");
    endMsgElement.innerHTML = "Please try again!";
    endMsgElement.style.fontFamily = "Arial, sans-serif";
    endMsgElement.style.fontSize = "60px";
    endMsgElement.style.fontWeight = "bold";
    endMsgElement.style.color = "#333333";
    endMsgElement.style.textShadow = "3px 3px 6px rgba(0, 0, 0, 0.5)";

    // Hide the capture button after timeout
    var captureButton = document.getElementById("capture-button");
    captureButton.style.display = "none";
  }
  seconds--;
}, 1000);

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return (
    minutes.toString().padStart(2, "0") +
    ":" +
    remainingSeconds.toString().padStart(2, "0")
  );
}

function captureImage() {
  var captureButton = document.querySelector(".capture-button");
  captureButton.disabled = true;

  var captureMsg = document.getElementById("capture-msg");
  var experienceMsg = document.getElementById("experience-msg");

  captureMsg.innerHTML = "Image capture in progress... 🎞 ";
  captureMsg.style.visibility = "hidden";

  // Call the API to capture the image
  const deviceId = "111";
  fetch(`http://localhost:3000/api/take_picture/${deviceId}`)
    .then((response) => {
      if (response.ok) {
        console.log("Image capture API called successfully");
        // Wait for 4 seconds before hiding the capture message
        setTimeout(function () {
          captureMsg.style.animation = "fadeout 1s forwards";

          // Wait for the fadeout animation to complete before showing the success message
          setTimeout(function () {
            // captureMsg.style.visibility = 'hidden';
            experienceMsg.innerHTML =
              "Image captured successfully  ✔ <br>Hope you had a great experience 😃";
            experienceMsg.style.visibility = "visible";
            experienceMsg.style.animation = "fadein 2s forwards";
          }, 1000);
        }, 4000);
      } else {
        console.error("Failed to call the Image capture API");
        // Display error message
        captureMsg.style.animation = "fadeout 1s forwards";

        // Wait for the fadeout animation to complete before hiding the capture message
        setTimeout(function () {
          captureMsg.style.visibility = "hidden";
          experienceMsg.innerHTML =
            "Failed to capture image. Please try again.";
          experienceMsg.style.visibility = "visible";
          experienceMsg.style.animation = "fadeinout 20s forwards";
        }, 1000);
      }
    })
    .catch((error) => {
      console.error("Error calling the Image capture API:", error);
      // Display error message
      captureMsg.style.animation = "fadeout 1s forwards";

      // Wait for the fadeout animation to complete before hiding the capture message
      setTimeout(function () {
        captureMsg.style.visibility = "hidden";
        experienceMsg.innerHTML =
          "Failed to capture image. Please try again.";
        experienceMsg.style.visibility = "visible";
        experienceMsg.style.animation = "fadeinout 20s forwards";
      }, 1000);
    })
    .finally(() => {
      setTimeout(function () {
        experienceMsg.style.visibility = "hidden";
        experienceMsg.style.animation = "";
        captureButton.disabled = false;
      }, 5000);
    });
}