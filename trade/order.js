import http from "../network/request"
import {sign, getAccessId} from "../models/utils"

class Order {
    constructor() {
        this.buyInfo = {
            // "51579403": {market:"btcbch"}
        };

        this.sellInfo = {};
    }

    makeOrder(bill) {
        let tonce = new Date().getTime();
        let params = {
            "access_id": getAccessId(),
            "amount": bill.amount, // order count
            "market": bill.market, // market type
            "price": bill.price, // order price
            "source_id": bill.source_id || parseInt(Math.random() * 100), // user defines number and return
            "tonce": tonce,
            "type": bill.type // sell buy order type
        };

        return http.post("/v1/order/limit", params, {
            headers: {
                authorization: sign(params)
            }
        }).then(res=>{
            // 登记信息
            // Balance.reqBalance();
            // this.registerTrade(res.data);
            return res;
        });
    }

    buy(bill, isMarket) {
        bill.type = "buy";
        //限价交易  当前买一档
        if(isMarket){
            return this.makeMarket(bill);
        }
        return this.makeOrder(bill)
    }

    sell(bill, isMarket) {
        bill.type = "sell";
        //限价交易  当前买一档
        if(isMarket){
            return this.makeMarket(bill);
        }
        return this.makeOrder(bill);
    }
}

export default new Order();