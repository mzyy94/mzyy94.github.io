---
title: 自宅サーバーを増やした
date: 2014-04-06 23:10:36 +0900
category: server
tags: xeon server
image: /blog/resources/images/2014/4/6/DSC08148.JPG
---

増税前のPCパーツ買いだめイベントに便乗して、３月中に自宅サーバーを増設しました。
どんな構成で組み立てたのかの紹介になります。

<!-- more -->

サーバー増設にあたって、次に挙げる構成目標を先に決めていました。

- ４コア以上、かつ８スレッド以上
- 16GB以上のDRAM
- 速い記憶装置
- 8万円以下

あまり欲がありませんが、だいたいこれを満たせるようにと組みました。

SandyBridge世代のCPUを載せた、自宅サーバーっぽいものは前からありました。
構成は、以下の表の通りです。

パーツ|種類
---|---
CPU|Intel Core i5
DRAM| DDR3-1333 8GB (4GB x 2)
HDD| WD2TB
MB|ECS H67I

どこがサーバーじゃいと思うかもしれませんが、そう思うのもあたりまえ、元デスクトップマシンの構成のままなのです。
大概のことはこなせていたので、新しく組む必要はなかったといわれればその通りなのですが、気軽に仮想マシンをたてて、実験して、つぶして、のような遊びをするには非力であったため、最新のパーツで新たに組むことにしました。

## パーツ選定

### CPU
![](/blog/resources/images/2014/4/6/DSC08114.JPG)
「サーバー向けならXeonっしょ。」と各所で言われているので、Xeonにしました。
用途としては、CIサーバーが主で、適当な仮想マシンインスタンスを作っては遊び、追加していくという将来を見据えて、[Intel Xeon E3-1245 v3](http://ark.intel.com/ja/products/75462/Intel-Xeon-Processor-E3-1245-v3-8M-Cache-3_40-GHz)にしました。

プロセッサー|Intel Xeon E3-1245 v3
------------|---------------------
動作周波数|3.4 GHz
TB時周波数|3.8 GHz
キャッシュ|8 MB
最大 TDP|84 W

動作周波数3.4GHzあれば１０個ほど仮想マシン立ち上げても大丈夫でしょう。

### MB
![](/blog/resources/images/2014/4/6/DSC08093.JPG)
自宅に転がっているPCケースがどれもMini-ITX向けのものなので、Mini-ITXにします。Xeon対応を謳っているマザーボードは少なく、Mini-ITXに限定してしまうと片手で数えきれるほどしか候補がありません。
サーバー向けチップセットを載せたASUSの[P9D-I](http://www.asus.com/Commercial_Servers_Workstations/P9DI/)が購入時時点のXeon向けMini-ITXマザーボードとしては最上位であるものの、予算オーバーしてしまうので、今回は見送りました。
残る選択肢はGIGABYTEかASRockのほぼ二択となり、両者の違いはeSATAの有無やGbEの数などで、仮想マシンをいくつもたてることを考えると、二つGbEがあるほうが好ましいということで、GIGABYTEの[GA-Z87N-WIFI](http://www.gigabyte.jp/products/product-page.aspx?pid=4600)を購入しました。

### DRAM
![](/blog/resources/images/2014/4/6/DSC08105.JPG)
Xeon向けチップセットを載せたマザーボードを選んでいれば、ECC付きのメモリで長期運用時の信頼性を高めることができるのですが、上記の通り、Z87チップセットを載せたマザーボードを選択したため、特にECCに関してはこだわる必要がありません。
Z87チップセットはDDR3-1333/1600対応のため、たくさんの仮想マシンを支えられるよう、DDR3-1600のもので、16GB（8GB x ２枚）のものを探しました。
相性問題などは特に気にせず、財布と相談しながら予算に合うものを選んだ結果、Kingstonの[KHX16C10B1K2/16X](http://www.amazon.co.jp/gp/product/B008KRZYH4/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B008KRZYH4&linkCode=as2&tag=mzyy-22)の価格が暴落していたのですぐさま購入しました。

### Storage
なんでもよかったです。とにかく速いものであれば。
これも、お財布と相談しながらということで、適当に探してSanDiskの[SanDisk SSD UltraPlus 128GB](http://www.amazon.co.jp/gp/product/B00BWR2QZC/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B00BWR2QZC&linkCode=as2&tag=mzyy-22)にしました。

### その他パーツ
増設ということで、旧マシンから流用できるパーツがありません。あまっているパーツは7mm厚120mmファンくらいで、必要なものがいくつもありました。

CPUはバルクで購入したのでファンがついておらず、CPUファンを購入する必要がありました。ケースの高さ制限より、これもまた選択肢が少なく、某所のレビューでよく冷えるとあったので、Scytheの[KOZUTI](http://www.amazon.co.jp/gp/product/B004W5KS0G/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B004W5KS0G&linkCode=as2&tag=mzyy-22)にしました。

CPUファンとの熱伝導のためのグリスは、ファン付属のものでもよかったのですが、どうしても別で買いたかったのでAINEXの[シルバーグリス](http://www.amazon.co.jp/gp/product/B000BLBHTQ/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B000BLBHTQ&linkCode=as2&tag=mzyy-22)を購入しました。よく冷えそうなので。

あとは、2.5インチSSDを3.5インチに変える、[センチュリー 裸族のインナー](http://www.amazon.co.jp/gp/product/B0088QXTK6/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B0088QXTK6&linkCode=as2&tag=mzyy-22)や、ケースの狂った配線とつなぐための[アイネックス ピン配列交換ケーブル](http://www.amazon.co.jp/gp/product/B000FHQACA/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B000FHQACA&linkCode=as2&tag=mzyy-22)や[アイネックス コネクタ簡単脱着ケーブル](http://www.amazon.co.jp/gp/product/B000Y1YUKG/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B000Y1YUKG&linkCode=as2&tag=mzyy-22)を購入しました。

## 組み立て
### ケースの整備
![](/blog/resources/images/2014/4/6/DSC08139.JPG)
普通のPCケースならば、パーツをケースに組み込むだけですが、自宅に転がっているというケースがくせ者で、数年前のAcer Aspire H340のものなのです。
このケース、Mini-ITXサイズのマザーボードが組み込まれていたので、一見どのマザーボードでも使えるかと思ったら大間違い。フロントパネルのボタンは効かないわSATAは認識しないわで問題ばかり。このケースを市販されているMini-ITXマザーボードで活用しようと思う方はたくさん居るようで、ウェブに情報はたくさんあります。
今回は、[http://z.apps.atjp.jp/memo/h340.html](http://z.apps.atjp.jp/memo/h340.html)を参考にさせていただき、ケースを利用できる状態にしました。

### パーツ組み込み

![](/blog/resources/images/2014/4/6/DSC08158.JPG)

やっと普通のPCケースとして使える状態になったので、組み込みます。
ここからの手順は、ご存知の方多いと思いますので割愛します。


### 設置

![](/blog/resources/images/2014/4/6/Servers.jpg)
ちゃんとケースに組み込んで所定の位置に設置しました。
ほかのサーバーとおなじ見た目なのでわかりづらいですが、右上のが今回新設したサーバーとなります。
それらに関してはおいおい紹介していきますのでしばしおまちを。

## 費用
気になるサーバー構築費用です（すべて税込み）。

パーツ|購入価格(円)
-------|------:
CPU    |26800
MB     | 8800
DRAM   |11151
SSD    | 9790
Fan    | 2880
Grease | 1140
Mounter|  891
Cable  |  827

計62,279円で、このサーバーを構築できました。目標としていた8万円を大きく下回り、金銭的にストレージ増設の余地があります。
このサーバーを生かして、今後いろいろと実験していくような記事を書く予定ですので、こう御期待。
