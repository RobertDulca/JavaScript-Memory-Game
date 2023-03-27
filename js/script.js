//////////////////////////////////////////////////////////
//Funktion für die Eingabe des Usernames
//////////////////////////////////////////////////////////

onload = function addUsername() {
  let absatz = prompt("Geben Sie Ihren Username ein:");
  document.getElementById("username").innerHTML += absatz;
  initializeBoard();
};

//////////////////////////////////////////////////////////
// Die Funktionen für den Timer
//////////////////////////////////////////////////////////

var seconds = 0;
var referenz;

function startTimer() {
  console.log("sekunde");
  referenz = setInterval(timer, 1000);
}

function timer() {
  seconds++;
  document.getElementById("time").innerHTML = "Zeit: " + seconds + "s";
}

function stopp() {
  clearInterval(referenz);
}

//////////////////////////////////////////////////////////
//Funktionen für die initialisierung der Karten
//////////////////////////////////////////////////////////

var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

//Fischer Yates Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Initialisierung des Spielfelds
function initializeBoard() {
  //Shuffle Funktion wird benutzt um die Karten zu vermischen
  cards = shuffle(cards);

  let counter = 0;
  for (let j = 0; j < cards.length; j++) {
    counter++;
    document.getElementById("spielbereich").innerHTML +=
      '<img class="karte" src="pics/memoryBg.png" onclick="flipCard(this)" id="' +
      cards[j] +
      '">';
    if (counter == 4) {
      document.getElementById("spielbereich").innerHTML +=
        '<div class="clear"> </div>';
      counter = 0;
    }
  }
}

//////////////////////////////////////////////////////////
//Funktionen, welche die Karten überprüfen und handeln
//////////////////////////////////////////////////////////

let ersteKarte, zweiteKarte;
var flippedKarte = false;
var startZeit = true;

function flipCard(card) {
  let karte = card.getAttribute("id");

  if (startZeit) {
    startZeit = false;
    startTimer();
  }

  if (!flippedKarte) {
    flippedKarte = true;

    ersteKarte = card;
    ersteKarte.setAttribute("src", "pics/card" + karte + ".png");
    return;
  }

  zweiteKarte = card;
  zweiteKarte.setAttribute("src", "pics/card" + karte + ".png");

  setTimeout(function () {
    checkCards();
  }, 500);
}

var paare = 8;

//Funktion für die Überprüfung der Karten
function checkCards() {
  versucheCounter++;
  if (
    parseInt(ersteKarte.getAttribute("id")) +
      parseInt(zweiteKarte.getAttribute("id")) ==
    17
  ) {
    ersteKarte.removeAttribute("onclick");
    zweiteKarte.removeAttribute("onclick");
    ersteKarte.setAttribute("src", "pics/memoryBgI.png");
    zweiteKarte.setAttribute("src", "pics/memoryBgI.png");
    flippedKarte = false;
    paare--;
    versuche();
    //check ob alle paare verdeckt wurden
    if (paare == 0) {
      console.log("stopp");
      stopp();
    }
    return;
  } else {
    flippedKarte = false;
    flipBack();
  }
}

//Funktion um die Karten zurückzudrehen
function flipBack() {
  ersteKarte.setAttribute("src", "pics/memoryBg.png");
  zweiteKarte.setAttribute("src", "pics/memoryBg.png");
  versuche();
}

//////////////////////////////////////////////////////////
//Funktionen für die Versuche
//////////////////////////////////////////////////////////

var versucheCounter = 0;

function versuche() {
  document.getElementById("versuche").innerHTML =
    "Versuche: " + versucheCounter;
}
