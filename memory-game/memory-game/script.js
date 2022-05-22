
  const cards = document.querySelectorAll(".game-card");
  let topScore = localStorage.getItem("low-score");
  let start = document.querySelector("#begin");
  let startBtn = document.querySelector("#start-button");
  let numOfCards = cards.length;
  let card1 = null;
  let card2 = null;
  let cardsFlipped = 0;
  let currentScore = 0;

  
  if (topScore) {
    const score = document.querySelector("#best-score");
    score.innerText = topScore;
  }

  startBtn.addEventListener("click", startGame);


  function startGame() {
    setScore(0);
    start.classList.add("playing");

    let indexList = [];
    for (let i = 1; i <= numOfCards / 2; i++) {
      indexList.push(i.toString());
    }

    const totalList = indexList.concat(indexList)
    let pairs = shuffle(totalList);

    for (let i = 0; i < numOfCards; i++) {
      let link = "gifs/" + pairs[i] + ".gif";
      cards[i].children[1].children[0].src = link;
    }
  }

  function shuffle(array) {
    let duplicate = array.slice();
    for (let idx1 = duplicate.length - 1; idx1 > 0; idx1--) {
      let idx2 = Math.floor(Math.random() * (idx1 + 1));

      let temp = duplicate[idx1];
      duplicate[idx1] = duplicate[idx2];
      duplicate[idx2] = temp;
    }
    return duplicate;
  }

  for (let card of cards) {
    card.addEventListener("click", handleCardClick);
  }


  function handleCardClick(e) {
    if (!e.target.classList.contains("front")) return;

    let currentCard = e.target.parentElement;
  
    if (!card1 || !card2) {
      if (!currentCard.classList.contains("flipped")) {
        setScore(currentScore + 1);
      }
      currentCard.classList.add("flipped");
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
      let gif1 = card1.children[1].children[0].src;
      let gif2 = card2.children[1].children[0].src;

      if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
      } else {
        setTimeout(function() {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
        }, 1000);
      }
    }

    if (cardsFlipped === numOfCards) endGame();
  }

  function setScore(newScore) {
    currentScore = newScore;
    const curScore = document.querySelector("#current-score");
    curScore.innerText = currentScore;
  }

  function endGame() {
    let end = document.querySelector("#end");
    let scoreHeader = end.children[1];
    scoreHeader.innerText = "Your score: " + currentScore;
    let topScore = +localStorage.getItem("low-score") || Infinity;
    if (currentScore < topScore) {
      scoreHeader.innerText += " - NEW BEST SCORE!!";
      localStorage.setItem("low-score", currentScore);
    }
    end.classList.add("game-over");
  }

