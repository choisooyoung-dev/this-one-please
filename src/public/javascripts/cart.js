document.addEventListener('DOMContentLoaded', () => {
    cartList();
});

function cartList() {
    fetch('/api/carts')
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (!response.success) {
                alert(response.message);
                window.location.href = '/';
                return;
            }

            const container = document.getElementById(`cart-container`);
            response.data.forEach((e) => {
                const product = document.createElement('div');
                product.className = 'product';
                container.appendChild(product);

                const newImage = document.createElement('img');
                newImage.src = `${e.menu_image}`;
                product.appendChild(newImage);

                const details = document.createElement('div');
                details.className = 'product-details';
                product.appendChild(details);

                const name = document.createElement('h2');
                name.innerText = `${e.menu_name}`;
                details.appendChild(name);

                const price = document.createElement('p');
                price.innerText = `${e.menu_price}`;
                details.appendChild(price);

                const quantity = document.createElement('div');
                quantity.className = 'quantity';
                product.appendChild(quantity);

                const decrease = document.createElement('button');
                decrease.addEventListener('click', function () {
                    decreaseQuantity(decrease, e.id);
                });
                decrease.innerText = '-';
                quantity.appendChild(decrease);

                const value = document.createElement('input');
                value.type = 'text';
                value.value = e.count;
                value.readOnly = true;
                quantity.appendChild(value);

                const increase = document.createElement('button');
                increase.addEventListener('click', function () {
                    increaseQuantity(increase, e.id);
                });
                increase.innerText = '+';
                quantity.appendChild(increase);

                const newDiv2 = document.createElement('div');
                newDiv2.className = 'total-price';
                newDiv2.innerText = `${e.price}`;
                product.appendChild(newDiv2);

                const remove = document.createElement('button');
                remove.addEventListener('click', function () {
                    removeFromCart(remove, e.id);
                });
                remove.innerText = '삭제';
                product.appendChild(remove);
            });

            if (response.data.length) {
                document.getElementById(`cart-container`).style.display = 'block';
                updateTotalPrice();
            } else {
                document.getElementById(`cart-container`).style.display = 'none';
            }
        })
        .catch((error) => console.error('에러 발생:', error));
}

function removeFromCart(button, cartId) {
    // 상품 제거 로직을 추가할 수 있습니다.
    var productElement = button.parentElement;
    productElement.remove();
    updateTotalPrice();

    const userDataSet = document.getElementById('userId');
    if (userDataSet) {
        const userId = document.getElementById('userId').dataset.userId;

        // 삭제 버튼 누르면 delete api 실행
        fetch(`/api/carts/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 다른 필요한 헤더가 있다면 여기에 추가
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('response >> ', response);
            })
            .catch((error) => console.error('Error:', error));
    } else {
        alert('로그인 후 이용 가능합니다.');
        // window.location.href = '/login';
    }
}

function decreaseQuantity(button, cartId) {
    var inputElement = button.nextElementSibling;
    var quantity = parseInt(inputElement.value);
    if (quantity > 1) {
        inputElement.value = quantity - 1;
    }
    updateTotalPrice();

    const count = parseInt(inputElement.value);
    // - 버튼 누르면 update api 실행
    fetch(`/api/carts/${cartId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            // 다른 필요한 헤더가 있다면 여기에 추가
        },
        body: JSON.stringify({
            count: count,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.error('Error:', error));
}

function increaseQuantity(button, cartId) {
    var inputElement = button.previousElementSibling;
    var quantity = parseInt(inputElement.value);
    inputElement.value = quantity + 1;
    updateTotalPrice();

    const count = parseInt(inputElement.value);
    // + 버튼 누르면 update api 실행
    fetch(`/api/carts/${cartId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            // 다른 필요한 헤더가 있다면 여기에 추가
        },
        body: JSON.stringify({
            count: count,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.error('Error:', error));
}

function updateTotalPrice() {
    var products = document.querySelectorAll('.product');
    var totalPrice = 0;

    products.forEach(function (product) {
        var quantity = parseInt(product.querySelector('.quantity input').value);
        var price = parseInt(product.querySelector('.product-details p').innerText);
        var total = quantity * price;
        product.querySelector('.total-price').innerText = total + '원';
        totalPrice += total;
    });

    document.querySelector('.checkout-button').innerText = '주문하기 - 총 가격: ' + totalPrice + '원';
}

function checkout() {
    // 주문 처리 로직을 추가할 수 있습니다.
    alert('주문이 완료되었습니다!');
}
