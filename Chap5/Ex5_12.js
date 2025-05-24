// 예제 5-11 클로저로 변수를 보호한 자동차 객체 (2)
var createCar = function () {
...
    var publicMembers = {
...
    };
    Object.freeze(publicMembers);

    return publicMembers;
};