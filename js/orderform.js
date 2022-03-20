let pizzaOrder = new Pizza();
pizzaOrder.toppings = [];

const listenForTypeChange = (e) => {
    pizzaOrder.name = e.value;
}

const listenForToppingsChange = (e) => {
    const checkValue = e.checked;
    const toppingName = e.dataset.name;
    const topping_ = pizzaToppings.find(topping => topping.name === toppingName);
    if (checkValue) {
        pizzaOrder.toppings.push(topping_);
    } else {
        pizzaOrder.toppings = pizzaOrder.toppings.filter(topping => topping !== topping_);
    }

}

const listenForSizeChange = (e) => {
    const size_ = pizzaSizes.find(size => size.name === e.value);
    pizzaOrder.size = size_.name;
    pizzaOrder.price = size_.price;
}

const listenForCrustChange = (e) => {
    const crust_ = pizzaCrusts.find(crust => crust.name === e.value);
    pizzaOrder.crust = crust_;
}

const listenForQuantityChange = (e) => {
    // pizzaOrder.name = e.value;
}

// const

order_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pizzaOrder.name === undefined) {
        alert('Please select a pizza type/flavour');
        return;
    }

    if (pizzaOrder.toppings.length === 0) {
        alert('Please select at least one topping');
        return;
    }

    if (pizzaOrder.size === undefined || pizzaOrder.price === undefined) {
        alert('Please select pizza size');
        return;
    }

    if (pizzaOrder.crust === undefined) {
        alert('Please select a crust');
        return;
    }

    alert(pizzaOrder.calculatePrice());
});