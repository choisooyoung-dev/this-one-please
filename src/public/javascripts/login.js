document.addEventListener('DOMContentLoaded', function () {
    console.log('로그인화면');
    const button = document.getElementById('button');
    button.addEventListener('click', async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (data.error) {
                alert(data.error);
            }

            if (data.message) {
                alert(data.message);
                window.location.href = '/';
            }
        } catch (error) {
            console.log('Error!', error);
        }
        // .then((response) => response.json())
        // .then((response) => {
        //     // console.log(response);
        //     if (response.success) {
        //         window.location.href = '/';
        //     } else if (response.error) {
        //         alert(response.error);
        //     }
        // })
        // .catch((error) => console.error('Error:', error));
    });
});
