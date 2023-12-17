document.addEventListener('DOMContentLoaded', function () {
    getMenus();
    getCart();
});

// store page에 들어오면 store의 menu 모두 보이기
const getMenus = async () => {
    const storeId = document.getElementById('storeId').dataset.storeId;

    // store get api - store 정보(이름, 주소, 이미지 보이기) 생성
    await fetch(`/api/stores/${parseInt(storeId)}`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response.data);
            const storeName = document.getElementById('storeName');
            storeName.innerText = response.data.name;
            const storeAddress = document.getElementById('storeAddress');
            storeAddress.innerText = response.data.address;
            const storeImage = document.getElementById('storeImage');
            storeImage.src = response.data.image_url;
            // storeImage.src = `https://source.unsplash.com/random/400x200?restaurant&rand=${Math.random()}`;
        })
        .catch((error) => console.error('에러 발생:', error));

    // store의 메뉴들을 담을 container
    const container = document.getElementById('menu-container');

    // menu get all api - menu 정보(이름, 이미지, 가격), 장바구니 추가버튼 생성
    await fetch(`/api/menus/store/${parseInt(storeId)}`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response.data);
            const newDiv = document.createElement('div');
            newDiv.className = 'menu-card p-4';
            container.appendChild(newDiv);

            response.data.forEach((e) => {
                // 이미지 생성
                const newImage = document.createElement('img');
                newImage.src = e.image_url;
                // newImage.alt = e.name;
                // newImage.src = `https://source.unsplash.com/random/600x400?food&rand=${Math.random()}`;
                newImage.className = 'w-full h-48 object-cover mb-4';
                newDiv.appendChild(newImage);

                const div1 = document.createElement('div');
                div1.className = 'flex items-center justify-between mb-4';
                newDiv.appendChild(div1);

                const textContainer = document.createElement('div');
                textContainer.className = 'flex-grow pl-4';
                div1.appendChild(textContainer);

                // name div 생성
                const nameDiv = document.createElement('div');
                nameDiv.className = 'font-semibold text-lg';
                nameDiv.innerText = e.name;
                textContainer.appendChild(nameDiv);

                // 가격 div 생성
                const priceDiv = document.createElement('div');
                priceDiv.className = 'text-gray-600';
                priceDiv.innerText = e.price + '원';
                textContainer.appendChild(priceDiv);

                // 버튼생성
                const newButton = document.createElement('button');
                newButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
                newButton.innerText = '장바구니 추가';
                // 장바구니 추가버튼 눌렀을 때 add cart 함수 동작
                newButton.addEventListener('click', function () {
                    addCart(e.id, Number(storeId)); // menuId, storeId
                });
                div1.appendChild(newButton);
            });
        })
        .catch((error) => console.error('에러 발생:', error));
};

// get cart api 실행 후 data가 있는지 없는지 -> 없으면 create cart
// 있다면 받아온 storeId와 현재 페이지의 storeId가 같은지 다른지 -> 같으면 create cart
// 다르면 장바구니를 비우고 해당 메뉴를 추가할지 or 해당 메뉴를 추가하지 않을지 confirm alert
// 추가한다면 delete cart all api 실행 후 create cart
// 안한다면 아무 api도 실행하지 않음.
const addCart = async (menuId, storeId) => {
    // get menu api에서 받아온 menu id, store id
    let leaveCart = false; // 다른 매장의 메뉴가 담겨있는 장바구니를 지우지 않을 것임
    let isExistCart = false;
    const userDataSet = document.getElementById('userId');
    if (userDataSet) {
        const userId = document.getElementById('userId').dataset.userId;

        // 장바구니 추가 버튼 누르면 cart get api 실행
        await fetch('/api/carts', {})
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                // cart에 담겨있는게 있으면서 && 현재 담을 메뉴와 다른 매장의 메뉴라면
                if (response.data.length > 0) {
                    isExistCart = true;
                    if (response.data[0].store_id !== storeId) {
                        if (
                            confirm(`장바구니에는 같은 가게의 메뉴만 담을 수 있습니다.
                장바구니를 비우고 해당 메뉴를 담으시겠습니까?`) === true
                        ) {
                            // 장바구니를 비우고 현재 메뉴를 추가
                            deleteCartAll(response.data.user_id);
                            isExistCart = false;
                        } else {
                            // 추가하지 않고 장바구니도 비우지 않음
                            // 함수를 나가면서 아래 create cart api를 실행하지 않을 것으로 기대
                            leaveCart = true;
                        }
                    } // cart에 담겨있는게 없거나 || 있는데 같은 매장의 메뉴라면 (if문을 돌지 않았다면)
                    // + if문을 돌아 cart를 비우고 나왔다면
                    // 아래 create cart api를 실행할 것으로 기대
                }
            })
            .catch((error) => console.error('Error:', error));
        if (leaveCart) return;

        // create cart api
        await fetch('/api/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 다른 필요한 헤더가 있다면 여기에 추가
            },
            body: JSON.stringify({
                menu_id: menuId,
                store_id: storeId,
                count: 1,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (!isExistCart) window.location.reload();
                isExistCart = true;
            })
            .catch((error) => console.error('Error:', error));
    } else {
        alert('로그인 후 이용 가능합니다.');
        // window.location.href = '/login';
    }
};

// 장바구니 비우기
const deleteCartAll = async (userId) => {
    await fetch('/api/carts', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // 다른 필요한 헤더가 있다면 여기에 추가
        },
        body: JSON.stringify({
            user_id: userId,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.error('Error:', error));
};

const getCart = async () => {
    const userDataSet = document.getElementById('userId');
    if (userDataSet) {
        const userId = document.getElementById('userId').dataset.userId;
        const footerOrder = document.getElementById('footerOrder');
        footerOrder.addEventListener('click', () => {
            window.location.href = '/cart';
        });
        const order_p = footerOrder.querySelector('p');

        let totalPrice = 0;
        let storeName = '';

        // 장바구니에 메뉴가 담겨있는지 확인
        await fetch('/api/carts', {})
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response.data.length) {
                    footerOrder.style.display = 'block';
                }
                response.data.forEach((e) => {
                    totalPrice += Number(e.menu_price);
                });
                storeName = response.data[0].store_name;
            })
            .catch((error) => console.error('Error:', error));
        order_p.innerText = '<' + storeName + '> 주문하기 - 총 가격: ' + totalPrice + '원';
    }
};
