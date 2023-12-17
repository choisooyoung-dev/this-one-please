
const storeId = document.getElementById('storeId').dataset.storeId;
document.addEventListener('DOMContentLoaded', function () {
  
  const stroeContainer = document.getElementById('store-container');
  const menusContainer = document.getElementById('menus-container');
  const ordersContainer = document.getElementById('order-container');

  stroeContainer.style.display ='block';
  menusContainer.style.display ='none';
  ordersContainer.style.display ='none';

  const stroeBtn = document.getElementById('btn-store');
  stroeBtn.addEventListener('click',() => {
    stroeContainer.style.display ='block';
    menusContainer.style.display ='none';
    ordersContainer.style.display ='none';
  });
  const menusBtn = document.getElementById('btn-menus');
  menusBtn.addEventListener('click',() => {
    stroeContainer.style.display ='none';
    menusContainer.style.display ='block';
    ordersContainer.style.display ='none';
  });
  const ordersBtn = document.getElementById('btn-orders');
  ordersBtn.addEventListener('click',() => {
    stroeContainer.style.display ='none';
    menusContainer.style.display ='none';
    ordersContainer.style.display ='block';
  });
  //  InitCategory();
    getStore();
    getMenus();
});

const getStore = () =>{
  fetch(`/api/stores/${storeId}`)
      .then((response) => response.json())
      .then((response) => {
        document.getElementById("store-name").placeholder = response.data.name;
        document.getElementById("store-address").placeholder = response.data.address;
        document.getElementById("storeImage").src = response.data.image_url;
       
      })
      .catch((error) => console.error('에러 발생:', error));
}

// const InitCategory = () => {
//     const categories = document.getElementById("categoryField");
//     console.log(categories)
//    fetch('/api/category')
//       .then((response) => response.json())
//       .then((response) => {
//           console.log(response);
//           let newItem = document.createElement('div');
//           let innerHtml = `<label for="categorySelect" class="visible" ></label>
//           <select id="categorySelect" class="visible">
//           <option value="" disabled selected>카테고리 선택</option>`;
//           response.data.forEach((e, i) => {
//               innerHtml += `<option value=${i + 1}>${e.name}</option>`;
//           });
//           innerHtml += '</select>';
//           newItem.innerHTML = innerHtml;
//           categories.appendChild(newItem);
//       })
//       .catch((error) => console.error('에러 발생:', error));
// };

const getMenus = async () => {
    const container = document.getElementById('menu-container');
    // 내용물을 지웁니다.
    container.innerHTML = '';

    fetch(`/api/menus/store/${parseInt(storeId)}`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response.data);

            if( response.data.length > 0){
            const newDiv = document.createElement('div');
            newDiv.className = 'menu-card p-4';
            container.appendChild(newDiv);

            response.data.forEach((e) => {
                // 이미지 생성
                const newImage = document.createElement('img');
                newImage.src = e.image_url;
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
                newButton.innerText = '메뉴 삭제';
                newButton.addEventListener('click', function () {
                    //메뉴 아이디가 e.id
                    deleteMneu(e.id);
                });
                div1.appendChild(newButton);
              
            });
          }
        })
        .catch((error) => console.error('에러 발생:', error));
};

function openFileInputStore() {
  document.getElementById('store-image').click();
}

function storeImage(event) {
  const input = event.target;
  const preview = document.getElementById('storeImage');

  if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
          preview.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
  }
}
function openFileInputMenu() {
  document.getElementById('menu-image').click();
}
function menuImage(event) {
  const input = event.target;
  const preview = document.getElementById('menuImage');

  if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
          preview.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
  }
}


const updateStore = () => {
  // category_id
  // const categoryId = parseInt(document.getElementById('categorySelect').value);
  // console.log(categoryId);

  // store_name
  const storeName = document.getElementById('store-name').value;
  console.log(storeName);

  // address
  const storeAddress = document.getElementById('store-address').value;
  console.log(storeAddress);

  const userDataSet = document.getElementById('userId');
  
  const fileInput = document.getElementById('store-image');

  var formData = new FormData();
  formData.append('user_id', userDataSet.userId);
  // formData.append('category_id', categoryId);
  if(storeName)
    formData.append('name', storeName);
  if(storeAddress)
    formData.append('address', storeAddress);
  if(fileInput.files) {
    const imageFile = fileInput.files[0];
    formData.append('image_url', imageFile);
  }
  // console.log(formData);

  fetch('/api/stores', {
      method: 'PATCH',
      body: formData,
      credentials: 'include',
  })
      .then((response) => response.json())
      .then((response) => {
          console.log(response);
          if (response.success) {
            window.location.reload(true);
          }
      })
      .catch((error) => {
          console.error('오류 발생:', error);
      });

};


const createMenu = () => {
  // const storeId = document.getElementById('storeId').dataset.storeId;

  // store_name
  const menuName = document.getElementById('menu-name').value;
  console.log(menuName);

  // address
  const price = document.getElementById('menu-price').value;
  console.log(price);
  
  const fileInput = document.getElementById('menu-image');
  console.log(fileInput);

  var formData = new FormData();
  // formData.append('category_id', categoryId);
    // formData.append('store_id', storeId);
  // if(menuName)
    formData.append('name', menuName);
  // if(price)
    formData.append('price', price);
  if(fileInput.files) {
    const imageFile = fileInput.files[0];
    formData.append('image_url', imageFile);
  }
  // console.log(formData);

  fetch('/api/menus', {
      method: 'POST',
      body: formData,
      credentials: 'include',
  })
      .then((response) => response.json())
      .then((response) => {
          console.log(response);
          // if (response.success) {
          //   window.location.reload(true);
          // }
          getMenus();
      })
      .catch((error) => {
          console.error('오류 발생:', error);
      });

};

const deleteMneu = (id) => {
  fetch(`/api/menus/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        getMenus();
    })
    .catch((error) => {
        console.error('오류 발생:', error);
    });
}