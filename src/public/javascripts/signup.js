const emailBtn = document.getElementById('emailBtn');
const authMailBtn = document.getElementById('authMailBtn');

document.addEventListener('DOMContentLoaded', () => {
    emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sendEmail();
    });
    authMailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authEmail();
    });
});

const sendEmail = async () => {
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/api/users/signup/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        console.log(data);

        if (data.error) {
            alert(data.error);
        }
        if (data.message) {
            alert(data.message);
        }
    } catch (error) {
        console.log('Error!', error);
    }
};

const authEmail = async () => {
    const authEmailNum = document.getElementById('email-verification').value;

    try {
        const response = await fetch('/api/users/signup/verify-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authEmailNum }),
        });

        const data = await response.json();
        console.log(data);

        if (data.error) {
            alert(data.error);
        } else if (data.message) {
            alert(data.message);
        } else {
            alert('인증 번호 확인에 실패했습니다.');
        }
    } catch (error) {
        console.log('에러 발생', error);
    }
};
