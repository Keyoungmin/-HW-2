// 예제 4-4 콜백 함수 예제 (2-2) - Array.prototype.map - 인자의 순서를 임의로 바꾸어 사용한 경우
var newArr2 = [10, 20, 30].map(function (idx, currVal) {
    console.log(idx, currVal);
    return currVal + 5;
  });
  console.log(newArr2);