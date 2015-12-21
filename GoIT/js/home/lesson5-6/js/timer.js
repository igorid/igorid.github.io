function TTimer(parrentElement, classListName, timerIdInterval) {

    var self = this;
    self._TIMERRNDIDINTERVAL = 9;
    self._HHTEMPLATE = "00";
    self._MMTEMPLATE = "00";
    self._SSTEMPLATE = "00";
    self._MSTEMPLATE = "";

    self.parentElement = parrentElement;

    self.status = 'reset';
    self.elementHH = document.createElement('h2');
    self.elementHH.classList.add(classListName['hh']);

    self.parentElement.appendChild(self.elementHH);
    self.elementHH = document.querySelector('.' + classListName['hh']);
    self.hh = 0;

    self.elementMM = document.createElement('h2');
    self.elementMM.classList.add(classListName['mm']);
    self.parentElement.appendChild(self.elementMM);
    self.elementMM = document.querySelector('.' + classListName['mm']);
    self.mm = 0;

    self.elementSS = document.createElement('h2');
    self.elementSS.classList.add(classListName['ss']);
    self.parentElement.appendChild(self.elementSS);
    self.elementSS = document.querySelector('.' + classListName['ss']);
    self.ss = 0;

    self.elementMS = document.createElement('h4');
    self.elementMS.classList.add(classListName['ms']);
    self.parentElement.appendChild(self.elementMS);
    self.elementMS = document.querySelector('.' + classListName['ms']);
    self.ms = 0;

    self._time = 0;
    self._timeArr = {hh:undefined,mm:undefined,ss:undefined,ms:undefined};
    self._timerIdInterval = timerIdInterval;

    self.start = function() {
        self.status = 'start';
        self.startTime = Date.now();
        self.endTime = undefined;
        self._timerId = setInterval(self.refresh, self._timerIdInterval);
    };

    self.stop = function() {
        self.status = 'stop';
        self.endTime = Date.now();
        self._time = self._time + self.endTime - self.startTime;
        if (self._timerId !== undefined ) {
            self._timerId = clearInterval(self._timerId);

        }
    };

    self.rndTimeInterval = function() {
        if (self._timerId !== undefined ) {
            self._timerId = clearInterval(self._timerId);
            self._timerId = setInterval(self.refresh, self._timerIdInterval + Math.floor(Math.random( ) * (self._TIMERRNDIDINTERVAL )));
        }

    };

    self.reset = function() {
        self.status = 'reset';
        self.startTime = undefined;
        self.endTime = undefined;
        self._time = 0;
        if (self._timerId !== undefined ) {
            clearInterval(self._timerId)
        }
    };

    self.getTime = function() {
        var overallTime = 0;
        if ( self.status == 'start' ){
            if (self.startTime == undefined) {
                overallTime = 0;
            } else {
                overallTime = self._time + Date.now() - self.startTime;
            }
        } else {
            overallTime = self._time;
        }

        self._timeArr['hh'] = Math.floor(overallTime/1000/60/60);
        self._timeArr['mm'] = Math.floor((overallTime-self._timeArr['hh']*1000*60*60)/1000/60);
        self._timeArr['ss'] = Math.floor((overallTime-(self._timeArr['hh']*1000*60*60+self._timeArr['mm']*1000*60))/1000);
        self._timeArr['ms'] = overallTime-(self._timeArr['hh']*1000*60*60+self._timeArr['mm']*1000*60+self._timeArr['ss']*1000);

        return self._timeArr;
    };

    self.strToTemplate = function (str, template) {
        var j = template.length - str.length ;
        var result = '';
        if (j > 0) {
            for (var i = 0; i < template.length; i++ ){
                if (j > i) {
                    result += template[j];
                }
                else {
                    result += str[i-j];
                }
            }
        } else {
            result = str;
        }
        return result;
    };

    self.refresh = function() {
        var timeArr = self.getTime();

        self.elementHH.innerHTML = self.strToTemplate(timeArr['hh'].toString(), self._HHTEMPLATE);
        self.elementMM.innerHTML = self.strToTemplate(timeArr['mm'].toString(), self._MMTEMPLATE);
        self.elementSS.innerHTML = self.strToTemplate(timeArr['ss'].toString(), self._SSTEMPLATE);
        self.elementMS.innerHTML = self.strToTemplate(timeArr['ms'].toString(), self._MSTEMPLATE);

    };

    self.refresh();
}

function TButton(parrentElement, classListName, text, customCssClass, action) {
    var self = this;
    self.parentElement = parrentElement;
    self.element = document.createElement('button');
    self.element.classList.add(classListName);
    self.parentElement.appendChild(self.element);
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

    self.changeText(text);
    self.changeCSS(customCssClass);
    self.changeOnClickAction(action);
}

function onStartButtonClick(timer, startButton, startButtonArr) {
    if ( (timer.status === 'reset') || (timer.status === 'stop') ) {
        timer.rndTimeInterval();
        timer.start();
    } else {
        if (timer.status === 'start') {
            timer.stop();
            timer.refresh();
        }
    }
    startButton.changeText(startButtonArr[timer.status]['buttonText']);
    startButton.changeCSS(startButtonArr[timer.status]['customCssClass']);

}

function onResetButtonClick(timer, startButton) {
    if ( timer.status !== 'reset')  {
        timer.reset();
        timer.refresh();
        startButton.changeText(startButtonArr[timer.status]['buttonText']);
        startButton.changeCSS(startButtonArr[timer.status]['customCssClass']);
    }
}

var container = document.querySelector('.wrapper');
var TIMERIDINTERVAL = 33;

var timeListNamesArr = {hh:'hour',mm:'min',ss:'sec',ms:'msec'};
var timer = new TTimer(container, timeListNamesArr, TIMERIDINTERVAL);

var startButtonArr = {
    reset:{buttonText:'Start',customCssClass:'reset__timer'},
    start:{buttonText:'Pause',customCssClass:'stop__timer'},
    stop :{buttonText:'Continue',customCssClass:'start__timer'}
};

var startButton = new TButton( container ,'pure-button', startButtonArr[timer.status]['buttonText'],
    startButtonArr[timer.status]['customCssClass'], function(){onStartButtonClick(timer, startButton, startButtonArr)});

var resetButton = new TButton( container ,'pure-button', 'Reset', 'reset__timer', function(){onResetButtonClick(timer, startButton)});
