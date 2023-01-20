# 리액트 프로젝트 시작하기

1. nodejs 설치
2. create-react-app 설치 (최초1번)
```
$ npm install -g create-react-app
```

3. react프로젝트 생성
```
$ npx create-react-app 프로젝트이름
```

4. react 프로젝트 실행
```
$ cd 프로젝트폴더
$ npm start
```
- http://localhost:3000 에서 프론트엔드 서버 실행



```
- 리엑트는 기본적으로 부모 태그가 필수 
   - 원하지 않는 부모 태그 처리는 <> </> 로 가능 (fragment)
- 태그들이 합쳐져서 특정한 의미를 갖는다면 해당 태그 집합을 component화 한다
   - js파일이지만 component임을 명시하기위해 첫글자는 대문자로 작성하는게 관례이다 
   - ex) components -> Greeting.js 

- ES7+ React/Redux/React-Native snippets 플러그인 설치 
   - component를 만들때 rafce를 입력하면 자동으로 template 생성 가능 
   - reference: https://github.com/ults-io/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md

```