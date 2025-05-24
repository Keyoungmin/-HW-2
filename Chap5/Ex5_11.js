// 예제 5-11 클로저로 변수를 보호한 자동차 객체 (1)
var createCar = function () {
    var fuel = Math.ceil(Math.random() * 10 + 10); // 연료 (L)
    var power = Math.ceil(Math.random() * 3 + 2);  // 연비 (km/L)
    var moved = 0;                                 // 총 이동거리
    return {
        getMoved: function () { // (A)
            return moved;
        },
        run: function () {      // (B)
            var km = Math.ceil(Math.random() * 6);
            var wasteFuel = km / power; // (C) 클로저 변수 power 직접 참조
            if (fuel < wasteFuel) {     // (D) 클로저 변수 fuel 직접 참조
                console.log('이동 불가');
                return;
            }
            fuel -= wasteFuel;
            moved += km;
            console.log(km + 'km 이동 (총 ' + moved + 'km, 남은 연료: ' + fuel.toFixed(1) + ')');
        }
    };
};
var car = createCar();

car.run();
console.log(car.moved);
console.log(car.feul);
console.log(car.power);

car.feul = 1000;
console.log(car.feul);
car.run();

car.power = 100;
console.log(car.power);
car.run();

car.moved = 1000;
console.log(car.moved);
car.run();
