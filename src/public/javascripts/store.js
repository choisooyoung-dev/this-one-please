document.addEventListener('DOMContentLoaded', function () {
    getMenus();
});

const getMenus = async () => {
    const storeId = document.getElementById('storeId').dataset.storeId;
    //같은 방식으로 store-name 스토어 이름만
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

    // menucontainer getbyid
    const container = document.getElementById('menu-container');

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
                newButton.addEventListener('click', function () {
                    addCart(e.id, Number(storeId));
                });
                div1.appendChild(newButton);
            });
        })
        .catch((error) => console.error('에러 발생:', error));
};

const addCart = (menuId, storeId) => {
    const userDataSet = document.getElementById('userId');
    if (userDataSet) {
        const userId = document.getElementById('userId').dataset.userId;

        // 회원가입 버튼 누르면 api 실행
        fetch('/api/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 다른 필요한 헤더가 있다면 여기에 추가
            },
            body: JSON.stringify({
                user_id: userId,
                menu_id: menuId,
                store_id: storeId,
                count: 1,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.error('Error:', error));
    } else {
        alert('로그인 후 이용 가능합니다.');
        // window.location.href = '/login';
    }
};
