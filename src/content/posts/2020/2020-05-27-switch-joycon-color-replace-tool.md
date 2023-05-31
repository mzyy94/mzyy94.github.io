---
title: "ブラウザでNintendo SwitchのJoy-Conの色を変える"
date: 2020-05-27T01:30:00+09:00
published: true
toc: true
categories: ["Game"]
tags: ["nintendo", "switch", "hid", "webhid", "oss"]
image: "/assets/images/2020/05/27/joycon-purple.png"
---

昨今、入手困難となっているNintendo Switchは、3年前のスプラトゥーン2セットモデルが発売された時も激戦でした。
各種通販サイトを廻り、運良く発売日に手に入れられた喜びは今でも鮮明に覚えています。

[スプラトゥーン2：商品情報 \| Nintendo Switch \| 任天堂](https://www.nintendo.co.jp/switch/aab6a/products/index.html)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ｽﾌﾟﾗﾄｩｰﾝ2!!! <a href="https://t.co/nnu4HztBQr">pic.twitter.com/nnu4HztBQr</a></p>&mdash; ミ゛ (@mzyy94) <a href="https://twitter.com/mzyy94/status/888340517087346689?ref_src=twsrc%5Etfw">July 21, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

当時のSplatoon人気から、多くの人がスプラトゥーン2セットモデルを買い、遊ぶ人遊ぶ人全員が同じカラーのNintendo Switchを持っているなんてこともありました。本体から外してしまったら、もうどれが誰のJoy-Conだったかわからなくなります。

![joycon splatoon color](/assets/images/2020/05/27/joycon-splatoon-color.jpg)

そんなSplatoon 2も発売から2年を迎えるタイミングで[ファイナルフェス](https://twitter.com/SplatoonJP/status/1153138774395609089)が開催され、先週末に開催された本当に最後（？）の[おかわりフェス](https://twitter.com/SplatoonJP/status/1252767629124632577)も終わったことで、一旦節目を迎えました。

頑張って手に入れたSplatoon 2カラーを持つことの満足感も捨てがたいですが、Joy-Conに個性を持たせたい気持ちが高まってきたので、この節目をもってSplatoon 2カラーを卒業することにしました。

<!-- more -->
{% include toc %}


## Joy-Conカラーバリエーション

Joy-Conは外装シェルと呼ばれるプラスチックの「ガワ」に色がついており、その色の違いで多くのバリエーションが展開されています。Splatoon 2カラーもこれらの組み合わせの一つです。

![joycon list](/assets/images/2020/05/27/joycon-list.png)

出典: [周辺機器 \| Nintendo Switch｜任天堂](https://www.nintendo.co.jp/hardware/switch/accessories/index.html)

新たな色の組み合わせを買うことで、自分の個性を出していくことができますが、1組8,000円強する上に、Joy-Conを買い足す必要も今はありません。
安く、好きな色の「ガワ」さえ手に入れられれば、手持ちのJoy-Conの外装交換するだけで事足ります。

## 外装シェル（ガワ）

安く交換パーツを手に入れる方法はいくつかありますが、今回もAliexpressで探索しました。
Joy-Conで失われていた十字キーを搭載するものもあり、価格も安価で1,800円程で買えるものが見つかりました。

[Myriann (D PAD バージョン) 交換ハウジングケース nintend スイッチ NS コントローラ喜び Con シェルゲームコンソールスイッチケース\|交換部品 & アクセサリー\| - AliExpress](http://s.click.aliexpress.com/e/_dZajvgP)

買いました。

![new purple shell](/assets/images/2020/05/27/new-purple-shell.jpg)

後から知ったんですが、販売元のMyriannはAmazon.co.jpでも展開してるっぽいので、数百円高くなりますがこっちの方が早く届くかもしれません。

<a href="https://www.amazon.co.jp/Myriann-Nintendo-Switch-%E3%82%AB%E3%83%A9%E3%83%BC%E7%BD%AE%E6%8F%9B%E3%82%B1%E3%83%BC%E3%82%B9-%E5%A4%96%E6%AE%BB-%E3%81%A4%E3%81%84%E3%81%AB%E7%99%BB%E5%A0%B4%EF%BC%81/dp/B076V7RGXW/ref=as_li_ss_il?ref_=nav_custrec_signin&&linkCode=li3&tag=mzyy-22&linkId=64805038abb8450e9bdbd994a45dd491&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B076V7RGXW&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon \| Myriann 任天堂 Nintendo Switch ニンテンドー カラー置換ケース 代わりケース 外殻　ついに登場！ (透明+) \| 周辺機器・アクセサリ](https://www.amazon.co.jp/Myriann-Nintendo-Switch-%E3%82%AB%E3%83%A9%E3%83%BC%E7%BD%AE%E6%8F%9B%E3%82%B1%E3%83%BC%E3%82%B9-%E5%A4%96%E6%AE%BB-%E3%81%A4%E3%81%84%E3%81%AB%E7%99%BB%E5%A0%B4%EF%BC%81/dp/B076V7RGXW/ref=as_li_ss_tl?ref_=nav_custrec_signin&&linkCode=ll1&tag=mzyy-22&linkId=c61f3e83a189b87d26b749735c2f2366&language=ja_JP)


### 組み替え

Nintendoのハーウェアは簡単に開けられないよう、昔から特殊ネジが使われています。
ゲームキューブの分解ではLHドライバーが必要になり、わざわざそのためだけに2,000円近くするドライバーを買った覚えがあります。
Nintendo SwitchのJoy-Conはその点では難易度が下がり、精密ドライバーセットに含まれるY型2mmビットがあれば開けられました。

![reassemble](/assets/images/2020/05/27/reassemble.jpg)

両面テープでの貼り付けがなかなか剥がれなかったりと躓くところはあれど、順にネジを外し逆の要領で組み上げるだけで容易に交換できました。

## 表示色との食い違い

[ゲームボーイカラーのクリアパープル](https://upload.wikimedia.org/wikipedia/commons/7/76/Nintendo-Game-Boy-Color-FL.jpg)を思い出させる見た目に仕上がりました。

![my new gear](/assets/images/2020/05/27/my-new-gear.jpg)

外観はとても満足いく形になったものの、一つ問題が残ります。
それはNintendo Switchのゲーム画面上での表示色との食い違いです。
画面上ではSplatoonカラーのままです。ぴえん。

### Joy-Conの色情報

[Pro ControllerのUSB Gadgetシミュレーション](../2020/2020-03-20-nintendo-switch-pro-controller-usb-gadget.md)を行った際、コントローラーの色情報がPro Controller内部のSPIフラッシュメモリーに書き込まれており、その情報を参照して画面上に色が表示されていることを知りました。
Joy-ConのSPIフラッシュメモリーの同じ領域をみてみると、確かに色情報が格納されていることがわかったので、これを紫に書き換えてあげれば完璧に満足できる形になります。

### WebHID API

Joy-ConのSPIフラッシュメモリーにアクセスするには、HIDプロトコルの通信を行う必要があります。
ハードウェアとのやり取りを担う比較的低いレイヤーを扱うため、OS依存度が高いプログラムができてしまいがちです。

色という視覚的情報を扱うため、GUIを使って調整をしたいものです。ただ、そのためにGUI環境を組み立てるのがだるい。
非同期に数十バイトのデータをやり取りするだけのプログラムに、色々とライブラリを揃えたりマルチプラットフォームに向けた対応をしたりするのも、とてもめんどくさいです。

だるくてめんどくさいので、ハードウェア関連APIをモリモリ実装しているガラパゴスブラウザこと、Google Chrome(Blink)に搭載の[WebHID API](https://wicg.github.io/webhid/index.html)を使ったWebアプリとして仕上げることにしました。

## Joy-Con ToolWeb

APIは仕様と[Example](https://github.com/WICG/webhid/blob/8d80264b37124ca532b1388bcea29afbbc198ad4/EXPLAINER.md#example)を読んで完全に理解したので、あとはちゃっちゃと書くだけです。

書きました。Joy-Con Tool(Web)です。

[https://mzyy94.com/joycon-toolweb/](https://www.mzyy94.com/joycon-toolweb/)

![joycon-toolweb](/assets/images/2020/05/27/joycon-toolweb.png)

[mzyy94/joycon-toolweb: Joy-Con and Pro Controller color modification tool](https://github.com/mzyy94/joycon-toolweb)

WebHIDでJoy-ConのSPIフラッシュメモリーの値をちょこっと変えるだけのものです。
体裁は[Alpine.js](https://github.com/alpinejs/alpine)と[tailwindcss](https://github.com/tailwindcss/tailwindcss)で整えました。
Joy-Conと名前にありますが、どうせならと奮起してベクターイラストを書いて、Pro Controllerにも対応しました。

**執筆時点では、WebHID APIの実装があるGoogle Chromeでしか動きません。**

### PCとのペアリング

Joy-Con Tool(Web)で色を変えるには、予めmacOSやWindowsにJoy-ConをBluetoothで繋げておく必要があります。
繋げ方はmacOSならシステム環境設定→Bluetoothを開いている状態で、Joy-Conのシンクロボタンを押せば繋げられるようになります。
シンクロボタンの位置はサポートページに書いてあります。

[【Switch】はじめて使用するコントローラーを、無線でSwitch本体に登録したい。](https://support.nintendo.co.jp/app/answers/detail/a_id/36558/)

![bluetooth connect](/assets/images/2020/05/27/bluetooth-connect.png)

### コントローラーの接続

[Joy-Con Tool(Web)](https://www.mzyy94.com/joycon-toolweb/)をGoogle Chromeで開いて、"+ Add"を押すと、コントローラーの接続メニューが出てきます。

![connect controller](/assets/images/2020/05/27/connect-controller.png)

色を変えたいJoy-Conを選ぶとChromeに接続され、コントローラー一覧に表示されます。

![connected](/assets/images/2020/05/27/connected.png)

### 色の変更

右側のSelect ~~のボタン（&lt;button&gt;ではない）を押すとカラーピッカーが出てくるので、好きな色を選ぶだけです。

![select color](/assets/images/2020/05/27/select-color.png)

余談ですが、先日配信されたChrome 83から独自のカラーピッカーが実装されるようになり、システムのカラーピッカーで使えていたパレットへの色の保存や、色の抽出ができなくなったのがちょっと残念です。

[Google Developers Japan: Chrome のフォーム コントロールとフォーカスのアップデート](https://developers-jp.googleblog.com/2020/04/chrome_7.html)

好きな色を選んだら、Applyで書き込んでおしまいです。
書き込むと出荷時の状態には戻せなくなるので、自己責任のもと行ってください。

![apply color](/assets/images/2020/05/27/apply-color.png)

ブラウザを閉じて、Joy-ConをNintendo Switch本体に取り付ければ、選んだ色が反映されて最高の気分になれます。

![my new gear2](/assets/images/2020/05/27/my-new-gear2.jpg)

![screenshot](/assets/images/2020/05/27/screenshot.jpg)


## まとめ

食い違いもなくなり、モヤモヤも晴れて最高になりました。

ああ、どうぶつの森カラーのPro Controller発売されないかなぁ。

![acnh-procon](/assets/images/2020/05/27/acnh-procon.png)
