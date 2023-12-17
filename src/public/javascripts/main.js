document.addEventListener('DOMContentLoaded', () => {
    InitCategory();
    getCart();
});

const InitCategory = async () => {
    await fetch('/api/category')
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const container = document.getElementById(`category-container`);
            response.data.forEach((e) => {
                const newItem = document.createElement('a');
                newItem.href = `/category/${e.id}`;
                container.appendChild(newItem);

                const newDiv = document.createElement('div');
                newDiv.className = 'bg-white p-4 rounded-md shadow-md';
                newItem.appendChild(newDiv);

                const newImage = document.createElement('img');
                newImage.className = 'w-36 h-36 mb-4 mx-auto';
                newImage.src = `${e.image_url}`;
                newImage.alt = `${e.name}`;
                newDiv.appendChild(newImage);

                const newDiv1 = document.createElement('div');
                newDiv1.className = 'text-center';
                newDiv.appendChild(newDiv1);

                const newDiv2 = document.createElement('div');
                newDiv2.className = 'font-bold';
                newDiv2.innerText = `${e.name}`;
                newDiv1.appendChild(newDiv2);
            });
        })
        .catch((error) => console.error('에러 발생:', error));
};

const getCart = async () => {
    const userDataSet = document.getElementById('userId');
    if (userDataSet) {
        const userId = document.getElementById('userId').dataset.userId;
        const footerOrder = document.getElementById('footerOrder');
        footerOrder.addEventListener('click', () => {
            window.location.href = '/cart';
        });

        // 장바구니에 메뉴가 담겨있는지 확인
        await fetch('/api/carts', {})
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response.data.length) {
                    footerOrder.style.display = 'block';
                }
            })
            .catch((error) => console.error('Error:', error));
    }
};
