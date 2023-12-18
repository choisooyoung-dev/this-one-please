/* <div class="container mx-auto p-6">
        <h1 class="text-2xl font-semibold mb-4">주문 리스트</h1>
        <div class="bg-white shadow-md rounded-lg p-4 mb-4">
            <div class="border-b pb-4 mb-4">
                <div class="order-image mb-3"></div>
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold">가게상호명</h2>
                    <span class="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">주문접수중</span>
                </div>
                <p class="text-gray-600">주문날짜 및 시간</p>
                <p class="text-gray-600">메뉴 가격</p>
                +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    </div>
            </div>
        </div> */
document.addEventListener('DOMContentLoaded', function () {
    getOrderList();
});

const getOrderList = async () => {
    // userId(res.local)
    const userDataSet = document.getElementById('userId');
    if (userDataSet) {
        const userId = document.getElementById('userId').dataset.userId;

        const container = document.getElementById('body-container'); // 1

        fetch(`/api/orders/user`, {})
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                response.data.forEach((e) => {
                    // id(orderId), userId, storeId, info, price, state, storeName
                    const orderFrame = document.createElement('div'); // 2
                    orderFrame.className = 'bg-white shadow-md rounded-lg p-4 mb-4';
                    container.appendChild(orderFrame);

                    const orderContainer = document.createElement('div'); // 3
                    orderContainer.className = 'border-b pb-4 mb-4';
                    orderFrame.appendChild(orderContainer);

                    const image = document.createElement('div'); // 4
                    image.className = 'order-image mb-3';
                    orderContainer.appendChild(image);

                    const storeInfo = document.createElement('div'); // 4
                    storeInfo.className = 'flex justify-between items-center';
                    orderContainer.appendChild(storeInfo);

                    const storeName = document.createElement('h2'); // 5
                    storeName.className = 'text-lg font-semibold';
                    storeName.innerText = e.store_name;
                    storeInfo.appendChild(storeName);

                    const orderState = document.createElement('span'); // 5
                    orderState.className = 'bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm';
                    switch (Number(e.state)) {
                        case 0: // 접수대기
                            orderState.className = 'bg-red-200 text-green-800 py-1 px-3 rounded-full text-sm';
                            orderState.innerText = '접수대기중';
                            break;

                        case 1: // 준비중
                            orderState.className = 'bg-yellow-200 text-green-800 py-1 px-3 rounded-full text-sm';
                            orderState.innerText = '메뉴준비중';
                            break;

                        case 2: // 배달시작
                            orderState.className = 'bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm';
                            orderState.innerText = '배달중';
                            break;

                        case 3: // 배달완료
                            orderState.className = 'bg-blue-200 text-green-800 py-1 px-3 rounded-full text-sm';
                            orderState.innerText = '배달완료';
                            break;
                    }
                    storeInfo.appendChild(orderState);

                    const orderTime = document.createElement('p'); // 4
                    orderTime.className = 'text-gray-600';
                    const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
                    const d = new Date(e.created_at);
                    const date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
                    const time = d.toTimeString().split(' ')[0];
                    orderTime.innerText = date + ' ' + time;
                    orderContainer.appendChild(orderTime);

                    const orderPrice = document.createElement('p'); // 4
                    orderPrice.className = 'text-gray-600';
                    orderPrice.innerText = e.price + '원';
                    orderContainer.appendChild(orderPrice);

                    //     if (Number(e.state) === 3) {
                    // const reviewButton = document.createElement('button'); // 4
                    // reviewButton.className = 'mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
                    // reviewButton.innerText = '리뷰쓰기';
                    // orderContainer.appendChild(reviewButton);

                    // const reviewBox = document.createElement('div'); // 3
                    // reviewBox.className = 'bg-white rounded px-8 pt-6 pb-8 mb-4';
                    // reviewBox.id = 'reveiw-box';
                    // orderFrame.appendChild(reviewBox);

                    // const review = document.createElement('div'); // 4
                    // review.className = 'mb-6';
                    // reviewBox.appendChild(review);

                    // const ask = document.createElement('label'); // 5
                    // ask.className = 'block text-gray-700 text-sm font-bold mb-2';
                    // ask.htmlFor = 'rating';
                    // review.appendChild(ask);

                    // const starRating = document.createElement('div'); // 5
                    // starRating.className = 'star-rating mb-4';
                    // starRating.style.color = 'rgb(255, 230, 0)';
                    // review.appendChild(starRating);

                    // const star = document.createElement('span');
                    // star.className = 'star';
                    // star.onclick = rate(1);
                    // star.innerText = '★';

                    // const selectedRating_p = document.createElement('p'); // 5
                    // selectedRating_p.innerText = '선택한 평점: ';
                    // review.appendChild(selectedRating_p);

                    // const sSelectedRating_span = document.createElement('span'); // 6
                    // sSelectedRating_span.id = 'selectedRating';
                    // sSelectedRating_span.innerText = 0;
                    // selectedRating_p.append(sSelectedRating_span);

                    // const reviewText = document.createElement('p'); // 5
                    // reviewText.id = 'review-text';
                    // reviewText.name = 'review-text';
                    // reviewText.ariaRowCount = '4';
                    // reviewText.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
                    // reviewText.ariaPlaceholder = '리뷰를 입력해주세요.';
                    // review.appendChild(reviewText);

                    // const enterFrame = document.createElement('div'); // 4
                    // enterFrame.className = 'flex items-center justify-between';
                    // orderContainer.appendChild(enterFrame);

                    // const enterButton = document.createElement('button'); // 5
                    // enterButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
                    // enterButton.type = 'button';
                    // enterButton.innerText = '작성하기';
                    // }
                });
            })
            .catch((error) => console.error('Error:', error));
    } else {
        alert('로그인 후 이용 가능합니다.');
        // window.location.href = '/login';
    }
};
