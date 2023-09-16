// Fetch trivia questions from the Trivia API
let questions = [];

let category = 12;
const fetchTriviaQuestions = async () => {
	const response = await fetch(
		`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
	);
	const data = await response.json();
	console.log(data.results);
	return data.results;
};

// Display a trivia question
const displayTriviaQuestion = (target) => {
	const quizApp = document.querySelector("#quiz-app");
	quizApp.innerHTML = `
  <div class="question">${target.question}</div>
  <div class="answers">
    <div class="answer cr">${target.correct_answer}</div>
    <div class="answer">${target.incorrect_answers[0]}</div>
    <div class="answer">${target.incorrect_answers[1]}</div>
    <div class="answer">${target.incorrect_answers[2]}</div>
  </div>
  `;

	// Get the correct answer element
	const correctAnswer = document.querySelector(".cr");
	// Add an event listener to the quiz app element
	quizApp.addEventListener("click", (event) => {
		console.log("Clicked");
		// Check if the target element is an answer button
		if (event.target.classList.contains("answer")) {
			// Check if the answer is correct
			if (event.target.textContent === correctAnswer.textContent) {
				// The answer is correct
				event.target.classList.add("correct");
			} else {
				// The answer is incorrect
				event.target.classList.add("incorrect");
			}
		}
	});
};
let i = 0;
// Start the quiz
const startQuiz = async () => {
	// Fetch trivia questions
	questions = await fetchTriviaQuestions();

	// Display the first question
	displayTriviaQuestion(questions[i]);
};

// // Check the user's answer
// const checkAnswer = (answer) => {
// 	const quizApp = document.querySelector("#quiz-app");
// 	const correctAnswer = quizApp.querySelector(".cr");
// 	console.log(correctAnswer);
// 	if (answer.textContent === correctAnswer.textContent) {
// 		// The answer is correct
// 		correctAnswer.classList.add("correct");
// 	} else {
// 		// The answer is incorrect
// 		correctAnswer.classList.add("correct");
// 		answer.classList.add("incorrect");
// 	}
// };
const answers = document.getElementsByClassName("answers");
console.log(answers);
// Get the next button element
const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");

// Get the quiz app element

// Add an event listener to the next button
nextButton.addEventListener("click", () => {
	// Get the current question index
	i++;

	// Increment the current question index

	// If the current question index is greater than the last question index, then the quiz is over
	if (i > questions.length - 1) {
		return;
	}

	// Display the next question
	displayTriviaQuestion(questions[i]);
});
prevButton.addEventListener("click", () => {
	i--;

	// If the current question index is greater than the last question index, then the quiz is over
	if (i < 0) {
		return;
	}

	// Display the next question
	displayTriviaQuestion(questions[i]);
});
// Start the quiz
startQuiz();
