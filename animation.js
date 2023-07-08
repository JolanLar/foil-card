const cards = document.getElementById("card").childNodes
cards.forEach((card) => {
    card.onmousemove = (e) => cardHover(e, card);
    card.onmouseleave = (e) => cardMouseOut(e, card);
})

let hoverNumber = 0;

let rotationLevel = 70;

let x = .5
let y = .5
const speed = .015

let followMouseInterval = new Interval();
let followMouseTimeout = 0;

function cardHover(e, card, customSpeed = null) {
    clearTimeout(followMouseTimeout);

    const rotateSpeed = (customSpeed !== null) ? customSpeed : speed;

    const rect = card.getBoundingClientRect()

    const newX = (e.clientX - rect.left)/card.offsetWidth
    if (newX > x) {
        x += Math.min(rotateSpeed, newX - x);
    } else {
        x += Math.max(-rotateSpeed, newX - x);
    }

    const newY = (e.clientY - rect.top)/card.offsetHeight
    if (newY > y) {
        y += Math.min(rotateSpeed, newY - y);
    } else {
        y += Math.max(-rotateSpeed, newY - y);
    }

    // If the rotation don't match the cursor position yet, start interval for rotate the card slowly
    if ((Math.abs(newX - x) > .01 || Math.abs(newY - y) > .01) && !followMouseInterval.isRunning()) {
        followMouseTimeout = setTimeout(()=>{
            followMouseInterval.start(() => {cardHover(e, card, .01)}, 7);
        }, 15);
    } else if (!(Math.abs(newX - x) > .01 || Math.abs(newY - y) > .01) && followMouseInterval.isRunning()) {
        followMouseInterval.stop();
    }

    // Play one time every 3 trigger for perf improvement :)
    if (!followMouseInterval.isRunning()) {
        if (hoverNumber < 2) {
            hoverNumber++;
            return
        }
        hoverNumber = 0
    }

    const xMid = x-0.5;
    const yMid = y-0.5;

    const pointerX = x*100;
    const pointerY = y*100;

    const fromCenter = (Math.abs(xMid) + Math.abs(yMid)) / 2

    const rotateX = yMid*rotationLevel;
    const rotateY = -xMid*rotationLevel;

    card.style.cssText = `
            --pointer-x:${pointerX}%;
            --pointer-y:${pointerY}%;
            --pointer-from-left:${x};
            --pointer-from-top:${y};
            --card-opacity:1;
            --pointer-from-center: ${fromCenter};
            --rotate-x:${rotateX}deg;
            --rotate-y:${rotateY}deg;
            `
}

function cardMouseOut(e, card) {
    clearTimeout(followMouseTimeout)
    followMouseInterval.stop();
    followMouseInterval.start(() => {
        cardHover({
            clientX: card.getBoundingClientRect().left+card.offsetWidth/2,
            clientY: card.getBoundingClientRect().top+card.offsetHeight/2,
        }, card, 0.01)}, 7);
    // followMouseInterval.stop()
    // x = .5
    // y = .5
    // card.style.cssText = `
    //     --pointer-x:50%;
    //     --pointer-y:50%;
    //     --pointer-from-left:.5;
    //     --pointer-from-top:.5;
    //     --card-opacity:0;
    //     --pointer-from-center: 0;
    //     --rotate-x:0deg;
    //     --rotate-y:0deg;
    // `
}

function Interval() {
    let timer = false;
    this.start = function (fn, time) {
        if (!this.isRunning())
            timer = setInterval(fn, time);
    };
    this.stop = function () {
        clearInterval(timer);
        timer = false;
    };
    this.isRunning = function () {
        return timer !== false;
    };
}