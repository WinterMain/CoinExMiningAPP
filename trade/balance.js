import http from "../network/request"
import Config from "../config";
import {signGet, parseNumber, numberFixed, getAccessId} from "../models/utils"

class Balance {
    constructor(){
        this.coins = {};
    }

    //初始化
    init(){

    }

    reqBalance() {
        let tonce = new Date().getTime();

        return new Promise((resolve, reject)=>{
            http.get("/v1/balance/", signGet({access_id: getAccessId(), tonce})).then(res=>{
                this.saveBalance(res.data)
    
                resolve(res);
            }).catch(e=>{
                reject(e);
            });
        })
    }

    saveBalance(datas){
        this.coins = datas || {};
    }

    //有效的，可用的币
    avail(){
        let avials = [];
        for(let item in this.coins){
            if(parseFloat(this.coins[item].available) > 0){
                let obj = Object.assign(this.coins[item], {coin: item});
                avials.push(obj);
            }
        }

        return avials;
    }
}

export default new Balance();
