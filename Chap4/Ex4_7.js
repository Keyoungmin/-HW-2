// 예제 4-7 메서드를 콜백 함수로 전달한 경우우
var obj = {
    vals: [1, 2, 3],
    logValues: function(v, i) {
      console.log(this, v, i);
    }
  };
  obj.logValues(1, 2);
  [4, 5, 6].forEach(obj.logValues);