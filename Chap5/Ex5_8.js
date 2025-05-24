// 예제 5-8 콜백 함수와 클로저 (3)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

var alertFruit = function (fruit) {
    alert('your choice is ' + fruit);
};
fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    // this는 원래 $li지만, 첫번째 인자가 null이므로 그냥 전역객체를 바라보게 됨.
    $li.addEventListener('click', alertFruit.bind(null, fruit));
    $ul.appendChild($li);
});
document.body.appendChild($ul);