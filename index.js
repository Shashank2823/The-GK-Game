const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const questions = JSON.parse(fs.readFileSync('question.json', 'utf-8'));

// Create a function to replace characters in the answer with underscores
// function hideAnswer(answer) {
//     return answer.replace(/[a-zA-Z0-9]/g, '_ ');
// }

app.use(express.static('public'));

app.get('/random-question', (req, res) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    
    // Create an object with question and answer with underscores
    const questionWithBlankAnswer = {
        question: randomQuestion.question,
        answer: randomQuestion.answer
    };

    res.json(questionWithBlankAnswer);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
