const countDown = (value) => {const timer = setInterval(
    () =>{
    value --;
    if(value > 0){
        console.log(value);
    } else {
        clearInterval(timer);
        console.log("DONE !");
    }
    }, 1000)
};

// countDown(4);


const randomGame = () => {
    let count = 0;
    const counter = setInterval(
    function(){
        let randomNumber = Math.random();
        
        if(randomNumber > 0.75){
            clearInterval(counter);
            console.log(`count: ${count}`);
        } else {
            count++;
            console.log(count);
        }
    }
    ,1000)
};

// randomGame();
