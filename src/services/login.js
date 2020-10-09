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