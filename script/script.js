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
       const response = await fetch("https://da-demo.github.io/api/futurama/questions");
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const data = await response.json();
       // Shuffle the questions and pick the first 10
       const shuffledQuestions = shuffle([...data]);
       const quizQuestions = shuffledQuestions.slice(0, 10);
       console.log(quizQuestions);
    } catch (error) {
       console.error('There was a problem with the fetch operation:', error);
    }
   }
   
   // Call the function to fetch and shuffle questions
   fetchQuestions();


   const _questions = document.getElementById('questions');