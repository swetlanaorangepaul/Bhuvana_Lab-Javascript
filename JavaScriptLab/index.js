let questionTimeout = 10000;
class Quiz{
    constructor(questions){
        this.index=0;
        this.questions=questions;
        this.score=0;
        this.active=true;
        this.timeUp=false;
        this.timerStarted=false;
        this.idTimerInterval=undefined;
        this.idTimeout=undefined;
    }
    getQuestionsByIndex(){
        return this.questions[this.index];
    }
    checkForCorrectAnswer(selectedAnswer){

        let currentQuestion= this.questions[this.index];
        if (selectedAnswer === currentQuestion.answer){
            this.score++;
        }
        this.questions[this.index].selectedAnswer=selectedAnswer;
        this.index++;
    }

    isEnded(){
        try{
            if (this.index === this.questions.length){
                this.active=true;
            }else
            {
                this.active=false;
            }
        }catch(Exception){
            this.active=false
        }finally{
            return this.active;
        }   
    }

    startTimer(timeLeft){
        this.timerStarted=true;
        let timeleft=timeLeft;
        quiz.idTimeout=setTimeout(function() { 
            quiz.timeUp=true;
            if (quiz.timerStarted && quiz.timeUp){
                clearInterval( quiz.idTimerInterval );
                quiz.index++;
                loadNextAction();
            }
        }, timeLeft + 1000);

        quiz.idTimerInterval=setInterval(function(){
            let timeLeftPercent = (timeleft / questionTimeout) * 100;
            let timeTag = document.getElementById("timeleft");
            timeTag.innerHTML= `${timeleft/1000}`;
            if (timeLeftPercent <= 40){
                timeTag.style.color="#f23a3a";
            }else{
                timeTag.style.color="#01BBFF";
            }
            timeleft = timeleft - 1000;
        },1000);
    }
}

class Question{
    constructor(questionNo,questionText,choices,answer){
        this.questionNo=questionNo;
        this.questionText=questionText;
        this.choices=choices;
        this.answer=answer;
        this.selectedAnswer="";
    }
}

// Define the list of questions
let questions = [
    new Question( "1",
    "What is the most widely spoken language in Brazil?",
    ["French","Tamil","English","Portuguese"],
    "Portuguese"),
    new Question( "2",
    "What does the white dove symbolize?",
    ["Harmony","Peace","Joy","White Color"],
    "Peace"),
    new Question( "3",
    "Who is Shrek’s wife?",
    ["Modi","Aiswarya Rai","Indra Gandhi","Fiona"],
    "Fiona"),
    new Question( "4",
    "How many milligrams make a gram?",
    ["100000","10","1000","100"],
    "1000"),
    new Question( "5",
    "Which is the world’s fastest land animal?",
    ["Horse","Lion","Rabbit","Cheetah"],
    "Cheetah"),
    new Question( "6",
    "From which language did the word “Ketchup” come?",
    ["French","Chinese","English","Portuguese"],
    "Chinese"),
    new Question( "7",
    "Creatures that lived millions of years ago?",
    ["Dinosaur","Snail","Goat","Ant"],
    "Dinosaur"),
    new Question( "8",
    "A sea creature with eight legs?",
    ["Shark","Crocodile","Whale","Octopus"],
    "Octopus"),
    new Question( "9",
    "Which sport is P.V. Sindhu associated with?",
    ["Tennis","Badminton","Cricket","Football"],
    "Badminton"),
    new Question( "10",
    "What is the world’s most popular spectator sport?",
    ["Auto Racing","Football","Cricket","Golf"],
    "Auto Racing")
];
//Create quiz object with the list of questions
let quiz = new Quiz(questions);
loadQuiz();

function loadQuiz(){
    if (quiz.isEnded()){
        showResult();
        return;
    }else{
        let questionTag = document.getElementById("question");
        let currentQuestion= quiz.getQuestionsByIndex();
        let timeTag = document.getElementById("timeleft");
        timeTag.innerHTML= (questionTimeout)/1000;
        timeTag.style.color="#01BBFF";
        quiz.startTimer(questionTimeout);
        questionTag.innerHTML=`${currentQuestion.questionNo}. ${currentQuestion.questionText}`;

        let choices = currentQuestion.choices;
        for(let i=0; i<choices.length; i++){
            let choiceTag= document.getElementById("choice"+ i);
            choiceTag.innerHTML=choices[i];

            let buttonTag= document.getElementById("btn" + i);
            buttonTag.onclick = function(){
                clearInterval( quiz.idTimerInterval );
                clearTimeout(quiz.idTimeout);
                quiz.timerStarted=false;
                quiz.timeUp=false;
                quiz.checkForCorrectAnswer(choices[i]);
                loadNextAction();
            };

            let progresTag = document.getElementById("progress");
            progresTag.innerHTML= ` Question ${quiz.questions[quiz.index].questionNo} of ${quiz.questions.length}`
        }
    }
}

function loadNextAction(){
    if (quiz.isEnded()){
        console.log("Results")
        showResult();
    } else {
        loadQuiz();
    }
}
function showResult(){
    let resPercent = (quiz.score / questions.length) * 100;
    let scoresHTML = `
            <h1>Results... </h1>
            <button name= "retakeTest" value="retake-Test" id="retakeTest">Retake-Test</button>
            <h2 id='score'>Your Score is ${quiz.score} </h2>
            <h2 id='percentage'> Percentage : ${resPercent}% </h2>
            <div id="result-table">
            <table align="center">
                <thead>
                    <tr>
                        <th>Question No</th>
                        <th>Correct Answer</th>
                        <th>You Selected</th>
                    </tr>
                </thead>
                <tbody>`;
        scoresHTML+=getQuestionAnswer();
        scoresHTML+=`</tbody></table></div><h1>Congratulations!!!</h1>`;
        let quizCanvas = document.getElementById("quiz");
        quizCanvas.innerHTML = scoresHTML;
        quizCanvas.style.boxShadow= "2px 1px 5px 8px #888888";
        retakeTest.onclick = function(){
            quiz=new Quiz(questions);
            window.location.assign("./quiz.html");
        };
}

function getQuestionAnswer(){
    let returnTdList="";
    for(let i=0; i < quiz.questions.length ; i++)
                {
                    let currentQuestion=quiz.questions[i];
                    const red="#b22222";
                    const green="#015a01";
                    let selectedOptionColor="";
                    if (currentQuestion.answer === currentQuestion.selectedAnswer){
                        selectedOptionColor=green;
                    }else{
                        selectedOptionColor=red;
                    }
                    returnTdList= returnTdList +  `<tr>
                        <td> ${currentQuestion.questionNo}</td>
                        <td> ${currentQuestion.answer}</td>
                        <td style="color: #ffffff; background-color: ${selectedOptionColor};">${currentQuestion.selectedAnswer}</td>
                    </tr>`
                }
    return returnTdList;
}
function RetakeQuiz() {
    quiz=new Quiz(questions);
    loadQuiz();
 }


  