// API https://da-demo.github.io/api/futurama/questions

// 1. Fetch the questions from the API
// 2. Create a function that will display the questions
// 3. Create a function that will display the answers
// 4. Create a function that will display the correct answer
// 5. Create a function that will display the score
// 6. Create a function that will display the next question
// 7. Create a function that will display the previous question
// 8. Create a function that will display the results
// 9. Create a function that will display the start button
// 10. Create a function that will display the reset button
const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const correctScore = document.getElementById("correct-answers");
const wrongScore = document.getElementById("wrong-answers");
const totalQuestions = document.getElementById("total-questions"); 
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");

let _correctanswer = "";
let scoreCorrect = 0;
let scoreWrong = 0;
let totalQuestionsCount = 0;

//Event listeners
function eventListeners() {
  _checkBtn.addEventListener("click", checkAnswer);
  //_playAgainBtn.addEventListener("click", playAgain);
}  

document.addEventListener("DOMContentLoaded", () => {
   // Call the function to fetch and shuffle questions
fetchQuestions();
eventListeners();
   totalQuestions.textContent = totalQuestionsCount;
   correctScore.textContent = scoreCorrect;
   wrongScore.textContent = scoreWrong;
});

// Create a function that will display the right answer
async function showQuestion(singleQuestion) {
  _correctanswer = singleQuestion.correctAnswer;
  let _possibleanswers = singleQuestion.possibleAnswers;
  console.log(_correctanswer);
  console.log(_possibleanswers);

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

// Fisher-Yates shuffle function
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
    // Shuffle the questions and pick the first 10
    const shuffledQuestions = shuffle([...data]);
    const quizQuestions = shuffledQuestions.slice(0, 10);
    console.log(quizQuestions);

    // Call showQuestion with the first question
    showQuestion(quizQuestions[0]);

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}


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
         totalQuestionsCount++;
         totalQuestions.textContent = totalQuestionsCount;
         correctScore.textContent = scoreCorrect;

         console.log("Correct answer", scoreCorrect);
      } 
      else {
         scoreWrong++;
         wrongScore.textContent = scoreWrong;
         totalQuestionsCount++;
         totalQuestions.textContent = totalQuestionsCount;
         console.log("Wrong answer", scoreWrong);
      }
   }
 
  
  /*=== _correctanswer) {
    scoreCorrect++;
    correctScore.textContent = scoreCorrect;
  } else {     
    scoreWrong++;
    wrongScore.textContent = scoreWrong;
  }

  const answer = selectedOption.textContent;
  if (answer === _correctanswer) {
    scoreCorrect++;
    correctScore.textContent = scoreCorrect;
  } else {
    scoreWrong++;
    wrongScore.textContent = scoreWrong;
  }

  // Call the next question
  nextQuestion();
});*/

}