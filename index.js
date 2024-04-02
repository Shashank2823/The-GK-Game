const express = require('express');
const fs = require('fs');
const path=require('path');
const cors = require('cors');
const questions = require('./question.json');


const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "/")));
app.use(express.urlencoded({extended:'false'}));
app.use(express.static("./"));  
//const questions = JSON.parse(fs.readFileSync('question.json', 'utf-8'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/random-question', (req, res) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    
    const questionWithBlankAnswer = {
        question: randomQuestion.question,
        answer: randomQuestion.answer
    };

    res.json(questionWithBlankAnswer);
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
