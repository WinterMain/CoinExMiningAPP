// 行情数据
import http from "../network/request"

export function ticker(market){
    return http.get("/v1/market/ticker", {params: {
        market: market
    }})
}
