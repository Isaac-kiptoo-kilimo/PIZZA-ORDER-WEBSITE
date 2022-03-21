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
                <button class="btn btn-primary btn-sm shadow-none" onclick="return addToCart('${pizza.name}')">Add to cart</button>
            </div>
        </div>
    </div>
    `;

    return card;
}

const toppingBtn = (topping) => {

    const toppingbtn = `
    <div class="w-100 mb-2 d-flex">
        <p class="m-0">
            <strong>
                ${topping.name}
            </strong>
        </p>
        <p class="m-0 ms-auto">
            Ksh ${topping.price}
        </p>
    </div>
    `;

    return toppingbtn
}

const checkoutRow = (singlepizza) => {
    const _piz = new SinglePizzaInCart(singlepizza.pizza, singlepizza.quantity);
    let toppings = '';
    singlepizza.pizza.toppings.forEach(function (topping) {
        toppings += toppingBtn(topping);
    });
    const row = `
        <tr>
            <td>
                ${singlepizza.id}
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="pizza-img">
                        <img src="${singlepizza.pizza.image}" alt="pizza-1" class="img-fluid">
                    </div>
                    <h5 class="ms-3">
                    ${singlepizza.pizza.name}
                    </h5>
                </div>
            </td>
            <td>
                <div class="">
                    ${toppings}
                </div>
            </td>
            <td>
                <div>
                    <div class="topping d-flex">
                        <p class="m-0">
                            <strong>
                            ${singlepizza.pizza.crust.name}
                            </strong>
                        </p>
                        <p class="m-0 ms-auto">
                            Ksh ${singlepizza.pizza.crust.price}
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div class="topping d-flex">
                        <p class="m-0">
                            <strong>
                            ${singlepizza.pizza.size}
                            </strong>
                        </p>
                        <p class="m-0 ms-auto">
                            Ksh ${singlepizza.pizza.price}
                        </p>
                    </div>
                </div>
            </td>
            <td>
            ${singlepizza.quantity}
            </td>
            <td>
                <strong>
                    Ksh ${_piz.getTotalPrice()}
                </strong>
            </td>
        </tr>
    
    `;

    return row;
}

const orderCard = (_order_) => {
    let _pizzas_ = '';
    _order_.pizzasincart.forEach(function (pizza__) {
        _pizzas_ += `<li>${pizza__.pizza.name}</li>`
    });

    const order_ = `
    <div class="col-md-4">
        <div class="card border-0">
            <div class="card-body">
                <h5 class="card-title">Order #${_order_.id}</h5>
                <p class="card-text">
                <ul>
                    ${_pizzas_}
                </ul>
                </p>
                <p class="card-text">
                    <small class="text-muted d-flex">Order Cost: <span class="text-primary ms-auto">Ksh ${_order_.total}</span></small>
                </p>
                <p class="card-text">
                    <small class="text-muted d-flex">Delivery Cost: <span class="text-primary ms-auto">Ksh ${_order_.delivery_cost}</span></small>
                </p>
                <p class="card-text">
                    <small class="text-muted d-flex">Order Date: <span class="text-primary ms-auto">${_order_.date}</span></small>
                </p>
                <p class="card-text">
                    <small class="text-muted d-flex">Order Delivery Address: <span class="text-primary ms-auto">${_order_.address}</span></small>
                </p>
                <p class="card-text">
                    <small class="text-muted d-flex">Order User Full Name: <span class="text-primary ms-auto">${_order_.name}</span></small>
                </p>
                <p class="card-text">
                    <small class="text-muted d-flex">Order User Phone Number: <span class="text-primary ms-auto">${_order_.phoneNumber}</span></small>
                </p>
                <p class="card-text">
                    <small class="text-muted d-flex">Order Status: <span class="ms-auto text-${_order_.delivered ? 'success' : 'danger'}">${_order_.delivered ? 'Deliverd' : 'Not delivered'}</span></small>
                </p>
            </div>
        </div>
    </div>
    `;

    return order_;
}


const first_select_option = () => {
    return `<option value=''>Select an option</option>`
}

const renderPizzas = (holder, pizzas) => {
    if (holder) {
        holder.innerHTML = '';
        pizzas.forEach(function (pizza) {
            holder.innerHTML += pizzaCard(pizza);
        });
    }
}



const renderPizzaTypes = () => {
    const types = [...new Set(pizzas.map(pizza => pizza.name))];
    // console.log(types);
    if (pizza_type) {
        pizza_type.innerHTML = '';
        pizza_type.innerHTML += first_select_option();
        types.forEach(function (type) {
            pizza_type.innerHTML += `<option value="${type}">${type}</option>`;
        });
    }
}


const renderPizzaSizes = () => {
    const sizes = [...new Set(pizzaSizes.map(pizza => pizza.name))];
    if (pizza_size) {
        pizza_size.innerHTML = '';
        pizza_size.innerHTML += first_select_option();
        sizes.forEach(function (size) {
            pizza_size.innerHTML += `<option value="${size}">${size}</option>`;
        });
    }
}



const renderPizzaCrusts = () => {
    const crusts = [...new Set(pizzaCrusts.map(pizza => pizza.name))];
    if (pizza_crust) {
        pizza_crust.innerHTML = '';
        pizza_crust.innerHTML += first_select_option();
        crusts.forEach(function (crust) {
            pizza_crust.innerHTML += `<option value="${crust}">${crust}</option>`;
        });
    }
}

const renderTopingInputs = () => {
    if (pizza_toppings) {
        pizza_toppings.innerHTML = '';
        pizzaToppings.forEach(function (topping) {
            pizza_toppings.innerHTML += toppingInput(topping);
        });
    }
}

const renderTableRows = () => {
    const storage = window.localStorage;
    const pizzasincart = JSON.parse(storage.getItem('cart')).pizzasincart;

    if (checkout_table) {
        checkout_table.innerHTML = '';
        pizzasincart.forEach(function (cartpizza) {
            checkout_table.innerHTML += checkoutRow(cartpizza);
        });
    }
}

const renderCheckoutTotal = () => {
    if (checkout_total) {
        checkout_total.innerHTML = cart.getTotalPrice();
    }
}

const renderOrders = () => {
    const orders = order.getOrders();
    if (orders_holder) {
        console.log(orders)
        orders_holder.innerHTML = '';
        orders.orders.forEach(function (order) {
            orders_holder.innerHTML += orderCard(order);
        });
    }
}


// Render the first 3 pizzas from the pizzas array
renderPizzas(pizzasHolder, pizzas.slice(2, 5));
renderPizzas(pizzasHolder1, pizzas);

renderPizzaTypes();
renderPizzaSizes();
renderPizzaCrusts();
renderTopingInputs();
renderTableRows();
renderCheckoutTotal();
renderOrders();


