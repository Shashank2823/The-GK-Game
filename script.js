var ans="";
        var count=0;
        var life=3;
        var flag=0;
        document.getElementById("generate").addEventListener("click", function() {
            fetch('/random-question')
                .then(response => response.json())
                .then(data => {
                    document.getElementById("question").innerText = data.question;
                    ans=data.answer;
                    const answer = data.answer.replace(/[a-zA-Z]/g, '*');
                    document.getElementById("answer").innerHTML = answer;
                    document.querySelector(".container").style.display = "block";
                    document.getElementById("generate").style.display = "none";
                })
                .catch(error => console.error('Error abc:', error));
        });
        document.getElementById("next").addEventListener("click", function() {
            fetch('/random-question')
                .then(response => response.json())
                .then(data => {
                    document.getElementById("question").innerText = data.question;
                    ans=data.answer;
                    const answer = data.answer.replace(/[a-zA-Z]/g, '*');
                    document.getElementById("answer").innerHTML = answer;
                    //document.querySelector(".container").style.display = "block";
                    document.getElementById("next").style.display = "none";
                })
                .catch(error => console.error('Error abc:', error));
        });

        const cubes = document.querySelectorAll(".cube");
        cubes.forEach(cube => {
            
            cube.addEventListener("click", function() {
                console.log(cube.innerText);
                const clickedAlphabet = cube.innerText;
                let answer = document.getElementById("answer").innerHTML;
                
                const updatedAnswer = [];
                for (let j = 0; j < answer.length; j++) {
                    if (ans[j].toUpperCase() === clickedAlphabet ) {
                        updatedAnswer.push(clickedAlphabet);
                        flag=1;
                    } else {
                        updatedAnswer.push(answer[j]);
                        
                    }
                }
                console.log(updatedAnswer.join(''));
                document.getElementById("answer").innerText = updatedAnswer.join('');
                if(flag!=1){
                    life--;
                    document.getElementById("life").innerText = `LIFE : ${life}`;
                    showToast(`Oops! Wrong guess. Lives left: ${life}`, 'red', true);
                }
                
                if(life==0){
                    document.getElementById("life").innerText = `LIFE : ${life}`;
                    showToast("Game over! Wanna play again?");
                    life=3;
                    count=0;
                    document.getElementById("score").innerText = `SCORE : ${count}`;
                    document.getElementById("life").innerText = `LIFE : ${life}`;
                }
                flag=0;

                if (updatedAnswer.length === ans.length && updatedAnswer.join('').toUpperCase() === ans.toUpperCase()) { 
                    count++; 
                    document.getElementById("score").innerText = `SCORE : ${count}`;
                    if (count == 2) {
                        checkWinCondition();
                    } else {
                        showToast("Correct answer! Next question!", 'green');
                        document.getElementById("next").style.display = "block";
                    }
                }

                document.getElementById("playAgain").addEventListener("click", function() {
                    document.getElementById("congratsModal").style.display = "none";
                    resetGame();
                });

                //MODAL
                function resetGame() {
                    document.getElementById("score").innerText = "SCORE : 0";
                    document.getElementById("life").innerText = "LIFE : 3";
                    count = 0;
                    life = 3;
                    document.getElementById("generate").click();
                }

                function checkWinCondition() {
                    if (count == 2) {
                        document.getElementById("congratsModal").style.display = "block";
                    }
                }


                //TOAST
                function showToast(message, colorClass, shake=false) {
                    const toast = document.getElementById("toast");
                    toast.textContent = message;
                    toast.className = `toast ${colorClass} show`;
                    if (shake) {
                        toast.classList.add("shake");
                    }
                    setTimeout(() => { 
                        toast.className = toast.className.replace("show", "");
                        if (shake) {
                            toast.classList.remove("shake");
                        }
                    }, 3000);
                }

            });
        });