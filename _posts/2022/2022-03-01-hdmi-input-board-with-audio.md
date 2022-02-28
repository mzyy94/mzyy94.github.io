---
title: "Raspberry Pi CM4とCSI-2接続HDMI入力基板で音も取る"
date: 2022-03-01 03:00:00 +0900
published: true
category: Multimedia
tags: raspberry-pi hdmi
category: Multimedia
tags: hdmi raspberry-pi i2s tc358743
image:
  path: /assets/images/2022/03/01/soldering-patch.jpg
  thumbnail: /assets/images/2022/03/01/soldering-patch.jpg
---

2年前に投稿した[HDMI入力をRaspberry Piで取り込む記事](../2020/2020-04-10-raspberrypi-hdmi-input.md)では映像しか取得していませんでしたが、このHDMI入力基板には音声も取り込めるチップ[TC358743](https://toshiba.semicon-storage.com/jp/semiconductor/product/interface-bridge-ics-for-mobile-peripheral-devices/hdmir-interface-bridge-ics/detail.TC358743XBG.html)が搭載されています。
取り込める端子は購入したHDMI入力基板にもちゃんと用意されていたので、ピンヘッダを取り付けて信号を見たりしたものの、音声出力が正常に取得できませんでした。
この問題をあれこれ探し回って解決した記録を残しておきます。

<!-- more -->

{% include post-link.html slug="raspberrypi-hdmi-input" %}

{% include toc %}


## HDMI入力基板で音声も取り出そうとした2020

実は当時、ブログ記事を投稿する直前まで音声出力が正しく得られないかどうかを色々と試行錯誤していました。[参考リンク](../2020/2020-04-10-raspberrypi-hdmi-input.md#参考リンク)にその調査に使ったリンクが一部残してあります。
しかし一筋縄ではいかず音声出力を得ることはできなかったため、その時に書いていた下書きをボツにしていました。
しばらくして解決したものの、記事を完成させるモチベーションもなくお蔵入りになる予定でしたが、ちょうど[reTerminal拡張モジュールコンテスト](https://protopedia.net/event/33)に[HDMI入力モジュールとして応募した](https://protopedia.net/prototype/2933)こともあって、ゴミ箱から拾ってきて記事として完成させました。
なので内容としては2年前の記録になりますが、ブラッシュアップしてあります。

なお、当時はBullseyeベースの新しいRaspberry Pi OSは登場していなかったこともあり、この記事の内容は全てBusterベースのRaspberry Pi OSでの動作を記しています。また、本記事執筆時（2022/02/26）の最新版である以下の構成で動作確認をし直しています。

<details>
<summary>OS: Raspberry Pi OS</summary>
<pre><code>
Raspberry Pi OS (Legacy) with desktop
Release date: January 28th 2022
</code></pre>
</details>

<details>
<summary>ハードウェア: Raspberry Pi 4B</summary>
<pre><code>
Hardware	: BCM2711
Revision	: c03112
Model		: Raspberry Pi 4 Model B Rev 1.2
</code></pre>
</details>

<details>
<summary>カーネル: 5.10.63-v7l+</summary>
<pre><code>
Linux raspberrypi 5.10.63-v7l+ #1496 SMP Wed Dec 1 15:58:56 GMT 2021 armv7l GNU/Linux
</code></pre>
</details>

<details>
<summary>ファームウェア: Dec  1 2021 15:02:46</summary>
<pre><code>
Dec  1 2021 15:02:46 
Copyright (c) 2012 Broadcom
version 71bd3109023a0c8575585ba87cbb374d2eeb038f (clean) (release) (start_x)
</code></pre>
</details>

---
<br>

## HDMI入力基板 H2C-RPI-B01とTC358743XBG

[以前の記事](../2020/2020-04-10-raspberrypi-hdmi-input.md)で使ったHDMI入力基板、H2C-RPI-B01は<del>Raspbian</del>Raspberry Pi OSの標準ドライバで処理され、接続するだけで[Raspberry Pi Camera Module](https://www.raspberrypi.com/documentation/accessories/camera.html)と同様のV4L2デバイスとして認識され、映像入力を扱えました。
何もしなくても動いたのは良かったのですが、何もしなかったためにCamera Moduleと同様に映像しか扱えませんでした。

H2C-RPI-B01に搭載されているチップであるTC358743XBGは、実はHDMI音声入力が扱えます。データシートにはI2Sバス規格で音声データのやりとりをすると書かれています。

![TC358743XBG_datasheet_en_20171026 p.1](/assets/images/2022/03/01/datasheet-p1.png)

引用元: TC358743XBG_datasheet_en_20171026.pdf [TC358743XBG \| HDMI® インターフェースブリッジ \| 東芝デバイス＆ストレージ株式会社 \| 日本](https://toshiba.semicon-storage.com/jp/semiconductor/product/interface-bridge-ics-for-mobile-peripheral-devices/hdmir-interface-bridge-ics/detail.TC358743XBG.html)


## I2S (Inter-IC Sound Bus)

I2SはInter-IC Soundという音声通信バス規格のことです。

[I²S - Wikipedia](https://en.wikipedia.org/wiki/I%C2%B2S)

NXP Semiconductorsが1986年に仕様を定義したものですが、オリジナルの仕様書はインターネットの海に沈没してしまっていて、アーカイブしか見つけられません。

[I2SBUS.pdf - Internet Archive](https://web.archive.org/web/20070102004400/http://www.nxp.com/acrobat_download/various/I2SBUS.pdf)

4つのピンでクロックとデータをやりとりするシリアルバス規格であり、日本語版Wikipediaの記事に要約が書かれています。

[Inter-IC Sound - Wikipedia](https://ja.wikipedia.org/wiki/Inter-IC_Sound)


Raspberry PiのGPIO端子は音声入力と出力の両方に対応しており、PCM_で始まるラベルのついているピン(GPIO 18,19,20,21)がI2Sです。

![Raspberry Pi pinout](/assets/images/2022/03/01/GPIO-Pinout-Diagram-2.png)

引用元: [GPIO and the 40-pin Header - Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/computers/os.html#gpio-and-the-40-pin-header)


## 音声を取り出す最初の挑戦(2020年4月)

I2Sのハードウェア接続とファームウェア設定を行い、音声の取り込みに挑戦していきます。

### ハードウェアの配線
HDMI入力基板の出力ピンとRaspberry Pi 40ピンヘッダーのI2Sのピンとを接続します。

HDMI入力基板には10ピンの入出力端子を取り付けられるスルーホールが用意されています。
H2C-RPI-B01以外の類似品をいくつも買ってみましたが、同じTC358743XBGを搭載する基板には大抵あります。

![HDMIボードピン](/assets/images/2022/03/01/hdmi-board-pins.jpg)

少し離れたところに各スルーホールの機能を記すシルクがありますが、それを参考にして下表の通り接続します。

HDMI入力基板シルク | Raspberry Pi ピン番号 | Raspberry Pi GPIO
---|---|---
SCK | 12 | PCM_CLK(GPIO 18)
WFS | 35 | PCM_FS(GPIO 19)
SD | 38 | PCM_DIN(GPIO 20)


### Raspberry Pi OSのファームウェア設定

I2Sの配線を済ませただけでは音声入力を扱えないので、ファームウェアの設定とドライバのロードをさせます。

#### Device Tree

Linuxがドライバをロードする時、接続されているデバイス情報を元に適切なドライバを選択しています。
接続デバイスを管理するのがDevice Treeというハードウェア構成情報です。Device Treeは **/proc/device-tree** のprocファイルシステムを覗くと、だいたいどんなものが認識されているかがわかります。文献は以下に詳しいです。

- [Device Trees, overlays, and parameters - Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/computers/configuration.html#device-trees-overlays-and-parameters)
- [Device Tree Reference - eLinux.org](https://elinux.org/Device_Tree_Reference)


TC358743のドライバであるmedia/i2c/tc358743.cは、次のようにデバイスを見つけてドライバの初期化（probe）を行います。

```c
static const struct of_device_id tc358743_of_match[] = {
	{ .compatible = "toshiba,tc358743" },
	{},
};
MODULE_DEVICE_TABLE(of, tc358743_of_match);
```

[linux/drivers/media/i2c/tc358743.c#L2255-L2259](https://github.com/raspberrypi/linux/blob/1.20220120/drivers/media/i2c/tc358743.c#L2255-L2259)

compatibleに"toshiba,tc358743"と記載のあるデバイスがあれば、tc358743のドライバが読み込まれるということです。
ただ、何も設定をしていないRaspberry Pi OSではそのような記載のあるデバイスはなく、Camera Moduleのvc04_services/bcm2835-camera.cがドライバとして読み込まれてしまっています。

[linux/bcm2835-camera.c at 1.20220120 · raspberrypi/linux](https://github.com/raspberrypi/linux/blob/1.20220120/drivers/staging/vc04_services/bcm2835-camera/bcm2835-camera.c)

Camera Moduleのドライバではなく、TC358743のドライバであるmedia/i2c/tc358743.cをロードさせるために、Device Treeを上書きしてファームウェアを設定します。

#### Device Tree Overlay

Device Treeを上書きする機能の名はDevice Tree Overlay。そのまんまです。
<del>Raspbian</del>Raspberry Pi OSではこれを読み込むことで、Device Treeを上書きできます。
Raspberry Pi OSには、 **/boot/overlays** にDevice Tree Overlayの構成ファイル、Device Tree Blob Overlay(.dtbo)が格納されています。

[firmware/boot/overlays at 1.20220120 · raspberrypi/firmware](https://github.com/raspberrypi/firmware/tree/1.20220120/boot/overlays)

Blobと名前に含まれるように、バイナリファイルにコンパイルされたものですが、これらのソースコードはraspberrypi/linuxの **/arch/arm/boot/dts/overlays** にあります。

[linux/arch/arm/boot/dts/overlays at 1.20220120 · raspberrypi/linux](https://github.com/raspberrypi/linux/tree/1.20220120/arch/arm/boot/dts/overlays)

この中にtc358743向けのoverlayが存在し、次のように書かれています。


```
		__overlay__ {
			#address-cells = <1>;
			#size-cells = <0>;
			status = "okay";

			tc358743@0f {
				compatible = "toshiba,tc358743";
				reg = <0x0f>;
				status = "okay";
```
[linux/tc358743-overlay.dts at 1.20220120 · raspberrypi/linux](https://github.com/raspberrypi/linux/blob/1.20220120/arch/arm/boot/dts/overlays/tc358743-overlay.dts)


`compatible = "toshiba,tc358743";`とあるので、このdtboを読み込めばtc358743がデバイスとして認識され、ドライバが読み込まれるということです。

ただ、これだけでは音声入力を扱うことはできません。
HDMI入力基板と音声をI2Sでやり取りするには、音声インターフェースのDevice Tree定義とドライバの読み込みが必要です。
TC358743XBGのI2S用の定義も、<del>Raspbian</del>Raspberry Pi OSのDevice Tree Overlayに用意されています。

[linux/tc358743-audio-overlay.dts at 1.20220120 · raspberrypi/linux](https://github.com/raspberrypi/linux/blob/1.20220120/arch/arm/boot/dts/overlays/tc358743-audio-overlay.dts)

これらのDevice Tree OverlayとI2Sを扱うパラメーター設定を[**/boot/config.txt**に記述する方法](https://www.raspberrypi.org/documentation/configuration/device-tree.md#part3.1)を深く理解しながら/boot/config.txtに追記します。


```
dtparam=i2s=on
dtparam=audio=on
dtoverlay=tc358743
dtoverlay=tc358743-audio
```

これで再起動すると、`lsmod`や`dmesg`で**media/i2c/tc358743.c** のドライバーが読み込まれていることが確認できます。
overlayが正しく読み込まれているかどうかは、`sudo vcdbg log msg`などで確認できます。

```
pi@raspberrypi:~ $ dmesg | grep tc358743
[    4.137243] tc358743 0-000f: tc358743 found @ 0x1e (bcm2835 I2C adapter)
pi@raspberrypi:~ $ lsmod | grep tc358743
tc358743               40960  1
v4l2_dv_timings        36864  2 bcm2835_unicam,tc358743
v4l2_fwnode            20480  2 bcm2835_unicam,tc358743
v4l2_common            16384  3 bcm2835_unicam,bcm2835_v4l2,tc358743
videodev              200704  9 bcm2835_unicam,v4l2_fwnode,bcm2835_codec,v4l2_common,videobuf2_common,bcm2835_v4l2,v4l2_mem2mem,videobuf2_v4l2,tc358743
media                  36864  5 bcm2835_unicam,bcm2835_codec,videodev,v4l2_mem2mem,tc358743
pi@raspberrypi:~ $ ls /dev/video*
/dev/video0  /dev/video10  /dev/video11  /dev/video12
pi@raspberrypi:~ $ 
```

### 音声出力信号の取り込み

ファームウェアとハードウェアの設定を済ませ、I2Sでの音声信号を取り出していきます。

TC358743は通常のI2Sオーディオデバイスとは違って、音声信号の制御などをCSI-2を通るI2Cで指示してあげる必要があります。
この制御に関してフォーラムに情報がありました。

[HDMI to CSI-2 TC358743 I2S Audio - Raspberry Pi Forums](https://www.raspberrypi.org/forums/viewtopic.php?t=258742#p1579273)

細かい操作はドライバでやってくれるので、v4l2で大体の設定をすれば良いようです。

```
pi@raspberrypi:~ $ wget https://raw.githubusercontent.com/mzyy94/ns-remote/master/720P30EDID.txt
pi@raspberrypi:~ $ v4l2-ctl --set-edid=file=720P30EDID.txt
pi@raspberrypi:~ $ v4l2-ctl --set-dv-bt-timings query
```

ここまでできたら、HDMIに接続しているデバイスから音声を出力してみると、`v4l2-ctl --list-ctrls`のaudio_presentがvalue=1になってることが確認できるはずです。

![I2S device detected](/assets/images/2022/03/01/device-detected.png)

```
pi@raspberrypi:~ $ v4l2-ctl --list-ctrls

User Controls

            audio_sampling_rate 0x00981980 (int)    : min=0 max=768000 step=1 default=0 value=48000 flags=read-only
                  audio_present 0x00981981 (bool)   : default=0 value=1 flags=read-only

Digital Video Controls

                  power_present 0x00a00964 (bitmask): max=0x00000001 default=0x00000000 value=0x00000001 flags=read-only
```

この状態になったら、あとは取り込むだけ。ただ、いざI2Sオーディオ入力を録音しようと試みるも、一向にデータはやってきません。
そして何やらエラーが出ているようです。

```
pi@raspberrypi:~ $ sudo dmesg -C
pi@raspberrypi:~ $ arecord -D plughw:1 -c1 -r 48000 -f S32_LE -t wav -V mono rec.wav
Recording WAVE '/tmp/rec.wav' : Signed 32 bit Little Endian, Rate 48000 Hz, Mono
^CAborted by signal Interrupt...
arecord: pcm_read:2145: read error: Interrupted system call
pi@raspberrypi:~ $ dmesg
[  560.152152] bcm2835-i2s fe203000.i2s: I2S SYNC error!
pi@raspberrypi:~ $ 
```

I2Sのクロック周りで同期が取れないようなエラーです。オシロスコープでI2S信号を観測したところ、確かに波形がおかしく基板上に問題がありそうだということがわかったのです。

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja" data-theme="light"><p lang="ja" dir="ltr">ケーブル4本をはんだで繋げてみたんですが、I2S信号が期待通りではなくてALSAで取り込めませんでした😭</p>&mdash; MMP (@mzyy94) <a href="https://twitter.com/mzyy94/status/1265179392965177344?ref_src=twsrc%5Etfw">2020年5月26日</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


色々と試行錯誤していた時にオシロスコープを燃やしてしまったのでHDMI入力基板からの音声入力は諦め、UAC Gadget経由でお茶を濁すことにしたのでした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">プローブがショートして白い煙出しながらオシロスコープ発火してモニター消えたので終わり。</p>&mdash; MMP (@mzyy94) <a href="https://twitter.com/mzyy94/status/1263494401382166528?ref_src=twsrc%5Etfw">May 21, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

{% include post-link.html slug="nintendo-switch-audio-uac-gadget" %}


## 音声を取り出すリベンジ


UAC Gadgetから音声入力をする記事でお茶を濁して数ヶ月経った頃、Raspberry Pi Forumsに類似品のHDMI入力基板で音声が取り込めない問題をハードウェア的にパッチを当てて解決する方法が投稿されました。

[[UPDATED, SOLVED] Why "cheap" Chinese HDMI-to-CSI2 adapters (e.g.18810-1 C779) don't provide I2S sound - Raspberry Pi Forums](https://forums.raspberrypi.com/viewtopic.php?p=1695619#p1695619)

これによってパッチを当てれば信号が得られるということがわかったので、試すことにしました。

### 足りない配線とI2S APLLパッチ

TC358743でI2S信号を正しく扱うための配線は、Functional Specificationなる仕様書に書かれているらしいのです。
「らしい」というのは、その仕様書は東芝とNDAを結ばないと手に入れられないもので、現物を確認できていないからです。

NDA下にある書類ということで、インターネットの海にはなかなか流れていなんですが、数字の末尾が3→9になった兄弟チップであるTC358749XBGの仕様書はFireflyが放流してくれています。

[(U18)TC358749XBG_V074.pdf](https://www.t-firefly.com/download/Firefly-RK3288-Reload/hardware/(U18)TC358749XBG_V074.pdf)

これを参考にしてパッチを作っていきます。

Raspberry Pi Forumsの投稿によると、I2Sの信号がおかしいのは音声信号の位相同期回路（PLL）が実装されていないことによるとのこと。
このAudio PLLに関する機能仕様を兄弟チップのTC358749XBGの仕様書から探してみると、次のような回路を用意すればいいというのがわかりました。

![APLL circuit schematic](/assets/images/2022/03/01/apll-circuit-schematic.png)

抵抗値や静電容量は他の[TC358シリーズ](https://toshiba.semicon-storage.com/jp/semiconductor/product/interface-bridge-ics-for-mobile-peripheral-devices.html)の仕様をいくつも読み漁って推定したものです。


#### ユニバーサル基板に実装

先ほどの回路図のうち、C3とC6はH2C-RPI-B01に実装されているのでそれ以外の配線を行い、次のように配置しました。

![APLL circuit board](/assets/images/2022/03/01/apll-circuit-board.png)

これをユニバーサル基板に実装し、フォーラムにある類似基板の解析結果を参考にしながらH2C-RPI-B01につなげていきます。

![patch circuit](/assets/images/2022/03/01/patch-circuit1.jpg)

![patch on H2C-RPI-B01](/assets/images/2022/03/01/patch-circuit2.jpg)

### 再度録音に挑戦

前回の挑戦と同じくして、Device Tree Overlayの設定とv4l2の設定を済ませarecordで録音したところ、ちゃんとレベルメーターでも音声が入力していることを確認でき、きれいに録音されたファイルも出来上がって大成功でした。

![re arecord](/assets/images/2022/03/01/arecord-with-patch.png)


## reTerminalやCM4で使えるようにする

Raspberry Pi 4Bで無事に録音できたので、さてケースに収めてreTerminalの拡張モジュールにするぞ！と意気込んだものの、CSI-2に通るI2Cがうまく通信できずにreTerminalでは動作してくれませんでした。

![tc358743-load-failed](/assets/images/2022/03/01/tc358743-load-failed.png)

```
pi@raspberrypi:~ $ dmesg | grep tc3
[   10.534939] tc358743 10-000f: i2c_rd: reading register 0x0 from 0xf failed
[   10.534957] tc358743 10-000f: not a TC358743 on address 0x1e
```

I2Cの設定を変えてみたりエラーメッセージやCompute Module特有の2つのCSI-2について調べてみたりすると、ずばり解決につながるフォーラムの投稿に行き当たりました。

[Two B102 TC358743 simultaneously on CM4 - Raspberry Pi Forums](https://forums.raspberrypi.com/viewtopic.php?t=303226)

CM3/CM4ではMIPI CSI-2のバスが二つあり、そのうちCSI0で動作させるにはDevice TreeのI2Cバスを変更する必要があるとのことでした。
フォーラムの投稿はちょっと古いので最新のファームウェアに合うように修正してみたところ、ちゃんと認識され録音できるようになりました。
パッチはGitHubにおいておきました。

[reTerminal-HDMI-input/overlays at master · mzyy94/reTerminal-HDMI-input](https://github.com/mzyy94/reTerminal-HDMI-input/tree/master/overlays)

## まとめ

やっとこれでHDMI入力拡張モジュールとして機能する形にできました。今回の成果も以下のリポジトリでまとめておいたので、興味ある物好きな人は参考にどうぞ。

[mzyy94/reTerminal-HDMI-input: HDMI input expansion module for reTerminal](https://github.com/mzyy94/reTerminal-HDMI-input)

ちなみに**このパッチが組み込まれた**音声も取れる格安HDMI入力基板が*今年の1月に発売されていた*ことを、今まさにこの記事を書いている最中に知りました。
少しばかり高いですが、わざわざAPLLパッチを作る必要はありません。これまでの苦労とは一体。。。:sob:

![bought-x630](/assets/images/2022/03/01/bought-x630.png)

南無


<a href="https://www.amazon.co.jp/gp/product/B09KC3VGGS?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=009374e7cd8cf1bb2c563b673c60de3d&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B09KC3VGGS&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B09KC3VGGS" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon \| Geekworm Raspberry Pi Hdmi to CSI-2 （Hdmi入力の最大1080p/25fps）X630 拡張ボード、Raspberry Pi 4B/3B+/3B/Pi Zero/Zero Wに適用 \| Geekworm \| ベアボーンPC 通販](https://www.amazon.co.jp/gp/product/B09KC3VGGS?ie=UTF8&psc=1&linkCode=ll1&tag=mzyy-22&linkId=9d5787b5b84a4f07cc3a07deff07f27e&language=ja_JP&ref_=as_li_ss_tl)


<a href="https://s.click.aliexpress.com/e/_AVdK6H" target="_blank"><img src="//ae01.alicdn.com/kf/H4e750503120b408cb8986e87eac1d8bb9.jpg_350x350.jpg" /></a>

[Hdmi対応にCSI 2モジュール、X630 hdmi CSI 2のためのラズベリーパイ4B/3B +/3B/パイゼロ\|Demo Board Accessories\| - AliExpress](https://s.click.aliexpress.com/e/_AVdK6H)
