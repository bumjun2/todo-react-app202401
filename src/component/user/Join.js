import React, {useEffect, useState} from 'react';
import {Button, Container, Grid,
    TextField, Typography, Link} from "@mui/material";

import {AUTH_URL} from "../../config/host-config";
import {logDOM} from "@testing-library/react";
import {useNavigate} from "react-router-dom";

const Join = () => {

    const redirection = useNavigate(); // 리다이렉트 함수를 리턴

    const API_BASE_URL = AUTH_URL;

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


    const fetchDuplicatedCheck = async (email) => {

        let msg, flag;

        const res = await fetch(AUTH_URL + "/check?email=" + email);

        const json = await res.json();

        if(json){
               msg = '이메일이 중복되었습니다!';
               flag = false;
        }else {
               msg = '사용 가능한 이메일입니다.';
               flag = true;
        }
        setUserValue({...userValue, email: email });
        setMessage({...message, email: msg });
        setCorrect({...correct, email: flag });
    }

    // 회원가입 비동기 요청을 서버로 보내는 함수
    const fetchSignUpPost = async () => {
        const res = await fetch(API_BASE_URL, {
            method : "post",
            headers : {
                "content-type" : "application/json"
            },
            body: JSON.stringify(userValue)
        });

        if (res.status === 200){
            const json = await res.json();
            console.log(json);

            redirection('/login');
        }else{
            alert("서버와에 통신이 원할하지 않습니다");
        }

    }

    //검증이 모두 통과되면 계정 생성을 열어주는 논리 상태변수
    const [lock, setLock] = useState(true);

    // 검증데이터를 상태변수 여러개에 저장하는 함수
    const saveInputState = (flag, msg, inputVal, key) => {
        setCorrect({
            ...correct,
            [key]: flag
        })

        setMessage({
            ...message,
            [key]: msg
        })

        setUserValue({
            ...userValue,
            [key]: inputVal
        });
    }

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

        saveInputState(flage, msg, inputVal, 'userName');

    }
    //이메일 입력값을 검증하고 관리할 함수
    const emailHandler = e => {
        const inputVale = e.target.value;

        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        let msg, flag;
        if (!inputVale) {
            msg = '이메일은 필수값입니다!';
            flag = false;
        } else if (!emailRegex.test(inputVale)) {
            msg = '이메일 형식이 아닙니다!';
            flag = false;
        } else {
            // 이메일 중복체크
            fetchDuplicatedCheck(inputVale);
            return;
        }

        saveInputState(flag, msg, inputVale, 'email');
    }
    // 패스워드 입력값을 검증하고 관리할 함수
    const passwordHandler = e => {
        // 패스워드를 입력하면 확인란을 비우기
        document.getElementById('password-check').value = '';

        document.getElementById('check-text').textContent = '';

        setMessage({...message, passwordCheck: ''});
        setCorrect({...correct, passwordCheck: false});


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

        saveInputState(flag, msg, inputVale, 'password');
    }

    //패스워드 확인란을 검증할 함수
    const pwCheckHandler = e => {
        const inputValue = e.target.value;

        let msg, flag;
        if(!inputValue){
            msg = '비밀번호 확이란은 필수 입니다.'
            flag = false;
        }else if(inputValue !== userValue.password){
            msg = '비밀번호가 같지 않다.'
            flag = false;
        }else{
            msg = '확인 되었습니다.'
            flag = true;
        }

        saveInputState(flag, msg, inputValue, 'passwordCheck');
    }

    const inputIsValid = () => {

        for (let key in correct){
            const value = correct[key];

            if (!value) return false;
        }
        return true;
    }

    // 계정 생성 버튼을 누르면 동작할 내용
    const joinClickHandler = e => {
        e.preventDefault();

        if (!lock){
            fetchSignUpPost();
        }else{
            alert("입력란을 다시 확인해 주세요");
        }

    };

    const {userName: un, password:pw, passwordCheck:pwc, email: em} = correct;

    useEffect(() => {
        console.log('correct가 바뀌면 useEffect는 실행된다.');

        if (inputIsValid()) {
            setLock(false);
        }else{
            setLock(true);
        }
    }, [un, pw, pwc, em]);

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
                            style={
                            lock ? {background: '#ccc'}
                            : {background: '#38d9a9'}
                        }
                            onClick={joinClickHandler}
                            disabled={lock}
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