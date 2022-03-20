const toppingInput = (topping) => {
    const topping_ = `
    <div class="col-md-3">
        <div class="form-check mt-2">
            <input class="form-check-input" type="checkbox" onchange="return listenForToppingsChange(this)" data-name="${topping.name}">
            <label class="form-check-label" for="defaultCheck1">
                ${topping.name}
            </label>
        </div>
    </div>
    `;

    return topping_;
};

const pizzaCard = (pizza) => {

    let toppings = '';
    pizza.toppings.forEach(function (topping) {
        toppings += `<button class='btn btn-sm btn-outline-primary shadow-none ms-2 mb-1'>${topping.name}</button>`;
    });

    const card = `
    <div class="col-md-4 px-1 px-md-3 mb-3 h-100">
        <div class="pizza-card card border-0 h-100">
            <div class="image-holder">
                <img src="${pizza.image}" class="card-img-top" alt="home pizza">
            </div>
            <div class="card-body">
                <h6>${pizza.name}</h6>
                <div>
                    <p>Toppings</p>
                    <div class='d-flex flex-wrap'>
                        ${toppings}
                    </div>
                </div>
                <p>Crust: ${pizza.crust.name}</p>
                <p>ksh <strong>${pizza.calculatePrice()}</strong> </p>
                <button class=" btn btn-primary btn-large">Order Now !</button>
            </div>
        </div>
    </div>
    `;

    return card;
}

const renderPizzas = (pizzas) => {
    pizzasHolder.innerHTML = '';
    pizzas.forEach(function (pizza) {
        pizzasHolder.innerHTML += pizzaCard(pizza);
    });
}



const renderPizzaTypes = () => {
    const types = [...new Set(pizzas.map(pizza => pizza.name))];
    console.log(types);
    pizza_type.innerHTML = '';
    types.forEach(function (type) {
        pizza_type.innerHTML += `<option value="${type}">${type}</option>`;
    });
}


const renderPizzaSizes = () => {
    const sizes = [...new Set(pizzaSizes.map(pizza => pizza.name))];
    pizza_size.innerHTML = '';
    sizes.forEach(function (size) {
        pizza_size.innerHTML += `<option value="${size}">${size}</option>`;
    });
}



const renderPizzaCrusts = () => {
    const crusts = [...new Set(pizzaCrusts.map(pizza => pizza.name))];
    pizza_crust.innerHTML = '';
    crusts.forEach(function (crust) {
        pizza_crust.innerHTML += `<option value="${crust}">${crust}</option>`;
    });
}



const renderTopingInputs = () => {
    pizza_toppings.innerHTML = '';
    pizzaToppings.forEach(function (topping) {
        pizza_toppings.innerHTML += toppingInput(topping);
    });
}

renderPizzas(pizzas.slice(0, 3));

renderPizzaTypes();
renderPizzaSizes();
renderPizzaCrusts();
renderTopingInputs();