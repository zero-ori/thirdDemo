import { delayIt, http, useMock } from './base'
// import axios from 'axios'
export function getAccess() {
  console.log(useMock(),1);
  if(!useMock()) {
    return delayIt(() => {
      return {

      }
    })
  }
  return http.get('/test')
}