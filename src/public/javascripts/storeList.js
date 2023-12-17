const container = document.getElementById(`store-container`);
const categoryId = document.getElementById('categoryId').dataset.categoryId;

document.addEventListener('DOMContentLoaded', function () {
    categoryName();
    storeList();
    getCart();
});

function categoryName() {
    fetch('/api/category')
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const category = document.getElementById(`category-name`);
            category.innerText = response.data[categoryId - 1].name;
            category.className = 'max-w text-center';
        })
        .catch((error) => console.error('에러 발생:', error));
}

function storeList() {
    fetch(`/api/stores/filter/${categoryId}`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const container = document.getElementById(`store-container`);
            response.data.forEach((e) => {
                const newItem = document.createElement('a');
                newItem.href = `/store/${e.id}`;
                container.appendChild(newItem);

                const cdev1 = document.createElement('div');
                cdev1.className = 'max-w-4xl mx-auto p-2';
                newItem.appendChild(cdev1);

                const cdev2 = document.createElement('div');
                cdev2.className = 'bg-white shadow-md rounded p-1';
                cdev1.appendChild(cdev2);

                const cdev3 = document.createElement('div');
                cdev3.className = 'flex flex-col lg:flex-row gap-6';
                cdev2.appendChild(cdev3);

                const cdev4 = document.createElement('div');
                cdev4.className = 'image-placeholder w-full lg:w-1/2 h-32 rounded';
                cdev3.appendChild(cdev4);

                const image = document.createElement('img');
                image.src = `${e.image_url}`;
                image.className = 'w-full h-full object-cover';
                // image.src = `https://source.unsplash.com/random/400x200?restaurant&rand=${Math.random()}`;
                cdev4.appendChild(image);

                const cdev5 = document.createElement('div');
                cdev5.className = 'flex-1 space-y-4';
                cdev3.appendChild(cdev5);

                const cdev6 = document.createElement('div');
                cdev5.appendChild(cdev6);

                const storeName = document.createElement('label');
                storeName.className = 'block text-sm font-medium text-gray-700';
                storeName.innerText = `${e.name}`;
                cdev6.appendChild(storeName);

                const storeAddress = document.createElement('label');
                storeAddress.className = 'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';
                storeAddress.innerText = `${e.address}`;
                cdev6.appendChild(storeAddress);
            });
        })
        .catch((error) => console.error('에러 발생:', error));
}

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
                if (response.data.length) storeName = response.data[0].store_name;
            })
            .catch((error) => console.error('Error:', error));
        if (storeName.length) order_p.innerText = '<' + storeName + '> 주문하기 - 총 가격: ' + totalPrice + '원';
    }
};
