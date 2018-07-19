//挖矿策略

import {
    ticker
} from "./quote";
import Config from "../config";
import Balance from "./balance";
import Order from "./order";
import {
    definite,
    signGet,
    parseNumber,
    numberFixed,
    sign,
    alwaysThread,
    getAccessId,
    hideString,
    yocEncript,
    yocDecrypt
} from "../models/utils";
import http from "../network/request"
//挖矿策略
window.SamYoc_Trade_Setting = {
    
};

window.dom = function(id) {
    return document.getElementById(id);
}

window.bind = function(value, idArr) {
    idArr.map(function (val) {
        dom(val).innerText = value;
    });
}

window.bindChange=function(val, e) {
    console.log(val, e)
}

window.onLoadTrue = function() {
    var img = new Image();
    img.src = "https://www.samyoc.com/uploads/users/1/images/1530351809848.jpg";
    img.onload = function () {
        dom("trueimge").className = "stage";
        dom("trueimge").style =
            "background-image: url(https://www.samyoc.com/uploads/users/1/images/1530351809848.jpg);"
    };
};
window.initDom = function() {
    dom("coinPrice").onchange = function (val) {
        var text = dom("coinPrice").value.toUpperCase();
        dom("spanPrice1").innerText = text;
        dom("spanPrice2").innerText = text;
        dom("spanMarketPrice").innerText = text;
    };
    dom("spanMyIP").innerText = returnCitySN.cip + "  " + returnCitySN.cname;
};

window.initSetting = function () {
    var tradeSetting;
    if (localStorage.SamYoc_Trade_Setting) {
        try {
            tradeSetting = JSON.parse(localStorage.SamYoc_Trade_Setting);
            SamYoc_Trade_Setting = tradeSetting;
        } catch (e) {
            SamYoc_Trade_Setting = {};
        }
    }

    if (tradeSetting) {
        dom("coinMain").value = tradeSetting.coinPare.main;
        dom("coinPrice").value = tradeSetting.coinPare.price;
        dom("inputMeony").value = tradeSetting.tradeNum;
        dom("inputMinMoney").value = tradeSetting.minMoney;
        dom("inputLimitMining").value = tradeSetting.safeDiffculty;
        dom("inputSellCetInter").value = tradeSetting.sellCETInter;
        dom("inputSellCet").value = tradeSetting.sellCETNum;
        dom("spanMarketPrice").innerText = tradeSetting.coinPare.price;
        dom("spanMarketMain").innerText = tradeSetting.coinPare.main;
    }
}

// 开始
window.start = function() {
    SamYoc_Trade_Setting.coinPare.main = dom("coinMain").value.toUpperCase();
    SamYoc_Trade_Setting.coinPare.price = dom("coinPrice").value.toUpperCase();
    SamYoc_Trade_Setting.tradeNum = dom("inputMeony").value;
    SamYoc_Trade_Setting.minMoney = dom("inputMinMoney").value;
    SamYoc_Trade_Setting.safeDiffculty = dom("inputLimitMining").value;
    SamYoc_Trade_Setting.sellCETInter = dom("inputSellCetInter").value;
    SamYoc_Trade_Setting.sellCETNum = dom("inputSellCet").value;

    localStorage.SamYoc_Trade_Setting = JSON.stringify(SamYoc_Trade_Setting);

    dom("spanMarketPrice").innerText = SamYoc_Trade_Setting.coinPare.price;
    dom("spanMarketMain").innerText = SamYoc_Trade_Setting.coinPare.main;
}

window.marketHelper = {
    // 设置当前交易价格
    setCurrentPrice: function (val) {
        dom("spanPrice").innerText = val || "-";
    },
    setIP: function (val) {
        dom("spanMyIP").innerText = val || "-";
    },
    setMining: function (val) {
        dom("spanMining").innerText = val || "-";
    },
    setDiffculty: function (val) {
        dom("spanDiff").innerText = val || "-";
    },
    setAccessId: function (val) {
        dom("spanAccessId").innerText = val || "-";
    },
}

window.message = {
    // 输出
    output: function (domele) {
        var outputEle = dom("output");
        if (outputEle.childNodes.length > 300) {
            outputEle.removeChild(outputEle.childNodes[0]);
        }

        outputEle.appendChild(domele);
        outputEle.scrollTop = 1000000;
    },
    // 
    outmsg: function (str, line, color) {
        var msg = document.createElement("span");
        line = (line === null || line !== false || line ? true : false);
        msg.style = line ? ("color: " + color + "; display: block;") : ("color: " + color);
        msg.innerText = str;
        this.output(msg);
    },
    out: function (str, line) {
        this.outmsg(str, line, "greenyellow");
    },
    err: function (str, line) {
        this.outmsg(str, line, "#ff1414");
    },
};

window.onLoadTrue();
window.initDom();
window.initSetting();

// import Mail from "../mail";
// import {
//     list
// } from "../models/sql";
document.getElementById("btnPower").onclick = function () {
    Config.secret_key = yocEncript(dom("inputSecretCode").value);
    localStorage.MY_SECRET_CODE = Config.secret_key;
    document.getElementById("powerDiv").style.display = "none";
    document.body.style.overflow = "auto";
}

if (localStorage.MY_SECRET_CODE) {
    document.getElementById("inputSecretCode").value = yocDecrypt(localStorage.MY_SECRET_CODE);
    document.body.style.overflow = "auto";
    document.getElementById("powerDiv").style.display = "none";
} else {
    document.body.style.overflow = "hidden";
    document.getElementById("powerDiv").style.display = "block";
}

Config.secret_key = yocEncript(dom("inputSecretCode").value);
const CODES_MSG = {
    602: "交易数量小于最低要求数量",
    213: "请求太快了，请慢一点"
};

class PriceTradeOne {
    constructor() {
        this.coinPare = {
            main: "ETH",
            price: "USDT",
        };

        //BTC
        this.coinPare.main = "BTC";
        this.tradeNum = 40; //进行买卖  钱的数量
        this.minBuy = 0.002;
        this.minMoney = 15;
        this.price = 6318.18;
        this.frequency = 100;

        // CET
        // this.coinPare.main = "CET";
        // this.tradeNum = 60; //进行买卖  钱的数量
        // this.minMoney = 12;
        // this.price = 0.0729;
        // this.minBuy = this.minMoney / this.price;

        //CET
        // this.coinPare.main = "CET";
        // this.tradeNum = 100; //进行买卖  钱的数量
        // this.minBuy = 1;
        // this.minMoney = 7;
        // this.price = 0.0550;

        //前一笔卖单及交易信息, 前一笔买单及交易信息
        this.preTrade = {

        };

        this.market = (this.coinPare.main + this.coinPare.price).toLocaleLowerCase();
        this.count = 0;

        this.checkStark = new Date().getTime();

        this.miningDone = false;
        this.sellCETNum = 16;

        this.sendEmail = false;
        this.safeDiffculty = 50;
        this.checkDiffcultyInter = 30000;
        this.sellCETInter = 6;
        this.refreshConfigInter = 60000;
        this.stopApplication = true;

        document.getElementById("btnBegin").onclick = function () {
            window.mining_yld_samyoc.run();
        };

        document.getElementById("btnStop").onclick = function () {
            window.mining_yld_samyoc.stop();
        };

        document.getElementById("btnEdit").onclick = function () {
            window.mining_yld_samyoc.stop();
            dom("inputSecretCode").value = "";
            document.getElementById("powerDiv").style.display = "block";
            document.body.style.overflow = "hidden";
        }
    }

    stop() {
        window.mining_yld_samyoc.stopApplication = true;
        message.out("");
        message.out("⏸挖矿程序暂停...");
        document.getElementById("stopArea").className += " hide";
    }

    run() {
        window.start();
        message.out("▶️挖矿程序开始...");
        document.getElementById("stopArea").className = document.getElementById("stopArea").className.replace(/hide/, "");
        this.coinConfig(() => {
            this.stopApplication = false;
            this.checkMining();
            this.takeBill();
        });
    }

    checkStopApp() {
        return this.stopApplication;
    }

    // 开始执行
    start() {
        this.coinConfig(() => {
            Balance.reqBalance().then(() => {
                this.sellInterCET();
                this.refreshCoinArea();
            }).catch(e => {
                if (e.code === 23) {
                    message.err(`❌ ${e.message} 请在API秘钥中添加你本机IP为白名单`);
                } else {
                    message.err("❌ 启动失败3秒后重启");
                    setTimeout(() => {
                        this.start();
                    }, 3000);
                }
            });
        });
    }

    // 获取货币配置
    coinConfig(callback, isrefresh) {
        const configItem = SamYoc_Trade_Setting;
        this.coinPare.main = configItem.coinPare.main;
        this.coinPare.price = configItem.coinPare.price;
        this.market = (this.coinPare.main + this.coinPare.price).toLocaleLowerCase();
        this.tradeNum = parseFloat(configItem.tradeNum); //进行买卖  钱的数量
        this.safeDiffculty = parseFloat(configItem.safeDiffculty);
        this.minMoney = parseFloat(configItem.minMoney);
        this.sellCETNum = parseFloat(configItem.sellCETNum);
        this.sellCETInter = parseFloat(configItem.sellCETInter);


        // this.price = parseFloat(configItem.price);
        // this.frequency = parseFloat(configItem.frequency);
        // this.stopApplication = configItem.stopapp;
        // this.checkDiffcultyInter = parseFloat(configItem.checkDiffcultyInter);
        // this.refreshConfigInter = parseFloat(configItem.refreshConfigInter);

        message.out(new Date().toLocaleString(), true);
        message.out(`Id: ${hideString(getAccessId())}`, true);
        marketHelper.setAccessId(hideString(getAccessId()));
        message.out(`买卖货币：${this.coinPare.main}`, true);
        message.out(`定价货币：${this.coinPare.price}`, true);
        message.out(`交易市场：${this.coinPare.main}/${this.coinPare.price}`, true);
        message.out(`每笔交易额：${this.tradeNum} ${this.coinPare.price}`, true);
        message.out(`最小交易额度：${this.minMoney} ${this.coinPare.price}`, true);
        message.out(`挖矿限额：${this.safeDiffculty}%`, true);
        message.out(`CET卖出频率：${this.sellCETInter} 秒`, true);
        message.out(`CET卖出数量：${this.sellCETNum} CET`, true);

        ticker(this.market).then(res => {
            let current = res.data.ticker;
            marketHelper.setCurrentPrice(current.last);
            this.price = parseFloat(current.last);
            this.minBuy = this.tradeNum / this.price;

            if (callback) {
                callback();
            }
        });
    }

    sellInterCET() {
        alwaysThread(() => {
            if (!this.miningDone && !this.checkStopApp()) {
                let sellNum = parseNumber(this.sellCETNum);
                if (sellNum && Balance.coins["CET"].available > this.sellCETNum) {
                    Order.sell({
                        amount: this.sellCETNum,
                        market: "CETUSDT",
                    }, true).then(mres => {
                        message.out(`♻️ ${this.sellCETInter}秒 CET卖出：${this.sellCETNum} CET`, true);
                        return mres;
                    }).catch(e => {

                    })
                } else {
                    message.out(`🆗 ${this.sellCETInter}秒 CET已卖完`);
                }
            }
        }, () => {
            return this.sellCETInter * 1000;
        });
    }

    buyBalance() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.buyMainCoin(),
                this.buyPriceCoin()
            ]).then(res => {
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }

    createCoinStr(coin, active) {
        return ` <div class="flexshow" style="margin-bottom: 10px;">
            <div class="coinicon ${active?'active':''}">${coin.coin}</div>
            <div class="flex tr">${coin.available}</div>
        </div>`
    }

    refreshCoinArea() {
        let ele = document.getElementById("coinArea");
        let str = this.createCoinStr(Object.assign(Balance.coins[this.coinPare.main], {
            coin: this.coinPare.main
        }), true) + this.createCoinStr(Object.assign(Balance.coins[this.coinPare.price], {
            coin: this.coinPare.price
        }), true) + (this.coinPare.main === "CET" || this.coinPare.price === "CET" ? "" : this.createCoinStr(Object.assign(Balance.coins["CET"], {
            coin: "CET"
        }), true)) + Balance.avail().map((val => {
            if (val.coin === this.coinPare.main || val.coin === this.coinPare.price || val.coin === "CET") {
                return "";
            }
            return this.createCoinStr(val);
        })).join("");
        ele.innerHTML = str;
    }

    checkMainCoin() {
        let mainCoinNum = parseNumber(Balance.coins[this.coinPare.main].available);
        return mainCoinNum < this.minBuy || mainCoinNum < this.minMoney / this.price;
    }

    buyMainCoin() {
        return new Promise((resolve, reject) => {
            if (this.checkMainCoin()) {
                this.cancelAll().then(() => {
                    let mainNum = parseNumber(Balance.coins[this.coinPare.price].available) / 2;
                    let numFixed = numberFixed(mainNum, 8);
                    Order.buy({
                        amount: numFixed,
                        market: this.market,
                    }, true).then(mres => {
                        message.out(`🈚️ ${this.coinPare.main}余额不足：市价买入${numFixed}${this.coinPare.price}`);
                        resolve();
                        return mres;
                    }).catch(e => {
                        reject();
                    })
                }).catch((e) => {
                    reject();
                });
            } else {
                resolve();
            }
        });
    }

    checkPriceCoin() {
        let priceCoinNum = parseNumber(Balance.coins[this.coinPare.price].available);
        return (priceCoinNum < this.minMoney || priceCoinNum < this.price * this.minBuy);
    }

    buyPriceCoin() {
        return new Promise((resolve, reject) => {
            if (this.checkPriceCoin()) {
                this.cancelAll().then(() => {
                    let coinNum = parseNumber(Balance.coins[this.coinPare.main].available) / 2;
                    let numFixed = numberFixed(coinNum, 8);
                    Order.sell({
                        amount: numFixed,
                        market: this.market,
                    }, true).then(mres => {
                        process.stdout.write("市卖");
                        message.out(`🈚️ ${this.coinPare.price}余额不足：市价卖出${numFixed}${this.coinPare.main}`);
                        resolve();
                        return mres;
                    }).catch(e => {
                        reject();
                    })
                }).catch(() => {
                    reject();
                });
            } else {
                resolve();
            }
        });
    }

    getMaxBuy(price) {
        let num = parseNumber(Balance.coins[this.coinPare.price].available) / parseNumber(price);
        return numberFixed(Math.min(num, this.tradeNum), 8);
    }

    getMaxSell() {
        let num = parseNumber(Balance.coins[this.coinPare.main].available);
        return Math.min(num, this.tradeNum);
    }

    sellCET() {
        Order.sell({
            amount: Balance.coins["CET"].available,
            market: "CETUSDT",
        }, true).then(mres => {
            message.out(`🔆 卖出挖矿产出的所有CET：${Balance.coins["CET"].available} CET`);
            return mres;
        }).catch(e => {

        })
    }

    takeBill() {
        let frequency = parseInt(this.frequency);
        if (isNaN(frequency)) {
            frequency = 0;
        }

        setTimeout(() => {
            this.takeCore();
        }, frequency);
    }

    takeCore() {
        if (this.checkStopApp()) {
            return;
        }

        if(this.miningDone) {
            setTimeout(()=>{
                this.takeBill();
            }, 10000);
            return;
        }

        Balance.reqBalance().then(() => {
            this.refreshCoinArea();
            if (this.checkPriceCoin() && this.checkMainCoin()) {
                setTimeout(() => {
                    this.sellCET();
                    this.takeBill();
                }, 3000);
                return;
            }

            this.buyBalance().then(res => {
                ticker(this.market).then(res => {
                    let current = res.data.ticker;
                    marketHelper.setCurrentPrice(current.last);
                    this.price = parseFloat(current.last);
                    this.minMoney = this.minBuy * this.price;
                    // 当前交易价格
                    let orderPrice = (parseFloat(current.sell) + parseFloat(current.buy)) / 2;
                    // let orderPrice = parseFloat(current.last);
                    // 当前定价货币持有数量
                    let priceCoin = parseNumber(Balance.coins[this.coinPare.price].available);
                    // 当前币可买入的数量
                    let buyNum = parseNumber(priceCoin / parseNumber(orderPrice));
                    // 当前可卖出的数量  取三者的最小值
                    let buyAmount = numberFixed(Math.min(this.tradeNum / parseNumber(orderPrice), buyNum, parseNumber(Balance.coins[this.coinPare.main].available)), 8);

                    orderPrice = numberFixed(orderPrice, 8);

                    if (!parseFloat(buyAmount)) {
                        message.out(`🈚️ ${this.market.toLocaleUpperCase()}余额不足`);
                        this.takeBill();
                        return;
                    }

                    Promise.all([
                        this.takeSell(current, orderPrice, buyAmount),
                        this.takeBuy(current, orderPrice, buyAmount)
                    ]).then(() => {
                        this.checkStark = new Date().getTime();
                        message.out(`.`);
                        this.takeBill();
                    }).catch((e) => {
                        this.takeBill();
                    });
                }).catch((e) => {
                    message.err(`❌ ${(e||{}).message || e || "出错了，正在重试"}`);
                    this.takeBill();
                });
            }).catch(e => {
                message.err(`❌ ${(e||{}).message || e || "出错了，正在重试"}`);
                this.takeBill();
            });
        }).catch((e) => {
            message.err("❌" + ((e||{}).message || e || "出错了，正在重试"));
            this.takeBill();
        });
    }

    takeSell(current, orderPrice, amount) {
        return new Promise((resolve, reject) => {
            const params = {
                amount: amount,
                market: this.market,
                price: orderPrice
            }
            let str = `卖出: 价格 ${params.price}, 数量 ${params.amount} ${this.coinPare.main}`;
            this.makeOrder("sell", params).then(res => {
                resolve();
            }).catch((e) => {
                message.err(`❌ ${str} ${CODES_MSG[e.code] || ""}`);
                reject(e);
            });
        });
    }

    takeBuy(current, orderPrice, amount) {
        return new Promise((resolve, reject) => {
            const params = {
                amount: amount,
                market: this.market,
                price: orderPrice
            };
            let str = `买入: 价格 ${params.price}, 数量 ${params.amount} ${this.coinPare.main}`;
            this.makeOrder("buy", params).then(res => {
                resolve();
            }).catch((e) => {
                message.err(`❌ ${str} ${CODES_MSG[e.code] || ""}`);
                reject(e);
            });
        });
    }

    //下单
    makeOrder(method, params) {
        return Order[method](params, false).then(mres => {
            message.out(`✅ ${params.market.toLocaleUpperCase()} ${method}: 价格 ${params.price}, 数量 ${params.amount}${this.coinPare.main}`);

            return mres;
        })
    }

    // 检查挖矿是否正常
    checkMining() {
        if (this.checkStopApp()) {
            return;
        }
        let tonce = new Date().getTime();

        let params = {
            "access_id": getAccessId(),
            "tonce": tonce,
        };

        http.get("/v1/order/mining/difficulty", signGet(params)).then(res => {
            let difficulty = res.data;

            if (difficulty) {
                if (difficulty.difficulty !=0 && parseFloat(difficulty.difficulty) * this.safeDiffculty / 100 >= parseFloat(difficulty.prediction)) {

                    this.miningDone = false;
                    this.sendEmail = false;
                    message.out(`🌐 已挖出/挖矿难度： ${difficulty.prediction}/${difficulty.difficulty}`, true);
                    marketHelper.setDiffculty(difficulty.difficulty);
                    marketHelper.setMining(difficulty.prediction);
                    // let calC = parseFloat(Math.min(difficulty.difficulty / 500, 10));
                    // this.tradeNum = calC.toFixed(2);
                    // this.tradeNum = parseFloat(this.tradeNum) * this.minMoney;
                    // this.sellCETNum = parseFloat(parseFloat(calC * this.minMoney / 2.5).toFixed(2));
                } else {
                    this.miningDone = true;

                    if (!this.sendEmail) {
                        this.sendEmail = true;
                        marketHelper.setDiffculty(difficulty.difficulty);
                        marketHelper.setMining(difficulty.prediction);
                        message.out(`✅ 挖矿完成！本小时收益：${difficulty.prediction} 今日每小时限额：${difficulty.difficulty}`, true);
                    }
                }
            }
        }).catch(e => {
            message.err("❌ 获取挖矿难度失败", true);
        });

        setTimeout(() => {
            this.checkMining();
        }, this.checkDiffcultyInter);
    }

    //撤去所有订单
    cancelAll() {
        return new Promise((resolve, reject) => {
            this.pendingOrder().then(res => {
                if (res.data && res.data.data.length > 0) {
                    let cancelPro = [];
                    cancelPro = res.data.data.map(val => {
                        return this.cancel(val.id, true);
                    });

                    Promise.all(cancelPro).then(ca => {
                        resolve();
                    }).catch(e => {
                        reject();
                    });
                } else {
                    resolve();
                }
            }).catch(e => {
                reject();
            });
        })
    }

    pendingOrder() {
        let tonce = new Date().getTime();
        let params = {
            "access_id": getAccessId(),
            "limit": 99,
            "market": this.market, // market type
            "page": 1,
            "tonce": tonce
        };

        return http.get("/v1/order/pending", signGet(params));
    }

    makeIOCOrder(method, bill) {
        bill.type = method;
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

        return http.post("/v1/order/ioc", params, {
            headers: {
                authorization: sign(params)
            }
        }).then(res => {
            // 登记信息
            Balance.reqBalance().then(res => {
                this.refreshCoinArea();
            }).catch(e => {});
            return res;
        });
    }

    // 撤单
    cancel(id, justResolve) {
        let tonce = new Date().getTime();
        let params = {
            "access_id": getAccessId(),
            "id": id, // order count
            "market": this.market, // market type
            "tonce": tonce,
        };

        const cancelPromise = new Promise((resolve, reject) => {
            http.delete("/v1/order/pending", signGet(params)).then(res => {
                if (justResolve) {
                    resolve();
                    return;
                }

                if (!res.code || res.code === Config.ErrorCode.OrderNotFound) {
                    resolve();
                } else {
                    reject();
                }
            }).catch(e => {
                if (justResolve) {
                    resolve();
                    return;
                }

                if (e && e.code === Config.ErrorCode.OrderNotFound) {
                    resolve();
                } else {
                    reject();
                }
            });
        })

        if (justResolve) {
            return cancelPromise;
        }

        return definite(cancelPromise);
    }
}

const mining_yld_samyoc = new PriceTradeOne();
window.mining_yld_samyoc = mining_yld_samyoc;


export default mining_yld_samyoc;