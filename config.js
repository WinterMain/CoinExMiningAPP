let title = "YLD量化交易-Coinex";

const Config = {
    title,
    ip: "https://api.coinex.com/",
    depth: "0.000001", //行情深度
    WebCode: "SamYoc",
    access_id: "",
    secret_key: "",
    
    KlineType: {
        min1: "1min",
        min3: "3min",
        min5: "5min",
        min15: "15min",
        min30: "30min",
        hour1: "1hour",
        hour2: "2hour",
        hour4: "4hour",
        hour6: "6hour",
        hour12: "12hour",
        day1: "1day",
        day3: "3day",
        week1: "1week"
    },

    Trade: {
        NO: 0,
        Buy: 1,
        Sell: 2
    },

    TradeType: {
        buy: "buy",
        sell: "sell"
    },

    //市场状态
    MarketStatus: {
        close: 0, //关闭
        open: 1 // 开启
    },

    //市场权限
    MarketLimit: {
        no: 0, //不可买卖
        buy: 1, // 可买
        sell: 2, // 可卖
        both: 3, // 可买可卖
    },

    ErrorCode: {
        InternalError: 3, // 内部错误
        OrderNotFound: 600, //订单不存在
    },

    //标记
    Symbol: {
        loadBuy: "load buy",
        loadSell: "load sell",
        loadTreat: "load treat",
        noTreat: "No", //no treat
    },
}

export default Config;