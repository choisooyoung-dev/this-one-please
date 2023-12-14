document.addEventListener("DOMContentLoaded",  () => {
  InitCategory();
});
 

const InitCategory= async()=> {
  // const categories = document.getElementById("categoryField");
  await fetch("/api/category")
  .then((response) => response.json())
  .then((response) => {
      console.log(response);
      let newItem = document.createElement("div");
      let innerHtml = `<select id="categorySelect">
      <option value="" disabled selected>카테고리 선택</option>`;
      response.data.forEach((e,i) => {
        innerHtml += `<option value=${i+1}>${e.name}</option>`
      });
      innerHtml+='</select>';
      newItem.innerHTML=innerHtml;
      document.getElementById(`categoryField`).appendChild(newItem);  
  })
  .catch((error) => console.error("에러 발생:", error));
}