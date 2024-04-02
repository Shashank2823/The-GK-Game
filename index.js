const express = require('express');
const fs = require('fs');
const path=require('path');
const cors = require('cors');

const app = express();
app.use(cors());

//const questions = require('./question.json');

app.use(express.static(path.join(__dirname, '/'))); // 
app.use(express.static("./"))
//const questions = JSON.parse(fs.readFileSync('question.json', 'utf-8'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/random-question', (req, res) => {
    fs.readFile(path.join(__dirname, 'question.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading question.json:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        try {
            const questions = JSON.parse(data);
            const randomIndex = Math.floor(Math.random() * questions.length);
            const randomQuestion = questions[randomIndex];
            const questionWithBlankAnswer = {
                  question: randomQuestion.question,
                  answer: randomQuestion.answer
                };
                res.json(questionWithBlankAnswer);
        } catch (parseError) {
            console.error('Error parsing question.json:', parseError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }); 
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
