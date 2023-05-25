let isFullscreen = false;
let current = "white";
let previous = "";
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
  if (!previous){
    if (current === "red") {
      current = "white";
    } else {
      current = "red";
    }
  } else {
    if (current === "white") {
      current = previous;
    } else {
      current = "white";
    }
  }

  changeBackgroundColor(current);
};

const flash = (color) => {
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
      previous = newColor;
      flash(newColor);
      current = newColor;
      input = "";
    }
  }
});
