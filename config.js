let title = "YLD量化交易-Coinex";

const Config = {
    title,
    ip: "https://api.coinex.com/",
    KlineNumber: 1200,
    MACDBar: 5,
    MACDBuyBar: 6,
    MACDBuyBarMin : 5, //买入的情况 Bar为负数最少得有的个数
    depth: "0.000001", //行情深度
    WebCode: "SamYoc",
    buyAgainst: 0.25, //每次买入的数量的倍数
    CurrentKlineType: "15min", //当前K线频率
    MaxZdf: 0.02, //最大的涨跌幅，一旦达到这个涨跌幅，则卖出
    MinZdf: -0.1, //允许卖的最小涨跌幅
    ExcuteRate: 6000, //执行频率
    BuyAddTo: 0.03, //跌时追加买入的幅度，允许在跌的超过该值时买入
    MakeFee: 0, //Make 手续费
    TakeFee: 0, //Take 手续费
    secret_key: "",
    access_id: "",
    
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

    Market: {
        // btcbch: { item: "BTC", unit: "BCH", min: 0.001 },

        // ltcbch: { item: "LTC", unit: "BCH", min: 0.001 },
        // ethbch: { item: "ETH", unit: "BCH", min: 0.001 },
        // etcbch: { item: "ETC", unit: "BCH", min: 0.001 },
        // eosbch: { item: "EOS", unit: "BCH", min: 0.001 },
        // xmrbch: { item: "XMR", unit: "BCH", min: 0.001 },

        // ltcbtc: { item: "LTC", unit: "BTC", min: 0.001 },
        // ethbtc: { item: "ETH", unit: "BTC", min: 0.001 },
        // etcbtc: { item: "ETC", unit: "BTC", min: 0.001 },
        // eosbtc: { item: "EOS", unit: "BTC", min: 0.001 },
        // xmrbtc: { item: "XMR", unit: "BTC", min: 0.001 },

        bchusdt: { item: "BCH", unit: "USDT", min: 0.001,
            // 深度价格
            // 买入价+depth
            // 卖出价-depth
            depth: 0.01,
            // 每次买入的比例 在buyAgainst的基础上乘以该值
            buyRate: 1,
            // 价差
            // 买1与卖1价差小于这个数字的时候就以市价买卖
            diffPrice: 1,
            // 货币的小数个数 商品货币买入卖出量的小数点个数
            itemDecimalCount: 8,
            // 定价货币的允许小数点的个数 市价交易的金额
            unitDecimalCount: 8

        },
        // btcusdt: { item: "BTC", unit: "USDT", min: 0.001 },
        // ltcusdt: { item: "LTC", unit: "USDT", min: 0.001 },
        // ethusdt: { item: "ETH", unit: "USDT", min: 0.001 },
        list: [
            "bchusdt",
        ],
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