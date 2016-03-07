
function TTimer(parrentElement, classListName) {
    var self = this;
    self.parentElement = parrentElement;

    self.status = 'reset';
    self.elementHH = document.createElement('h2');
    self.elementHH.classList.add(classListName['hh']);
    self.elementHH.innerHTML = "00";
    self.parentElement.appendChild(self.elementHH);
    self.elementHH = document.querySelector('.' + classListName['hh']);
    self.hh = 0;

    self.elementMM = document.createElement('h2');
    self.elementMM.classList.add(classListName['mm']);
    self.elementMM.innerHTML = "00";
    self.parentElement.appendChild(self.elementMM);
    self.elementMM = document.querySelector('.' + classListName['mm']);
    self.mm = 0;

    self.elementSS = document.createElement('h2');
    self.elementSS.classList.add(classListName['ss']);
    self.elementSS.innerHTML = "00";
    self.parentElement.appendChild(self.elementSS);
    self.elementSS = document.querySelector('.' + classListName['ss']);
    self.ss = 0;

    self.elementMS = document.createElement('h4');
    self.elementMS.classList.add(classListName['ms']);
    self.elementMS.innerHTML = "000";
    self.parentElement.appendChild(self.elementMS);
    self.elementMS = document.querySelector('.' + classListName['ms']);
    self.ms = 0;

    self._time = 0;
    self._timeArr = {hh:0,mm:0,ss:0,ms:0};

    self.start = function() {
        self.status = 'start';
        self.startTime = Date.now();
        self.endTime = undefined;
    };

    self.stop = function() {
        self.status = 'stop';
        self.endTime = Date.now();
        self._time = self._time + self.endTime - self.startTime;
    };

    self.reset = function() {
        self.status = 'reset';
        self.startTime = undefined;
        self.endTime = undefined;
        self.time = 0;
    };

    self.getTime = function() {
        var overallTime;
        if ( self.status='start' ){
            overallTime = self.time + Date.now() - self.startTime;
        } else {
            overallTime = self.time;
        }

        self._timeArr['hh'] = Math.floor(overallTime/1000/60/60);
        self._timeArr['mm'] = Math.floor((overalltime-self.timeArr('hh')*1000*60*60)/1000/60);
        self._timeArr['ss'] = Math.floor((overalltime-(self.timeArr('hh')*1000*60*60+self.timeArr('mm')*60*60))/1000);
        self._timeArr['ms'] = overalltime-(self.timeArr('hh')*1000*60*60+self.timeArr('mm')*60*60+self.timeArr('ss')*60);

        return self._timeArr;
    };

    self.refresh = function() {
        self.elementHH.innerHTML = self.hh;
        self.elementMM.innerHTML = self.mm;
        self.elementSS.innerHTML = self.ss;
        self.elementMS.innerHTML = self.ms;
    }
}

function TButton(parrentElement, classListName, text, customCssClass, action) {
    var self = this;
    self.parentElement = parrentElement;
    self.element = document.createElement('button');
    self.element.classList.add(classListName);

    self.parentElement.appendChild(self.element);
    //element = document.querySelector('.' + classListName);

    self.changeText = function(newText) {
        if (self.buttonText != newText) {
            self.buttonText = newText;
            self.element.innerHTML = self.buttonText;
        }
    };

    self.changeCSS = function(newCssClass) {
        if (newCssClass != self.element.classList.item(self.element.classList.length-1) ) {
            while (self.element.classList.length > 1 ) {
                self.element.classList.remove(self.element.classList.item(self.element.classList.length-1));
            }
            self.CssClass = newCssClass;
            self.element.classList.add(newCssClass);
        }
    };

    self.changeOnClickAction = function(onClick) {
        if (self.onClick != onClick) {
            self.onClick = onClick;
            self.element.addEventListener('click', onClick);
        }
    };

    //self.refresh = function(text, CssClass){
    //    self.changeText(text);
    //    self.changeCSS(CssClass);
    //};

    self.changeText(text);
    self.changeCSS(customCssClass);
    self.changeOnClickAction(action);
}


function onStartButtonClick(timer, startButton, startButtonArr) {
    if ( (timer.status === 'reset') || (timer.status === 'stop') ) {
        //timer.status = 'start';
        timer.start();
        //console.log('сработка старт')
    } else {
        if (timer.status === 'start') {
            //timer.status = 'stop';
            timer.stop();
        }
    }
    startButton.changeText(startButtonArr[timer.status]['buttonText']);
    startButton.changeCSS(startButtonArr[timer.status]['customCssClass']);
    console.log('timer.status: ',timer.status);
    console.log('startButtonArr[timer.status][buttonText]: ', startButtonArr[timer.status]['buttonText']);
    console.log('CustomCSS: ', startButtonArr[timer.status]['customCssClass']);
}


function onResetButtonClick(timer, startButton) {
    if ( timer.status !== 'reset')  {
        timer.reset();
        startButton.changeText(startButtonArr[timer.status]['buttonText']);
        startButton.changeCSS(startButtonArr[timer.status]['customCssClass']);
    }
}


var container = document.querySelector('.wrapper');

var timeListNamesArr = {hh:'hour',mm:'min',ss:'sec',ms:'msec'};
var timer = new TTimer(container, timeListNamesArr);

var startButtonArr = {
    reset:{buttonText:'Start',customCssClass:'reset__timer'},
    start:{buttonText:'Pause',customCssClass:'stop__timer'},
    stop :{buttonText:'Start',customCssClass:'start__timer'}
};


var startButton = new TButton( container ,'pure-button', startButtonArr[timer.status]['buttonText'],
    startButtonArr[timer.status]['customCssClass'], function(){onStartButtonClick(timer, startButton, startButtonArr)});

var resetButton = new TButton( container ,'pure-button', 'Reset', 'reset__timer', function(){onResetButtonClick(timer, startButton)});

//leftButton.element.addEventListener('click', buttonActionArr['reset']['onClick']);
//console.log('1212: ');

//timer.reset();




//button.changeText('Start', pauseTimerActions);



timer.refresh();










