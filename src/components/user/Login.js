import React from "react";
import {Grid, Button, Container, Typography, TextField} from "@mui/material";
import { BASE_URL, USER } from "../../config/host-config";


const Login = () => {


    const API_BASE_URL = BASE_URL + USER;

    const loginHandler = e => {

        e.preventDefault();

        // 이메일 입력 태그, 비밀번호 입력 태그
        const $email = document.querySelector('#email');
        const $password = document.querySelector('#password');

        // 서버에 로그인 요청
        fetch(`${API_BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: $email.value,
                password: $password.value
            })
        })
        .then(res => res.json())
        .then(result => {
            if(result.message) {
                // 로그인 실패
                alert(result.message);
            }else {
                // 발금 받은 토큰, 회원정보 저장 
                // 브라우저 로컬 스토리지 : 브라우저가 종료되어도 남아있음
                // 세션 스토리지 : 브라우저 종료시 삭제
                localStorage.setItem('ACCESS_TOKEN', result.token);
                localStorage.setItem('LOGIN_USERNAME', result.userName);
                window.location.href = '/';
            }
        });

    };

    
    return (
        <Container component="main" maxWidth="xs" style={{ margin: "300px auto" }}>
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
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;