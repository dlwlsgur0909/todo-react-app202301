import React, { useState } from 'react';
import {Button, Container, Grid, TextField, Typography, Link} from "@mui/material";
import { BASE_URL, USER } from '../../config/host-config';

const Join = () => {

    const API_BASE_URL = BASE_URL+USER;

    // 검증메세지
    const [message, setMessage] = useState({
        username: '',
        password: '',
        checkPassword: '',
        email: ''

    });

    // 검증 완료 여부 
    const [validate, setValidate] = useState({
        username: false,
        password: false,
        checkPassword: false,
        email: false
    });

    // 회원가입 정보 저장 
    const [userValue, setUserValue] = useState({
        userName: '',
        password: '',
        email: ''
    });

    // 유저 이름 입력란 검증 체인지 이벤트 핸들러
    const nameHandler = e => {

        const nameRegex = /^[가-힣]{2,5}$/;

        // 검증 시작
        let msg;
        if(!e.target.value) { // 유저 이름을 안적은 경우
            msg = '유저 이름은 필수값 입니다!';
            setValidate({
                ...validate,
                username: false
            });
        } else if(!nameRegex.test(e.target.value)) {
            msg = '2~5글자 사이의 한글로만 작성해주세요';
            setValidate({
                ...validate,
                username: false
            });
        } else {
            msg = '사용 가능한 이름입니다!'
            setValidate({
                ...validate,
                username: true
            });
        }
        setMessage({
            ...message,
            username: msg
        });
        
        setUserValue({
            ...userValue,
            userName: e.target.value
        });
    }


    // 이메일 중복 확인 요청 함수 
    const checkEmail = email => {
        fetch(`${API_BASE_URL}/check?email=${email}`)
        .then(res => res.json())
        .then(flag => {
            let msg;
            if(flag) {
                msg = '중복된 이메일입니다';
                setValidate({
                    ...validate,
                    email: false
                });
            }else {
                msg = '사용 가능한 이메일입니다'
                setValidate({
                    ...validate,
                    email: true
                });
            }

            setMessage({
                ...message,
                email: msg
            })

        })
    };


    // 이메일 입력 검증
    const emailHandler = (e) => {
        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        let msg;
        if (!e.target.value) {
            msg = '이메일은 필수값입니다!';
            setValidate({
                ...validate, 
                email: false
            });
        } else if (!emailRegex.test(e.target.value)) {
            msg = '이메일 형식이 아닙니다!';
            setValidate({
                ...validate, 
                email: false
            });
        } else {
            checkEmail(e.target.value);
        }
        setMessage({
            ...message, 
            email: msg
        });

        setUserValue({
            ...userValue,
            email: e.target.value
        });
    };


    // 비밀번호 입력란 검증 체인지 이벤트 핸들러
    const passwordHandler = e => {

        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

         // 검증 시작
         let msg;
         if(!e.target.value) { // 비밀번호를 안적은 경우
             msg = '비밀번호는 필수값 입니다!';
             setValidate({
                ...validate,
                password: false
            });
         } else if(!pwRegex.test(e.target.value)) {
             msg = '8글자 이상의 영문, 숫자, 특수문자를 포함해주세요!';
             setValidate({
                ...validate,
                password: false
            });
         } else {
             msg = '사용가능한 비밀번호 입니다!'
             setValidate({
                ...validate,
                password: true
             });
         }
         setMessage({
            ...message,
            password: msg
        });

        setUserValue({
            ...userValue,
            password: e.target.value
        });

    }

    // 비밀번호 확인 입력값 검증
    const checkPasswordHandler = e => {

        // 검증 시작
        let msg;
        if(!e.target.value) {
            setValidate({
                ...validate,
                checkPassword: false
            });
            msg = '비밀번호 확인은 필수입니다!🤬';
        }else if(e.target.value !== userValue.password) {
            setValidate({
                ...validate,
                checkPassword: false
            });
            msg = '비밀번호가 일치하지 않아요!🤬';
        }else {
            setValidate({
                ...validate,
                checkPassword: true
            });
            msg = '비밀번호가 일치합니다!';
        }

        setMessage({
            ...message,
            checkPassword: msg
        });


    }

    // validate 객체 안의 모든 논리값이 true인지 검사하는 함수
    const isValid = () => {
    
        // of : 배열 반복
        // in : 객체 반복
        // 객체에서 key값만 뽑아온다 (문자열로 뽑아준다 'username', 'password', 'email')
        for(let key in validate) {
            if(!validate[key]) {
                return false;
            }
        }
        return true;
    }

    // 회원가입 요청 서버로 보내기
    const submitHandler = e => {
        
        e.preventDefault();
        
        // 입력값 검증을 올바르게 수행했는지 검사 
        if(isValid()) {
            fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userValue)
            })
            .then(res => {
                if(res.status === 200) {
                    alert('회원가입을 축하합니다~');
                    // 로그인 페이지로 리다이렉트
                }else {
                    alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요😢');
                }
            })
        } else {
            alert('입력값을 다시 확인해주세요!');
        }

    }


  return (
    

    <Container component="main" maxWidth="xs" style={{ margin: "300px auto" }}>
        <form noValidate onSubmit={submitHandler}>
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
                        validate.username 
                        ? {color: 'green'}
                        : {color: 'red'}
                    }>{message.username}</span>
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
                        validate.email 
                        ? {color: 'green'}
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
                        validate.password 
                        ? {color: 'green'}
                        : {color: 'red'}
                    }>{message.password}</span>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="checkPassword"
                        label="패스워드 확인"
                        type="password"
                        id="checkPassword"
                        autoComplete="current-checkPassword"
                        onChange={checkPasswordHandler}
                    />
                    <span style={
                        validate.checkPassword 
                        ? {color: 'green'}
                        : {color: 'red'}
                    }>{message.checkPassword}</span>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
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



  )
}

export default Join