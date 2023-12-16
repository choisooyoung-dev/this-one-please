document.addEventListener('DOMContentLoaded', () => {
    InitCategory();
});

const InitCategory = async () => {
    // const categories = document.getElementById("categoryField");
    await fetch('/api/category')
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            let newItem = document.createElement('div');
            let innerHtml = `<select id="categorySelect">
      <option value="" disabled selected>카테고리 선택</option>`;
            response.data.forEach((e, i) => {
                innerHtml += `<option value=${i + 1}>${e.name}</option>`;
            });
            innerHtml += '</select>';
            newItem.innerHTML = innerHtml;
            document.getElementById(`categoryField`).appendChild(newItem);
        })
        .catch((error) => console.error('에러 발생:', error));
};

const createStore = () => {
    // category_id
    const categoryId = parseInt(document.getElementById('categorySelect').value);
    console.log(categoryId);
    // store_name
    const storeName = document.getElementById('store-name').value;
    console.log(storeName);

    // address
    const storeAddress = document.getElementById('store-address').value;
    console.log(storeAddress);

    // store_img(일단 아무거나)
    const storeImageUrl = '';

    // 회원가입 버튼 누르면 api 실행
    fetch('/api/stores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 다른 필요한 헤더가 있다면 여기에 추가
        },
        body: JSON.stringify({
            user_id: 5,
            category_id: categoryId,
            name: storeName,
            address: storeAddress,
            image_url: storeImageUrl,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if(response.success) {
                window.location.href = '/'
            }
        })
        .catch((error) => console.error('Error:', error));
};
