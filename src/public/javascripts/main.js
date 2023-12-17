const searchbtn = document.getElementById('searchbtn');
const searchInput = document.getElementById('searchInputValue');

document.addEventListener('DOMContentLoaded', () => {
    InitCategory();

    // 검색 버튼 누르면 쿼리스트링 값으로 검색 입력값 보내주기
    searchbtn.addEventListener('click', (e) => {
        e.preventDefault();
        const searchInputValue = searchInput.value;

        // 검색어 없을 때
        if (!searchInputValue) {
            alert('검색어를 입력해주세요.');
            window.location.href = '/';
        } else {
            window.location.href = `/search?searchInputValue=${searchInputValue}`;
        }
    });
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
