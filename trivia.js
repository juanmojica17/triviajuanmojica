
let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let answers = document.getElementsByClassName("answer");

let questions;
let qIndex = 0;
let correct_index_answer;
let score = 0;


let getAPIData = e => {
    e.preventDefault();
    let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            questions = data.results;
            startGame();
        })
        .catch(err => console.log(err));
};

const startGame = () => {
    questionsContainer.style.display = "flex";
    triviaForm.style.display = "none";


    let currentQuestion = questions[qIndex];
    document.getElementById("questionName").innerText = currentQuestion.question;

    if (currentQuestion.incorrect_answers.length == 1) {
        document.getElementById("1").innerText = "True";
        document.getElementById("2").innerText = "False";
        document.getElementById("3").style.display = "none";
        document.getElementById("4").style.display = "none";
        if (currentQuestion.correct_answer === "True") correct_index_answer = 1;
        else correct_index_answer = 2;
    } else {
        document.getElementById("1").style.display = "Block";
        document.getElementById("2").style.display = "Block";
        document.getElementById("3").style.display = "Block";
        document.getElementById("4").style.display = "Block";

        correct_index_answer = Math.floor(Math.random() * 4) + 1;
        document.getElementById(correct_index_answer).innerText =
            currentQuestion.correct_answer;
        console.log(correct_index_answer);
        let j = 0;
        for (let i = 1; i <= 4; i++) {
            if (i === correct_index_answer) continue;
            document.getElementById(i).innerText =
                currentQuestion.incorrect_answers[j];
            j++;
        }
    }
};
let answerId
let perfectscore
let badscore
let goodscore

const selectAnswer = id => {

    answerId = id;
    console.log(answerId);
    if (answerId == correct_index_answer) {
        score = score + 1;
        console.log("RC");

    } else {
        console.log("RI");
    }
    console.log(qIndex == amount.value);

    if (qIndex < amount.value - 1) {
        qIndex++;
        startGame();
    } else if (qIndex == amount.value - 1) {
        showResults(score);
        console.log(score)
        if (score == amount.value){
            perfectscore = document.createElement("div");
            perfectscore.textContent = "ERES UN CRACK,TUVISTE UN PUNTAJE PERFECTO"
            questionsContainer.appendChild(perfectscore);
        }
        if(score < (amount.value/2)){
            badscore = document.createElement("div");
            badscore.textContent = "TUVISTE MENOS DE LA MITAD DE RESPUESTAS CORRECTAS, FUE UN MAL INTENTO"
            questionsContainer.appendChild(badscore);
        }else{
            goodscore = document.createElement("div");
            goodscore.textContent = "FELICITACIONES TUVISTE MAS DE LA MITAD DE RESPUESTAS CORRECTAS"
            questionsContainer.appendChild(goodscore);
        }
    }
};


const showResults = () => {
    console.log(`Juego terminado`);
    questionsContainer.innerHTML = "";
    let puntaje = document.createElement("h1");

   puntaje.innerHTML = `Juego terminado, puntuación:  ${score}`

    let restartBtn = document.createElement("a");
   let divrestart = document.createElement("div");

   restartBtn.setAttribute("href", "index.html");
    restartBtn.innerHTML="JUGAR DE NUEVO";

    questionsContainer.appendChild(puntaje);
    questionsContainer.appendChild(divrestart);
    divrestart.appendChild(restartBtn);
}





for (let i = 0; i < answers.length; i++) {
    const element = answers[i];
    element.addEventListener("click", () => selectAnswer(element.id));

}

//LISTENERS
triviaForm.addEventListener("submit", getAPIData);

