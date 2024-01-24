import React from 'react';

import {Grid, Button, Container, Typography, TextField} from "@mui/material";
import {json, Link, useNavigate} from 'react-router-dom';

import {AUTH_URL} from "../../config/host-config";

const Login = () => {

    const redirection = useNavigate();


    //서버에 로그인 인증 요청 보내기
    const fetchLoginProcess = async () => {
        const res = await fetch(AUTH_URL + '/signin', {
            method: "post",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById('password').value
            })
        });

        if (res.status === 200){
            const responseDate = await res.json();
            console.log(responseDate);

            redirection('/');
        }else if (res.status === 400){ // 가입이 안 되었거나 비번이 틀린 경우
            const text = await res.text();
            alert(text);
            return;
        }




    }


    //로그인 요청 핸드러
    const loginHandler = e => {
        e.preventDefault();


        fetchLoginProcess();
    }


    return (
        <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>

            <form noValidate onSubmit={loginHandler}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="email address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{background: '#38d9a9'}}
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link to="/join">
                            회원가입을 통해 서비스를 이용하세요.
                        </Link>
                    </Grid>
                    <Grid container justify="flex-end">
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;