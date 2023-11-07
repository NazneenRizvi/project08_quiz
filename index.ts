import inquirer from 'inquirer';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const questions: Question[] = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
        correctAnswer: "Blue Whale"
    }
];

let currentQuestion = 0;
let score = 0;
let studentName = "";

async function startQuiz() {
    const nameResponse = await inquirer.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'Please enter your name: '
        }
    ]);

    studentName = nameResponse.studentName;
    displayQuestion();
}

async function displayQuestion() {
    if (currentQuestion < questions.length) {
        const currentQuestionData = questions[currentQuestion];

        const answer: { userChoice: string } = await inquirer.prompt([
            {
                type: 'list',
                name: 'userChoice',
                message: currentQuestionData.question,
                choices: currentQuestionData.options
            }
        ]);

        if (answer.userChoice === currentQuestionData.correctAnswer) {
            console.log("Correct!\n");
            score++;
        } else {
            console.log(`Wrong! The correct answer is: ${currentQuestionData.correctAnswer}\n`);
        }

        currentQuestion++;
        await displayQuestion();
    } else {
        const percentage = (score / questions.length) * 100;
        console.log(`Quiz completed, ${studentName}. Your score: ${score} out of ${questions.length}. That's ${percentage}%.`);
        if (percentage < 40) {
            console.log("You have failed the quiz.");
        } else {
            console.log("You have passed the quiz.");
        }
    }
}

startQuiz();
