// 예제 4-9 콜백 함수 내부의 this를 사용하지 않은 경우
var obj1 = {
    name: 'obj1',
    func: function () {
      console.log(obj1.name); // this 대신 obj1을 직접 참조
    }
  };
  setTimeout(obj1.func, 1000)