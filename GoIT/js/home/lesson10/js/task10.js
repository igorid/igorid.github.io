function pow(num, exp) {
    if ( (num == 0) && ( exp != 0 ) ) {
        return 0;
    }
    else {
        if ( (exp == Math.ceil(exp) ) && (exp > 0) ) {
            result = 1;
            for (var i = 1; i <= exp; i++) {
                result *= num
            }
            return result;
        } else {
            return 'Операция невозможна. Введена степень ' + exp + '. Степень возводимого числа должна быть положительной и целочисленной величиной:';
        }
    }
}

var num = prompt('Возведение числа в целочисленную положительную степень степень, введите возводимое число: ', '');
var exp = prompt('введите степень в которую требуется возвести число '+num + ' :');
console.log('Результат операции: ', pow (num, exp) );
