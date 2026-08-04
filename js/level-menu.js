/* ==================================================
   LEVEL SETTINGS
================================================== */

/*
    Change this number when you want to add more levels.
*/

const TOTAL_LEVELS = 10;


/*
    This is the level the player has currently reached.

    For your current design:
    Level 1 = completed
    Level 2 = current
    Level 3-10 = locked
*/

let currentLevel =
    Number(
        localStorage.getItem("currentLevel")
    ) || 1;


let completedLevels =
    JSON.parse(
        localStorage.getItem("completedLevels")
    ) || [];


/* ==================================================
   HTML ELEMENTS
================================================== */

const levelPathContainer =
    document.getElementById("levelPathContainer");

const backButton =
    document.getElementById("backButton");

const levelMenuMusic =
    document.getElementById("levelMenuMusic");

const buttonClickSound =
    document.getElementById("buttonClickSound");


/* ==================================================
   PLAY CLICK SOUND
================================================== */

function playClickSound() {

    buttonClickSound.currentTime = 0;

    buttonClickSound.play()
        .catch(error => {

            console.log(
                "Click sound could not play.",
                error
            );

        });
}


/* ==================================================
   CREATE LEVEL PATH
================================================== */

function createLevelPath() {

    /*
        Create main path container.
    */

    const levelPath =
        document.createElement("div");

    levelPath.classList.add("level-path");


    /*
        Create green progress line.
    */

    const completedProgress =
        document.createElement("div");

    completedProgress.classList.add(
        "completed-progress"
    );

    levelPath.appendChild(
        completedProgress
    );


    /*
        Create every level.
    */

    for (
        let levelNumber = 1;
        levelNumber <= TOTAL_LEVELS;
        levelNumber++
    ) {

        const levelItem =
            createLevelItem(levelNumber);

        levelPath.appendChild(levelItem);

    }


    /*
        Add everything to page.
    */

    levelPathContainer.appendChild(levelPath);


    /*
        Update green progress line.
    */

    updateProgressLine(
        completedProgress
    );
}


/* ==================================================
   CREATE ONE LEVEL
================================================== */

function createLevelItem(levelNumber) {

    /*
        Main level container.
    */

    const levelItem =
        document.createElement("div");

    levelItem.classList.add(
        "level-item"
    );


    /*
        Determine the state of this level.
    */

    const isCompleted =
        completedLevels.includes(levelNumber);

    const isCurrent =
        levelNumber === currentLevel;

    const isUnlocked =
        levelNumber <= currentLevel;


    /*
        Add state classes.
    */

    if (isCompleted) {

        levelItem.classList.add(
            "completed"
        );

    }

    if (isCurrent) {

        levelItem.classList.add(
            "current"
        );

    }

    if (isUnlocked) {

        levelItem.classList.add(
            "available"
        );

    }

    if (!isUnlocked) {

        levelItem.classList.add(
            "locked"
        );

    }


    /* ==================================================
       LEVEL BUTTON
    =================================================== */

    const levelButton =
        document.createElement("button");

    levelButton.classList.add(
        "level-button"
    );

    levelButton.textContent =
        `L-${levelNumber}`;


    /*
        Locked level.
    */

    if (!isUnlocked) {

        levelButton.disabled = true;

    }


    /*
        Click available level.
    */

    if (isUnlocked) {

        levelButton.addEventListener(
            "click",
            function () {

                playClickSound();

                startLevel(levelNumber);

            }
        );

    }


    levelItem.appendChild(
        levelButton
    );


    /* ==================================================
       LOCK ICON
    =================================================== */

    if (!isUnlocked) {

        const lockIcon =
            document.createElement("div");

        lockIcon.classList.add(
            "lock-icon"
        );

        lockIcon.textContent = "🔒";

        levelItem.appendChild(
            lockIcon
        );

    }


    /* ==================================================
       PLAY BUTTON
    =================================================== */

    if (isUnlocked) {

        const playButton =
            document.createElement("button");

        playButton.classList.add(
            "play-button"
        );

        playButton.textContent =
            "Play";


        playButton.addEventListener(
            "click",
            function (event) {

                /*
                    Prevent level button from
                    also receiving this click.
                */

                event.stopPropagation();

                playClickSound();

                startLevel(levelNumber);

            }
        );


        levelItem.appendChild(
            playButton
        );

    }


    return levelItem;
}



/* ==================================================
   START LEVEL
================================================== */

function startLevel(levelNumber) {

    const clickedButton =
        document.activeElement;

    if (
        clickedButton &&
        clickedButton.classList.contains("level-button")
    ) {

        clickedButton.classList.add("clicked");

    }
    /*
        Save selected level.

        The game page can read this later.
    */

    localStorage.setItem(
        "selectedLevel",
        levelNumber
    );


    /*
        Go to actual game page.
    */

    setTimeout(
        function () {

            window.location.href =
                "game.html";

        },
        100
    );

}


/* ==================================================
   UPDATE GREEN PROGRESS
================================================== */

function updateProgressLine(
    completedProgress
) {

    /*
        Number of completed levels.
    */

    const completedCount =
        completedLevels.length;


    /*
        Calculate approximate progress.

        We use 10 levels initially, but the
        calculation automatically adapts.
    */

    const progressPercentage =
        (
            completedCount /
            (TOTAL_LEVELS - 1)
        ) * 100;


    completedProgress.style.width =
        `${progressPercentage}%`;

}
/* ==================================================
   AUTO SCROLL TO CURRENT LEVEL
================================================== */

function scrollToCurrentLevel() {

    const currentLevelItem =
        document.querySelector(".level-item.current");

    if (!currentLevelItem) return;

    currentLevelItem.scrollIntoView({

        behavior: "instant",

        inline: "center",

        block: "nearest"

    });

}

/* ==================================================
   START BACKGROUND MUSIC
================================================== */

function startLevelMenuMusic() {

    levelMenuMusic.volume = 0.4;


    levelMenuMusic.play()
        .then(function () {

            console.log(
                "Level menu music started."
            );

        })
        .catch(function () {

            /*
                Browser may block autoplay.

                We will try again after the
                first user interaction.
            */

            console.log(
                "Music autoplay blocked."
            );

        });

}


/* ==================================================
   START MUSIC AFTER USER INTERACTION
================================================== */

function enableMusicAfterInteraction() {

    startLevelMenuMusic();

}


/* ==================================================
   BACK BUTTON
================================================== */

function handleBackButton() {

    playClickSound();


    setTimeout(
        function () {

            window.location.href =
                "index.html";

        },
        150
    );

}


/* ==================================================
   ADD EVENTS
================================================== */

function initializeEvents() {

    /*
        Back button.
    */

    backButton.addEventListener(
        "click",
        handleBackButton
    );


    /*
        Try music immediately.
    */

    startLevelMenuMusic();


    /*
        If browser blocked autoplay,
        try again after first click.
    */

    document.addEventListener(
        "click",
        enableMusicAfterInteraction,
        {
            once: true
        }
    );

}


/* ==================================================
   INITIALIZE PAGE
================================================== */

function initializeLevelMenu() {

    createLevelPath();

    initializeEvents();

    setTimeout(() => {

        scrollToCurrentLevel();

    }, 100);

}


/* ==================================================
   START
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeLevelMenu
);