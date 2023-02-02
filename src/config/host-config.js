
// 브라우저가 현재 클라이언트 호스트 이름 얻어오기 
const hostname = window.location.hostname;

let backendHost; // 백엔드 호스트 이름

if(hostname === 'localhost') {
    backendHost = 'http://localhost:8080'; // 로컬 테스트용
}else if(hostname === 'todo-test-ljh-001.s3-website.ap-northeast-2.amazonaws.com') {
    backendHost = 'http://15.165.213.222'; // 배포 테스트용 
}


export const BASE_URL = backendHost;
export const TODO = '/api/todos';
export const USER = '/api/auth';