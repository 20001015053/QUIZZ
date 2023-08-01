const username=document.getElementById("username");
const saveScoreBtn=document.getElementById("saveScore");
const mostRecentScore=localStorage.getItem('mostRecentScore');
const finalScore=document.getElementById("finalScore");
finalScore.innerHTML=mostRecentScore; 
const MAX_HIGH_SCORE=5;
localStorage.setItem("highScore",JSON.stringify([]));
const highScore=JSON.parse(localStorage.getItem("highScore"))||[];
console.log(highScore);
username.addEventListener("keyup",()=>{
    console.log(username.value);
    saveScoreBtn.disabled=!username.value;
});
saveHighScore=e=>{

e.preventDefault();
const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScore.push(score);
  highScore.sort((a,b)=>b.score-a.score)
  highScore.splice(5);
  localStorage.setItem("highScore",JSON.stringify("highScore"));

 window.location.assign("index.html");
};