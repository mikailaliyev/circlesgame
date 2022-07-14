const scorePlace = document.getElementById("score")
const stopwatchArea = document.getElementById("stopwatch")
let score = 0
let stopwatch = 0
let clickCounter = 0
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//Making canvas size equal to window if resize detected
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

//Making an object for mouse coordinates
const mouse = {
  x: null,
  y: null,
}

//Making an object for old mouse coordinates
const mouseOld = {
  x: null,
  y: null,
}

//creating stopwatch
const startStopwatch = () => {
  setInterval(() => {
    stopwatch++;
    stopwatchArea.innerText = `Stopwatch: ${stopwatch}`
    if (stopwatch == 10 && score < 10) {
      alert("You LOST!")
      clearInterval(startStopwatch(), 1000)
      location.reload()
    }
  }, 1000)
}


//Getting mouse coordinates and drawind a circle based on that info
canvas.addEventListener('click', (event) => {
  clickCounter++
  if (clickCounter <= 1) {
    startStopwatch()
  }

  mouseOld.x = mouse.x
  mouseOld.y = mouse.y
  mouse.x = event.x;
  mouse.y = event.y
  drawCircle()


  if (((Math.abs(mouseOld.x - event.x) <= 50 && Math.abs(mouseOld.y - event.y) <= 50))
    && ((Math.abs(mouseOld.x - event.x) > 5 && Math.abs(mouseOld.y - event.y) > 5))) {
    score++;
    scorePlace.innerText = score
  }
})

//Changing circle colors randomly
const changingColors = () => {
  const mathRandom1 = Math.floor(Math.random() * 255) + 0
  const mathRandom2 = Math.floor(Math.random() * 255) + 0
  const mathRandom3 = Math.floor(Math.random() * 255) + 0

  let randomNumber1 = mathRandom1 < 10 ? '0' + mathRandom1 : mathRandom1
  let randomNumber2 = mathRandom2 < 10 ? '0' + mathRandom2 : mathRandom2
  let randomNumber3 = mathRandom3 < 10 ? '0' + mathRandom3 : mathRandom3
  return `${randomNumber1},${randomNumber2},${randomNumber3}`

}


//Drawing a circle
const drawCircle = () => {
  ctx.strokeStyle = `rgb(${changingColors()})`
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2)
  ctx.stroke()
}