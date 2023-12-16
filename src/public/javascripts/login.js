document.addEventListener('DOMContentLoaded', function () {
    console.log('로그인화면');
    const button = document.getElementById('button');
    button.addEventListener('click', async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                if (response.message === '로그인 성공') {
                    window.location.href = '/';
                } else {
                    alert('로그인 실패');
                }
            })
            .catch((error) => console.error('Error:', error));
    });
});
