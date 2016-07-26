function changeClass(workspace){
  for (var i = 0; i < options.length; i++){
    document.getElementById(options[i]).className = "jsScript";
  }
  document.getElementById(workspace).className = "jsScript selected";
}
var options = ["addition", "subtraction", "multiplication", "division", "random"];
var score, count, streak;
var number1, number2, currentAnswer;
var equation;
function addListener(location, eventType, callFunction, parameters){
  var func = window;
  var parts = callFunction.split('.');
  for (var i = 0; i < parts.length; i++){
    if (func[parts[i]]){
      func = func[parts[i]];
    } else {
      console.error("Trying to attach a listener to a function that does not exist. Cannot find " + callFunction + ".");
      break;
    }
  }
  if (typeof func !== "function"){
    console.error("Trying to attach a listener to something that is not a function (" + callFunction + ").");
  } else {
    if (!parameters){
      document.getElementById(location).addEventListener(eventType, func, true);
    } else {
      document.getElementById(location).addEventListener(eventType, function(){func(parameters);}, true);
    }
  }
}
for (var i = 0; i < options.length; i++){
  addListener(options[i], "click", "loadWorkspace", options[i]);
}
function loadWorkspace(workspace){
  var htmlCode = "";
  htmlCode += '<p>Total score: <span id="score">0</span> of <span id="count">0</span><br>Streak: <span id="streak">0</span></p>';
  score = 0;
  count = 0;
  streak = 0;
  htmlCode += '<p id="previousQuestion"></p><div id="equation"></div>';
  htmlCode += '<button id="checkAnswer">Check Answer</button>';
  document.getElementById("workspace").innerHTML = htmlCode;
  addListener("checkAnswer", "click", "checkAnswer", workspace);
  changeClass(workspace);
  nextProblem(workspace);
}
function nextProblem(workspace){
  function randomNumber(range){
    return Math.floor(Math.random() * range);
  }
  var htmlCode = "";
  equation = "";
  var operator;
  console.log("The argument is " + workspace);
  if (workspace === "random"){
    var newOperator = randomNumber((options.length - 1));
    console.log("The option is now " + newOperator);
    workspace = options[newOperator];
  }
  console.log("The argument is now " + workspace);
  switch (workspace){
  case "addition":
    operator = '+';
    if (streak < 10){
      number1 = randomNumber(10) + 1;
      number2 = randomNumber(10) + 1;
    } else {
      number1 = randomNumber(streak);
      number2 = randomNumber(streak);
    }
    currentAnswer = number1 + number2;
    break;
  case "subtraction":
    operator = '-';
    if (streak < 10){
      number2 = randomNumber(10) + 1;
      number1 = randomNumber(10) + number2;
    } else {
      number1 = randomNumber(streak);
      number2 = randomNumber(streak);
    }
    currentAnswer = number1 - number2;
    break;
  case "multiplication":
    operator = '&times;';
    if (streak < 10){
      number1 = randomNumber(10) + 1;
      number2 = randomNumber(10) + 1;
    } else {
      number1 = randomNumber(streak);
      number2 = randomNumber(streak);
    }
    currentAnswer = number1 * number2;
    break;
  case "division":
    operator = '&divide;';
    if (streak < 10){
      currentAnswer = randomNumber(10) + 1;
      number2 = randomNumber(10) + 1;
    } else {
      currentAnswer = randomNumber(streak);
      number2 = randomNumber(streak);
    }
    if (number2 === 0){
      number2++;
    }
    number1 = currentAnswer * number2;
    break;
  }
  htmlCode += '<div class="numberBox">' + number1 + '</div>';
  htmlCode += '<div class="numberBox">' + operator + '</div>';
  htmlCode += '<div class="numberBox">' + number2 + '</div>';
  htmlCode += '<div class="numberBox">=</div>';
  htmlCode += '<input type="number" id="answer" autofocus>';
  equation += number1 + " " + operator + " " + number2;
  document.getElementById("equation").innerHTML = htmlCode;
  document.getElementById("answer").addEventListener("keypress", function() {
      if (event.keyCode == 13) document.getElementById("checkAnswer").click();
  });
  document.getElementById("answer").value = null;
  document.getElementById("answer").focus();
}
function checkAnswer(workspace){
  var userAnswer = document.getElementById("answer").value;
  var previousQuestion = document.getElementById("previousQuestion");
  if (userAnswer){
    var htmlCode = "The previous question was: " + equation;
    htmlCode += '<br>The correct answer is: ' + currentAnswer;
    htmlCode += '<br>You answered: ' + userAnswer;
    if (parseFloat(userAnswer) === currentAnswer){
      htmlCode += '. Great work!';
      score++;
      streak++;
      previousQuestion.className = "correctAnswer";
    } else {
      streak = 0;
      previousQuestion.className = "incorrectAnswer";
    }
    previousQuestion.innerHTML = htmlCode;
    count++;
    document.getElementById("score").innerText = score;
    document.getElementById("count").innerText = count;
    document.getElementById("streak").innerText = streak;
    nextProblem(workspace);
  }
}
