/* ==========================================
   GET HTML ELEMENTS
========================================== */

const playButton =
    document.getElementById("playButton");

const menuButton =
    document.getElementById("menuButton");

const rulesButton =
    document.getElementById("rulesButton");

const menuMusic =
    document.getElementById("menuMusic");

const buttonClickSound =
    document.getElementById("buttonClickSound");


/* ==========================================
   PLAY BUTTON SOUND
========================================== */

function playButtonSound() {

    buttonClickSound.currentTime = 0;

    buttonClickSound.play()
        .catch(error => {
            console.log(
                "Button sound could not play:",
                error
            );
        });
}


/* ==========================================
   START MENU MUSIC
========================================== */

function startMenuMusic() {

        menuMusic.volume = 0.4;

        menuMusic.play()
            .then(() => {
                console.log("Menu music started.");
            })
            .catch(error => {
                console.log("Autoplay blocked.");
            });

    }

/* ==========================================
   HANDLE PLAY BUTTON
========================================== */

function handlePlayButton() {

    startMenuMusic();

    playButtonSound();

    setTimeout(function () {
        window.location.href = "game.html";
    }, 10);

}


/* ==========================================
   HANDLE MENU BUTTON
========================================== */

function handleMenuButton() {

    playButtonSound();

    setTimeout(function () {

        window.location.href =
            "level-menu.html";

    }, 176);

}

/* ==========================================
   HANDLE RULES BUTTON
========================================== */

/* ==========================================
   HANDLE RULES BUTTON
========================================== */

function handleRulesButton() {

    playButtonSound();

    setTimeout(function () {

        window.location.href =
            "rules.html";

    }, 176);

}


/* ==========================================
   ADD BUTTON EVENTS
========================================== */

function initializeButtonEvents() {

    playButton.addEventListener(
        "click",
        handlePlayButton
    );


    menuButton.addEventListener(
        "click",
        handleMenuButton
    );


    rulesButton.addEventListener(
        "click",
        handleRulesButton
    );

}


/* ==========================================
   INITIALIZE GAME MENU
========================================== */

function initializeMenu() {

    initializeButtonEvents();

    checkOrientation();

    window.addEventListener(
        "resize",
        checkOrientation
    );

    window.addEventListener(
        "orientationchange",
        checkOrientation
    );

    // Start music on the first user interaction
    
        startMenuMusic();
        

}
/* ==========================================
   MOBILE LANDSCAPE CHECK
========================================== */

const rotateScreen =
    document.getElementById("rotateScreen");

const gameContent =
    document.getElementById("gameContent");

function isMobileDevice() {

    return /Android|iPhone|iPad|iPod|Mobile/i.test(
        navigator.userAgent
    );

}

function checkOrientation() {

    // Desktop → Always show game
    if (!isMobileDevice()) {

        rotateScreen.style.display = "none";
        gameContent.style.display = "block";

        return;

    }

    // Mobile Portrait
    if (window.innerHeight > window.innerWidth) {

        rotateScreen.style.display = "flex";
        gameContent.style.display = "none";

    }

    // Mobile Landscape
    else {

        rotateScreen.style.display = "none";
        gameContent.style.display = "block";

    }

}

/* ==========================================
   START APPLICATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeMenu
);
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("service-worker.js");

    });

}