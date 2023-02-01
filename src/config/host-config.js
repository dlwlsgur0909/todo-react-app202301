
// 브라우저가 현재 클라이언트 호스트 이름 얻어오기 
const hostname = window.location.hostname;

let backendHost; // 백엔드 호스트 이름

if(hostname === 'localhost') {
    backendHost = 'http://localhost:8080'; // 로컬 테스트용
}else if(hostname === 'practice-s3-ljh-bucket001.s3-website.ap-northeast-2.amazonaws.com') {
    backendHost = 'http://52.79.201.122'; // 배포 테스트용 
}


export const BASE_URL = backendHost;
export const TODO = '/api/todos';
export const USER = '/api/auth';