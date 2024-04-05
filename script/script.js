// API https://da-demo.github.io/api/futurama/questions


//Event listeners
function eventListeners() {
  _checkBtn.addEventListener("click", checkAnswer);
  
 
}  

document.addEventListener("DOMContentLoaded", () => {
   // Call the function to fetch and shuffle questions
fetchQuestions();
eventListeners();
   totalQuestions.textContent = totalQuestionsCount;
   correctScore.textContent = scoreCorrect;
   wrongScore.textContent = scoreWrong;
});


const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const correctScore = document.getElementById("correct-answers");
const wrongScore = document.getElementById("wrong-answers");
const totalQuestions = document.getElementById("total-questions"); 
const _checkBtn = document.getElementById("check-answer");


const _result = document.getElementById("result");

let quizQuestions = [];
let _correctanswer = "";
let scoreCorrect = 0;
let scoreWrong = 0;
let totalQuestionsCount = 0;
let currentQuestion = 0;
let quizRound = 1;

// Create a function that will display the right answer
async function showQuestion(singleQuestion) {
   _checkBtn.disabled = false;
  _correctanswer = singleQuestion.correctAnswer;
  let _possibleanswers = singleQuestion.possibleAnswers;


  // check if the element exists before attempting to modify its innerHTML property.
  if (_question) {
    _question.innerHTML = `${singleQuestion.question}`;
  } else {
    console.error("Element not found in the DOM.");
  }
  //Show the possible answers
  _options.innerHTML = `${_possibleanswers
    .map((option) => `<li><span>${option}</span></li>`)
    .join("")}
    `;

    selectOptions();
}

// Shuffle the questions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// Fetch the questions from the API
async function fetchQuestions() {
  try {
    const API_Url = "https://da-demo.github.io/api/futurama/questions";
    const response = await fetch(`${API_Url}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    _result.innerHTML = "";
    // Shuffle the questions and pick the first 10
    const shuffledQuestions = shuffle([...data]);
    quizQuestions = shuffledQuestions.slice(0, 10);
    
    // Call showQuestion with the first question
    showQuestion(quizQuestions[0]);

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Function to select the options
function selectOptions() {

   _options.querySelectorAll("li").forEach((option) => {
      option.addEventListener("click", () => {
        if (_options.querySelector(".selected")) {
          const activeOption = _options.querySelector(".selected");
            activeOption.classList.remove("selected");
        }
        option.classList.add("selected");
         
      });

});

}

// Function to check the answer
function checkAnswer(){
  const selectedOption = _options.querySelector(".selected");
  if (!selectedOption) {
    alert("Please select an option!");
    return;
   
  }
  _checkBtn.disabled = true;
  if (_options.querySelector(".selected")) {
    let selectedAnswer = _options.querySelector(".selected span").textContent; 
    
      if (selectedAnswer === _correctanswer) {
         scoreCorrect++;
         correctScore.textContent = scoreCorrect;
         _result.innerHTML = `<p> <i class="fa fa-check"></i></i> Rätt svar!</p>`;
         console.log("Correct answer", scoreCorrect);
      } 
      else {
         scoreWrong++;  
         wrongScore.textContent = scoreWrong;
         
         
         _result.innerHTML = `<p> <i class="fa fa-times-circle"></i> Fel! Rätt svar är: ${_correctanswer}</p>` ;
         console.log("Wrong answer", scoreWrong);
      }
      
   }
   
   checkCount();
}

// Function to check the count of questions,and display the next question
function checkCount(){
   currentQuestion++;
   setCount();
   if(currentQuestion < quizQuestions.length){
      
         showQuestion(quizQuestions[currentQuestion]);

   }
   else{
     saveQuizResults();
      // Display the results
      _result.innerHTML = `<p>Resultat: Du fick rätt på ${scoreCorrect} frågor!</p>`;
      _checkBtn.style.display = "none";
      playAgainBtn();
    

      

   }
}

// Set count
function setCount(){
   totalQuestionsCount++;
   totalQuestions.textContent = totalQuestionsCount;
}


function playAgainBtn(){
  // Create and append the "Play Again" button dynamically
  const playAgainBtn = document.createElement("button");
  playAgainBtn.id = "play-again";
  playAgainBtn.textContent = "Spela igen";
  playAgainBtn.style.display = "block"; // Ensure it's visible
  playAgainBtn.style.margin = "auto"; // Center the button
  playAgainBtn.style.padding = "0.5rem 1rem"; // Add some padding
  playAgainBtn.style.fontSize = "1.2rem"; // Set font size
  playAgainBtn.style.backgroundColor = "#FF3DAF"; // Set background color
  playAgainBtn.style.color = "#FFF"; // Set text color
  playAgainBtn.style.border = "3px solid #FF3DAF"; // Set border
  playAgainBtn.style.borderRadius = "0.5rem"; // Set border radius
  playAgainBtn.style.cursor = "pointer"; // Change cursor on hover
  playAgainBtn.style.transition = "var(--transition)"; // Add transition
  playAgainBtn.style.boxShadow = "0 5px 7px rgba(25, 5, 5, 0.153)"; // Add box shadow


 const quizFootDiv = document.getElementById("quiz-foot");
    quizFootDiv.appendChild(playAgainBtn);

  // Add an event listener to the "Play Again" button
  playAgainBtn.addEventListener("click", playAgain);
}

// Function to save quiz results to localStorage
function saveQuizResults() {
const roundNumber = `round ${quizRound}`;
 localStorage.setItem(roundNumber, JSON.stringify({quizRound, scoreCorrect, scoreWrong, totalQuestionsCount }));
 console.log("Quiz results saved to localStorage.");
}
function displayQuizResults() {
  const modal = document.getElementById("quiz-results-modal");
  const closeButton = document.querySelector(".close-button");
  const modalContent = document.getElementById("modal-content");

  // Retrieve quiz results from localStorage
  let results = '';
  for (let i = 1; i <= localStorage.length; i++) {
      const key = localStorage.key(i - 1); // localStorage keys are 0-indexed
      if (key.startsWith('round ')) {
          const resultsString = localStorage.getItem(key);
          const resultsObj = JSON.parse(resultsString);
          results += `Quiz Round ${resultsObj.quizRound}: Correct Answers: ${resultsObj.scoreCorrect}, Wrong Answers: ${resultsObj.scoreWrong}, Total Questions: ${resultsObj.totalQuestionsCount}<br>`;
      }
  }
  modalContent.innerHTML = results;

  // Show the modal
  modal.style.display = "block";

  // Close modal when the close button is clicked or when clicking outside the modal
  closeButton.addEventListener("click", () => {
      modal.style.display = "none";
  });

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}


function playAgain(){

    // Remove the "Play Again" button
    const existingPlayAgainBtn = document.getElementById("play-again");
    if (existingPlayAgainBtn) {
        existingPlayAgainBtn.remove();
    }
    quizRound++;
    // Reset the scores and fetch new questions
    scoreCorrect = 0;
    scoreWrong = 0;
    totalQuestionsCount = 0;
    currentQuestion = 0;
    correctScore.textContent = scoreCorrect;
    wrongScore.textContent = scoreWrong;
    totalQuestions.textContent = totalQuestionsCount;
    _result.innerHTML = "";
    _checkBtn.style.display = "block";
    displayQuizResults();
    fetchQuestions();
}
