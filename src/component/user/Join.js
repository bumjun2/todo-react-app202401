import React, {useState} from 'react';
import {Button, Container, Grid,
    TextField, Typography, Link} from "@mui/material";

const Join = () => {


    // 상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        userName: '',
        password: '',
        email: ''
    });

    const [message, setMessage] = useState({
        userName: '',
        password: '',
        passwordCheck: '',
        email: ''
    });

    //검증 완료 체크에 대한 상태변수 관리

    const [correct, setCorrect] = useState({
        userName: false,
        password: false,
        passwordCheck: false,
        email: false
    });

    //이름 입력값을 검증하고 관리할 함수
    const nameHandler = e => {

        const nameRegex = /^[가-힣]{2,5}$/;

        const inputVal = e.target.value;

        let msg, flage; //검증 메시지를 임시저장할 지역변수

        if(!inputVal){
            msg = '유저 이름은 필수 값입니다.';
            flage = false;
        }else if(!nameRegex.test(inputVal)){
            msg = '2~5글자 사이에 한글로 작성해주세요';
            flage = false;
        }else {
            msg ='사용가능한 이름입니다.';
            flage = true;
        }
        setCorrect({
            ...correct,
            userName: flage
        })

        setMessage({
            ...message,
            userName: msg
        })

        setUserValue({
            ...userValue,
            userName: inputVal
        });
    }
    //이메일 입력값을 검증하고 관리할 함수
    const emailHandler = e => {
        const inputVale = e.target.value;

        setUserValue({
            ...userValue,
            email: inputVale
        });
    }
    // 패스워드 입력값을 검증하고 관리할 함수
    const passwordHandler = e => {
        const inputVale = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        // 검증 시작
        let msg, flag;
        if (!inputVale) { // 패스워드 안적은거
            flag = false;
            msg = '비밀번호는 필수값입니다!';
        } else if (!pwRegex.test(e.target.value)) {
            flag = false;
            msg = '8글자 이상의 영문,숫자,특수문자를 포함해주세요!';
        } else {
            msg = '사용 가능한 비밀번호입니다.';
            flag = true;
        }

        setCorrect({
            ...correct,
            password: flag
        })

        setMessage({
            ...message,
            password: msg
        })
        setUserValue({
            ...userValue,
            password: inputVale
        });
    }

    //패스워드 확인란을 검증할 함수

    // 계정 생성 버튼을 누르면 동작할 내용
    const joinClickHandler = e => {
        e.preventDefault();
        console.log("button click");

        console.log(userValue);

        const requestInfo = {
            method : "post",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(userValue)
        }

        fetch("http://localhost:8484/api/auth", requestInfo)
            .then(res => {
                if (res.status === 200){
                    res.json();
                }
                if (res.status === 400){
                    res.text();
                }
            })
            .then(json => {
                console.log(json)
            })

    }

    return (
        <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="유저 이름"
                            autoFocus
                            onChange={nameHandler}
                        />
                        <span style={
                            correct.userName ? {color: 'black'}
                                : {color: 'red'}
                        }>
                            {message.userName}
                        </span>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                            onChange={emailHandler}
                        />
                        <span style={
                            correct.email ? {color: 'black'}
                                : {color: 'red'}
                        }>{message.email}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordHandler}
                        />
                        <span style={
                            correct.password ? {color: 'black'}
                                : {color: 'red'}
                        }>{message.password}</span>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password-check"
                            label="패스워드 확인"
                            type="password"
                            id="password-check"
                            autoComplete="check-password"
                            onChange={pwCheckHandler}
                        />
                        <span id="check-text" style={
                            correct.passwordCheck ? {color: 'black'}
                                : {color: 'red'}
                        }>{message.passwordCheck}</span>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{background: '#38d9a9'}}
                            onClick={joinClickHandler}
                            disabled
                        >
                            계정 생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                          이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Join;