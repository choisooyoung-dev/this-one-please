document.addEventListener("DOMContentLoaded", function () {
  let categoryId = document.getElementById("categoryId").dataset.categoryId;
fetch(`/api/stores/filter/${categoryId}`)
.then((response) => response.json())
.then((response) => {
    console.log(response);
    response.data.forEach((e) => {
      var newItem = document.createElement("div");
      newItem.innerHTML = `
      <div class="max-w-4xl mx-auto p-8">
        <div class="bg-white shadow-md rounded p-6">
          <div class="flex flex-col lg:flex-row gap-6">
            <div class="image-placeholder w-full lg:w-1/2 h-32 rounded">
              <img src="${e.image_url}">
            </div>
            <div class="flex-1 space-y-4">
              <div>
                <label for="storeName" class="block text-sm font-medium text-gray-700">${e.name}</label>
                <input type="text" id="storeName" name="storeName" placeholder=${e.address} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      document.getElementById(`store-container`).appendChild(newItem);  
    });
})
.catch((error) => console.error("에러 발생:", error));
});