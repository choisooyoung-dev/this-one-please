const container = document.getElementById(`store-container`);
const urlParams = new URLSearchParams(window.location.search);
const searchInputValue = urlParams.get('searchInputValue');

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    searchStore();
});

const searchStore = async () => {
    try {
        const response = await fetch('/api/stores', {
            method: 'GET',
        });
        const data = await response.json();
        const stores = data.data;
        const findStoresNameArr = [];
        const matchingStores = stores.filter((store) => store.name.includes(searchInputValue));

        if (matchingStores.length > 0) {
            // Display the matching stores
            findStoresNameArr.push(...matchingStores);
        }
        findStoresNameArr.forEach((store) => {
            const newItem = document.createElement('a');
            newItem.href = `/store/${store.id}`;
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
            image.src = `${store.image_url}`;
            image.className = 'w-full h-full object-cover';
            cdev4.appendChild(image);

            const cdev5 = document.createElement('div');
            cdev5.className = 'flex-1 space-y-4';
            cdev3.appendChild(cdev5);

            const cdev6 = document.createElement('div');
            cdev5.appendChild(cdev6);

            const storeName = document.createElement('label');
            storeName.className = 'block text-sm font-medium text-gray-700';
            storeName.innerText = `${store.name}`;
            cdev6.appendChild(storeName);

            const storeAddress = document.createElement('label');
            storeAddress.className = 'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';
            storeAddress.innerText = `${store.address}`;
            cdev6.appendChild(storeAddress);
        });
    } catch (error) {
        console.log('Error!', error);
    }
};
