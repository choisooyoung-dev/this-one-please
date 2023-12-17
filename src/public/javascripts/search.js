const container = document.getElementById(`store-container`);

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const receivedValue = urlParams.get('searchInputValue');
    console.log(receivedValue);
});
