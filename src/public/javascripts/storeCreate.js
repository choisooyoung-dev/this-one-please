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
            let innerHtml = `<label for="categorySelect"></label>
            <select id="categorySelect">
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

    const userDataSet = document.getElementById('userId');
    
    const fileInput = document.getElementById('store-image');
    const imageFile = fileInput.files[0];

    var formData = new FormData();
    formData.append('user_id', userDataSet.userId);
    formData.append('category_id', categoryId);
    formData.append('name', storeName);
    formData.append('address', storeAddress);
    formData.append('image_url', imageFile);
    // console.log(formData);

    fetch('/api/stores', {
        method: 'POST',
        body: formData,
        credentials: 'include',
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response.success) {
                window.location.href = '/';
            }
        })
        .catch((error) => {
            console.error('오류 발생:', error);
        });

};

function openFileInput() {
    document.getElementById('store-image').click();
}

function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById('previewImage');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}
