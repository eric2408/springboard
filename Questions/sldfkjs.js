document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".game-card");
    const backSide = document.querySelectorAll('.back');
    const qq = document.querySelector('.back');
    let numCards = cards.length;
    let card1 = null;
    let card2 = null;
    let cardsFlipped = 0;
    let currentScore = 0;
    let lowScore = localStorage.getItem("low-score");
    let start = document.getElementById("begin");
  
    
  
  
    const COLORS = [
      "#E74C3C",
      "#D68910",
      "#117864",
      "#AAB7B8",
      "#7FB3D5",
      "#F9E79F",
      "#E67E22",
      "#E59866",
      "#212F3D",
      "#DE24D0",
      "#0692F3",
      "#0000FF",
      "#E74C3C",
      "#D68910",
      "#117864",
      "#AAB7B8",
      "#7FB3D5",
      "#F9E79F",
      "#E67E22",
      "#E59866",
      "#212F3D",
      "#DE24D0",
      "#0692F3",
      "#0000FF"
    ];
  
  
    if (lowScore) {
      document.getElementById("best-score").innerText = lowScore;
    }
  
    for (let card of cards) {
      card.addEventListener("click", handleCardClick);
    }
  
    let startBtn = document.getElementById("start-button");
    startBtn.addEventListener("click", startGame);
  
    function handleCardClick(e) {
      if (!e.target.classList.contains("front")) return;
  
      let currentCard = e.target.parentElement;
      currentCard.style.backgroundColor = currentCard.classList[0];
  
      if (!card1 || !card2) {
        if (!currentCard.classList.contains("flipped")) {
          setScore(currentScore + 1);
        }
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
      }
  
      if (card1 && card2) {
        let gif1 = card1.className;
        let gif2 = card2.className;
  
        if (gif1 === gif2) {
          cardsFlipped += 2;
          card1.removeEventListener("click", handleCardClick);
          card2.removeEventListener("click", handleCardClick);
          card1 = null;
          card2 = null;
        } else {
          setTimeout(function() {
            card1.style.backgroundColor = "";
            card2.style.backgroundColor = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1 = null;
            card2 = null;
          }, 1000);
        }
      }
  
      if (cardsFlipped === numCards) endGame();
    }
  
    function startGame() {
      setScore(0);
      start.classList.add("playing");
      // let indices = [];
      // for (let i = 1; i <= numCards / 2; i++) {
      //   indices.push(i.toString());
      // }
      // let pairs = shuffle(indices.concat(indices));
  
      // for (let i = 0; i < cards.length; i++) {
      //   let path = "gifs/" + pairs[i] + ".gif";
      //   cards[i].children[1].children[0].src = path;
      // }
      let shuffledColors = shuffle(COLORS);
      createDivsForColors(shuffledColors);
      
    }
    // console.log(backSide);
    
  
    function createDivsForColors(colorArray) {
      
        for (let color of colorArray) {
          const newDiv = document.createElement("div");
          newDiv.classList.add(color);
          // for(let j = 0; j < newDiv.length; j++){
            
          //   console.log(qq.append(newDiv)[j]);
          // }
          
          qq.append(newDiv);
          console.log(qq);
      }
        
      //   for(let i = 0; i < newDiv.length; i++){
      //     for(let j = 0; j < backSide.length; j++){
      //       console.log(backSide[j].append(newDiv[i]));
      //   }
      // }
      // newDiv.addEventListener("click", handleCardClick);
      
    
        // qq.append(newDiv);
        // console.log(qq);
      
      
      
  }
  
  
    function shuffle(array) {
      let arrayCopy = array.slice();
      for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
        // generate a random index between 0 and idx1 (inclusive)
        let idx2 = Math.floor(Math.random() * (idx1 + 1));
  
        // swap elements at idx1 and idx2
        let temp = arrayCopy[idx1];
        arrayCopy[idx1] = arrayCopy[idx2];
        arrayCopy[idx2] = temp;
      }
      return arrayCopy;
    }
  
    function setScore(newScore) {
      currentScore = newScore;
      document.getElementById("current-score").innerText = currentScore;
    }
  
    function endGame() {
      let end = document.getElementById("end");
      let scoreHeader = end.children[1];
      scoreHeader.innerText = "Your score: " + currentScore;
      let lowScore = +localStorage.getItem("low-score") || Infinity;
      if (currentScore < lowScore) {
        scoreHeader.innerText += " - NEW BEST SCORE!!";
        localStorage.setItem("low-score", currentScore);
      }
      document.getElementById("end").classList.add("game-over");
    }
  });
  