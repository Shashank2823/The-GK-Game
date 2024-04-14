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
                    document.querySelector(".container").style.display = "flex";
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
                if(life==1 && flag!=1){
                    showToast(`Last chance!`, 'red', true);
                    document.getElementById("life").style.color = "red";
                }
                if(life==0){
                    document.getElementById("life").innerText = `LIFE : ${life}`;
                    showLoseModal();
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
            });
        });
        
        //MODAL
                document.getElementById("playAgain").addEventListener("click", function() {
                    document.getElementById("congratsModal").style.display = "none";
                    resetGame();
                });

                function resetGame() {
                    document.getElementById("life").style.color = "green";
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
                function closeWinModal() {
                    var WinModal = document.getElementById('congratsModal');
                    WinModal.style.display = 'none';
                    document.querySelector(".container").style.display = "none";
                    document.getElementById("question").style.display = "none";
                    document.getElementById("answer").style.display = "none";
                    document.getElementById("final").style.display = "block";
                    document.getElementById("final").innerText = `Your final score is : ${count}`;
                    document.getElementById("playbutton").style.display = "flex";
                }

                function showLoseModal() {
                    var loseModal = document.getElementById('loseModal');
                    loseModal.style.display = 'block';
                }
                
                function closeLoseModal() {
                    var loseModal = document.getElementById('loseModal');
                    loseModal.style.display = 'none';
                    document.querySelector(".container").style.display = "none";
                    document.getElementById("question").style.display = "none";
                    document.getElementById("answer").style.display = "none";
                    document.getElementById("final").style.display = "block";
                    document.getElementById("final").innerText = `Your final score is : ${count}`;
                    document.getElementById("playbutton").style.display = "flex";
                }
        
                function playAgain(){
                    document.getElementById("loseModal").style.display = "none";
                    document.getElementById("playbutton").style.display = "none";
                    document.getElementById("final").style.display = "none";
                    document.getElementById("question").style.display = "block";
                    document.getElementById("answer").style.display = "block";
                    resetGame();
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