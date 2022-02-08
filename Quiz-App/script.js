

const startBtn = document.querySelector(".start-btn button")
const infoBox = document.querySelector(".info-box")
const exitBtn = document.querySelector(".buttons .quit")
const continueBtn = document.querySelector(".buttons .restart")
const quizBox = document.querySelector(".quiz-box")
const optionList = document.querySelector(".option-list");
const timeCount = quizBox.querySelector('.timer-sec')
const timeLine = quizBox.querySelector('.time-line')
const timeOff = quizBox.querySelector('.time-text')


startBtn.addEventListener("click", ()=>{
    infoBox.classList.add("active-info")
})
exitBtn.addEventListener("click", ()=>{
    infoBox.classList.remove("active-info")
})
continueBtn.addEventListener("click", ()=>{
    infoBox.classList.remove("active-info")
    quizBox.classList.add("active-quiz")

    showQuesions(0)
    queCounter(1)
    startTimer(15)
    startTimeLine(0)
})

let queCount = 0,
    queNumb = 1,
    counter,
    counterLine,
    timeValue = 15,
    widthValue = 0,
    userScore = 0;

const nextBtn = quizBox.querySelector('.next-btn')
const resultBox = document.querySelector(".result-box")
const restartQuiz = resultBox.querySelector(".buttons .restart")
const quitQuiz = resultBox.querySelector(".buttons .quit")

restartQuiz.onclick = ()=>{
    resultBox.classList.remove("active-result")
    quizBox.classList.add("active-quiz")
    queCount = 0,
    queNumb = 1,
    timeValue = 15,
    widthValue = 0,
    userScore = 0;
    showQuesions(queCount);
    queCounter(queNumb)

    clearInterval(counter)
    startTimer(timeValue)

    clearInterval(counterLine)
    startTimeLine(widthValue)
    nextBtn.style.display = 'none'
    timeOff.textContent = "Time Left";
}
quitQuiz.addEventListener('click', ()=>{
    window.location.reload();
})

nextBtn.addEventListener('click', ()=>{
    if( queCount < quesions.length - 1 ){
        queCount++;
        queNumb++;
        showQuesions(queCount);
        queCounter(queNumb)

        clearInterval(counter)
        startTimer(timeValue)

        clearInterval(counterLine)
        startTimeLine(widthValue)
        nextBtn.style.display = 'none'
        timeOff.textContent = "Time Left";
    }
    else{
        showResultBox();
        clearInterval(counter)
        clearInterval(counterLine)
    }
})
const randomQuestions = [0,1,2,3,4];
const randomOptions = [0,1,2,3]
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
shuffle(randomQuestions);
shuffle(randomOptions);
function showQuesions(index){
    const queText = document.querySelector(".que-text");
    
    let queTag = `<span>${quesions[index].numb}. ${quesions[randomQuestions[index]].quesion}</span>`;
    let optionTag = `<div class="option"><span>${quesions[randomQuestions[index]].options[randomOptions[0]]}</span></div>`
                    + `<div class="option"><span>${quesions[randomQuestions[index]].options[randomOptions[1]]}</span></div>`
                    + `<div class="option"><span>${quesions[randomQuestions[index]].options[randomOptions[2]]}</span></div>`
                    + `<div class="option"><span>${quesions[randomQuestions[index]].options[randomOptions[3]]}</span></div>`;
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;

    const options = optionList.querySelectorAll(".option");
    options.forEach(option=>{
        option.setAttribute('onclick', 'optionSelected(this)')
    })

}

let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`

function optionSelected(answer){

    clearInterval(counter)
    clearInterval(counterLine)

    let userAns = answer.textContent;
    let correctAns = quesions[randomQuestions[queCount]].answer;
    const allOptions = Array.from(optionList.children);

    if(userAns === correctAns)
    {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon)
        userScore++;
    }
    else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon)
        //selecting the correct answer automatically
        allOptions.forEach(child=>{
            if(child.textContent === correctAns){
                child.setAttribute("class", "option correct")
                child.insertAdjacentHTML("beforeend", tickIcon)
            }
        })
    }
    //disabling all the options
    

    allOptions.forEach(child=>{
        child.classList.add('disabled');
    })

    nextBtn.style.display = 'block'
}

function queCounter(index){
    const bottonQuesCounter = quizBox.querySelector(".total-que");
    let totalQuesCountTag = `<span><p>${index}</p>of<p>${quesions.length}</p>Questions</span>`

    bottonQuesCounter.innerHTML = totalQuesCountTag;
}

function showResultBox(){
    infoBox.classList.remove('active-info')
    quizBox.classList.remove('active-quiz')
    resultBox.classList.add('active-result')
    const scoreText = resultBox.querySelector(".score-text")

    if(userScore > 3){
        let scoreTag = `<span>and congrats! You got <p>${userScore}</p>out of<p>${quesions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = `<span>and nice, You got <p>${userScore}</p>out of<p>${quesions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = `<span>and sorry, You got <p>${userScore}</p>out of<p>${quesions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(()=>{
        
        time--;
        if(time <= 9){
            timeCount.textContent = '0'+time;
        }else{
            timeCount.textContent = time;
        }
        if(time < 0){
            clearInterval(counter)
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";


            let correctAns = quesions[randomQuestions[queCount]].answer;
            const allOptions = Array.from(optionList.children);

            allOptions.forEach(child=>{
                if(child.textContent === correctAns){
                    child.setAttribute("class", "option correct")
                    child.insertAdjacentHTML("beforeend", tickIcon)
                }
            })
            //disabling all the options
    

            allOptions.forEach(child=>{
                child.classList.add('disabled');
            })

            nextBtn.style.display = 'block'
        }
    }, 1000);
}
function startTimeLine(time){
    counterLine = setInterval(()=>{
        time +=1 ;
        timeLine.style.width = time + 'px';

        if(time > 549){
            clearInterval(counterLine)
        }
    }, 29);
}













