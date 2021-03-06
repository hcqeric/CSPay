import axios from 'axios';
import url from '@/http/url.js'
import router from '../router'
import {Indicator, Toast} from 'mint-ui';
import * as Constants from '../custom/constants'
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from '../custom/mixin';

class Request {
  constructor(baseUrl = url.baseUrl){
    this.Domain = baseUrl
  }

  require(options) {
    if (!options.api) throw new Error('api 不能为空');
    if (!options.param) { options.param = {} }

    //动态路由参数设置
    if (!options.restParam) {
      options.restParam = {}
    }
    else{
      console.log(options.api)
      let restArr = options.api.split('/');
      console.log(restArr)
      restArr.forEach((item, index)=>{
        if (item.startsWith(':')){
          let key = item.substring(1)
          restArr[index] = options.restParam[key]
        }
      })
      options.api = restArr.join('/')
    }
    //动态路由参数设置
    if (!options.data) { options.data = {} }
    if (!options.methods) { options.methods = 'POST' }; //不传递方法默认为POST
    if (!options.loadingVisble) { options.loadingVisble = false }; // 不传递默认开启loading
    if (!options.loadingText) { options.loadingText = '加载中...' };
    if(options.loadingVisble){
      Indicator.open({
        text: options.loadingText,
        spinnerType: 'snake'
      })
    };
    return new Promise((resolve,reject) => {
        return axios({
            method: options.methods,
            url: options.api,
            baseURL: this.Domain,
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + getLocalStorage("Authorization")
            },
            params:options.param,
            data:options.data
        }).then(response => {
            Indicator.close();
            if(response.data.code === 0){ //请求成功
                return resolve(response.data)
            }else{
                if(response.code === 401){ //TOKEN失效
                  removeLocalStorage(Constants.TOKEN)
                  // router.push('/login')
                }
                Toast({
                    message: response.data.msg,
                    position: 'middle',
                    duration: 1000
                });
                return reject(response.data)
            }
        },error => {
            Indicator.close();
            Toast({
                message: error.msg,
                position: 'middle'
            });
            return reject()
        }).catch(error=>{
          Toast({
            message: '服务器出错，请稍后再试',
            position: 'middle',
            duration: 1000
          })
          Indicator.close();
        })

    })
  }
}

export default Request;
