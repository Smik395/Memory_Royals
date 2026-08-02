const buttonClickSound =
    document.getElementById("buttonClickSound");

document.querySelector(".back-btn")
.addEventListener("click", () => {

    buttonClickSound.currentTime = 0;

    buttonClickSound.play();

    setTimeout(() => {

        window.location.href = "index.html";

    }, 170);

});