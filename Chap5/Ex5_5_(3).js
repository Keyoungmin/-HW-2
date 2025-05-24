// 예제 5-5 클로저의 메모리 관리
// (3) eventListener에 의한 클로저의 메모리 해제
(function () {
    var count = 0;
    var button = document.createElement('button');
    button.innerText = 'click';
  
    var clickHandler = function () {
      console.log(++count, 'times clicked');
      if (count >= 5) { // 5번 클릭되면
        button.removeEventListener('click', clickHandler);
        clickHandler = null; // clickHandler 식별자의 함수 참조를 끊음
      }
    };
    button.addEventListener('click', clickHandler);
    document.body.appendChild(button);
  })();