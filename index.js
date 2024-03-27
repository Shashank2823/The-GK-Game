const express = require('express');
const fs = require('fs');
const path=require('path');

const app = express();

const questions = JSON.parse(fs.readFileSync('question.json', 'utf-8'));

// Create a function to replace characters in the answer with underscores
// function hideAnswer(answer) {
//     return answer.replace(/[a-zA-Z0-9]/g, '_ ');
// }

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


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

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
