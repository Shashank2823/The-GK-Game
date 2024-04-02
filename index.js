const express = require('express');
const fs = require('fs');
const path=require('path');
const questions=require("/.question.json");
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '/'))); // 
app.use(express.static("./"))
//const questions = JSON.parse(fs.readFileSync('question.json', 'utf-8'));

// Create a function to replace characters in the answer with underscores
// function hideAnswer(answer) {
//     return answer.replace(/[a-zA-Z0-9]/g, '_ ');
// }


app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, "index.html"),"utf8",(err,data)=>{
        if(err)console.log("Error fetching index.html",err);
        else
        res.send(data);
    })
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
