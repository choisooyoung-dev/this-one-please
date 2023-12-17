export const ErrorHandler = (err, req, res, next) => {
    const validErrorName = err.details[0].path[0];

    if (validErrorName === 'email') {
        return res.json({ success: false, message: '이메일을 작성해주세요.' });
    }

    if (validErrorName === 'password') {
        return res.json({ success: false, message: '비밀번호를 작성해주세요.' });
    }

    if (validErrorName === 'confirmPassword') {
        return res.json({ success: false, message: '확인 비밀번호를 작성해주세요.' });
    }

    if (validErrorName === 'name') {
        return res.json({ success: false, message: '이름을 작성해주세요.' });
    }

    if (validErrorName === 'type') {
        return res.json({ success: false, message: '회원 유형을 선택해주세요.' });
    }

    if (validErrorName === 'image_url') {
        return res.json({ success: false, message: '사진을 첨부해주세요.' });
    }

    if (validErrorName === 'price') {
        return res.json({ success: false, message: '가격을 입력해주세요.' });
    }
};
