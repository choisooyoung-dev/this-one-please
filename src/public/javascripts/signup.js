const emailBtn = document.getElementById('emailBtn');

document.addEventListener('DOMContentLoaded', () => {
    emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sendEmail();
    });
});

const sendEmail = async (e) => {
    const email = document.getElementById('email').value;

    await fetch('/api/users/signup/auth-mail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log('에러 발생', error);
        });
};
