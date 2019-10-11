var wPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;

function keyDown(event) {
  if (!aPressed && !sPressed && !dPressed && event.key.toLowerCase() == "w") {
    console.log("Forward")
    wPressed = true;
  } else if (!wPressed && !sPressed && !dPressed && event.key.toLowerCase() == "a") {
    console.log("Left")
    aPressed = true;
  } else if (!aPressed && !wPressed && !dPressed && event.key.toLowerCase() == "s") {
    console.log("Backward")
    sPressed = true;
  } else if (!aPressed && !sPressed && !wPressed && event.key.toLowerCase() == "d") {
    console.log("Right")
    dPressed = true;
  }
}

function keyUp(event) {
  if (event.key.toLowerCase() == "w") {
    console.log("Forward Up")
    wPressed = false;
  } else if (event.key.toLowerCase() == "a") {
    console.log("Left Up")
    aPressed = false;
  } else if (event.key.toLowerCase() == "s") {
    console.log("Backward Up")
    sPressed = false;
  } else if (event.key.toLowerCase() == "d") {
    console.log("Right Up")
    dPressed = false;
  }
}

window.addEventListener("keydown", (e) => keyDown(e))
window.addEventListener("keyup", (e) => keyUp(e))

