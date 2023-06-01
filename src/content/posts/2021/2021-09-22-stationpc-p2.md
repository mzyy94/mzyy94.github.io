---
title: "Firefly Station P2を買ったのでとりあえず動かした"
date: 2021-09-22T11:00:00+09:00
published: true
categories: ["Gadget"]
tags: ["station-pc", "sbc", "rk3568", "rockchip"]
image: "/assets/images/2021/09/22/IMG_2555.jpg"
---

『半導体不足で欲しいものが欲しい時に手に入らなくなるかもしれない。』
そんな危機感を覚えたので、今すぐ必要ではないが後で欲しくなった時に買えないと悔しい思いをするのを避けるようになった。
気になったものは悩まず買うという意志を強く持ち、結果として積みSBCや積み開発ボードなどが増えていってしまった。
このままでは未開封新品の品々が増えていくばかりなので、隙間時間を見つけて遊ぶことにした。

今回は[Firefly](https://en.t-firefly.com/)のStationPCシリーズの最新作、[Station P2](https://www.stationpc.com/product/stationp2)を軽く動かしてみた記録を書き殴った。

<!-- more -->
## 目次

## FireflyのStationPC

どちらも聞きなれない名称だと思うので軽くご紹介。

### Firefly

[**Firefly \| Make technology more simple , Make life more intellingent.**](https://en.t-firefly.com/)

あまりメジャーな存在ではないが、シングルボードコンピューター（SBC）をメインに展開する中国の企業。[Rockchip社](https://www.rock-chips.com/a/en/index.html)製のSoCを搭載した製品を多く取り扱っている。



### StationPC

![stationpc p2](/assets/images/2021/09/22/IMG_2547.jpg)

[**StationPC - More entertainment, more free creation**](https://www.stationpc.com/)

そのFireflyが作るSBCをアルミニウム削り出しのケースとセットにして販売しているのがStationPCシリーズ。
パフォーマンス志向なStation Pシリーズと、ミニサイズのMシリーズがあり、それぞれ第一世代と第二世代でP1、M1、P2、M2の4製品がラインナップされている。

## Station P2

[**Station P2 - Powerful Open-Source Geek Computer \| Indiegogo**](https://www.indiegogo.com/projects/station-p2-powerful-open-source-geek-computer#/)

StationPCのPシリーズで最近リリースされたのがStation P2。
かつてはIndiegogoでクラウドファンディングを行なっていたが、未達に終わっている。
資金調達は叶わなかったものの、製造は順調に進んでいたようで、その後普通にFireflyのショップで発売されていた。

[Station P2_Station_ALL_Firefly Store](https://www.firefly.store/goods.php?id=147)

要するに注目を集めるためだけのクラウドファンディングだったわけだが、確かにSBCの中では注目に値するスペックを誇っていた。


### ROC-RK3568-PC

[**ROC-RK3568-PC_Mainboard_ALL_Firefly Store**](https://www.firefly.store/goods.php?id=145)

スペックシート: [ROC-RK3568-PC Specification.pdf](https://download.t-firefly.com/%E4%BA%A7%E5%93%81%E8%A7%84%E6%A0%BC%E6%96%87%E6%A1%A3/%E5%BC%80%E6%BA%90%E4%B8%BB%E6%9D%BF/ROC-RK3568-PC%20Specification.pdf)

Station P2に搭載のSBCメインボードはROC-RK3568-PCとして単品で販売されているものである。
このボードには豊富なインターフェースがある。

- Gigabit Ethernet ×2
- WiFi 6 and Bluetooth 5.0
- HDMI 2.0
- M.2 PCIe3.0 (Expand with NVMe SSD)
- SATA 3.0 (Expand with 2.5” SATA SSD/HDD)
- USB3.0
- USB 2.0 ×2
- Type-C OTG
- RS485×1/RS232×2
- TF Card
- Phone Jack

あまりにもインターフェースが多いので、Station P2としてケースに組み込まれた時に容易にアクセスできるものだけに絞ったが、それでもリッチな構成であることは一目瞭然だ。
デュアルギガビットイーサネットを搭載し、NVMe SSDと2.5インチHDDが搭載できるとあって、NASやルーターなど活用の夢を広げさせてくれる。


### Rockchip RK3568

[**RK35_Series RK3568 - Rockchip-瑞芯微电子股份有限公司**](https://www.rock-chips.com/a/en/products/RK35_Series/2021/0113/1276.html)

データシート: [Rockchip RK3568 Datasheet V1.2-20210601.pdf](http://download.t-firefly.com/product/Board/RK356X/Document/Datasheet/RK3568/Rockchip%20RK3568%20Datasheet%20V1.2-20210601.pdf)

ROC-RK3568-PCに搭載のSoCはRockchip社の最新シリーズであるRK3568が搭載されている。
22nmプロセスルールで製造された4コアのARM Cortex-A55が搭載され、最大2.0GHzで動作する。

Component | Spec
-----|-----
CPU | Quad-core ARM Cortex-A55, Neon and FPU
GPU | Mali-G52 2EE
NPU | RK NN, 0.8Tops
DDR | 32-bit DDR4/DDR3L/LP4/LP4x, ECC
Storage | Nor SFC, SPI Nand, eMMC 5.1
Video Decoder | 4KP60 H.264/H.265/VP9
Video Encoder | 1080P60 H.264/H.265
MIPI_CSI | MIPI-CSI2, 1×4-lane/2×2-lane@2.5Gbps/lane


[Introduce Rockchip RK3568](https://www.96rocks.com/blog/2020/11/28/introduce-rockchip-rk3568/)

上記のサイトで軽く説明があるが、このSoCは豊富な機能を取り揃えている。中でも注目する部分は**1080P60 H.265 Encoder**で、HEVCハードウェアエンコーダーをマルチメディアプロセッサを介することで利用できるとある。
安価なSBCで手軽にH.265をハードウェアエンコードする体験をしてみたい欲が生まれてしまったので、特に今必要ではないが、購入した形となる。


## Station P2の組み立て

スペックやデータシートからの紹介はほどほどにして、積まれていたStation P2を開けていく。

### パッケージ内容

箱に入っているのは本体と薄い説明書とアンテナ他周辺パーツ。

![stationpc p2](/assets/images/2021/09/22/IMG_2548.jpg)
![stationpc p2](/assets/images/2021/09/22/IMG_2550.jpg)

### 外観
![stationpc p2](/assets/images/2021/09/22/IMG_2551.jpg)

長方形の本体の寸法はStation P2のサイトに記載がある通り、幅142mm高さ31.5mm奥行き89mmである。
長辺がiPhone 12 Proの高さと同じくらい。短辺はクレジットカードの長辺と同じくらい。

インターフェースも先に紹介した通り、とても豊富だ。

![stationpc p2](/assets/images/2021/09/22/IMG_2554.jpg)
![stationpc p2](/assets/images/2021/09/22/IMG_2555.jpg)

### 内装

いろんなネジがあるので全て外していく。
裏蓋を外すとHDD/SSDトレイがお目見えする。ここは裏蓋を外さなくても取り付けられるようになっている。
トレイを外すとROC-RK3568-PCのメインボードが現れる。これを固定しているネジを外し、天板に力強く張り付いている熱伝導シートを本体ごと温めてあげるとメインボードが取り外せた。

![stationpc p2](/assets/images/2021/09/22/IMG_2556.jpg)
![stationpc p2](/assets/images/2021/09/22/IMG_2557.jpg)
![stationpc p2](/assets/images/2021/09/22/IMG_2560.jpg)

### NVMeとHDDの組み付け

NVMeスロットがあるので取り付けていく。Station P2なので[Crucial P2](https://www.amazon.co.jp/Crucial-P2%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-NVMe%E6%8E%A5%E7%B6%9A-%E6%AD%A3%E8%A6%8F%E4%BB%A3%E7%90%86%E5%BA%97%E4%BF%9D%E8%A8%BC%E5%93%81-CT500P2SSD8JP/dp/B086TDBW8J?&linkCode=sl1&tag=mzyy-22&linkId=a592773eb34670d00db6d5d07b580c2b&language=ja_JP&ref_=as_li_ss_tl)を取り付けることにする。
メインボードには2280と2242のネジ穴が空いているが、取り付け用のネジがついていない。
[取り付け用のネジセット](https://www.amazon.co.jp/gp/product/B099WNM519?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=0ee3725df49fe191da1bc04098f560c5&language=ja_JP&ref_=as_li_ss_tl)をAmazonで探して買った。ネジ受けがある前提のネジセットなので、代わりに裏から固定するためのM2のナットを追加で調達して留めることでしっかりと固定できた。

HDDはSeagateの[ST2000LX001](https://www.amazon.co.jp/Seagate-ST2000LX001-2-5%E3%82%A4%E3%83%B3%E3%83%81%E5%86%85%E8%94%B5SSHD-FireCuda%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-SATA%E6%8E%A5%E7%B6%9A/dp/B01M1UQQT5?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&qid=1632234427&s=computers&sr=1-2&linkCode=sl1&tag=mzyy-22&linkId=a3d37b851b90ce780b16c11c96dd3ef6&language=ja_JP&ref_=as_li_ss_tl)を取り付ける。
作業はとても簡単で、HDD/SSDトレイを付属の取り付けパーツを使って引き出し、2箇所ネジ止めして戻すだけで済む。NVMeを取り付けずHDDだけならば裏蓋のネジを外したりする必要もない。

![stationpc p2](/assets/images/2021/09/22/IMG_2580.jpg)
![stationpc p2](/assets/images/2021/09/22/IMG_2585.jpg)

<a href="https://www.amazon.co.jp/gp/product/B099WNM519?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=8be54a34fd3acf59be16ae36ad53c582&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B099WNM519&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon.co.jp: QTEATAK PCIe NVMe M.2 2280SSDヒートシンククーラーおよび取り付けネジドライバーキット : パソコン・周辺機器](https://www.amazon.co.jp/gp/product/B099WNM519?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=0ee3725df49fe191da1bc04098f560c5&language=ja_JP&ref_=as_li_ss_tl)

<a href="https://www.amazon.co.jp/Crucial-P2%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-NVMe%E6%8E%A5%E7%B6%9A-%E6%AD%A3%E8%A6%8F%E4%BB%A3%E7%90%86%E5%BA%97%E4%BF%9D%E8%A8%BC%E5%93%81-CT500P2SSD8JP/dp/B086TDBW8J?&linkCode=li3&tag=mzyy-22&linkId=3c43b0d38b64d0ef40fc089d52de0382&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B086TDBW8J&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Crucial SSD P2シリーズ 500GB M.2 NVMe接続 正規代理店保証品 CT500P2SSD8JP 5年保証 - Crucial(クルーシャル)](https://www.amazon.co.jp/Crucial-P2%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-NVMe%E6%8E%A5%E7%B6%9A-%E6%AD%A3%E8%A6%8F%E4%BB%A3%E7%90%86%E5%BA%97%E4%BF%9D%E8%A8%BC%E5%93%81-CT500P2SSD8JP/dp/B086TDBW8J?&linkCode=sl1&tag=mzyy-22&linkId=a592773eb34670d00db6d5d07b580c2b&language=ja_JP&ref_=as_li_ss_tl)


<a href="https://www.amazon.co.jp/Seagate-ST2000LX001-2-5%E3%82%A4%E3%83%B3%E3%83%81%E5%86%85%E8%94%B5SSHD-FireCuda%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-SATA%E6%8E%A5%E7%B6%9A/dp/B01M1UQQT5?&linkCode=li3&tag=mzyy-22&linkId=23498950f09899a76756b8246f177451&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01M1UQQT5&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon \| Seagate ST2000LX001 [2TB/2.5インチ内蔵SSHD] [7mm厚] FireCudaシリーズ / SATA接続 / バルク品 \| SEAGATE \| 内蔵ハードディスク 通販](https://www.amazon.co.jp/Seagate-ST2000LX001-2-5%E3%82%A4%E3%83%B3%E3%83%81%E5%86%85%E8%94%B5SSHD-FireCuda%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-SATA%E6%8E%A5%E7%B6%9A/dp/B01M1UQQT5?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&qid=1632234427&s=computers&sr=1-2&linkCode=sl1&tag=mzyy-22&linkId=a3d37b851b90ce780b16c11c96dd3ef6&language=ja_JP&ref_=as_li_ss_tl)

### ダミーロードの取り付け

技適を取得していないのと、FCC IDやCEマークがないので技適の特例申請もできないので、電波出力を限りなくゼロにする必要がある。
どのみちソフトウェア側で電波出力はオフにするのだが、ハードウェアとして出力がされない状態にしなければならないとのことだったので、ダミーロードを取り付ける。
Station P2のアンテナ端子がSMAオスとなっていて、手持ちのダミーロード（SMAオス）は適合しないのでSMAメス⇄RP-SMAメスの変換アダプタを用意した。

![stationpc p2](/assets/images/2021/09/22/IMG_2587.jpg)


<a href="https://www.amazon.co.jp/%E5%A4%89%E6%8F%9B%E5%90%8D%E4%BA%BA-SMA%E3%82%A2%E3%83%B3%E3%83%86%E3%83%8A-RP-SMA-%E5%A4%89%E6%8F%9B%E3%82%A2%E3%83%80%E3%83%97%E3%82%BF-SMAJ-RPSMAP/dp/B005XXC8HW?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2UYYPU8VPVGMR&dchild=1&qid=1632194397&sprefix=RP-SMA%28%5C%29+%E2%86%92+SMA%2Ccomputers%2C241&sr=8-12&linkCode=li3&tag=mzyy-22&linkId=165598a40b9b30675b7740f0b9ed34e2&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B005XXC8HW&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[変換名人 SMAアンテナ(メス) → RP-SMA(メス)変換アダプタ SMAJ-RPSMAP - Amazon.co.jp](https://www.amazon.co.jp/%E5%A4%89%E6%8F%9B%E5%90%8D%E4%BA%BA-SMA%E3%82%A2%E3%83%B3%E3%83%86%E3%83%8A-RP-SMA-%E5%A4%89%E6%8F%9B%E3%82%A2%E3%83%80%E3%83%97%E3%82%BF-SMAJ-RPSMAP/dp/B005XXC8HW?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2UYYPU8VPVGMR&dchild=1&qid=1632194397&sprefix=RP-SMA(\)+%E2%86%92+SMA,computers,241&sr=8-12&linkCode=sl1&tag=mzyy-22&linkId=c27ea87ced2b06bc6d1ded99c7b5ec94&language=ja_JP&ref_=as_li_ss_tl)

<a href="https://www.amazon.co.jp/gp/product/B07DSCD6YF?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=a6b45884a2a8e28820e83f9c5b323979&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07DSCD6YF&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon \| ランフィー 5 PCS SMA オス RF 同軸終端一致ダミー負荷50オームコネクタ RC ドローン \| DIY・工具・ガーデン](https://www.amazon.co.jp/gp/product/B07DSCD6YF?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=34c7dc6e37964acbae6e16d5e30bbf8c&language=ja_JP&ref_=as_li_ss_tl)

## Station P2の起動

ここまでできたらACアダプタと有線LANを接続して電源を入れて起動する。

### StationOS

![stationos](/assets/images/2021/09/22/stationos-main.png)


買ってすぐの状態ではAndroidベースのStationOSがeMMCに焼き込まれているので、microSDカードが挿入されていない場合はStationOSが起動する。
使い勝手は良いとは言えず、Google Playストアも搭載されていないので使い道に困るものだ。
[ゴニョゴニョやる](https://bbs.stationpc.com/thread-195-1-1.html)ことでPlayストアが追加でき、やっと使えるかなと思えるスタート地点に立つ。

![stationos applist](/assets/images/2021/09/22/stationos-applist.png)

#### Geekbench 5

[Geekbench 5 - Google Play のアプリ](https://play.google.com/store/apps/details?id=com.primatelabs.geekbench5&hl=ja&gl=US)

![stationos geekbench score](/assets/images/2021/09/22/stationos-geekbench-score.png)

[Rockchip Station P2 - Geekbench Browser](https://browser.geekbench.com/v5/cpu/9714051)

アプリが追加できるようになったので、Geekbench 5をインストールしてRK3568のパワーを計測してみた。
スコアはシングル167 マルチ540と、[Raspberry Pi 4Bの結果](https://browser.geekbench.com/v5/cpu/9697615)と比べて7割から8割程度の実力のようだ。
計測中は本体がかなり熱を持ち、手で触れられないほどではないが長時間触れ続けるのは厳しいほどの熱さだった。

後述するUbuntu 18.04環境で計測を行ってみたところ、結果が5%ほど向上していた。

[StationPC P2 ROC-RK3568-PC - Geekbench Browser](https://browser.geekbench.com/v5/cpu/9699621)

#### DRMInfo

[DRM Info - Google Play のアプリ](https://play.google.com/store/apps/details?id=com.androidfung.drminfo&hl=ja&gl=US)

StationOSはメディア再生に特化したOSとのことなので、保護されたコンテンツの再生に必要となるDRMも確認してみたが、L3 Widevineを搭載していた。
一番低い保護レベルなので、試していないがプライムビデオ等でHD画質以上でコンテンツを視聴することはできない可能性が高い。

![stationos drminfo](/assets/images/2021/09/22/stationos-drminfo.png)

StationOSの使い勝手はとても良いとは言えないので今後利用することはないと思うが、Androidが好きな人で操作性に慣れればPlayストアも使えるので利用価値はありそうだ。


### Ubuntu 18.04 LTS

![ubuntu](/assets/images/2021/09/22/ubuntu-main.png)

Station P2向けに用意されているOSはいくつかFireflyのダウンロードページに掲載されている。

[Downloads - ROC-RK3568-PC \| Firefly](https://en.t-firefly.com/doc/download/94.html)

公式に用意されているものはまだ数が少ないが、とりあえず手軽なUbuntuを動かしてみた。
Raspberry PiのようにmicroSDXCに焼き込み、TFカードスロットに挿入した状態で電源を入れるとUbuntuが起動する。

SSHサーバーが起動しているのでmDNSで名前「firefly」を解決するか、DHCPで接続が確立されていればIPアドレスを探すなりして、ID・パスワード共にfireflyで端末に接続できる。

![ubuntu ssh](/assets/images/2021/09/22/ubuntu-ssh.png)

#### NVMe速度ベンチマーク

3年も前のUbuntu 18.04だが、まだメンテナンスアップデート期間なので軽く弄くり回す程度なら十分使える。
試しに取り付けた[Crucial P2 500GB PCIe M.2 2280 SSD \| CT500P2SSD8](https://www.crucial.jp/ssd/p2/CT500P2SSD8)の読み書き速度をKDiskMarkで計測してみた。

[JonMagon/KDiskMark: A simple open-source disk benchmark tool for Linux distros](https://github.com/JonMagon/KDiskMark)

![NVMe SpeedTest](/assets/images/2021/09/22/nvme-speedtest.png)

Crucial P2の公称値は読み込み2300 MB/s、書き込み940 MB/sであるが、これはPCIe 3.0x4接続での値である。
Station P2はPCIe 3.0x2接続なので、片方向あたり理論値2GB/sが上限となる。
実効値はそれよりも低いことを踏まえると、測定結果の読み込み1597 MB/sはとても良好な結果と見て取れる。
Crucial P2の書き込み速度はカタログスペックを大きく上回ることが知られており、測定結果の書き込み1243 MB/sはPCIe 3.0x4接続での結果に近い値が出ていた。

### Armbian for Station P2

![Armbian](/assets/images/2021/09/22/armbian-ssh.png)

StationOSも公式イメージのUbuntu 18.04もサーバーやNAS用途には向かない。これではせっかくの大容量HDDやデュアルギガビットイーサネットが活かせないままだ。
幸いにもFireflyの製品は充実したWikiとフォーラム、そしてブートローダーやカーネルヘッダーなどのソースコードが潤沢に用意されていて、自分でLinuxイメージをビルドする手順まで書かれている。

[Welcome to ROC-RK3568-PC Manual — Firefly Wiki](https://wiki.t-firefly.com/en/ROC-RK3568-PC/index.html)

資料を片手に挑戦してみてもよかったが、フォーラムを覗くとStation P2向けにArmbianをビルド・公開している人がいた。

[Board Bring Up Station P2 rk3568, M2 rk3566 - Board Bring Up - Armbian forum](https://forum.armbian.com/topic/18852-board-bring-up-station-p2-rk3568-m2-rk3566/)

いくつかある中、執筆時（2021/09/22）で最新の[eMMCインストール対応Armbian](https://forum.armbian.com/topic/18852-board-bring-up-station-p2-rk3568-m2-rk3566/?do=findComment&comment=128952)のUPDATE_UBOOT/Armbian_21.11.0-trunk_Station-p2_hirsute_legacy_4.19.193.img[^1]を試してみた。

[^1]: sha:a73565c1eac4ded95512e44c82f24467f4f8026ca8663aa53163adfc5bb54dfd

落としてきたイメージをmicroSDカードに焼き込み起動して初期設定を行うと、見慣れた普通のArmbianが動作してちょっと感動した。
U-Bootの更新をしてArmbianのインストーラーである[`nand-sata-install`](https://github.com/armbian/build/blob/0069ad60a6f59028e93cfeebe441538c10738161/packages/bsp/common/usr/sbin/nand-sata-install)を叩けばeMMCにインストールできるとあるが、NANDだけに何度やっても成功しなかった。
仕方ないので`dd`で/dev/mmcblk0に直接イメージを書き込んでeMMCからの起動を成し遂げた。さよならStationOS。

## まとめ

![stationp2 bootup](/assets/images/2021/09/22/stationp2-bootup.png)

Armbianの起動もでき、遊ぶための土台が整った。

Station P2のハードウェアは比較的扱いやすく、胸を躍らせる豊富なインターフェースが最大の特徴となる。
NVMeも高速に動作したこともあって、ちょっと値は張るがRaspberry Pi 4Bにはできなかったいろいろな試みに挑戦できる。
一つ欠点を挙げるとすると、冷却が心もとないところだ。ケースの内側にスペースの余裕はあまりなく、ファンを内蔵してもエアーフローの問題があるので、新たにケースを自作するか筐体ごと冷却してアルミニウム削り出しの性能に身を委ねるかのどちらかになる。

ファームウェア面では、公式が提供するStationOSやUbuntu 18.04などの使い勝手が微妙ではあるが、使えないことはない。
Armbianが有志の手によってビルドされているおかげで、手軽にDebianベースの環境を整えられ、自由に環境を構築することができる。

ハードウェアとファームウェアの面、そしてWikiや公開されているソースコードの豊富さから評価すると、"遊べるSBC"としての価値はとても高い。
もちろん万人向けではないが、最新チップを載せたSBCで遊びたい人とコンパクトなNASやルーターを構築したい人にはお勧めできる。
SBCの中では高価格帯ではあるが、魅力に踊らされたら買っておいて損はないだろう。

紹介が長くなり記事が太ってしまったので、MPEG-TSデコードとH.265のエンコードをしてみた話やOTGで遊んでみた話などは、また別の記事にしてまとめたい。
