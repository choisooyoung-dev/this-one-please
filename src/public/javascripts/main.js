document.addEventListener('DOMContentLoaded', () => {
    InitCategory();
});

const InitCategory = async () => {
    await fetch('/api/category')
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            response.data.forEach((e) => {
                const newItem = document.createElement('div');
                newItem.innerHTML = `
        <a href="/category/${e.id}">
        <div class="bg-white p-4 rounded-md shadow-md">
        <img  src=${e.image_url} alt=${e.name} class="w-36 h-36 mb-4 mx-auto">
                    <div class="text-center">
                      <div class="font-bold">${e.name}</div>
                    </div>
                  </div> 
                  </a>
        `;
                document
                    .getElementById(`category-container`)
                    .appendChild(newItem);
            });
        })
        .catch((error) => console.error('에러 발생:', error));
};
