---
title: "JOYINGのAndroid中華ナビを買ったので動かしてみた"
date: 2020-09-07 05:00:00 +0900
published: true
toc: true
category: Automobile
tags: 720p car-audio 中華ナビ navigation joying android carplay review
image:
  path: /assets/images/2020/09/07/home-screen.jpg
  thumbnail: /assets/images/2020/09/07/home-screen.jpg
---

色々と[探し回って見つけた](../2020/2020-09-03-high-res-720p-car-navigation.md)JOYINGの720pの9インチカーナビ。
プリウスに取り付ける前に、家で動作確認をする準備ができたので、開封して起動してみた。
使いこなすまではいかない程度の軽めのレビューです。


<!-- more -->
{% include toc %}

## JOYING プリウス用9インチナビ

買ったのはプリウス30型右ハンドル用のこちら。プリウス30型はカーナビ付近が左右非対称デザインのため、右ハンドル用を選択する必要がある。
後述するが、これは全車種対応のUniversal版のものに、プリウス用のパーツをセットにしただけのものだった。
なのでプリウス以外の車種に取り付けることを検討している方にも、参考になるかと思う。

<a href="https://s.click.aliexpress.com/e/_dX4sD3K" target="_blank"><img src="https://ae01.alicdn.com/kf/Hb41fd11aeba6428fb6de31e939f795a3M.jpg_350x350.jpg" /></a>

[9"2 Din Radio Autoradio Android Car Head Unit GPS Stereo For Toyota Prius 2009 2013 Multimedia DVD Player Silver Right Drive\|Car Multimedia Player\| - AliExpress](https://s.click.aliexpress.com/e/_dX4sD3K)

製品名がよく分からず、商品ページに書かれていた型番らしき**JY-TO195N4GSN**くらいしか名前と呼べる名前がない。
しかしこれをそのまま記事に使うとわかりづらくなるので、ここでは「JOYING プリウス用9インチナビ」と称することにする。

このJOYING プリウス用9インチナビは、以下のスペックを備えている。

- 価格 (執筆時): US $327.18
- 画面サイズ: 9インチ
- 本体サイズ: 1 Din (※商品名と齟齬あり)
- 画面解像度: 1280x720
- 画面タイプ: 埋め込み式
- SoC: Unisoc SC9853i
- RAM: 4 GB
- Flash: 64 GB
- OS: Android 8.1.0
- Apple CarPlay: ビルトイン
- マルチメディア機能: Wi-Fi/Bluetooth/USB/4G
- 対応操作方法: タッチパネル・ステアリングリモコン

中華ナビはRockchip製ARMアーキテクチャのPX6やPX5を搭載していることが多いが、これは[Spreadtrum(Unisoc)](https://en.wikipedia.org/wiki/Unisoc)製x86_64アーキテクチャの[SC9853i](http://www.unisoc.com/solution/sc9853i)を搭載している。いわゆるIntel CPU搭載Android端末だ。

商品ページには「9"2 Din」で始まる長い商品名が記載されているが、実際は1 Dinサイズだった。
Dinとは[ISO 7736](https://ja.wikipedia.org/wiki/ISO_7736)で規格化されているカーナビ本体のサイズだ。
商品写真も1 Dinだが実際に手にするまで確証がなかったため、前の記事では2 Dinの認識で内容を記述してしまっている。

## 開封と外観の確認

![JOYING Package](/assets/images/2020/09/03/joying-package.jpg)

これが到着時の段ボール箱。この中に同じサイズの紙の箱が入っていて、緩衝材に挟まれる形でナビが鎮座していた。


![contents.jpg](/assets/images/2020/09/07/contents.jpg)

中身はこのようになっていて、写っているのがナビの標準セット。これにバックモニターのリアカメラなども追加で買ったので、他にも色々入っていた。

![cables.jpg](/assets/images/2020/09/07/cables.jpg)

本体の他にセットとなっているケーブル類がこちら。一緒にリアカメラが写ってしまっているが、JOYING プリウス用9インチナビの付属品は下記の通りである。

- GPSアンテナ
- 4Gアンテナ x2
- ラジオアンテナ
- JOYINGトヨタ車ケーブル（詳細は後述）
- マイク
- USB延長ケーブル x2
- 操作マニュアル（英語）
- 配線説明用紙

### ディスプレイ周り

![display.jpg](/assets/images/2020/09/07/display.jpg)

光沢の強いグレアパネルのディスプレイ。タッチ操作を続けると、画面が指紋まみれになってしまった。
プリウス30型右ハンドル車に合わせたフレームがついているが、フレームにディスプレイはフィットしていない感じがある。
下部にJOYINGのロゴが**上部だけ**わずかに見えていて、サイズを間違えたんじゃないかとも感じ取れるくらいだ。

![display-logo.jpg](/assets/images/2020/09/07/display-logo.jpg)

それもそのはず、汎用の9インチのディスプレイに、プリウス30型用のフレームを上から被せているだけの仕上がりになっているからだ。
写真ではわかりづらいが、フレームの下に大きな9インチのディスプレイが噛み合わせられている形になっている。

![display-cover.jpg](/assets/images/2020/09/07/display-cover.jpg)


JOYINGはいろいろな車種向けに同じ仕様のナビを展開しているが、このフレームを入れ替えるだけという単純な仕組みによって、本体の共通化を果たしているようだ。

ディスプレイはユニットとフラットケーブルで繋がれていて、組み込みの際はツメをはめ込むことで固定するようになっている。

![display-removed.jpg](/assets/images/2020/09/07/display-removed.jpg)

![display-back.jpg](/assets/images/2020/09/07/display-back.jpg)

ディスプレイの裏に隠れて、microSDカードスロットとリセットボタンがそれぞれユニットの左右にあった。

![sdcard-slot.jpg](/assets/images/2020/09/07/sdcard-slot.jpg)

![reset-button.jpg](/assets/images/2020/09/07/reset-button.jpg)

### 背面ポートとコネクタ

![port-connector.jpg](/assets/images/2020/09/07/port-connector.jpg)

ユニットの背面ポートを見てみると、色々と接続できるようにできているのがわかる。
各コネクタにどのように繋げばいいかについては、同梱されている一枚の説明用紙に記されている。

![connection-diagram.jpg](/assets/images/2020/09/07/connection-diagram.jpg)

基本的には、本体の右側にある20ピンコネクタにいろいろな機器を接続するよう説明用紙に記載がある。
今回購入したJOYING プリウス用9インチナビのセットには、この20ピンコネクタの接続をトヨタ車のコネクタに合うように形状を変換する**JOYINGトヨタ車ケーブル**が付属していた。

![toyota-connector.jpg](/assets/images/2020/09/07/toyota-connector.jpg)

まだプリウス車内のコネクタを確認していないが、このケーブルとコネクタをいくつか噛み合わせるだけで、車内のオーディオ出力やステアリングリモコンの信号線などと接続ができるらしい。

## Universalモデルとの違い

フレームのとってつけた感や、ディスプレイ下部に見えるロゴから、このJOYING プリウス用9インチナビは、以下のUniversal 1DinモデルとJOYINGトヨタ車ケーブル、そして画面のフレームをセットにしたものだと考えられる。
プリウス30型に違和感なく装着できるフレームが装着済みである上、別々に買うよりいくらか安く買えるので、お得感がある。

このような作りになっているおかげで、他の車に乗り換えた時、その車に合うJOYINGケーブルとフレームを手に入れることができれば、JOYING プリウス用9インチナビを再利用することができそうだ。


<a href="https://s.click.aliexpress.com/e/_dYUqYlb" target="_blank"><img src="https://ae01.alicdn.com/kf/Hb165f934ad464b1cb21c32c9436ca5b9U.jpg_350x350.jpg" /></a>

[9"Single Din 2.5D Curved Screen 4GB RAM Android 8.1 Car Radio Stereo Head Unit Multimedia Player Support SIM Card Zlink GPS DSP\|head unit\|double 2 dindin android - AliExpress](https://s.click.aliexpress.com/e/_dYUqYlb)

<a href="https://s.click.aliexpress.com/e/_d8X6HfL" target="_blank"><img src="https://ae01.alicdn.com/kf/H2310d9b2c7d84105a80ce7a530ec350fE.jpg_350x350.jpg" /></a>

[Special wiring harness for Toyota car radio power adaptor power cable radio plug\|Cables, Adapters & Sockets\| - AliExpress](https://s.click.aliexpress.com/e/_d8X6HfL)

## 動作確認の準備

さて、プリウスに組み込む前に家で動作確認をしてみたいが、その前に解決すべき問題がある。電源と技適の壁だ。

### 12V ACアダプタでの起動

車載用に作られているカーナビは、もちろん車の電源で動作するように作れている。乗用車の電源は12Vだ（[自動車の電源電圧 - Wikipedia](https://ja.wikipedia.org/wiki/%E8%87%AA%E5%8B%95%E8%BB%8A%E3%81%AE%E9%9B%BB%E6%BA%90%E9%9B%BB%E5%9C%A7)）。
その12Vの電源を工面する必要がある。そう、12V ACアダプタでの起動だ。

やることは簡単で、家にある適当な12VのACアダプタを探し出し、カーナビのBAT端子とACC端子、そしてGND端子に接続するだけだ。
このJOYING プリウス用9インチナビは、JOYINGケーブルを接続する20ピンコネクタにそれらの端子がある。それにACアダプタの配線を接続できるようにする。

まず、JOYINGトヨタ車ケーブルの自動車側コネクタのハウジングから、黄色のBAT端子・赤のACC端子・黒のGND端子を取り外す。
各端子の先端のタブコンタクトは平型端子のメスにちょうどハマるサイズになっていることがわかる。
以下のターミナルセットに付属する平型端子のメスを、ACアダプタの配線に付けることで、電源を着脱可能にできる。

<a href="https://www.amazon.co.jp/gp/product/B07X8DWFKZ/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=048348d25986d7e888d839e5510b73a9&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07X8DWFKZ&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B07X8DWFKZ" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon.co.jp： 【Amazon.co.jp 限定】エーモン ターミナルセット(中) 電工ペンチ付 (E2): 車＆バイク](https://www.amazon.co.jp/gp/product/B07X8DWFKZ/ref=as_li_ss_tl?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=477d637987ab77f82a6cbcded2558d89&language=ja_JP)

手持ちのACアダプタはどこで手に入れたのか、センタープラスの外径 5.5mm、内径 2.1mm の12V 3A出力のごく一般的な12V ACアダプタである。
何かの付属品だったっぽいことは覚えていて、ケーブルを切断することは躊躇われたため、以下の怪しいケーブルを買って平型端子のメスを圧着した。

<a href="https://www.amazon.co.jp/gp/product/B019DQ7UD6/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=e5bb0f54f6fd1268379cf6c505310d54&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B019DQ7UD6&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B019DQ7UD6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon.co.jp： 【ノーブランド品】CCTV　セキュリティ用　12V　DC電源　ピグテール　メス　5.5x2.1mm　ケーブル　プラグ　ワイヤー　10個: ホーム＆キッチン](https://www.amazon.co.jp/gp/product/B019DQ7UD6/ref=as_li_ss_tl?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=9e8709c130337dfb21ddf481fe03ea17&language=ja_JP)


プラス側にBATとACCを、マイナス側にGNDを繋げて完成。

![ac-power-adaptor.jpg](/assets/images/2020/09/07/ac-power-adaptor.jpg)


### 技適の壁

言わずもがな、JOYING プリウス用9インチナビには技適マークがない。国内でこの機器を電波が出力できる状態で利用することは、違法である。
なので総務省の総合通信相談所で確認の上、ダミーロードで出力を抑え込んで利用する。

[□技適マークのないマイコンボードを国内で使うには？ – Linux Install Memo](https://linux.yebisu.jp/memo/1133)

ダミーロードは手持ちになかったので、以下のダミーロードを購入した。

<a href="https://www.amazon.co.jp/gp/product/B07DSCD6YF/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=beaf76275372c3fed54865520db7d242&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07DSCD6YF&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B07DSCD6YF" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon.co.jp： ランフィー 5 PCS SMA オス RF 同軸終端一致ダミー負荷50オームコネクタ RC ドローン: DIY・工具・ガーデン](https://www.amazon.co.jp/gp/product/B07DSCD6YF/ref=as_li_ss_tl?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=13756fe72a06076746935e0fcbcbb08e&language=ja_JP)


GPSは受信専用なので問題ないとして、他の無線アンテナ部分にダミーロードを取り付け、無線を出力しない状態にし、USB接続のイーサネットアダプタをUSBポートに接続して電源を入れる。

![dummy-load.jpg](/assets/images/2020/09/07/dummy-load.jpg)

![ethernet-connection.jpg](/assets/images/2020/09/07/ethernet-connection.jpg)

どのみちUSB接続のApple CarPlayしか利用しない予定なので、無線通信は不要なのである。

## 動作の確認

ACアダプタをコンセントに差し込むと、JOYINGのロゴ・Androidのロゴ・Googleのロゴが現れ、10秒ほどで操作可能になった。
USBイーサネットアダプタを認識するまで、そこから1分ほどかかった。
写真では時刻が狂っているが、ネットワーク接続が確立されれば現在時刻にすぐに切り替わった。

![home-screen.jpg](/assets/images/2020/09/07/home-screen.jpg)

輝度はとても高く、設定で一番低くしても十分に明るい。白昼でもしっかり視認できそうだ。
輝度ムラがある点が少し気になったが、カーナビに完璧な画質を求める方が愚昧である。

### ホーム画面

起動時や仮想ホームボタンを押すと、デフォルトではこのホーム画面が現れる。
日本向けの出荷だからだろうか、初めから日本語になっていた。
フォントも中華フォントではなく、ちゃんとした「漢字」が表示されていて見栄えが良い。

![homescreen.png](/assets/images/2020/09/07/homescreen.png)

真ん中の"サイコロの６みたいなアイコン"を選択すると、アプリ一覧に移動する。
Google Chromeなど、使えそうなアプリが標準でいくつか入っていた。

![app-list.png](/assets/images/2020/09/07/app-list.png)

![app-list2.png](/assets/images/2020/09/07/app-list2.png)

### 設定画面

ホーム画面の「車の設定」を選択すると、設定画面が開く。
ちょっと日本語訳が怪しいところがあるが、これもまた風情があって良い。

![settings.png](/assets/images/2020/09/07/settings.png)

#### デバイス情報

デバイス情報にも現れている通り、ちゃんと1280x720の表示となっている（スクリーンショットのサイズでもわかる）。

![device-info.png](/assets/images/2020/09/07/device-info.png)

#### 工場設定

メニューにある工場設定にはプロテクトがかかっている。

![factory-setting.png](/assets/images/2020/09/07/factory-setting.png)

「Joying Password」でググるとすぐ見つかるが、[JOYING公式Facebookアカウントがパスワードを公開](https://www.facebook.com/notes/joying/all-of-the-passwords-on-joying-head-units/177036389663825/)しているので、それを入力すると工場設定のプロテクトが解除され、色々変更できるようになる。

![factory-setting2.png](/assets/images/2020/09/07/factory-setting2.png)

#### 起動ロゴの変更

工場設定の中にある「ロゴ設定」に進むと、何やらみたことのあるロゴがたくさん表示される。

![boot-logo.png](/assets/images/2020/09/07/boot-logo.png)

この中から好きなロゴを選ぶと、起動時に表示されていたJOYINGのロゴが選択したロゴに変化する。

![toyota-logo.jpg](/assets/images/2020/09/07/toyota-logo.jpg)

#### 開発者向けオプション

「いパン設定」の中に、開発者向けオプションがデフォルトで存在する。ここにもプロテクトがかかっているが、先ほどと同じパスワードだった。
このオプションに存在する項目は、Android 8.1搭載スマホと同じような内容である。

![developer-mode.png](/assets/images/2020/09/07/developer-mode.png)


### Apple CarPlay

いよいよ本命のApple CarPlayを使ってみる。
使い方は説明書に記されていなかったが、USB - LightningケーブルでiPhone 11 Proを接続したところ、ZLINKなるアプリが立ち上がり、iPhoneに接続の確認画面が出た。

![zlink-connection.png](/assets/images/2020/09/07/zlink-connection.png)

接続を許可すると、JOYING プリウス用9インチナビの画面はCarPlayの表示に切り替わった。

![carplay.png](/assets/images/2020/09/07/carplay.png)

あっけなく使えてしまった。もっと手こずると思っていただけに、拍子抜けしてしまった。

#### CarPlayでナビゲーション

iOSのYahoo!カーナビもGoogleマップも問題なく使えた。
しかも9インチの画面に1280x720で表示できているので、とても視認性がよろしい。

![carplay-yahoo-carnavi.png](/assets/images/2020/09/07/carplay-yahoo-carnavi.png)

![carplay-google-map.png](/assets/images/2020/09/07/carplay-google-map.png)

まだ実際に走行していないのでわかりかねるが、CarPlayはカーナビのGPS信号を利用するといった噂を耳にした。
このZLINKを介したCarPlayでも同じように動けば、これまでiPhoneで利用していた時よりもより精度の高いナビゲーションが期待できる。

#### 画面分割

Android 7.0以上に搭載されているマルチウィンドウ機能は、このJOYING プリウス用9インチナビに搭載のAndroidでも利用できた。
CarPlayの画面を分割してみたところ、YouTubeアプリとCarPlayを同時に表示することができた。

![split-screen.png](/assets/images/2020/09/07/split-screen.png)

この時、CarPlayの画面は**800x831という変則的な解像度**で描画され、ステータスバーと中心の余白が表示される関係で、**635x600に縮小されて表示**されていた。

![carplay-splitscreen.png](/assets/images/2020/09/07/carplay-splitscreen.png)

少し表示が濁るが、これはこれで使えそうな機能だ。

### Google Playストア

アプリ一覧にPlayストアがあったので起動してみたところ、普通に使えた。

![google-play.png](/assets/images/2020/09/07/google-play.png)

せっかくなので色々ダウンロードして動かしてみた。

#### ABEMA

[ABEMA(アベマ) ドラマ・映画・オリジナルのテレビ番組が視聴できるアプリ - Google Play のアプリ](https://play.google.com/store/apps/details?id=tv.abema&hl=ja)

普通に見れた。USBポートからテザリングするなりでネットワーク通信を確保できれば、車内で地デジの代替にできそう。

![abema.png](/assets/images/2020/09/07/abema.png)

#### Yahoo!カーナビ

[Yahoo!カーナビ -【無料ナビ】渋滞情報も地図も自動更新 - Google Play のアプリ](https://play.google.com/store/apps/details?id=jp.co.yahoo.android.apps.navi&hl=ja)

非対応だった。Intel CPUには対応していないのかな。

![yahoo-carnavi.png](/assets/images/2020/09/07/yahoo-carnavi.png)

#### AGAMA Car Launcher

[AGAMA Car Launcher - Google Play のアプリ](https://play.google.com/store/apps/details?id=altergames.carlauncher&hl=ja)

ホーム画面をカーナビっぽくするアプリ。そこそこ人気があるらしいが、CarPlayメインの利用においては使うことなさそう。試用だけでおしまいの予定。

![car-launcher.png](/assets/images/2020/09/07/car-launcher.png)

### マルチタッチのテスト

[MultiTouch Tester - Google Play のアプリ](https://play.google.com/store/apps/details?id=com.the511plus.MultiTouchTester&hl=ja)

カーナビは基本的に人差し指だけで操作するのでマルチタッチの本数はあまり重要ではないが、確認しておいた。

![multitouch-tester.png](/assets/images/2020/09/07/multitouch-tester.png)

結果、5本マルチタッチであると分かった。

### ベンチマーク

[Geekbench 5 - Google Play のアプリ](https://play.google.com/store/apps/details?id=com.primatelabs.geekbench5&hl=ja)

みんな大好きベンチマーク。Geekbench 5でベンチマークを取ってみた。

![geekbench.png](/assets/images/2020/09/07/geekbench.png)

結果からわかるように、SC9853iはそこまで高性能なCPUではない。
ただ、カーナビとしてはレスポンスも悪くなく、この性能でも十分である。
ベンチマークを動かした直後は本体が熱を持っていたが、触れないほどではなかった。

AnTuTu Benchmarkも試してみようと思ったが、3Dテストの途中で止まってしまって計測できなかった。

## まとめ

これが3万円ちょっとで買えるのなら十分にいい買い物だったと感じる。
もうちょっといじりがいのありそうな感じがするので、車載する前に遊び倒しておこうと思う。