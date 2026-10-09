

function myFunction(){
    alert("Hello!");
}

function changeImage() { 
    let pokeballImg = document.getElementById("img01"); 
    pokeballImg.src = "pic/pikachu.png"; 
}

let link = document.getElementById("tw-link");
link.innerHTML = "twitter";

// window.onload = twitterLink;
// function twitterLink(){
//     let link = document.getElementById("tw-link");
//     link.innerHTML = "twitter";
// }

window.onload = pageLoad;
function pageLoad() {
    let clickButton = document.getElementById("clickme");
    clickButton.onclick = myFunction;
}

