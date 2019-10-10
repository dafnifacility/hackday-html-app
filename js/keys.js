var keyPressed = false;

function keyDown(event) {
  console.log("pressed:",keyPressed)
  if (!keyPressed) {
    if (event.key.toLowerCase() == "w") {
      console.log("Forward")
      keyPressed = true;
    } else if (event.key.toLowerCase() == "a") {
      console.log("Left")
      keyPressed = true;
    } else if (event.key.toLowerCase() == "s") {
      console.log("Backward")
      keyPressed = true;
    } else if (event.key.toLowerCase() == "d") {
      console.log("Right")
      keyPressed = true;
    }
  }
}

function keyUp(event) {
  if (keyPressed) {
    if (
      event.key.toLowerCase() == "w" ||
      event.key.toLowerCase() == "a" ||
      event.key.toLowerCase() == "s" ||
      event.key.toLowerCase() == "d"
    ) {
      console.log("Stop")
      keyPressed = false;
    }
  }
}

window.addEventListener("keydown", (e) => keyDown(e))
window.addEventListener("keyup", (e) => keyUp(e))

