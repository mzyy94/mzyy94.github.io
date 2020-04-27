---
title: "HDMI入力をRaspberry Piで駆使する"
date: 2020-04-10 03:00:00 +0900
published: true
toc: true
categories: raspberry-pi
tags: nintendo switch hdmi uvc
header:
  image: /assets/images/2020/04/10/raspi-hdmi-connected.jpg
---

昨今の衰えることのない技術トレンドに追従すべく、映像配信とかやりたいなーと思っていた2019年。
めっきり時間がなく何もできず、気付けば2020年になっていました。

今年も時間がないだろうなぁと思っていたところ、連日の在宅勤務のおかげで通勤時間がゼロになり、余暇が生まれたので色々やってみることにしました。

お題はHDMI入力で遊ぶ、です。

<!-- more -->

## ビデオ転送プロトコル

早速ですがHDMIから一旦離れて、まずは記事中に出てくるビデオ転送プロトコルについて、大まかに解説しておきます。

### UVC (USB Video Class)

[Video Class v1.5 document set \| USB-IF](https://www.usb.org/document-library/video-class-v15-document-set)

一般的なPC向けウェブカメラが、このプロトコルを用いています。
USB-IFが定めているデバイスクラスの一つで、ビデオストリーミングをUSB経由で転送するプロトコルです。
WindowsやmacOS、LinuxやAndroid含め、ほとんどのOSに標準でドライバが導入されています。

### MIPI CSI-2 (MIPI Camera Serial Interface 2)

[MIPI Camera Serial Interface 2 (MIPI CSI-2)](https://mipi.org/specifications/csi-2)

Raspberry Piのカメラ入力端子がこれを用いています。
組み込み機器向けのカメラ入力として、[NVIDIA Jetsonシリーズ](https://www.nvidia.com/ja-jp/autonomous-machines/embedded-systems/)などでも用いられています。
高解像度、高フレームレート、高精細な映像データの通過に耐えらえれるよう、高速なデータ転送を可能としています。
転送レーンの数によって総通信速度が異なってきますが、1レーンでも2.5Gbpsの転送速度を誇っています。

![MIPI CSI2 CameraPoster](/assets/images/2020/04/10/CameraPoster_0.jpg)

出典: [MIPI Camera Serial Interface 2 (MIPI CSI-2)](https://mipi.org/specifications/csi-2)


Raspberry Pi 4に搭載されているBCM2711には2レーン、NVIDIA Jetson NanoやJetson Xavier NX、10th Gen Intel® Core™ Y-Series Processorには12レーンのMIPI CSI-2が搭載されています。
Intel CPUやJetson Nanoが12レーン × 2.5Gbps = 30Gbpsの映像伝送通信が可能であることは、あまり知られていなかったりします。

- [Raspberry Pi 4 Model B specifications – Raspberry Pi](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/specifications/)
- [世界最小の AI スーパーコンピューター: Jetson Xavier NX - NVIDIA](https://www.nvidia.com/ja-jp/autonomous-machines/embedded-systems/jetson-xavier-nx/)
- [Intelligent Performance 10th Gen Intel® Core™ Processors Brief](https://www.intel.com/content/www/us/en/products/docs/processors/core/10th-gen-core-mobile-processors-brief.html#editorialTableBlade-9)

## HDMI入力

HDMIの話に戻ります。プロトコルの話は今回は触れません。

### キャプチャーボード

HDMI入力と聞いて大半の人が思い浮かぶのが、俗にキャプボと呼ばれるキャプチャーボードの類いだと思います。

[Amazon.co.jp: キャプチャーボード](https://www.amazon.co.jp/%E3%82%AD%E3%83%A3%E3%83%97%E3%83%81%E3%83%A3%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/s?k=%E3%82%AD%E3%83%A3%E3%83%97%E3%83%81%E3%83%A3%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89&tag=mzyy-22)

USB接続のこれらはHDMI入力の映像を、UVCプロトコルで転送できる形に変換してPCへと渡すものです。
一般的に、ゲーム機の入力を取り込み、配信サイトでゲーム実況配信をする使われ方をします。

大半が数万円するやや高価な代物であるのに加え、昨今のリモートワークの増加によって画面共有の需要も増加し価格が高騰しています。また、コンシューマー向けとあって[ハッカビリティ](https://en.wiktionary.org/wiki/hackability)の低いものとなっているため、市販のUSBキャプチャーボードは使いません。

### HDMI to MIPI CSI-2

![B101 HDMI to CSI-2 Bridge](/assets/images/2020/04/10/38126_B101_sale_800x356.jpg)

引用元: [B101 HDMI to CSI-2 Bridge (15 pin FPC) – Auvidea](https://auvidea.eu/b101-hdmi-to-csi-2-bridge-15-pin-fpc/)

知る人ぞ知る、NVIDIA JetsonやRaspberry Pi向けの映像周辺ボードを手掛けるAuvidea。
ここが展開する商品の一つに、B101 HDMI to CSI-2 Bridgeがあります。
製品名の通り、HDMI入力をCSI-2に変換する基板です。
変換チップに[TC358743XBG](https://toshiba.semicon-storage.com/jp/semiconductor/product/interface-bridge-ics-for-mobile-peripheral-devices/hdmir-interface-bridge-ics/detail.TC358743XBG.html)を搭載しています。

直販価格は69.90ユーロ（執筆時）と、安価とは言えないものの納得のいく価格ですが、日本への送料が101.99ユーロ（執筆時）と、すんなりとは納得のいかない価格だったので購入を躊躇していました。

そんなとき、頼るべくはいろんな意味でリーズナブルな中国の技術です。
搭載されているチップ、TC358743XBGとRaspberry PiのキーワードでAliexpressやTaobaoを探索していると、[冬虫电子](https://dcac.world.taobao.com/)なる会社(？)が求めている物を製造・販売しているのを見つけました。

[樹莓派 ZERO HDMI採集， HDMI 轉 CSI ，HDMI輸入](https://world.taobao.com/item/602390051699.htm)

価格も159人民元（執筆時）と安かったのでこれを購入しました。

![HDMI Input board](/assets/images/2020/04/10/hdmi-input.jpg)


商品ページに 板子名稱：H2C-RPI-B01 と書かれているため、以下、この製品をH2C-RPI-B01と呼称します。

## H2C-RPI-B01

![HDMI Input on Raspberry Pi](/assets/images/2020/04/10/raspi-hdmi-input.jpg)

H2C-RPI-B01はRaspberry Pi Zeroとほぼ同じサイズであり、ねじ穴もRaspberry PiのHAT位置にあり、Raspberry Pi 4とも親和性がとても良いです。

接続はFPCケーブルをH2C-RPI-B01とRaspberry PiのCSI-2ポートの双方に繋げるだけですが、HDMIケーブルを抜き差しするため、しっかりと固定する必要があります。
そのために、HATを固定できるねじ穴が上に出てるヒートシンクケースを買ったりしていました。
このねじ穴に6角スペーサーを取り付けH2C-RPI-B01を固定することで、頻繁な抜き差しでも基板の揺れなく扱えます。

<a href="https://www.amazon.co.jp/gp/product/B07X47L6DD/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=0a54d809ccd910e81a24a46a564e9077&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07X47L6DD&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B07X47L6DD" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon \| Geekworm Raspberry pi 4(ラズベリーパイ4モデルB) CNC超薄型アルミ合金パッシブ冷却金属ケース、ラズパイ4モデルBのみに適用 \| Geekworm \| ベアボーンPC 通販](https://www.amazon.co.jp/gp/product/B07X47L6DD/ref=as_li_ss_tl?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=ea0b8274695e7a1074770a391235d70c&language=ja_JP)


## HDMI映像入力をみてみる

取り付けが終わったら、入力をみてみます。
Raspbianには、[Raspberry Pi Camera Module](https://www.raspberrypi.org/documentation/usage/camera/)と同様にして認識され、必要なものは標準で読み込まれているので、Camera Moduleと同じ初期設定だけすれば使えます。

初期設定も難しいものではなく、`sudo raspi-config nonint do_camera 0`を打ち込むだけです。

再起動すると、`vcgencmd get_camera`で**supported=1 detected=1**と返ってくるはずです。
また、**/dev/video0**にHDMI入力を変換したH.264ストリームにアクセスできるVideo4Linux2デバイスが出来上がります。

### raspivid

RaspbianでMIPI CSI-2カメラの映像を録画するテストコマンドの一つ、[raspivid](https://github.com/raspberrypi/userland/blob/95b29b556a4068725ea9948f6e78790ab3aa153e/host_applications/linux/apps/raspicam/RaspiVid.c)を用いて映像をキャプチャしてみます。

```
pi@raspberrypi:~ $ raspivid -w 1280 -h 720 -fps 30 -b 500000 -o /tmp/rec.h264
The driver for the TC358743 HDMI to CSI2 chip you are using is NOT supported.
They were written for a demo purposes only, and are in the firmware on an as-is
basis and therefore requests for support or changes will not be acted on.
```

![raspivid recording](/assets/images/2020/04/10/hdmi-raspivid.png)

VLCで見てみると、ちゃんとraspividで取り込めています。

### Gstreamer

マルチメディアを扱うオープンソースのフレームワーク、[Gstreamer](https://gstreamer.freedesktop.org/)を用いると、煮たり焼いたりの幅が大きく広がるため、これで使えるかどうかをみてみます。
詳しい使い方は他のサイトを参考にしてもらうとして、ざっとコマンドラインツールとプラグイン各種を導入して動かしてみます。

```
sudo apt install -y gstreamer1.0-tools gstreamer1.0-nice gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-plugins-good gstreamer1.0-omx
```

さくっと動作確認してみます。先ほどのraspividではファイルに保存してみましたが、[RTP](https://ja.wikipedia.org/wiki/Real-time_Transport_Protocol)で転送してみます。
試してみる人は、mzyy94.localを自身のマシンのIPアドレスにでも置き換えて動かしてください。

```
gst-launch-1.0 v4l2src ! video/x-h264,width=1280,height=720,framerate=30/1,bitrate=500000 ! h264parse ! rtph264pay config-interval=-1 pt=96 ! udpsink host=mzyy94.local port=5678
```

Raspbianでこれを実行してる状態で、macOSでreceive.sdpというテキストファイルを作成して、以下の内容を書き込み、VLCで開きます。

```
v=0
c=IN IP4 0.0.0.0
m=video 5678 RTP/AVP 96
a=rtpmap:96 H264/90000
```

![vlc rtp receiving capture](/assets/images/2020/04/10/hdmi-rtp.png)

遅延は大きいですが、ちゃんとgstreamerで転送できています。

## HDMI映像配信してみる

ちょっと応用を利かせてHDMI映像入力を配信してみます。

### RTMP

[Real Time Messaging Protocol - Wikipedia](https://ja.wikipedia.org/wiki/Real_Time_Messaging_Protocol)

TwitchとかYouTube Liveとかで配信する時に通信するプロトコルです。これは簡単にGstreamerを使ってできます。
Twitchでやってみます。

必要なのは、RTMPのエンドポイントURL。Twitchの場合、これは以下のサイトで確認できます。

[Twitch Streamers - Twitch Ingest Information](https://stream.twitch.tv/ingests/)

日本からの配信は、Tokyoにある以下のエンドポイントが最適とされています（執筆時）。

```
rtmp://live-tyo.twitch.tv/app/{stream_key}
```

この**{stream_key}**にはTwitchダッシュボードで確認できるPrimary Stream keyを入れ、URLを完成させます。

Twitchに配信した映像を見てゲームを進行するには遅延が大きすぎるので、[DRM/KMS](https://en.wikipedia.org/wiki/Direct_Rendering_Manager#Kernel_Mode_Setting)に映像を出力することで、Raspberry PiのHDMI出力から限りなく遅延の少ないRAW映像を同時出力します。

kmsはRaspberry Pi 3までは`raspi-config`でFull KMSオプションを選択して有効化するのですが、Raspberry Pi 4に新しく搭載されたVideoCore VIにはFull KMSがまだ動く状態ではないようです。
ただ、Raspberry Pi 4はFake KMSがデフォルトで有効になっているので、特に何もせずに動きます。

gstreamerでv4l2からvideo/x-rawとして生映像を取り出し、kmssinkに出力しつつ、Raspberry Piのハードウェアエンコーダーであるomxh264encを通してH.264に変換したものをflv形式にまとめ、rtmpsinkでTwitchへと送出します。


```
export stream_key=your_stream_key_here
gst-launch-1.0 v4l2src ! videorate ! video/x-raw,width=1280,height=720,framerate=30/1 ! tee name=t t. ! queue ! kmssink t. ! omxh264enc ! h264parse ! flvmux ! rtmpsink location=rtmp://live-tyo.twitch.tv/app/${stream_key}
```

コマンドラインでこれを実行すると、Raspberry Piに繋げたHDMIディスプレイにほぼ遅延なく映像が表示され、Twitchで配信できていることを確認できます。


![twitch rtmp broadcasting](/assets/images/2020/04/10/hdmi-rtmp-twitch.png)


### WebRTC

[WebRTC - Wikipedia](https://ja.wikipedia.org/wiki/WebRTC)

新しめの[GstreamerではWebRTCが使えます](https://gstreamer.freedesktop.org/documentation/webrtc/index.html?gi-language=c)。Raspbian Busterの標準リポジトリからインストールできるGstreamerも使えます。
これを使ってローカルWeb配信をしてみます。

ドキュメントを元にコードを書いてもいいですが、それはまた別の機会で。今回はGitHubで公開されているGstreamer WebRTCのデモコードを用います。

[gstwebrtc-demos/webrtc-unidirectional-h264.c at 1981ef164358caad5c0dc552d7d19c84a1608498 · centricular/gstwebrtc-demos](https://github.com/centricular/gstwebrtc-demos/blob/1981ef164358caad5c0dc552d7d19c84a1608498/sendonly/webrtc-unidirectional-h264.c)

このコードにはH.264エンコード処理が含まれますが、すでにv4l2からはH.264のデータを受け取れるようになっているので、それを取り除くよう少し改変します。

```diff
diff --git a/sendonly/webrtc-unidirectional-h264.c b/sendonly/webrtc-unidirectional-h264.c
index e71ff39..94cf1f0 100644
--- a/sendonly/webrtc-unidirectional-h264.c
+++ b/sendonly/webrtc-unidirectional-h264.c
@@ -187,7 +187,7 @@ create_receiver_entry (SoupWebsocketConnection * connection)
 
   error = NULL;
   receiver_entry->pipeline = gst_parse_launch ("webrtcbin name=webrtcbin stun-server=stun://" STUN_SERVER " "
-      "v4l2src ! videorate ! video/x-raw,width=640,height=360,framerate=15/1 ! videoconvert ! queue max-size-buffers=1 ! x264enc bitrate=600 speed-preset=ultrafast tune=zerolatency key-int-max=15 ! video/x-h264,profile=constrained-baseline ! queue max-size-time=100000000 ! h264parse ! "
+      "v4l2src ! video/x-h264,profile=constrained-baseline,width=1280,height=720,framerate=30/1,level=3.1 ! h264parse ! "
       "rtph264pay config-interval=-1 name=payloader ! "
       "application/x-rtp,media=video,encoding-name=H264,payload="
       RTP_PAYLOAD_TYPE " ! webrtcbin. ", &error);
```

Readmeに従って依存パッケージをインストールし、`make`すればビルドできます。
ただし、成果物をそのまま起動すると以下のIssueに直面します。

[dtlsdec: Critical warnings in gst-inspect (#811) · Issues · GStreamer / gst-plugins-bad · GitLab](https://gitlab.freedesktop.org/gstreamer/gst-plugins-bad/issues/811)

ここのコメントに書かれたワークアラウンドにあるように、ちょっと起動にコツが必要となります。

```
OPENSSL_CONF= ./webrtc-unidirectional-h264 
```

これで http://raspberrypi.local:57778 にアクセスすると、HDMI入力の映像をWebブラウザで見ることができました。

![webrtc capture](/assets/images/2020/04/10/hdmi-webrtc.png)

LAN内であれば遅延も1秒未満で、どうぶつの森であれば普通にプレイできるくらいです。
ひとつこの実装には問題があり、一度映像を送出するとv4l2srcが開放されず、H2C-RPI-B01へのアクセスが占有され続けてしまうため、2度目のアクセスからRaspbianを再起動するまで映像が取得できなくなります。

この問題に簡易的に対処するために、gst-rpicamsrcプラグインを用いる方法があります。それはまた今度、別の記事に書くので詳細は割愛します。

[thaytan/gst-rpicamsrc: GStreamer element for the Raspberry Pi camera module](https://github.com/thaytan/gst-rpicamsrc)

## まとめ

意外と手軽にRaspberry PiでHDMI入力の映像を配信できました。お高いキャプチャーボードを買う必要もなく、柔軟な配信ができることもわかりました。
しかし、まだ音がありません。今後の課題としましょう。
