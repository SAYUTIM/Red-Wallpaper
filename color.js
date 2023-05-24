let isFullscreen = false;
let currentColor = "red";
let input = "";

const enterFullscreen = () => {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullscreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;

  if (requestFullscreen) {
    requestFullscreen.call(docEl);
    isFullscreen = true;
  }
};

const changeBackgroundColor = (color) => {
  document.body.style.backgroundColor = color;
};

const toggleColor = () => {
  if (currentColor === "red") {
    currentColor = "white";
  } else {
    currentColor = "red";
  }

  changeBackgroundColor(currentColor);
};

const addBlueAndRedLight = (color) => {
  changeBackgroundColor("blue");
  setTimeout(() => {
    toggleColor();
    setTimeout(() => {
      changeBackgroundColor(color);
    }, 150);
  }, 150);
};

document.addEventListener("click", () => {
  if (!isFullscreen) {
    enterFullscreen();
  }
  toggleColor();
});

document.addEventListener("keydown", (event) => {
  if (!isFullscreen) {
    enterFullscreen();
  }

  const keyPressed = event.key.toLowerCase();

  if (/^[0-9a-f]$/.test(keyPressed)) {
    input += keyPressed;
    if (input.length === 6) {
      const newColor = "#" + input;
      addBlueAndRedLight(newColor);
      currentColor = newColor;
      input = "";
    }
  }
});