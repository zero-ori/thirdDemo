import { http, delayIt, useMock } from './base';
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

export function getLoginForm() {
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
          "key": "passWord",
          "title": "密码",
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