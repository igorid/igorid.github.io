var testPage = {};
testPage.questions = [];
testPage.linkToElement = [];
CLASSLISTNAME='pure-form';

testPage.init = function(parrentForm, textButton){
    var element = document.createElement('form');
    element.classList.add(CLASSLISTNAME);
    element.innerHTML = '<button class="button-success pure-button">'+textButton+'</button>';
    parrentForm.appendChild(element);
    return document.querySelector('.'+CLASSLISTNAME);
};

testPage.addQuestion = function(parrentForm, textQuestion){
    var element = document.createElement('h2');
    element.classList.add('question');
    element.innerHTML = textQuestion;
    var testButton = document.getElementById('start-button');
    parrentForm.insertBefore(element, parrentForm.lastChild);
    this.questions[this.questions.length]=[textQuestion];
    this.linkToElement[this.linkToElement.length]=[element];
};

testPage.addAnswer = function (parrentForm, isActive, numQuestion, textAnswer){
    if (this.questions.length >= numQuestion) {
        var numAnswer = this.questions[numQuestion-1].length;
        var element = document.createElement('label');
        var checked = '';
        if (isActive == true) {
            checked = 'checked';
        }
        element.classList.add('answer');
        element.innerHTML = '<label for="quiestion' + numQuestion + '-option' + numAnswer + '" class="pure-radio">' +
            '<input id="quiestion' + numQuestion + '-option' + numAnswer + '" type="radio" name="quiestion' + numQuestion + '-optionsRadios" value="option' + numAnswer +
            '" ' + checked + ' >' + textAnswer + '</label>';

        if (numQuestion == this.questions.length) {
            parrentForm.insertBefore(element, parrentForm.lastChild);
        } else {
            parrentForm.insertBefore(element, this.linkToElement[numQuestion][0]);
        }
        this.questions[numQuestion-1][numAnswer] = textAnswer;
        this.linkToElement[numQuestion-1][numAnswer] = element;
    } else {
        console.log('testPage.addAnswer:не инициирован вопрос, вариант ответа не может быть добавлен')
    }
};


var container = document.querySelector('.wrapper');

container = testPage.init(container,'Проверить мои результаты');
testPage.addQuestion(container,'Вопрос №1');
testPage.addQuestion(container,'Вопрос №2');
testPage.addQuestion(container,'Вопрос №3');
testPage.addAnswer(container,true,1,'Вариант ответа №1-1');
testPage.addAnswer(container,false,1,'Вариант ответа №2-1');
testPage.addAnswer(container,true,2,'Вариант ответа №1-2');
testPage.addAnswer(container,false,2,'Вариант ответа №2-2');
testPage.addAnswer(container,true,3,'Вариант ответа №1-3');
testPage.addAnswer(container,false,3,'Вариант ответа №2-3');
testPage.addAnswer(container,false,3,'Вариант ответа №3-3');
testPage.addAnswer(container,false,1,'Вариант ответа №3-1');
testPage.addAnswer(container,false,2,'Вариант ответа №3-2');

console.log(testPage.questions);


