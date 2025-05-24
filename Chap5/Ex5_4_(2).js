// 예제 5-4 return 없이도 클로저가 발생하는 다양한 경우
// (2) eventListener
(function () {
    var count = 0;
    var button = document.createElement('button');
    button.innerText = 'click';

    button.addEventListener('click', function () {
        console.log(++count, 'times clicked');
    });
    document.body.appendChild(button);
})();



