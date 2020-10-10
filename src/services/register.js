import { delayIt, http, useMock } from './base'
// import axios from 'axios'
export function getAccess() {
  console.log(useMock(),1);
  if(useMock()) {
    return delayIt(() => {
      return {

      }
    })
  }
  return http.get('/test')
}

export function getRegisterForm() {

  
    return delayIt(() => {
      return {
        "status": "success",
        "code": 200,
        "data": [
          {
            "key": "name",
            "title": "用户名",
            "required": true //是否必填，创建患者时使用
          },
          {
            "key": "mail",
            "title": "邮箱",
            "required": true
          },
          {
            "key": "passWord",
            "title": "密码",
            "required": true
          },
          {
            "key": "recodePassWord",
            "title": "再次确认密码",
            "required": true
          },
          {
            "key": "IDcode",
            "title": "验证码",
            "required": true
          },
        ]
      };
    });

}