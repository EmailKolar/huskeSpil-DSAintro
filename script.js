"use strict";

window.addEventListener("DOMContentLoaded",start);
const images = ["Son_of_Godzilla_1967.jpg", "Destroy_all_monsters.jpg", "Ghidorah1-1.jpg", "Godzilla_Raids_Again_Poster_A.png", "Godzilla_vs_Gigan_1972.jpg", "Godzilla_vs_Hedorah_1971.jpg", "Godzilla_vs_Mechagodzilla_1974.jpg", "Godzilla_vs_sea_monster_poster_01.jpg", "Godzillas_Revenge_1969.jpg", "Gojira_1954_Japanese_poster.jpg", "Invasion_of_Astro-Monster_Poster_A.png", "King_Kong_vs._Godzilla_Poster_A.png", "Megalon-big.jpg", "Mothra_vs._Godzilla_Poster_A.png","Terror_of_MechaGodzilla_1975.jpg"]
const CARDS_ON_BOARD = 18;
let selectedCard = null;
let tries = 0;
let matches = 0;

function start(){
    console.log("JS kører");
    initCards();
    makeCardsClickable();
}

function initCards(){
    const numbers = [];

    for (let i = 0; i<CARDS_ON_BOARD/2;i++) {
        numbers[i] = i
        numbers[i+CARDS_ON_BOARD/2] = i;
    }

    const cards = [];
    while(numbers.length > 0){
        const random = Math.floor(Math.random() * numbers.length);
        cards.push(numbers[random]);
        numbers.splice(random, 1);
    }

    console.log(cards)
    displayCards(cards)
}


function displayCards(cards){
    const elements = document.querySelectorAll(".card")
    shuffleArray(images)
    elements.forEach((element,index)=>{
        element.dataset.image = cards[index];
        const image = element.querySelector("img");
        image.src = "images/"+ images[cards[index]]
    })
}

function makeCardsClickable(){
    document.querySelectorAll(".card").forEach(card=>{
        card.addEventListener("click",(event)=>clickCard(card))
    })
}

function clickCard(card){
    if(card == selectedCard){//clicked same card twice - ignore
        return;
    }
    if (card.dataset.match){//Card already a match
        return;
    }
    const cardFlipSound = document.getElementById("flipSFX").play();
    if(selectedCard){
        tries++
        card.classList.add("selected");
        const firstCard = selectedCard;
        const secondCard = card;

        console.log("two cars selected");
        console.log(firstCard);
        console.log(secondCard);

        if(firstCard.dataset.image == secondCard.dataset.image){//match
            const matchSFX = document.getElementById("roarSFX").play();
            matches++;
            firstCard.dataset.match = true;
            secondCard.dataset.match = true;
        } else {//no match
            const wompSFX = document.getElementById("wompwompSFX").play();
            setTimeout(()=>{
                firstCard.classList.remove("selected")
                secondCard.classList.remove("selected")
            },2500)
            
        }

        selectedCard = null;
    }else{
        card.classList.add("selected")
        selectedCard = card
    }

    displayTries();
    displayMatches();

    if(matches == CARDS_ON_BOARD/2){
        gameOver();
    }

}

function displayTries(){
    document.querySelector("#scores #tries span").textContent = tries;
}
function displayMatches(){
    document.querySelector("#scores #matches span").textContent = matches;
}

function gameOver(){
    const winSFX = document.getElementById("winSFX").play();
    document.querySelector("#gameover").classList.remove("hide")
}

function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
}