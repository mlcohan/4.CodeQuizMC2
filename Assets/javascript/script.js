//selecting elements on html

var timerElement = document.querySelector(".timer-count");
var timeWithText = document.getElementById("timer-text")
var questionFeedback = document.getElementById('question-feedback')
var questionContainer = document.getElementById('question-container')
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var storeScoreButton = document.getElementById('score-btn')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var highScoreElement = document.getElementById("high-score-form")
var highScoreInput = document.getElementById("exampleName")
var sumbitButton = document.getElementById("enter")


//defining variables 
var timer;
var timerCount;
var quizComplete;
var currentQuestionIndex;
var highScores = []

//question bank
 var questions = [
   {
     question: "What does DOM stand for?", 
     answers: [
       "Document Object Model" ,
       "Donuts On Me",
       "Desktop Object Method", 
      "Document Object Moment"
     ], 
     answer: "Document Object Model"
    },
    {
      question: "How do you make a function repeat itself without using a ton of code?", 
      answers: [
        "use an if statement",
        "use a for loop", 
        "use your brain", 
        "use a boolean", 
      ],
      answer: "use a for loop"
     },
     {
      question: "Which type of variable is used for text?", 
      answers: [
         "numbers",  
         "words", 
         "booleans", 
         "strings", 
      ],
      answer: "strings"
     },

     {
      question: "The first index of an array is...", 
      answers: [
         "-1",
         "0", 
         "1", 
        "null", 
      ],
      answer: "0"
     },
  ]
  


// Attach event listener to start button and next button

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", function () {
  setNextQuestion()
})


//Start Game Function
function startGame() {

    timerCount = 60;
    startTimer()
    currentQuestionIndex = -1
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    timeWithText.classList.remove('hide')
    setNextQuestion()
  }


//Set Next Question Function
function setNextQuestion (){
  resetState()
  currentQuestionIndex++
  if (currentQuestionIndex > 3 ) {
    
    resetState()
    winGame()
  } else{
  questionFeedback.classList.add('hide')
  showQuestion(questions[currentQuestionIndex])
  }
  
}


//clears the page of  old Elements
function resetState() {
  nextButton.classList.add("hide")
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
    
  }
  
}

//show the next question
function showQuestion(question) {
  questionElement.textContent = question.question
  question.answers.forEach(answer => {
    var button = document.createElement("button")
    button.textContent = answer
    button.classList.add("btn")
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)

  })
}




//Selecting the answer function
function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.textContent === questions[currentQuestionIndex].answer
  answerResponse(correct)
}


//Repsonses to right/wrong answers
function answerResponse(correct) {
  if (correct){
    questionFeedback.classList.remove('hide')
    questionFeedback.textContent= "Correct!"
    nextButton.classList.remove('hide')
  }
  else{
    questionFeedback.classList.remove('hide')
    questionFeedback.textContent = "Incorrect! Minus 10 seconds!!"
    timerCount -= 10
  }
}

//Win Function
function winGame () {
  questionContainer.textContent = "YOU WIN!! YOU FINISHED WITH " + timerCount + " seconds left!"
  storeScoreButton.classList.remove("hide")
  timeWithText.classList.add('hide');
  clearInterval(timer)
  questionFeedback.classList.add('hide')
}

//add event listner to store score button
storeScoreButton.addEventListener("click", storeScore)

//store score function
function storeScore(){
  storeScoreButton.classList.add("hide")
  highScoreElement.classList.remove("hide")
  sumbitButton.addEventListener("click", addHighScore)
  }

// Add HighScore Funtion
function addHighScore() {
  
   var userInput = highScoreInput.value 

  highScoreElement.textContent = (userInput + " finished with " + timerCount + " seconds left.")
  
  }


// The setTimer function starts and stops at 0
function startTimer() {
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
      console.log(timerCount)
    
      // lose if times out
      if (timerCount < 0){
        // Clears interval
        clearInterval(timer);
        outtaTime();
      }
  
  }, 1000);
}

//Lose (out of time) function
function outtaTime() {
  questionContainer.textContent = "YOU LOSE! TRY AGAIN!"
  timeWithText.classList.add("hide");
  resetState()
  questionFeedback.classList.add('hide')

}




