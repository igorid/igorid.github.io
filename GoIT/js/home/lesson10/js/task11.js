var nameArr = [];
var NAMECOUNT=5;
var notFind = true;
var i = 1;

for (i=1; i<=NAMECOUNT; i++ ) {
    nameArr[nameArr.length] = prompt('Введите ' + i + ' имя пользователя в список:');
}

nameToCompare = prompt('Введите имя пользователя:');

while ( (notFind) && ( i>0 ) ){
    i--;
    if ( nameArr[i] === nameToCompare ) {
        console.log( nameArr[i] + ' ,Вы успешно вошли.');
        notFind = false;
    }
}

if ( notFind ) {
    console.log(nameToCompare + ' ,не верная регистрация');
}
