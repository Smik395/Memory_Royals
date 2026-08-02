/* ==================================================
   MEMORY ROYALS
   GAME DATA / CONFIGURATION
================================================== */


/* ==================================================
   GENERAL GAME SETTINGS
================================================== */

const GAME_SETTINGS = {

    // Every level uses 5 x 5 = 25 tiles
    gridSize: 5,

    totalTiles: 25,

     memoriseMessageTime: 1200,

    // Time for memorizing the board
    revealTime: 3000,

    // Time when the danger music starts
    dangerTime: 10

};


/* ==================================================
   LEVEL CONFIGURATION
================================================== */

/*
    Levels 1-5  = Medium
    Levels 6-10 = Medium → Hard

    All levels still use 25 tiles.
*/
/* ==================================================
   RANDOM DIFFICULTY SETTINGS
================================================== */

/* ==================================================
   LEVEL DIFFICULTY RANGES
================================================== */

const LEVEL_DIFFICULTY = {

    1: {
        minKings: 4, maxKings: 6,
        minTargetKings: 3, maxTargetKings: 3,
        minBombs: 1, maxBombs: 2,
        minJokers: 1, maxJokers: 2,
        minHearts: 3, maxHearts: 4,
        minClocks: 2, maxClocks: 3,
        minChances: 6, maxChances: 6,
        minTime: 28, maxTime: 30
    },

    2: {
        minKings: 5, maxKings: 6,
        minTargetKings: 3, maxTargetKings: 4,
        minBombs: 1, maxBombs: 2,
        minJokers: 1, maxJokers: 2,
        minHearts: 3, maxHearts: 4,
        minClocks: 2, maxClocks: 3,
        minChances: 6, maxChances: 6,
        minTime: 27, maxTime: 29
    },

    3: {
        minKings: 6, maxKings: 7,
        minTargetKings: 4, maxTargetKings: 4,
        minBombs: 2, maxBombs: 3,
        minJokers: 2, maxJokers: 3,
        minHearts: 2, maxHearts: 3,
        minClocks: 2, maxClocks: 2,
        minChances: 6, maxChances: 7,
        minTime: 26, maxTime: 28
    },

    4: {
        minKings: 6, maxKings: 8,
        minTargetKings: 4, maxTargetKings: 5,
        minBombs: 2, maxBombs: 3,
        minJokers: 2, maxJokers: 3,
        minHearts: 2, maxHearts: 3,
        minClocks: 2, maxClocks: 2,
        minChances: 6, maxChances: 7,
        minTime: 25, maxTime: 27
    },

    5: {
        minKings: 7, maxKings: 8,
        minTargetKings: 4, maxTargetKings: 5,
        minBombs: 3, maxBombs: 3,
        minJokers: 3, maxJokers: 3,
        minHearts: 2, maxHearts: 2,
        minClocks: 2, maxClocks: 2,
        minChances: 7, maxChances: 8,
        minTime: 24, maxTime: 26
    },

    6: {
        minKings: 8, maxKings: 9,
        minTargetKings: 5, maxTargetKings: 5,
        minBombs: 3, maxBombs: 4,
        minJokers: 3, maxJokers: 4,
        minHearts: 2, maxHearts: 2,
        minClocks: 1, maxClocks: 2,
        minChances: 7, maxChances: 7,
        minTime: 23, maxTime: 25
    },

    7: {
        minKings: 8, maxKings: 9,
        minTargetKings: 5, maxTargetKings: 6,
        minBombs: 3, maxBombs: 3,
        minJokers: 3, maxJokers: 4,
        minHearts: 1, maxHearts: 2,
        minClocks: 1, maxClocks: 2,
        minChances: 7, maxChances: 8,
        minTime: 22, maxTime: 24
    },

    8: {
        minKings: 9, maxKings: 10,
        minTargetKings: 6, maxTargetKings: 6,
        minBombs: 3, maxBombs: 4,
        minJokers: 3, maxJokers: 3,
        minHearts: 1, maxHearts: 2,
        minClocks: 1, maxClocks: 2,
        minChances: 8, maxChances: 8,
        minTime: 21, maxTime: 23
    },

    9: {
        minKings: 9, maxKings: 10,
        minTargetKings: 6, maxTargetKings: 7,
        minBombs: 3, maxBombs: 3,
        minJokers: 4, maxJokers: 4,
        minHearts: 1, maxHearts: 1,
        minClocks: 1, maxClocks: 1,
        minChances: 7, maxChances: 8,
        minTime: 20, maxTime: 22
    },

    10: {
        minKings: 10, maxKings: 10,
        minTargetKings: 7, maxTargetKings: 7,
        minBombs: 3, maxBombs: 3,
        minJokers: 4, maxJokers: 4,
        minHearts: 1, maxHearts: 1,
        minClocks: 1, maxClocks: 1,
        minChances: 7, maxChances: 7,
        minTime: 20, maxTime: 20
    }

};

/* ==================================================
   TILE IMAGE PATHS
================================================== */

const TILE_IMAGES = {

    king:
        "assets/images/king.png",

    bomb:
        "assets/images/bomb.png",

    heart:
        "assets/images/heart.png",

    joker:
        "assets/images/joker.png",

    fool:
        "assets/images/fool.png",

    clock:
        "assets/images/clock.png"

};


/* ==================================================
   TILE SOUND PATHS
================================================== */

const TILE_SOUNDS = {

    king:
        "assets/audio/king.mp3",

    bomb:
        "assets/audio/bomb.mp3",

    heart:
        "assets/audio/heart.mp3",

    joker:
        "assets/audio/joker.mp3",

    fool:
        "assets/audio/fool.mp3",

    clock:
        "assets/audio/clock.mp3",


};


/* ==================================================
   BACKGROUND MUSIC
================================================== */

const MUSIC_FILES = {

    normal:
        "assets/audio/game-music.mp3",

    danger:
        "assets/audio/danger-music.mp3"

};

const GAME_SOUNDS = {

    levelComplete:
        "assets/audio/game-win.mp3",
    gameOver:
        "assets/audio/game_over.mp3"

};
/* ==================================================
   TILE DISTRIBUTION
================================================== */

/*
    These are the special tiles.

    The remaining positions are automatically
    filled with Fool tiles so that every level
    always contains exactly 25 tiles.

    You can change these values later.
*/

