# CoinEx Mining APP

一款用于CoinEx交易挖矿的APP，一键挖矿，可视化挖矿，无需托管服务，只需一个浏览器，便可轻松运行...
An Web APP for CoinEx mining. Beaty UI, easy to operate. What you need is only a browser...

##使用说明
- **本APP是WebAPP，直接点开文件，便可在浏览器中运行，但是浏览器需要跨域，推荐使用Chrome浏览器[浏览器跨域指导](https://www.samyoc.com/single/86)**
- **请填写交易对，交易额度，风险控制栏目，再开始**
- **找到config文件，填写的API秘钥的access_id和secret_key**
- **APP供爱好CoinEx者交流使用**
- **建议在不清楚的情况下关闭API提现，用的放心**

## 交易对

 - 买卖货币：交易的货币比如买卖CET等等（填大写）
 - 定价货币：比如USDT， BTC市场中则是BTC（填大写）

## 交易额度
- 每笔交易额：APP实现挖矿的原理即是同时下买单和卖单完成一次挖矿，每笔交易额便是设置每笔单的金额，比如我选择了BTC/USDT交易对，设置了每笔交易额是50USDT，那每次的下的买单和买单的金额将等值于50USDT。

- 最小交易额度：当买卖的货币或者定价的货币的的金额不足最小额度时，APP将以市价买入或卖出对应的货币，以达到买卖货币和定价货币等值，保证资金利用率。比如设置最小交易额度为5，在某一次交易中BTC价值不足5USDT时，这是后便会花一半的USDT市价买入BTC。 

## 风险控制
- 挖矿设置：建议设置为80%。当挖矿挖出的数量达到80%时比较适合停止。

- 设置了每秒卖出多少个CET后，程序会自动帮你在每隔多少秒之后**市价**卖出CET，如果不想程序自动卖，你设置为0就可以了。

## 程序预览
![第一步：输入Secret Key](https://www.samyoc.com/uploads/users/98/images/1531896520142.png)

![第二步：挖矿配置](https://www.samyoc.com/uploads/users/98/images/1531896541980.png)

![第三步：点击开始，查看运行情况](https://www.samyoc.com/uploads/users/98/images/1531896558197.png)

## 免责声明
本程序供CoinEx爱好者学习交流使用，由本程序带来的收益和亏损与作者没有关系。

### 打赏
如果你觉得用的很舒服或者对你有帮助的话，可以请我喝杯咖啡噢~

方式     | 地址
--- | -----
CoinEx站内转账 | admin@samyoc.com
BTC    | 17LB9ZCzvbGDZzYoUV2RPTX3E88y7pxthi
BCH     | 17LB9ZCzvbGDZzYoUV2RPTX3E88y7pxthi
CET     | 0xb3fd1d1eb70586eac7612bf74c2d267034570fac

### 更多信息
[详细使用说明和交流区：https://www.samyoc.com/single/89](https://www.samyoc.com/single/89)
[作者开发无需编译，直接下载，请点击或访问：https://www.samyoc.com/single/85](https://www.samyoc.com/single/85)
[作者运营主站：https://www.samyoc.com](https://www.samyoc.com)
[浏览器跨域指导：https://www.samyoc.com/single/86](https://www.samyoc.com/single/86)