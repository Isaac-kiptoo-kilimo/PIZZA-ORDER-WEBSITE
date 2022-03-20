class Pizza {
    constructor(name, crust, toppings, pizzasize, image = 'https://www.picng.com/upload/pizza/png_pizza_15268.png') {
        this.name = name;
        this.toppings = toppings;
        this.crust = crust;
        this.price = pizzasize?.price;
        this.size = pizzasize?.name;
        this.image = image;
    }

    calculatePrice() {
        let totalPrice = this.price + this.crust.price;
        this.toppings.forEach(function (topping) {
            totalPrice += topping.price;
        });
        return totalPrice;
    }
}

class Crust {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
Crust.prototype.getPrice = function () {
    return `Ksh ${this.price}`;
};


class Topping {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

}
Topping.prototype.getPrice = function () {
    return `Ksh ${this.price}`;
};

class PizzaSize {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getPrice() {
        return `Ksh ${this.price}`;
    }
}

class SinglePizzaInCart {
    constructor(id, pizza, quantity = 1) {
        this.id = id;
        this.pizza = pizza;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.pizza.calculatePrice() * this.quantity;
    }
}


const pizzaToppings = [
    new Topping('Tomato', 80),
    new Topping('Mushroom', 80),
    new Topping('Veggie Salad', 80),
    new Topping('Green Pepper', 80),
    new Topping('Olives', 120),
    new Topping('Pineapple', 120),
    new Topping('Mince', 120),
    new Topping('Macon', 120),
    new Topping('Beef peperoni', 180),
    new Topping('peperroni Chicken', 180),
]

const pizzaCrusts = [
    new Crust('Thin crust', 150),
    new Crust('Thick crust', 250),
    new Crust('Flat Bread crust', 280),
    new Crust('custom crust', 300)
]

const pizzaSizes = [
    new PizzaSize('Small', 500),
    new PizzaSize('Medium', 700),
    new PizzaSize('Large', 900),
    new PizzaSize('Extra Large', 1100)
]

const pizzas = [
    new Pizza('Meat Deluxe', pizzaCrusts[0], pizzaToppings.slice(0, 3), pizzaSizes[0], 'https://www.pngkit.com/png/full/0-5891_large-pizza-slice-transparent-background-pizza-slice-png.png'),
    new Pizza('Chicken Hawaiian', pizzaCrusts[1], pizzaToppings.slice(3, 6), pizzaSizes[1], 'https://www.downloadclipart.net/medium/pizza-slice-transparent-background.png'),
    new Pizza('BBO Steak', pizzaCrusts[2], pizzaToppings.slice(6, 9), pizzaSizes[2], 'https://www.picng.com/upload/pizza/png_pizza_15268.png'),
    new Pizza('Chicken Macon BBQ', pizzaCrusts[1], pizzaToppings.slice(7, 9), pizzaSizes[3], 'https://www.kindpng.com/picc/m/106-1065850_pizza-hut-poster-dough-transparent-background-pizza-hut.png'),
    new Pizza('Chicken & Mushroom', pizzaCrusts[0], pizzaToppings.slice(4, 7), pizzaSizes[2], 'https://www.nicepng.com/png/full/830-8300698_pizza-dominos-pizza-transparent-background.png'),
    new Pizza('Spicy Boerewors', pizzaCrusts[2], pizzaToppings.slice(4, 9), pizzaSizes[1], 'https://www.freeiconspng.com/uploads/pizza-png-33.png'),
    new Pizza('Beef pepporoni', pizzaCrusts[1], pizzaToppings.slice(2, 5), pizzaSizes[2], 'https://www.picng.com/upload/pizza/png_pizza_15278.png'),
]




