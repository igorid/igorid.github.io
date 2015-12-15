var myMath = {};
    myMath.powMessage = '';

    myMath.pow = function(num, exp) {
        this.powMessage = '';
        if ( (num === 0) && ( exp != 0 ) ) {
            return 0;
        }
        else {
            if ( (exp == Math.ceil(exp) ) && (exp > 0) ) {
                var result = 1;
                for (var i = 1; i <= exp; i++) {
                    result *= num
                }
                return result;
            } else {
                this.powMessage = 'Операция невозможна. Введена степень ' + exp + '. Степень возводимого числа должна быть положительной и целочисленной величиной:';
            }
        }
    }

var num = prompt('Возведение числа в целочисленную положительную степень степень, введите возводимое число: ', '');
var exp = prompt('введите степень в которую требуется возвести число '+num + ' :');
console.log('Результат операции: ' );

var p = myMath.pow(num, exp);

if ( myMath.powMessage == '' ) {
    console.log(p);
} else {
    console.log(myMath.powMessage);
}


