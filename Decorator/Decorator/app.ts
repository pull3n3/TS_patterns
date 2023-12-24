interface Car {
    getDescription(): string;
    getCost(): number;
}


// Реализация базового класса автомобиля
class BasicCar implements Car {
    getDescription(): string {
        return "Basic car";
    }

    getCost(): number {
        return 20000;
    }
}


// Базовый декоратор, делегирующий работу 
class CarDecorator implements Car {
    protected car: Car;
    constructor(car: Car) {
        this.car = car;
    };

    getDescription(): string {
        return this.car.getDescription();
    }

    getCost(): number {
        return this.car.getCost();
    }
}


// Декоратор для добавки кожаных сидений
class LeatherSeatsDecorator extends CarDecorator {

    getDescription(): string {
        return (`${super.getDescription()}, with leather seats`);
    }

    getCost(): number {
        return super.getCost() + 1500;
    }
}


// Декоратор для добавки солнечной крыши
class SunroofDecorator extends CarDecorator {
    getDescription(): string {
        return (`${super.getDescription()}, with sunroof`);
    }

    getCost(): number {
        return super.getCost() + 2000;
    }
}


let car1: BasicCar = new BasicCar();
console.log(car1.getCost());
console.log(car1.getDescription());
console.log();

car1 = new LeatherSeatsDecorator(car1);
console.log(car1.getCost());
console.log(car1.getDescription());
console.log();

car1 = new SunroofDecorator(car1);
console.log(car1.getCost());
console.log(car1.getDescription());
console.log();
