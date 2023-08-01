
const choices=Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);
const questionCounterText=document.getElementById("questionCounter");
const scoreText=document.getElementById("score");
let currentQuestion={};
let acceptingAnswers=false;
let score=0;
let questioncounter=0;
let availableQuestion=[];

let questions=[];
fetch("https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&type=multiple").then(res=>{
return res.json();
}).then(loadedQuestion=>{
  console.log(loadedQuestion.results);
  questions=loadedQuestion.results.map(loadedQuestion=>{
   const formattedQuestion={
    question:loadedQuestion.question
   };
   const answerchoice=[...loadedQuestion.incorrect_answers];
   formattedQuestion.answer=Math.floor(Math.random()*3)+1;
   answerchoice.splice(formattedQuestion.answer-1,0,loadedQuestion.correct_answer);
   answerchoice.forEach((choice,index)=>{
    formattedQuestion["choice"+(index+1)]=choice;
   });
   return formattedQuestion;
  });
  // questions=loadedQuestion;
   startGame();
})
 const CORRECT_BONUS=10;
 const MAX_QUESTION=10;

 //constants
  startGame=()=>{
    questioncounter=0;
    score=0;
    availableQuestion=[...questions];
    console.log(availableQuestion);
getNewQuestion();
  };

getNewQuestion=()=>{
    if(availableQuestion.length==0||questioncounter>=MAX_QUESTION){
      localStorage.setItem('mostRecentScore',score); 
      return window.location.assign("end.html");
    }
    questioncounter++;
    questionCounterText.innerHTML=`${questioncounter}/${MAX_QUESTION}`
   const questionIndex= Math.floor(Math.random()*availableQuestion.length);  
   currentQuestion=availableQuestion[questionIndex]; 
   document.getElementById("question").innerHTML=currentQuestion.question;
   
   choices.forEach(choice=>{
    const number=choice.dataset['number'];
    choice.innerText=currentQuestion['choice'+number];
   })
   availableQuestion.splice(questionIndex,1);
   acceptingAnswers=true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;
      const selectChoice = e.target;
      const selectAnswer = selectChoice.dataset["number"];
      console.log(selectAnswer);
      const classtoApply = selectAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
      selectChoice.parentElement.classList.add(classtoApply);
     // document.getElementsByClassName("choice-text").classList.add(classtoApply);
        selectChoice.classList.add(classtoApply);
     
  
      if (classtoApply === 'correct') {
        score += CORRECT_BONUS; // Update the score for correct answers (if needed)
        document.getElementById("score").innerHTML=score;
       // localStorage.setItem("highScore",score);
      }
       
      setTimeout(() => {
        selectChoice.parentElement.classList.remove(classtoApply);
        selectChoice.classList.remove(classtoApply);
        getNewQuestion();
      }, 800);
  
    });
  });

 