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

    if (menuMusic.paused) {

        menuMusic.volume = 0.4;

        menuMusic.play()
            .then(() => {
                console.log("Menu music started.");
            })
            .catch(error => {
                console.log("Autoplay blocked.");
            });

    }

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

    // Browser autoplay policies may prevent
    // music from starting automatically.
    startMenuMusic();

}


/* ==========================================
   START APPLICATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeMenu
);