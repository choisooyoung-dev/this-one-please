const emailBtn = document.getElementById('emailBtn');
const authMailBtn = document.getElementById('authMailBtn');
const signupBtn = document.getElementById('signupBtn');

document.addEventListener('DOMContentLoaded', () => {
    emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sendEmail();
    });
    authMailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authEmail();
    });
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signup();
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
        // console.log(data);

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
            signupBtn.removeAttribute('disabled');
            signupBtn.classList.add('hover:bg-blue-700');
            emailBtn.setAttribute('disabled', '');
            authMailBtn.setAttribute('disabled', '');
            // console.log('signupBtn: ', signupBtn);
            alert(data.message);
        } else {
            alert('인증 번호 확인에 실패했습니다.');
        }
    } catch (error) {
        console.log('에러 발생', error);
    }
};

const signup = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirm').value;
    const name = document.getElementById('nickname').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const address = document.getElementById('address').value;
    let type = 0;
    try {
        if (userType === 'customer') {
            type = 1;
        }
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                confirmPassword,
                name,
                type,
                address,
            }),
        });
        const data = await response.json();
        console.log(data);

        if (data.error) {
            alert(data.error);
        } else if (data.message) {
            alert(data.message);
            window.location.href = '/';
        }
    } catch (error) {
        console.log('에러 발생', error);
    }
};
