// 예제 5-7 콜백 함수와 클로저 (2)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', (function (f) { // (B) 즉시실행함수
        return function () { // (C)
            alert('your choice is ' + f);
        };
    })(fruit)); // (A) fruit 값을 인자로 전달
    $ul.appendChild($li);
});
document.body.appendChild($ul);