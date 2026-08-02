/* ==================================================
   MEMORY ROYALS
   MAIN GAME LOGIC
================================================== */


/* ==================================================
   GAME STATE
================================================== */

let selectedLevel = 1;

let levelConfig = null;

let currentKingTarget = 3;

let foundKings = 0;

let chances = 3;

let timeLeft = 50;

let timerInterval = null;

let gameStarted = false;

let gameEnded = false;

let dangerMode = false;

let activeSounds = [];
/* ==================================================
   FIRST-TIME SPECIAL EVENTS
================================================== */

const firstTimeEvents = {

    bomb:
        localStorage.getItem("bombTutorial") === "true",

    joker:
        localStorage.getItem("jokerTutorial") === "true",

    fool:
        localStorage.getItem("foolTutorial") === "true",

    clock:
        localStorage.getItem("clockTutorial") === "true"

};

/* ==================================================
   GET HTML ELEMENTS
================================================== */

const gameBoard =
    document.getElementById(
        "gameBoard"
    );

const levelNumber =
    document.getElementById(
        "levelNumber"
    );

const kingCounter =
    document.getElementById(
        "kingCounter"
    );

const chanceCounter =
    document.getElementById(
        "chanceCounter"
    );

const timerDisplay =
    document.getElementById(
        "timer"
    );

const gameMessage =
    document.getElementById(
        "gameMessage"
    );

const popupOverlay =
    document.getElementById(
        "popupOverlay"
    );

const popupTitle =
    document.getElementById(
        "popupTitle"
    );

const popupText =
    document.getElementById(
        "popupText"
    );

const popupButton =
    document.getElementById(
        "popupButton"
    );
const popupIcon =
    document.getElementById("popupIcon");


const gameMusic =
    document.getElementById(
        "gameMusic"
    );

const dangerMusic =
    document.getElementById(
        "dangerMusic"
    );
const memoriseMessage =
    document.getElementById("memoriseMessage");

const sideFeedback =
    document.getElementById("sideFeedback");
const fireworks =
    document.getElementById("fireworks");
/* ==================================================
   GET SELECTED LEVEL
================================================== */
function showMemoriseMessage() {

    memoriseMessage.classList.remove("show");

    /*
        Reset the animation so it can
        play every time.
    */
    void memoriseMessage.offsetWidth;

    memoriseMessage.classList.add("show");
}
function getSelectedLevel() {

    const storedLevel =
        Number(
            localStorage.getItem(
                "selectedLevel"
            )
        );


    if (
        storedLevel >= 1 &&
        storedLevel <= 10
    ) {

        return storedLevel;

    }


    return 1;

}


/* ==================================================
   LOAD LEVEL
================================================== */

function loadLevel() {

    selectedLevel =
        getSelectedLevel();

    levelConfig =
        generateLevelConfig(selectedLevel);

    currentKingTarget =
        levelConfig.kingTarget;

    foundKings = 0;

    chances =
        levelConfig.chances;

    timeLeft =
        levelConfig.time;

}


/* ==================================================
   RESET SPECIAL EVENT TRACKING
================================================== */


/* ==================================================
   UPDATE HUD
================================================== */

function updateHUD() {

    levelNumber.textContent =
        selectedLevel;


    kingCounter.textContent =
        `${foundKings}/${currentKingTarget}`;


    chanceCounter.textContent =
        chances;


    timerDisplay.textContent =
        timeLeft;

}


/* ==================================================
   CREATE TILE TYPES
================================================== */

function createTileTypes() {

    const tileTypes = [];

    const tileCounts =
        levelConfig.tileCounts;


    for (
        const type in tileCounts
    ) {

        for (

            let i = 0;

            i < tileCounts[type];

            i++

        ) {

            tileTypes.push(type);

        }

    }

    shuffleArray(tileTypes);

    let attempts = 0;

    while (!isGoodBoard(tileTypes) && attempts < 500) {

        shuffleArray(tileTypes);

        attempts++;

    }

    if (attempts >= 500) {

        console.error("Couldn't generate a valid board.");

    }

    return tileTypes;

}

/* ==========================================
   BOARD VALIDATION
========================================== */

function isGoodBoard(board) {

    const size = 5;

    const directions = [

        [-1, 0],   // Up
        [1, 0],    // Down
        [0, -1],   // Left
        [0, 1]     // Right

    ];


    /* ======================================
       Bombs should never touch
    ====================================== */

    for (let i = 0; i < board.length; i++) {

        if (board[i] !== "bomb") {

            continue;

        }

        const row = Math.floor(i / size);
        const col = i % size;

        for (const [dr, dc] of directions) {

            const r = row + dr;
            const c = col + dc;

            if (

                r < 0 ||
                r >= size ||
                c < 0 ||
                c >= size

            ) {

                continue;

            }

            const index = r * size + c;

            if (board[index] === "bomb") {

                return false;

            }

        }

    }


    /* ======================================
       Hearts should never touch
    ====================================== */

    for (let i = 0; i < board.length; i++) {

        if (board[i] !== "heart") {

            continue;

        }

        const row = Math.floor(i / size);
        const col = i % size;

        for (const [dr, dc] of directions) {

            const r = row + dr;
            const c = col + dc;

            if (

                r < 0 ||
                r >= size ||
                c < 0 ||
                c >= size

            ) {

                continue;

            }

            const index = r * size + c;

            if (board[index] === "heart") {

                return false;

            }

        }

    }


    /* ======================================
       Clocks should never touch
    ====================================== */

    for (let i = 0; i < board.length; i++) {

        if (board[i] !== "clock") {

            continue;

        }

        const row = Math.floor(i / size);
        const col = i % size;

        for (const [dr, dc] of directions) {

            const r = row + dr;
            const c = col + dc;

            if (

                r < 0 ||
                r >= size ||
                c < 0 ||
                c >= size

            ) {

                continue;

            }

            const index = r * size + c;

            if (board[index] === "clock") {

                return false;

            }

        }

    }

    for (let row = 0; row < size; row++) {

        for (let col = 0; col < size - 2; col++) {

            const a = board[row * size + col];
            const b = board[row * size + col + 1];
            const c = board[row * size + col + 2];

            if (
                a === "king" &&
                b === "king" &&
                c === "king"
            ) {
                return false;
            }

        }

    }
    for (let col = 0; col < size; col++) {

        for (let row = 0; row < size - 2; row++) {

            const a = board[row * size + col];
            const b = board[(row + 1) * size + col];
            const c = board[(row + 2) * size + col];

            if (
                a === "king" &&
                b === "king" &&
                c === "king"
            ) {
                return false;
            }

        }

    }
    for (let row = 0; row < size - 2; row++) {

        for (let col = 0; col < size - 2; col++) {

            const a = board[row * size + col];
            const b = board[(row + 1) * size + col + 1];
            const c = board[(row + 2) * size + col + 2];

            if (
                a === "king" &&
                b === "king" &&
                c === "king"
            ) {
                return false;
            }

        }

    }
    for (let row = 0; row < size - 2; row++) {

        for (let col = 2; col < size; col++) {

            const a = board[row * size + col];
            const b = board[(row + 1) * size + col - 1];
            const c = board[(row + 2) * size + col - 2];

            if (
                a === "king" &&
                b === "king" &&
                c === "king"
            ) {
                return false;
            }

        }

    }
    for (let row = 0; row < size - 1; row++) {

        for (let col = 0; col < size - 1; col++) {

            let kings = 0;

            if (board[row * size + col] === "king") kings++;
            if (board[row * size + col + 1] === "king") kings++;
            if (board[(row + 1) * size + col] === "king") kings++;
            if (board[(row + 1) * size + col + 1] === "king") kings++;

            if (kings >= 3) {
                return false;
            }
        }
    }
    return true;
}

    
    
/* ==================================================
   SHUFFLE
================================================== */

function shuffleArray(array) {

    for (

        let i = array.length - 1;

        i > 0;

        i--

    ) {

        const randomIndex = Math.floor(

            Math.random() * (i + 1)

        );


        [

            array[i],

            array[randomIndex]

        ] = [

            array[randomIndex],

            array[i]

        ];

    }

    return array;

}

/* ==================================================
   RANDOM INTEGER
================================================== */

function randomInt(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* ==================================================
   RANDOM LEVEL GENERATOR
================================================== */

function generateLevelConfig(level) {

    const difficulty =
    LEVEL_DIFFICULTY[level];


    while (true) {

        const totalKings =
            randomInt(
                difficulty.minKings,
                difficulty.maxKings
            );

        const bombs =
            randomInt(
                difficulty.minBombs,
                difficulty.maxBombs
            );

        /*
            Kings must always be enough.
        */

        const maxTarget =
            totalKings - bombs;

        if (
            maxTarget <
            difficulty.minTargetKings
        ) {

            continue;

        }


        const kingTarget =
            randomInt(

                difficulty.minTargetKings,

                Math.min(
                    difficulty.maxTargetKings,
                    maxTarget
                )

            );


        const jokers =
            randomInt(
                difficulty.minJokers,
                difficulty.maxJokers
            );

        const hearts =
            randomInt(
                difficulty.minHearts,
                difficulty.maxHearts
            );

        const clocks =
            randomInt(
                difficulty.minClocks,
                difficulty.maxClocks
            );

        const chances =
            randomInt(
                difficulty.minChances,
                difficulty.maxChances
            );


        /*
            Player should always have
            at least TWO chances left.
        */



        const time =
            randomInt(
                difficulty.minTime,
                difficulty.maxTime
            );


        const fools =

            25 -

            (

                totalKings +

                bombs +

                jokers +

                hearts +

                clocks

            );


        if (
            fools < 0
        ) {

            continue;

        }
        /* ==========================================
        BALANCED BOARD CHECKS
        ========================================== */

       // Minimum Fool tiles based on level
        if (level < 6) {

            if (fools < 6) {
                continue;
            }

        }
        else {

            // Levels 8-10
            if (fools < 3) {
                continue;
            }

        }

        // Never allow too many Fool tiles.
        if (fools > 15) {

            continue;

        }

        // Too many special tiles makes the board chaotic.
        const specialTiles =
            totalKings +
            bombs +
            jokers +
            hearts +
            clocks;

        if (level < 6 && specialTiles > 19) {
            continue;
        }

        
        // Prevent impossible King requirements.
        if (kingTarget > totalKings - bombs) {

            continue;

        }

        
        return {

            kingTarget,

            chances,

            time,

            tileCounts: {

                king: totalKings,

                bomb: bombs,

                joker: jokers,

                heart: hearts,

                clock: clocks,

                fool: fools

            }

        };

    }

}


/* ==================================================
   CREATE GAME BOARD
================================================== */

function createGameBoard() {

    gameBoard.innerHTML = "";


    const tileTypes =
        createTileTypes();


    tileTypes.forEach(
        function (type, index) {

            const tile =
                createTile(
                    type,
                    index
                );


            gameBoard.appendChild(
                tile
            );

        }
    );

}


/* ==================================================
   CREATE TILE
================================================== */

function createTile(
    type,
    index
) {

    const tile =
        document.createElement(
            "button"
        );


    tile.type =
        "button";


    tile.classList.add(
        "tile",
        "hidden"
    );


    tile.dataset.type =
        type;


    tile.dataset.index =
        index;


    tile.addEventListener(
        "click",
        function () {

            handleTileClick(
                tile
            );

        }
    );


    return tile;

}


/* ==================================================
   REVEAL IMAGE
================================================== */

function revealTileImage(
    tile
) {

    const type =
        tile.dataset.type;


    const imagePath =
        TILE_IMAGES[type];


    if (!imagePath) {

        return;

    }


    tile.classList.remove(
        "hidden"
    );


    if (
        tile.querySelector(
            ".tile-image"
        )
    ) {

        return;

    }


    const image =
        document.createElement(
            "img"
        );


    image.src =
        imagePath;


    image.alt =
        type;


    image.classList.add(
        "tile-image"
    );


    tile.appendChild(
        image
    );

}


/* ==================================================
   REVEAL ALL TILES
================================================== */

function revealAllTiles() {

    const tiles =
        document.querySelectorAll(
            ".tile"
        );


    tiles.forEach(
        function (tile) {

            revealTileImage(
                tile
            );

        }
    );

}


/* ==================================================
   HIDE ALL TILES
================================================== */

function hideAllTiles() {

    const tiles =
        document.querySelectorAll(
            ".tile"
        );


    tiles.forEach(
        function (tile) {

            if (
                !tile.classList.contains(
                    "revealed"
                )
            ) {

                tile.classList.add(
                    "hidden"
                );

                const image =
                    tile.querySelector(
                        ".tile-image"
                    );


                if (image) {

                    image.remove();

                }

            }

        }
    );

}


/* ==================================================
   HANDLE TILE CLICK
================================================== */

function handleTileClick(
    tile
) {

    if (
        !gameStarted ||
        gameEnded
    ) {

        return;

    }


    if (
        tile.classList.contains(
            "revealed"
        )
    ) {

        return;

    }


    /*
        Reveal this tile permanently.
    */

    revealTileImage(
        tile
    );


    tile.classList.add(
        "revealed"
    );


    


    const type =
        tile.dataset.type;


    /*
        Specific sound.
    */

    playSound(
        TILE_SOUNDS[type],
        0.8
    );
    chances--;

    /*
        Apply tile effect.
    */

    handleTileEffect(
        type
    );


    updateHUD();


    /*
        Check whether the game
        has been won or lost.
    */

    checkGameState();

}


/* ==================================================
   HANDLE TILE EFFECT
================================================== */

function handleTileEffect(
    type
) {

    switch (type) {

        case "king":

            handleKing();

            break;


        case "bomb":

            handleBomb();

            break;


        case "heart":

            handleHeart();

            break;


        case "joker":

            handleJoker();

            break;


        case "fool":

            handleFool();

            break;


        case "clock":

            handleClock();

            break;

    }

}


/* ==================================================
   KING
================================================== */

function handleKing() {

    foundKings++;


    showSideFeedback(
        "👑 KING FOUND +1",
        "positive"
    );

}


/* ==================================================
   HEART
================================================== */

function handleHeart() {

    chances++;


    showSideFeedback(
        "❤️ +1 CHANCE",
        "positive"
    );

}


/* ==================================================
   BOMB
================================================== */

function handleBomb() {

    currentKingTarget++;


    showSideFeedback(
        "💣 +1 KING REQUIRED",
        "negative"
    );


    if (
        !firstTimeEvents.bomb
    ) {

        firstTimeEvents.bomb =
            true;

        localStorage.setItem(
            "bombTutorial",
            "true"
         );

        showSpecialPopup(
            "SHIT!!",
            "You have to find +1 extra King now.",
            TILE_IMAGES.bomb
        );

    }

}


/* ==================================================
   JOKER
================================================== */

function handleJoker() {

    chances--;


    showSideFeedback(
        "🃏 -1 CHANCE",
        "negative"
    );


    if (
        !firstTimeEvents.joker
    ) {

        firstTimeEvents.joker =
            true;
        localStorage.setItem(
            "jokerTutorial",
            "true"
        );

        showSpecialPopup(
            "OH NO!!",
            "You lost one chance.",
            TILE_IMAGES.joker
        );

    }

}


/* ==================================================
   FOOL
================================================== */

function handleFool() {

    /*
        Fool has no gameplay effect.
    */

    showSideFeedback(
        "🤡 FOOL!",
        "neutral"
    );


    if (
        !firstTimeEvents.fool
    ) {

        firstTimeEvents.fool =
            true;
        localStorage.setItem(
            "foolTutorial",
            "true"
        );

        showSpecialPopup(
            "FOOL!!",
            "Nothing in it.",
            TILE_IMAGES.fool
        );

    }

}


/* ==================================================
   CLOCK
================================================== */

function handleClock() {

    timeLeft += 10;


    showSideFeedback(
        "⏰ +10 SECONDS",
        "positive"
    );


    if (
        !firstTimeEvents.clock
    ) {

        firstTimeEvents.clock =
            true;
        localStorage.setItem(
            "clockTutorial",
            "true"
        );

        showSpecialPopup(
            "CONGRATS!!",
            "You gained 10 extra seconds.",
            TILE_IMAGES.clock
        );

    }


    updateHUD();

}


/* ==================================================
   SHOW FEEDBACK
================================================== */

function showFeedback(message, type) {

    gameMessage.textContent = message;

    gameMessage.classList.remove("show");

    /*
        Reset animation so the message
        can appear again later.
    */
    void gameMessage.offsetWidth;

    gameMessage.classList.add("show");


    if (type === "positive") {

        gameMessage.style.color =
            "#ffffff";

    }
    else if (type === "negative") {

        gameMessage.style.color =
            "#ffffff";

    }
    else {

        gameMessage.style.color =
            "#ffffff";

    }

}



/* ==================================================
   SPECIAL POPUP
================================================== */

function showSpecialPopup(
    title,
    message,
    image
) {

    /*
        Stop gameplay while popup is open.
    */

    gameStarted =
        false;
    popupIcon.src =
    image;

    popupIcon.style.display =
        "block";

    popupTitle.textContent =
        title;


    popupText.textContent =
        message;


    popupButton.textContent =
        "OK";


    popupOverlay.style.display =
        "flex";


    popupButton.onclick =
        function () {

            popupOverlay.style.display =
                "none";


            if (!gameEnded) {

                gameStarted =
                    true;

            }

        };

}


/* ==================================================
   START INTRO
================================================== */

function startIntro() {

    gameStarted =
        false;

    popupIcon.src =
    TILE_IMAGES.king;

    popupIcon.style.display =
        "block";
    popupTitle.textContent =
        `LEVEL ${selectedLevel}`;


    popupText.textContent =
        `Find ${currentKingTarget} Kings.`;


    popupButton.textContent =
        "OK";


    popupOverlay.style.display =
        "flex";


    popupButton.onclick =
        function () {

            showChanceIntro();

        };

}


/* ==================================================
   CHANCE INTRO
================================================== */

function showChanceIntro() {
    popupIcon.src =
    TILE_IMAGES.heart;

    popupIcon.style.display =
        "block";
    popupTitle.textContent =
        "CHANCES";


    popupText.innerHTML = `
        You have <b>${chances}</b> chances.<br><br>

        • Every tile click uses <b>1 chance</b>.<br><br>

        <img src="${TILE_IMAGES.heart}" class="popup-inline-icon">
        Restores <b>+1 Chance</b>.<br><br>

        <img src="${TILE_IMAGES.joker}" class="popup-inline-icon">
        Removes <b>1 Extra Chance</b>.
    `;
    popupButton.textContent =
        "OK";


    popupButton.onclick =
        function () {

            beginMemorization();

        };

}


/* ==================================================
   BEGIN MEMORIZATION
================================================== */

function beginMemorization() {

    popupOverlay.style.display = "none";

    /*
        Show BIG "MEMORISE" message first.
    */
    showMemoriseMessage();


    /*
        Wait before showing the tiles.
    */
    setTimeout(function () {

        /*
            Remove MEMORISE message.
        */
        memoriseMessage.classList.remove("show");


        /*
            Now reveal all 25 tiles.
        */
        revealAllTiles();


        /*
            Keep tiles visible for the
            configured memorization time.
        */
        setTimeout(function () {

            /*
                Hide the tiles.
            */
            hideAllTiles();


            /*
                Start actual gameplay.
            */
            gameStarted = true;

            startTimer();


            showFeedback(
                "FIND THE KINGS!",
                "positive"
            );

        }, GAME_SETTINGS.revealTime);


    }, GAME_SETTINGS.memoriseMessageTime);

}
/* ==================================================
   START TIMER
================================================== */

function startTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval =
        setInterval(
            function () {

                if (
                    !gameStarted ||
                    gameEnded
                ) {

                    return;

                }


                timeLeft--;


                updateHUD();


                if (
                    timeLeft <=
                    GAME_SETTINGS.dangerTime
                ) {

                    startDangerMode();

                }


                if (
                    timeLeft <= 0
                ) {

                    endGame(
                        "time"
                    );

                }

            },
            1000
        );

}


/* ==================================================
   NORMAL MUSIC
================================================== */

function startGameMusic() {

    if (
        dangerMode
    ) {

        return;

    }


    gameMusic.volume =
        0.4;


    gameMusic.play()
        .catch(
            function () {

                console.log(
                    "Game music autoplay blocked."
                );

            }
        );

}


/* ==================================================
   DANGER MODE
================================================== */

function startDangerMode() {

    if (
        dangerMode
    ) {

        return;

    }


    dangerMode =
        true;


    timerDisplay.classList.add(
        "danger"
    );


    gameMusic.pause();


    dangerMusic.currentTime =
        0;


    dangerMusic.volume =
        1.0;


    dangerMusic.play()
        .catch(
            function () {

                console.log(
                    "Danger music blocked."
                );

            }
        );

}


/* ==================================================
   PLAY SHORT SOUND
================================================== */

function playSound(filePath, volume = 1) {

    if (!filePath) return;

    const sound = new Audio(filePath);

    sound.volume = volume;

    sound.play().catch(function () {

        console.log("Sound could not play:", filePath);

    });

    activeSounds.push(sound);

    sound.onended = function () {

        activeSounds = activeSounds.filter(s => s !== sound);

    };

    return sound;
}
function stopAllSounds() {

    activeSounds.forEach(function(sound) {

        sound.pause();
        sound.currentTime = 0;

    });

    activeSounds = [];

    gameMusic.pause();
    gameMusic.currentTime = 0;

    dangerMusic.pause();
    dangerMusic.currentTime = 0;

}
/* ==================================================
   CHECK GAME STATE
================================================== */

function checkGameState() {

    /*
        WIN CONDITION
    */

    if (
        foundKings >=
        currentKingTarget
    ) {

        endGame(
            "win"
        );

        return;

    }


    /*
        LOSE CONDITION
    */

    if (
        chances <= 0
    ) {

        endGame(
            "chances"
        );

    }

}


/* ==================================================
   END GAME
================================================== */

function endGame(
    reason
) {

    if (
        gameEnded
    ) {

        return;

    }


    gameEnded =
        true;


    gameStarted =
        false;


    clearInterval(
        timerInterval
    );


    gameMusic.pause();


    dangerMusic.pause();


    timerDisplay.classList.remove(
        "danger"
    );


    if (
        reason === "win"
    ) {

        completeLevel();

        return;

    }
    if (reason === "time") {
        stopAllSounds();
        const gameOverSound =
            playSound(
                GAME_SOUNDS.gameOver,
                1
            );

        showEndPopup(
            "TIME'S UP!",
            "You ran out of time.",
            gameOverSound,
            false
        );

        return;

    }

    if (reason === "chances") {
        stopAllSounds();
        const gameOverSound =
            playSound(
                GAME_SOUNDS.gameOver,
                1
            );

        showEndPopup(
            "GAME OVER!",
            "You used all your chances.",
            gameOverSound,
            false
        );

    }

    

}


/* ==================================================
   COMPLETE LEVEL
================================================== */

function completeLevel() {

    clearInterval(timerInterval);

    gameStarted = false;

    gameEnded = true;

    gameMusic.pause();
    gameMusic.currentTime = 0;

    dangerMusic.pause();
    dangerMusic.currentTime = 0;

    saveLevelProgress();

    stopAllSounds();

    const victorySound =
        playSound(
            GAME_SOUNDS.levelComplete,
            1
        );

    showEndPopup(
        "CONGRATULATIONS!",
        `You completed Level ${selectedLevel}!`,
        victorySound,
        true
    );

}


/* ==================================================
   SAVE LEVEL PROGRESS
================================================== */

function saveLevelProgress() {

    let completedLevels =
        JSON.parse(
            localStorage.getItem(
                "completedLevels"
            ) || "[]"
        );


    if (
        !completedLevels.includes(
            selectedLevel
        )
    ) {

        completedLevels.push(
            selectedLevel
        );

    }


    completedLevels.sort(
        function (a, b) {

            return a - b;

        }
    );


    localStorage.setItem(
        "completedLevels",
        JSON.stringify(
            completedLevels
        )
    );


    /*
        Unlock next level.
    */

    const nextLevel =
        selectedLevel + 1;


    if (
        nextLevel <= 10
    ) {

        localStorage.setItem(
            "currentLevel",
            nextLevel
        );

    }

}


/* ==================================================
   END POPUP
================================================== */

function showEndPopup(
    title,
    message,
    endSound,
    showCrackers = true
) {

    popupIcon.style.display = "none";

    popupTitle.textContent = title;

    popupText.textContent = message;

    popupButton.textContent = "BACK TO LEVELS";

    if (showCrackers) {

        startFireworks();

    } else {

        stopFireworks();

    }

    popupOverlay.style.display = "flex";

    popupButton.onclick = function () {

        stopFireworks();

        if (endSound) {

            endSound.pause();
            endSound.currentTime = 0;

        }

        window.location.href = "level-menu.html";

    };

}

/* ==================================================
   INITIALIZE
================================================== */

function initializeGame() {

    loadLevel();
    updateHUD();

    createGameBoard();
    startGameMusic(); 

    startIntro();

}


/* ==================================================
   START
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeGame
);

function showSideFeedback(message, type) {

    sideFeedback.textContent = message;

    sideFeedback.classList.remove("show");

    /*
        Reset animation so it can
        play again immediately.
    */
    void sideFeedback.offsetWidth;


    if (type === "positive") {

        sideFeedback.style.color =
            "#9cffb8";

    }
    else if (type === "negative") {

        sideFeedback.style.color =
            "#ff9b9b";

    }
    else {

        sideFeedback.style.color =
            "#ffffff";

    }


    sideFeedback.classList.add("show");
}
function startFireworks(){

    fireworks.style.display="block";

    const colors=[

        "#FFD700",
        "#FF4444",
        "#00BFFF",
        "#00FF66",
        "#FF00FF",
        "#FF8800",
        "#AA66FF",
        "#FFFFFF"

    ];

    const interval=setInterval(function(){

        const centerX=Math.random()*100;
        const centerY=Math.random()*70+10;

        for(let i=0;i<45;i++){

            const particle=document.createElement("div");

            particle.className="firework";

            particle.style.left=centerX+"%";
            particle.style.top=centerY+"%";

            particle.style.setProperty(
                "--color",
                colors[
                    Math.floor(
                        Math.random()*colors.length
                    )
                ]
            );

            const angle=Math.random()*Math.PI*2;

            const distance=
                80+
                Math.random()*170;

            particle.style.setProperty(
                "--x",
                Math.cos(angle)*distance+"px"
            );

            particle.style.setProperty(
                "--y",
                Math.sin(angle)*distance+"px"
            );

            fireworks.appendChild(
                particle
            );

            setTimeout(function(){

                particle.remove();

            },1400);

        }

    },450);

    fireworks.dataset.interval=interval;

}
function stopFireworks(){

    clearInterval(
        Number(
            fireworks.dataset.interval
        )
    );

    fireworks.innerHTML="";

    fireworks.style.display="none";

}