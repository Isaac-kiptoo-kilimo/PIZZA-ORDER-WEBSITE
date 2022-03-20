const randomIndex = (max) => {
    return Math.floor(Math.random() * max);
}

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
        // console.log(this)
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
    constructor(pizza, quantity = 1) {
        this.id = null;
        this.pizza = pizza;
        this.quantity = quantity;
    }

    setId(id) {
        this.id = id;
    }

    getTotalPrice() {
        // console.log(this.pizza)
        const _piz = new Pizza(this.pizza.name, this.pizza.crust, this.pizza.toppings, { price: this.pizza.price, size: this.pizza.size }, this.pizza.image);
        return _piz.calculatePrice() * this.quantity;
    }

}

class Cart {

    constructor() {
        this.pizzasincart = [];
        this.id = null;
        this.name = null;
        this.phoneNumber = null;
        this.address = null;
        this.delivered = false
        this.delivery_cost = null;
        this.total = null;
        this.date = null;
    }

    initStore() {
        const storage = window.localStorage;
        if (storage.getItem('cart')) {
            return;
        }
        else {
            storage.setItem('cart', JSON.stringify(this));
        }

    }

    setID(id) {
        this.id = id;
    }
    // crate setters
    setName(name) {
        this.name = name;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    setAddress(address) {
        this.address = address;
    }

    setDelivered() {
        const status = [false, true]
        this.delivered = status[randomIndex(status.length - 1)];
    }

    setDeliveryCost() {
        const costs = [200, 300, 400, 500, 600, 700, 800, 900, 1000];
        this.delivery_cost = costs[randomIndex(costs.length - 1)];
    }

    setCartTotal() {
        this.total = this.getTotalPrice();
    }

    setDate() {
        const date = new Date();
        this.date = date.toLocaleDateString();
    }

    addPizza(singlepizzaincart) {
        this.initStore();
        const storage = window.localStorage;
        const cart = JSON.parse(storage.getItem('cart'));
        let id = 0;
        const lastPizzaInCart = cart.pizzasincart[cart.pizzasincart.length - 1];
        if (cart.pizzasincart.length > 0) {
            id = lastPizzaInCart.id + 1;
        }
        else {
            id = 1
        }

        singlepizzaincart.setId(id);

        cart.pizzasincart.push(singlepizzaincart);
        storage.setItem('cart', JSON.stringify(cart));
    }

    deletePizzaInstore(id) {
        let cart = JSON.parse(storage.getItem('cart'));
        cart.pizzasincart = cart.pizzasincart.filter(pizza => pizza.id !== id);
        storage.setItem('cart', JSON.stringify(cart));
    }

    getTotalPrice() {
        const storage = window.localStorage;
        let total = 0;
        let cart = JSON.parse(storage.getItem('cart'))
        cart.pizzasincart.forEach(function (pizza_) {
            const our_pizza = new SinglePizzaInCart(pizza_.pizza, pizza_.quantity);
            our_pizza.setId(pizza_.id);
            total += our_pizza.getTotalPrice();
        });
        return total;
    }

    clearCart() {
        const storage = window.localStorage;
        storage.removeItem('cart');
    }

    getCart() {
        const storage = window.localStorage;
        let cart = JSON.parse(storage.getItem('cart'));
        this.pizzasincart = cart.pizzasincart;
        // return cart.pizzasincart;
        return this
    }

}

class Order {

    constructor() {
        this.orders = [];
    }

    initStore() {
        const storage = window.localStorage;
        if (storage.getItem('orders')) {
            return;
        }
        else {
            storage.setItem('orders', JSON.stringify(this));
        }

    }

    addOrder(cartDetails) {
        this.initStore();
        const storage = window.localStorage;
        const orders = JSON.parse(storage.getItem('orders'));
        console.log(orders.orders.length)
        let id = 0;
        const lastOrder = orders.orders[orders.orders.length - 1];
        if (orders.orders.length > 0) {
            id = lastOrder.id + 1;
        }
        else {
            id = 1
        }

        cartDetails.setID(id);
        cartDetails.setName(name_.value)
        cartDetails.setPhoneNumber(phone.value)
        cartDetails.setAddress(address.value)
        cartDetails.setDelivered()
        cartDetails.setDeliveryCost()
        cartDetails.setCartTotal()
        cartDetails.setDate()

        orders.orders.push(cartDetails);
        storage.setItem('orders', JSON.stringify(orders));
    }

    deleteOrderInstore(id) {
        let orders = JSON.parse(storage.getItem('orders'));
        orders = orders.filter(order => order.id !== id);
        storage.setItem('orders', JSON.stringify(orders));
    }

    // getTotalPrice() {
    //     const storage = window.localStorage;
    //     let total = 0;
    //     let orders = JSON.parse(storage.getItem('orders'))
    //     orders.forEach(function (order) {
    //         const our_pizza = new SinglePizzaInCart(pizza_.pizza, pizza_.quantity);
    //         our_pizza.setId(pizza_.id);
    //         total += our_pizza.getTotalPrice();
    //     });
    //     return total;
    // }

    getOrders() {
        const storage = window.localStorage;
        let orders = JSON.parse(storage.getItem('orders'));

        this.orders = orders.orders
        return this
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

// Initialize pizza order
let pizzaOrder = new Pizza();

// By default, set the toppings to be an empty array
pizzaOrder.toppings = [];

// Initialize cart
const cart = new Cart();
// Initializing the store
cart.initStore();

const order = new Order();
// Initializing the orders store
order.initStore();




