---
title: NanoPi NEO2とhomebridgeとSiriで照明操作
date: 2017-11-10 02:13:29 +0900
category: nanopineo2
tags: homebridge siri homekit ir
header:
  image: /assets/images/2017/11/10/applewatch-nanopineo2.jpg
---

この3連休に部屋を見渡していたところ、今夏に大陸から届いた荷物を開封することなく放置していたことに気づいたので開封してみました。
中からはNanoPi NEO2が6個出てきました。すごい。

せっかくなのでこのボードでIoTに挑戦することとしました。IoTと言ってもIoT（笑）のほうではなく、実用的なものを目指して。
ひとまずの目標はiOSのホーム(HomeKit)で部屋の照明をON/OFFすることにします。

<!-- more -->

<style>
[alt="screenshot"] {
  max-width: 477px;
  width: 30%;
}
</style>
<blockquote class="twitter-tweet" data-lang="ja"><p lang="tl" dir="ltr">NanoPI NEO2 x6 <a href="https://t.co/ec4PeO7Abq">pic.twitter.com/ec4PeO7Abq</a></p>&mdash; おねえちゃんの人 (@mzyy94) <a href="https://twitter.com/mzyy94/status/926970965786898432?ref_src=twsrc%5Etfw">2017年11月5日</a></blockquote>


## 情報整理

### NanoPi NEO2

[FriendlyARM - NanoPi NEO2](http://nanopi.io/nanopi-neo2.html)

NanoPi NEO2については上記公式サイトを見ていただければいいのですが、簡単に説明すると「巷で流行りの[Allwinner H5](http://linux-sunxi.org/H5)搭載のGbE付き超小型ARMボード」です。
小型ARMボード界でここ数年のトレンドが来ている[Allwinner](https://en.wikipedia.org/wiki/Allwinner_Technology)のSoCを積んだ低価格ボードの一つですが、特徴的なのはGbEを積んでいる点と無駄な画面出力を備えていない点、そして40mm四方と超小型である点です。
FriendlyARMの直販で購入しましたが、最近では少々値が張るものの[秋月電子でも取り扱いがある](http://akizukidenshi.com/catalog/g/gM-12302/)ようです。
ちなみに秋月ではヒートシンクが別売りとなっていますが、プロセッサのH5はとても熱を持つのでセットで買うことをお勧めします。
今回まとめて購入したときの価格は、1個あたり15USDでピンヘッダーにヒートシンクに送料足すとだいたい2500円くらい。やすい。
スペックはベンチマークを見るにお値段以上。

[NanoPi NEO 2 Board Benchmarks with Ubuntu 16.04.2 using Linux 3.10 and Linux 4.10](https://www.cnx-software.com/2017/04/02/nanopi-neo-2-board-benchmarks-with-ubuntu-16-04-2-using-linux-3-10-and-linux-4-10/)

詳しいピン配置やスペックなどの情報はWikiにまとまっています。

[NanoPi NEO2 - FriendlyARM WiKi](http://wiki.friendlyarm.com/wiki/index.php/NanoPi_NEO2)


### ホーム(HomeKit)

- [iOS - ホーム - Apple（日本）](https://www.apple.com/jp/ios/home/)
- [HomeKit - Apple Developer](https://developer.apple.com/homekit/)

HomeKit、いまではiOSに標準搭載されているホームアプリから家電を操作するためのあれやこれやを詰め込んだ（適当）フレームワークのことです。
ホームアプリはiPhoneやApple Watchで家電を操作することができるもので、対応の電化製品を購入すればリモコンいらず、Siriに話しかけることで家電を思うがままにコントロールできるというもの。

Appleのこういったプラットフォームを取り囲むものはプロプライエタリなものが多く、HomeKitもライセンス契約をしないと技術情報を知りえないといった扱いです。
しかし好奇心旺盛なエンジニアは黙っておらず、プロトコルの解析を経てこれをOSSで実装したものが世にはあります。

[KhaosT/HAP-NodeJS: Node.js implementation of HomeKit Accessory Server.](https://github.com/KhaosT/HAP-NodeJS)

このOSSが参考にしていたプロトコル解析をした調査レポートはプロプライエタリな部分を突っついたものであったため、[AppleからのDMCA](https://github.com/github/dmca/blob/master/2014/2014-11-04-Apple.md)を突きつけられていたこともあり、公開された当初は _触れてはいけない_ OSSでもありました。
時が経ち、とくにこのOSSに対してのAppleの大きな動きはなく、主だって問題もおきていないことから、近年はこのOSSを使ったソフトウェアが多く登場しています。
そのうちの一つ、HomeKit対応アクセサリを自分で定義しホームアプリから操作できるようにしてしまうhomebridgeなるOSSが人気を集めています。

[nfarina/homebridge: HomeKit support for the impatient](https://github.com/nfarina/homebridge)

今回はこれを導入して、照明を操作しようと企みました。

### 部屋の照明

部屋の照明はリモコンでON/OFFできるものに取り変えてあり、[スイッチをEjectで押す](https://eject.kokuda.org/examples/)必要もないため、赤外線で操作するようにしました。
学習リモコンの要領ですね。

NanoPi NEO2に搭載されているAllwinner H5は赤外線信号をサポートしているため、対応のカーネルモジュールが導入されていればlircで簡単に信号の調査ができます。
ただしここで注意しなければいけないのが、H5による赤外線信号のサポートはレシーバーとしてのみであり、トランスミッターとしては機能しないというところです。
このことはデータシートにも記載があります。

[File:Allwinner H5 Datasheet V1.0.pdf - FriendlyARM WiKi](http://wiki.friendlyarm.com/wiki/index.php/File:Allwinner_H5_Datasheet_V1.0.pdf)

そのため、Raspberry Piのときは簡単にできていたirsendによる送信ではなく、GPIOを制御して赤外線LEDを点滅させることで送信を行います。
ただ、リモコンの赤外線は単なるLEDの点滅ではなく、38kHzでデューティ比1/3の変調がかっています。
よく参照される以下のサイトに目を通して、どういう形で最終的に送信すればいいかを知っておく必要があります。

- [フォーマット](http://www.asahi-net.or.jp/~gt3n-tnk/IR_TX1.html)
- [赤外線リモコンの通信フォーマット](http://elm-chan.org/docs/ir_format.html)
- [小型・長時間動作の 赤外線リモコン送信器の製作[PDF]](http://toragi.cqpub.co.jp/Portals/0/backnumber/2004/11/p280-281.pdf)

## NanoPi NEO2のセットアップ

最低限のソフトウェアが動作するようにセットアップします。

### ROMを焼く

まずはNanoPi NEO2が動く状態にする必要があります。

Wikiに記載の[ダウンロードリンク](https://www.mediafire.com/folder/ah4i6w029912b/NanoPi-NEO2)からOfficial-ROMをダウンロードしてきます。
この三連休でダウンロードできた最新版である、 nanopi-neo2_ubuntu-core-xenial_4.11.2_20170909.img.zip を[Etcher](https://etcher.io/)を利用してmicroSDHCカードに書き込みました。

### SSHでつなげる

焼いたmicroSDHCカードを本体にセットし、有線LANケーブルとmicroUSBケーブルを接続して起動します。
無事に起動するとめちゃくちゃまぶしい青色LEDが点滅を始めるので、その状態になったらログインを試行します。
ログイン方法はシリアル接続でもよいけれど、公式イメージは最初からsshdが起動しているので、任意の方法でIPv4アドレスを割り出すなどしてssh接続を行います。
ユーザ名とパスワードはWikiに書いてある通り、pi/pi。

![バナー画面](/assets/images/2017/11/10/banner-ss.png)

### Node.js入れる

homebridgeはNode.jsで動作するソフトウェアなので、Node.jsを導入しておく必要があります。
Node.jsはUbuntu/Debian向けにARM64パッケージをリポジトリとして提供しているので、公式の手順にしたがってリポジトリを追加、Node.jsパッケージのインストールをします。

[Installing Node.js via package manager \| Node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

ただ、このNanoPi NEO2のUbuntu Coreにはcurlが入っていないので、まずcurlをインストールしてから上記サイトの手順に従って8.x系をインストールしました。ついでにbuild-essentialも。

```
$ sudo apt update
$ sudo apt install -y curl
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt install -y nodejs build-essential
```

### homebridge入れる

homebridgeもこのとき導入しておきます。

[nfarina/homebridge: HomeKit support for the impatient](https://github.com/nfarina/homebridge)

```
$ sudo apt install -y libavahi-compat-libdnssd-dev
$ sudo npm install -g --unsafe-perm homebridge
$ npm install -g homebridge-cmdswitch2
```


### WiringNP入れる

赤外線LEDを点滅させるためにGPIOを制御するためのライブラリを導入する必要があります。
Raspberry PiではGPIOを制御するためのライブラリとして[WiringPi](http://wiringpi.com/)があります。
これをベースにNanoPi NEO2向けに変更を加えたものとして、WiringNPが提供されています。

[friendlyarm/WiringNP: This is a GPIO access library for NanoPI. It is based on the WiringOP for Orange PI which is based on original WiringPi for Raspberry Pi.](https://github.com/friendlyarm/WiringNP)

導入は簡単で、README.mdに記載のInstallationの章に従うだけでした。

導入後は、WiringNPが動作するかをgpioコマンドで確認しておきます。

```
$ gpio readall
 +-----+-----+----------+------+---+-NanoPi-NEO2--+------+----------+-----+-----+
 | BCM | wPi |   Name   | Mode | V | Physical | V | Mode | Name     | wPi | BCM |
 +-----+-----+----------+------+---+----++----+---+------+----------+-----+-----+
 |     |     |     3.3V |      |   |  1 || 2  |   |      | 5V       |     |     |
 |  12 |   8 |  GPIOA12 | ALT5 | 0 |  3 || 4  |   |      | 5V       |     |     |
 |  11 |   9 |  GPIOA11 | ALT5 | 0 |  5 || 6  |   |      | 0v       |     |     |
 | 203 |   7 |  GPIOG11 |  OUT | 1 |  7 || 8  | 0 | ALT5 | GPIOG6   | 15  | 198 |
 |     |     |       0v |      |   |  9 || 10 | 0 | ALT5 | GPIOG7   | 16  | 199 |
 |   0 |   0 |   GPIOA0 |  OFF | 0 | 11 || 12 | 1 | OUT  | GPIOA6   | 1   | 6   |
 |   2 |   2 |   GPIOA2 |  OFF | 0 | 13 || 14 |   |      | 0v       |     |     |
 |   3 |   3 |   GPIOA3 |  OFF | 0 | 15 || 16 | 0 | OFF  | GPIOG8   | 4   | 200 |
 |     |     |     3.3v |      |   | 17 || 18 | 0 | ALT2 | GPIOG9   | 5   | 201 |
 |  64 |  12 |   GPIOC0 | ALT4 | 0 | 19 || 20 |   |      | 0v       |     |     |
 |  65 |  13 |   GPIOC1 | ALT4 | 0 | 21 || 22 | 1 | OUT  | GPIOA1   | 6   | 1   |
 |  66 |  14 |   GPIOC2 | ALT4 | 0 | 23 || 24 | 1 | OUT  | GPIOC3   | 10  | 67  |
 +-----+-----+----------+------+---+----++----+---+------+----------+-----+-----+
 | BCM | wPi |   Name   | Mode | V | Physical | V | Mode | Name     | wPi | BCM |
 +-----+-----+----------+------+---+-NanoPi-NEO2--+------+----------+-----+-----+

 +-----+----NanoPi-NEO2 Debug UART-+----+
 | BCM | wPi |   Name   | Mode | V | Ph |
 +-----+-----+----------+------+---+----+
 |   4 |  17 |   GPIOA4 | ALT5 | 0 | 37 |
 |   5 |  18 |   GPIOA5 | ALT5 | 0 | 38 |
 +-----+-----+----------+------+---+----+
 ```
 
## 照明のリモコン信号の調査

いろいろと準備は整ったので照明のリモコン信号を調査します。

### ブレッドボードの配線

lircを使ってリモコンの信号を調査するために、赤外線受光モジュールを適切なGPIOピンに接続する必要があります。
NanoPi NEO2ではmicroSDスロット側の一列に並んだGPIO2にあるGPIOL11ピンに接続します。

[File:NEO2 pinout-02.jpg - FriendlyARM WiKi](http://wiki.friendlyarm.com/wiki/index.php/File:NEO2_pinout-02.jpg)

![配線写真](/assets/images/2017/11/10/board.jpg)

[Fritzing](http://fritzing.org)めんどくさかったので写真で。

配線ついでなので、送信用の赤外線LEDもつけておきました。
今は動作確認ができればいいので、WiringNPで制御する赤外線LEDはGPIO1側から適当に選んで繋げました。
また時間があるときにはんだ付けするので。

使ったパーツは以下の通り。

- 特性のわからない赤外線LED
- [トランジスタ　２ＳＣ２６５５Ｌ－Ｙ　５０Ｖ２Ａ　（１０個入）: 半導体 秋月電子通商 電子部品 ネット通販](http://akizukidenshi.com/catalog/g/gI-08746/)
- [赤外線リモコン受信モジュール　ＰＬ－ＩＲＭ２１２１（３８ｋＨｚ）: センサ一般 秋月電子通商 電子部品 ネット通販](http://akizukidenshi.com/catalog/g/gI-01570/)
- 200Ω 抵抗器
- 10Ω 抵抗器

赤外線LEDは部品箱に転がってた適当なものを使ったので、はんだ付けするときは高出力広角なものに換えるつもり。


### 制御信号の取得

いつも通りlircのmode2で信号間隔を取得して記録しておきます。
lsmodでは以下の通り、標準でlircに関するモジュールが読み込まれているのですが、肝心のlircが入っていないので導入します。

```
$ lsmod
Module                  Size  Used by
ir_lirc_codec          16384  0
lirc_dev               20480  1 ir_lirc_codec
sunxi_cir              16384  0
rc_core                32768  4 ir_lirc_codec,lirc_dev,sunxi_cir
g_mass_storage         16384  0
usb_f_mass_storage     36864  2 g_mass_storage
libcomposite           45056  2 g_mass_storage,usb_f_mass_storage
```

その前にドライバがロードされているかを確認しておきます。

```
pi@NanoPi-NEO2:~$ dmesg | grep -i ir
[    0.000000] psci: PSCIv0.2 detected in firmware.
[    0.000000] psci: Trusted OS migration not required
[    0.000000] Kernel command line: console=ttyS0,115200 earlyprintk root=/dev/mmcblk0p2 rootfstype=ext4 rw rootwait fsck.repair=yes panic=10 fbcon=map:0
[    0.000000] Virtual kernel memory layout:
[    0.000000] NR_IRQS:64 nr_irqs:64 0
[    0.287252] Installing knfsd (copyright (C) 1996 okir@monad.swb.de).
[    0.303204] Serial: 8250/16550 driver, 4 ports, IRQ sharing disabled
[    0.324436] 1c28000.serial: ttyS0 at MMIO 0x1c28000 (irq = 28, base_baud = 1500000) is a U6_16550A
[    1.088352] 1c28400.serial: ttyS1 at MMIO 0x1c28400 (irq = 29, base_baud = 1500000) is a U6_16550A
[    1.366078] ehci-platform 1c1a000.usb: irq 11, io mem 0x01c1a000
[    1.427398] ohci-platform 1c1a400.usb: irq 12, io mem 0x01c1a400
[    1.528336] ads7846 spi0.1: touchscreen, irq 142
[    1.626433] sunxi-mmc 1c0f000.mmc: base:0xffff000008de9000 irq:9
[    1.645143] hidraw: raw HID events driver (C) Jiri Kosina
[    1.976006] ehci-platform 1c1b000.usb: irq 13, io mem 0x01c1b000
[    2.022733] ehci-platform 1c1c000.usb: irq 15, io mem 0x01c1c000
[    2.070564] ehci-platform 1c1d000.usb: irq 17, io mem 0x01c1d000
[    2.119590] ohci-platform 1c1b400.usb: irq 14, io mem 0x01c1b400
[    2.209522] ohci-platform 1c1c400.usb: irq 16, io mem 0x01c1c400
[    2.301451] ohci-platform 1c1d400.usb: irq 18, io mem 0x01c1d400
[    5.079032] systemd[1]: Started Forward Password Requests to Wall Directory Watch.
[    6.606621] rc rc0: sunxi-ir as /devices/platform/soc/1f02000.ir/rc/rc0
[    6.607660] Registered IR keymap rc-empty
[    6.607918] input: sunxi-ir as /devices/platform/soc/1f02000.ir/rc/rc0/input2
[    6.608238] sunxi-ir 1f02000.ir: initialized sunXi IR driver
[    6.616820] lirc_dev: IR Remote Control driver registered, major 246
[    6.622722] rc rc0: lirc_dev: driver ir-lirc-codec (sunxi-ir) registered at minor = 0
[    6.622732] IR LIRC bridge handler initialized
[   11.769570] RTL8211E Gigabit Ethernet 1c30000.ethernet-0:00: attached PHY driver [RTL8211E Gigabit Ethernet] (mii_bus:phy_addr=1c30000.ethernet-0:00, irq=-1)
pi@NanoPi-NEO2:~$
```

`sudo apt install lirc`するとき、cursesでlircのドライバとトランスミッター、スペシャルファイルに関してプロンプトがでるので、順に
"Linux input layer (/dev/input/eventX)"、"None"、"/dev/lirc0"を選択してインストールを完了します。
ぶっちゃけ適当でいいんですけどね、特にデーモンで動かすことを想定していないので。

mode2が動作するようになったら、照明のONとOFFをそれぞれ別のファイルに書き出しておきます。

```
$ sudo mode2 --raw -d /dev/lirc0 | tee light-off
space 16777215
pulse 2072
space 1008
pulse 5656
space 1032
pulse 1520
space 536
pulse 1520
space 536
pulse 488

.
.
.


```


### 制御信号の送信

書き出したmode2の出力データを元に、赤外線LEDを点滅させるコードをWiringNPを用いて適当に書き上げました。
いい感じにビルドしてLEDのつながるGPIOピン番号と先のファイルを引数に与え、照明が点灯/消灯することを確認します。

{% gist 5cf28ac56553142db9364d4178fc5ccc transmitter.c %}

{% gist 5cf28ac56553142db9364d4178fc5ccc hb.sh %}

## HomeKitで照明を操作

照明をNanoPi NEO2で制御できることがわかったので、これをHomeKitでコントロールできるようにします。

### homebridgeの設定・起動

homebridgeの設定はconfig.jsonファイルに記述する形で行います。
記述方法に関してはそれぞれ調べてもらうとして、今回設定したconfig.jsonを記しておきます。

{% gist f7f008f50c9a9d7cd6d0922527ca722e config.json %}

先ほど作った適当なコマンドをたたくため、homebridge-cmdswitch2を使ってます。
設定ファイルを **~/.homebridge/config.json** に配置したら、`homebridge`として起動するだけでホームアプリなどからの接続を待機し始めます。

いい感じに起動するようだったら、よしなにsystemdのserviceを作って放り込んでおくといいと思う。

### ホームアプリの設定

iPhoneを用いてホームアプリにhomebridgeで起動してるアクセサリを登録します。
最近のhomebridgeは優秀で、起動時にクールな接続用のQRコードを表示してくれるようになりました。
昔は微妙なPIN表示画面があっただけで、読み込みできなくて手動で入力する必要があったりしたものでした。
相変わらずMFi認証を取得していない「認定されていないアクセサリ」として表示されますが、そこは仕方ないのでこのまま追加します。

![screenshot](/assets/images/2017/11/10/IMG_0063.PNG)

アクセサリの追加ができたら、ブリッジとアクセサリを部屋に割り当てておきます。
今回の設定ではLightはデフォルトでスイッチとして認識されましたが、ライトとしてアイコンが表示されるようにタイプを変更しておきます。

![screenshot](/assets/images/2017/11/10/IMG_0064.PNG)
![screenshot](/assets/images/2017/11/10/IMG_0065.PNG)

そうすると自宅にアクセサリが追加されます。

![screenshot](/assets/images/2017/11/10/IMG_0066.PNG)

#### シーンの設定

ホームアプリにはまとめて複数の機器をコントロールできるシーンというものがあります。
Siriでお願いしたりボタンをタップしたり、また後述のオートメーションによって、このシーンを動作させることができます。
まだ今は1つしかアクセサリがないのであまり意味ないですが、寝るときや家に帰ってきたときに電気と、
これからの季節暖房も一緒につけるようなこともあるので、これらのシーンを設定しておきます。

![screenshot](/assets/images/2017/11/10/IMG_0067.PNG)

##### ただいま

電気をつけるタイミングは生活リズムからして、日の入りを過ぎてから家に帰ってきたときです。
そのためのシーンとして、「ただいま」という直球なネーミングのシーンがホームアプリには用意されています。

![screenshot](/assets/images/2017/11/10/IMG_0069.PNG)

これを設定し、ただいまのシーンを動作させたときに電気が付くようにしておきます。

##### おやすみ

電気を消すタイミングも夜間の外出を除けば就寝時と決まっているので、こちらも「おやすみ」シーンに設定しておきます。

![screenshot](/assets/images/2017/11/10/IMG_0068.PNG)

#### オートメーションの設定

先に設定したシーンやアクセサリを、ある条件に従って自動で動作させるオートメーションというものがホームアプリにはあります。
寝る時間はSiriにおやすみと言ってるので自動化は必要ないですが、夜間に家に帰ってきたときは「ただいま」のシーンを自動で動作させてもらいたいものです。
そんな用途にぴったりのオートメーションが「人が到着」オートメーションです。
_誰か_ が任意の _場所_ にある _時間帯_ に到着した場合、オートメーションが作動するという、まさに求めていたものです。
__誰かが__ の部分には設定しているiPhoneが、 __場所__ は自宅に、 __時間帯__ は夜間（日の入りから日の出まで）を条件としてセットし、
自動化するシーンに先ほどの「ただいま」を設定することでオートメーションの追加は完了です。

![screenshot](/assets/images/2017/11/10/IMG_0070.PNG)
![screenshot](/assets/images/2017/11/10/IMG_0071.PNG)
![screenshot](/assets/images/2017/11/10/IMG_0072.PNG)

### Siriからのコントロール

アクセサセリのタップやシーンのタップ、オートメーションやSiri経由などいろいろとHomeKitアクセサリの制御方法はありますが、やはり一番インパクトの強いのはSiriからの操作。
この部分はありふれた動画ですが、動作している状態を一応載せておきますね。

<blockquote class="twitter-video" data-lang="ja"><p lang="en" dir="ltr">✅Apple Watch+Siri+HomeKit <a href="https://twitter.com/hashtag/nanopineo?src=hash&amp;ref_src=twsrc%5Etfw">#nanopineo</a> 2 <a href="https://t.co/oCFEjyT0C1">pic.twitter.com/oCFEjyT0C1</a></p>&mdash; おねえちゃんの人 (@mzyy94) <a href="https://twitter.com/mzyy94/status/928669578200104960?ref_src=twsrc%5Etfw">2017年11月9日</a></blockquote>

## まとめ

日本ではRaspberry Piに加えてIRKitなる機器を追加で購入し、1万円以上かけて同様のことをするのが流行りみたいですね。
同じネタ書いて何番煎じかわからないようなインターネットの藻屑を生むのは嫌なので、インパクトを狙って「4cm四方で超小型！たった2000円で照明をHomeKitで操作！」みたいなふざけたタイトルつけたかったのですが、寒い季節なのでおとなしいタイトルにしました。
NanoPi NEO2はマイクやスピーカー端子も備えているので、暇を見つけてGoogle AssistantやAlexa Voice Serviceにも対応していきたい気持ちです。

先日Apple Watch Series 3を購入し、iPhone Xを握らなくてもスマートな生活を送れるようになってきています。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">・通知確認(メール・Twitter)<br>・モバイルSuica<br>・Swarmチェックイン<br>・通勤タイマー<br>・Yahoo!天気<br>・リマインダー<br>・1Password(ワンタイムパスワード)<br>・ミュージック<br>・睡眠記録<br>・目覚まし<br>Twitterと写真撮るくらいしかiPhoneの出番ない</p>&mdash; おねえちゃんの人 (@mzyy94) <a href="https://twitter.com/mzyy94/status/920849763548905472?ref_src=twsrc%5Etfw">2017年10月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

これらに加えて手首だけで照明のON/OFFができるようになり、さらに快適な生活が送れるようになって、もう家からでたくないくらいです。
帰宅時のオートメーションを動作させたいがために出かけてるようなもんです。
年内にエアコンのリモコン制御も追加して一層のスマートホーム化を目指しますかねぇ。
ついでに[IoTでカーテンを開けられたら](http://akkiesoft.hatenablog.jp/entry/20140422/1398174428)いいな、とも。

Appleのプラットフォームに投入される話題のAIスピーカー、[HomePod](https://www.apple.com/homepod/)。
日本語に対応することも未定であるからに、まだどれほどの可能性を秘めているのか未知数ですが、HomeKitやホームとの連携で生活のギャップを埋めることに一役買うことを期待して12月を待つとしますかね。

