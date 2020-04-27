---
title: "UAC GadgetでNintendo Switchの音声出力をRaspberry Piに取り込む"
date: 2020-04-17 21:30:00 +0900
published: true
toc: true
categories: raspberry-pi
tags: hdmi uac usb usb-gadget nintendo switch
header:
  image: /assets/images/2020/04/17/usb-audio-detected.jpg
---

[前回の記事](/blog/2020/03/20/nintendo-switch-pro-controller-usb-gadget/)でHDMI映像入力をRaspberry Piで扱う方法を紹介し、その最後に音声の取り込みについて、まだ課題が残っていると書きました。
HDMI入力からの音声取り込みといった、本質的な課題の解決を試みているものの、なかなかに難しい問題に直面しているので、対象を限定して部分的解決に挑みます。

主に今HDMI入力の対象として使おうと思っているデバイスは、Nintendo Switchです。
なので、Nintendo Switchの音声出力に限定して、それをRaspberry Piで取り込むことだけを目的とし、音声が取り込めていない問題を解決していきます。

<!-- more -->

## Nintendo Switchの音声出力

Nintendo Switchには、4つの音声出力方法があります。これらのいずれかから音声を取り込む必要があります。


### スピーカー

![body-switch01-front](/assets/images/2020/04/17/body-switch01-front.jpg)

引用元: [Nintendo Switch｜任天堂](https://www.nintendo.co.jp/hardware/switch/feature/index.html#1)


主に[テーブルモード](https://www.nintendo.co.jp/support/switch/playmode/index.html#heading-table-mode)や、[携帯モード](https://www.nintendo.co.jp/support/switch/playmode/index.html#heading-handheld-mode)でプレイする時に音声が出力されます。本体前面に搭載されたステレオスピーカーから音声が出力されますが、これを取り込むにはマイクを用いる必要があり、
遅延の発生とノイズが乗るので現実的ではありません。



### 3.5mmイヤホンジャック

スピーカーからではなく、本体上部のヘッドホンマイク端子から音声を出力することもできます。スピーカー出力の音声をマイクを使って取り込むよりも、イヤホンジャックの出力を取り込んだ方がノイズは少ないですが、アナログ・デジタル変換が必要なので、やや手間がかかります。

### HDMI

[TVモード](https://www.nintendo.co.jp/support/switch/playmode/index.html#heading-tv-mode)で映像を出力しているとき、スピーカーの代わりにHDMIケーブルを通して音声がテレビから出力されます。信号がデジタルなのと、[サラウンドに対応している](https://support.nintendo.co.jp/app/answers/detail/a_id/33815)ため高音質ですが、機器に取り込む方法が限定されるため、障壁が高いです。

### USB

![body-switch02-front](/assets/images/2020/04/17/body-switch02-front.jpg)


引用元: [Nintendo Switch｜任天堂](https://www.nintendo.co.jp/hardware/switch/feature/index.html#2)

本体底面のUSB Type-C端子や、[Nintendo SwitchドックのUSB端子](https://www.nintendo.co.jp/hardware/switch/feature/index.html#2)に接続しているUSBサウンドデバイスから、音声を出力する方法です。[Sound Blaster G3](https://www.amazon.co.jp/Blaster-Mac%E3%81%AE%E3%83%98%E3%83%83%E3%83%89%E3%82%BB%E3%83%83%E3%83%88%E3%82%92%E9%AB%98%E9%9F%B3%E8%B3%AA%E3%81%AB-%E3%82%B9%E3%83%9E%E3%83%9B%E3%82%A2%E3%83%97%E3%83%AA%E3%81%A7%E5%88%B6%E5%BE%A1%E5%8F%AF%E8%83%BD-PS4%E3%81%AE%E3%82%B2%E3%83%BC%E3%83%A0%E9%9F%B3%E3%81%A8%E5%91%B3%E6%96%B9%E3%81%AE%E5%A3%B0%E3%81%AE%E9%9F%B3%E9%87%8F%E3%81%8C%E5%A4%89%E3%81%88%E3%82%89%E3%82%8C%E3%82%8B-SB-G-3/dp/B0824MBF2B/ref=as_li_ss_tl?ref_=nav_custrec_signin&&linkCode=ll1&tag=mzyy-22&linkId=46656c72215eb7e857c9d1327172c2eb&language=ja_JP)などの製品を接続して、イヤホンジャックからの出力より高品位な音声を楽しむことができるそうです。
通信はUAC（後述）というプロトコルを通して、音声出力をデジタル信号でやり取りしています。UACで取り込みたい機器と通信ができれば、最もこれが手軽かつノイズの少ない出力が得られます。

<a href="https://www.amazon.co.jp/Blaster-Mac%E3%81%AE%E3%83%98%E3%83%83%E3%83%89%E3%82%BB%E3%83%83%E3%83%88%E3%82%92%E9%AB%98%E9%9F%B3%E8%B3%AA%E3%81%AB-%E3%82%B9%E3%83%9E%E3%83%9B%E3%82%A2%E3%83%97%E3%83%AA%E3%81%A7%E5%88%B6%E5%BE%A1%E5%8F%AF%E8%83%BD-PS4%E3%81%AE%E3%82%B2%E3%83%BC%E3%83%A0%E9%9F%B3%E3%81%A8%E5%91%B3%E6%96%B9%E3%81%AE%E5%A3%B0%E3%81%AE%E9%9F%B3%E9%87%8F%E3%81%8C%E5%A4%89%E3%81%88%E3%82%89%E3%82%8C%E3%82%8B-SB-G-3/dp/B0824MBF2B/ref=as_li_ss_il?ref_=nav_custrec_signin&&linkCode=li3&tag=mzyy-22&linkId=afede16d818b291906f91ff37d9ea8a4&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0824MBF2B&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B0824MBF2B" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />


## UAC (USB Audio Device Class)

[USB Audio Devices Rev. 3.0 and Adopters Agreement \| USB-IF](https://www.usb.org/document-library/usb-audio-devices-rev-30-and-adopters-agreement)

USB接続のサウンドカードや、USB Type-C接続のイヤホンなどが採用しているUSB経由で音声を転送するプロトコルです。
マイクなどの入力装置と、スピーカーなどの出力装置とのどちらとも、このプロトコルで転送できます。
USB Audio Device Classには大きく分けて、Class 1(UAC1)、Class 2(UAC2)、Class 3(UAC3)の3つの実装レベルの異なったクラスが定義されています。
WindowsやmacOS、LinuxやAndroid含め、ほとんどのOSに標準でUAC1とUAC2のドライバが導入されています。

## USB Gadget API

聞き覚えがありますね。[スマホでNintendo Switchを操作する手法を紹介したの記事](/blog/2020/03/20/nintendo-switch-pro-controller-usb-gadget/#usb-gadget-api)で登場しています。
聞いたことない人はそちらをチラッとみていただくとして、そこに挙げたドキュメント記載の例に**sound subsystem (for audio gadgets)**があり、USB Audio Device Classのシミュレートもできるのです。
これでRaspberry PiをUACデバイスとして振舞うようにできれば、Nintendo SwitchのUSBサウンド出力を取り込めるかもしれません。

## UACデバイスシミュレート

物は試しということで、早速Nintendo SwitchとRaspberry Piを接続してconfigfsでUAC1デバイスを作ってみます。
手法を紹介したの記事と同様、/boot/config.txtと/etc/modulesに追記を済ませておく必要があります。
接続はシンプルに、それぞれのUSB Type-CポートにUSB 2.0 Type-Cケーブルを接続するだけです。

{% gist 02bcd9d843c77896803c4cd0c4d9b640 uac1_gadget.sh %}

<!--

```sh
#!/bin/bash
cd /sys/kernel/config/usb_gadget/
mkdir -p audio
cd audio

echo 0x0104 > idProduct # Multifunction Composite Gadget
echo 0x1d6b > idVendor # Linux Foundation

mkdir strings/0x409
echo "000000000" > strings/0x409/serialnumber
echo "Linux Foundation" > strings/0x409/manufacturer
echo "Multifunction Composite Gadget" > strings/0x409/product

mkdir -p configs/c.1/strings/0x409
echo "Audio Gadget" > configs/c.1/strings/0x409/configuration
echo 120 > configs/c.1/MaxPower

mkdir -p functions/uac1.0
ln -s functions/uac1.0 configs/c.1/

ls /sys/class/udc > UDC
```

-->

root権限でこれを実行すると、Nintendo SwitchがRaspberry Pi 4をUSBサウンドデバイスとして認識しました。

![usb audio device detected](/assets/images/2020/04/17/usb-audio-detected.jpg)


**uac1.0**の部分を**uac2.0**に書き換えることで、[UAC2 Gadget](https://github.com/raspberrypi/linux/blob/raspberrypi-kernel_1.20200212-1/drivers/usb/gadget/function/f_uac2.c)もシミュレートできますが、試したところNintendo SwitchのUSBサウンドデバイスは、USB GadgetにおいてはUAC1の出力装置のみを認識していました。
また、`sudo modprobe g_audio`でもUAC Gadgetは作成できますが、こちらもUAC2なので認識しませんでした。


### Pro Controller + UAC

Nintendo SwitchはPro Controllerのシミュレートに関しては、製品ID(idProduct)と製造元ID(idVendor)を純正のものと同一にする必要がありました。
しかしUSBサウンドデバイスに関しては、なんでもいいみたいです。純正品やライセンス商品が販売されていないからでしょうか。

そして、なんと、Pro Controllerを模したUSB GadgetにUACの機能を追加しても、認識しちゃうのです！

{% gist 02bcd9d843c77896803c4cd0c4d9b640 procon_audio.sh %}

<!--
```sh
#!/bin/bash
cd /sys/kernel/config/usb_gadget/
mkdir -p procon
cd procon
echo 0x057e > idVendor
echo 0x2009 > idProduct
echo 0x0200 > bcdDevice
echo 0x0200 > bcdUSB
echo 0x00 > bDeviceClass
echo 0x00 > bDeviceSubClass
echo 0x00 > bDeviceProtocol

mkdir -p strings/0x409
echo "000000000001" > strings/0x409/serialnumber
echo "Nintendo Co., Ltd." > strings/0x409/manufacturer
echo "Pro Controller" > strings/0x409/product

mkdir -p configs/c.1/strings/0x409
echo "" > configs/c.1/strings/0x409/configuration
echo 500 > configs/c.1/MaxPower
echo 0xa0 > configs/c.1/bmAttributes

mkdir -p functions/hid.usb0
echo 0 > functions/hid.usb0/protocol
echo 0 > functions/hid.usb0/subclass
echo 64 > functions/hid.usb0/report_length
echo BQEVAAkEoQGFMAUBBQkZASkKFQAlAXUBlQpVAGUAgQIFCRkLKQ4VACUBdQGVBIECdQGVAoEDCwEAAQChAAswAAEACzEAAQALMgABAAs1AAEAFQAn//8AAHUQlQSBAsALOQABABUAJQc1AEY7AWUUdQSVAYECBQkZDykSFQAlAXUBlQSBAnUIlTSBAwYA/4UhCQF1CJU/gQOFgQkCdQiVP4EDhQEJA3UIlT+Rg4UQCQR1CJU/kYOFgAkFdQiVP5GDhYIJBnUIlT+Rg8A= | base64 -d > functions/hid.usb0/report_desc

mkdir -p functions/uac1.0

ln -s functions/hid.usb0 configs/c.1/
ln -s functions/uac1.0 configs/c.1/

udevadm settle -t 5 || :
ls /sys/class/udc > UDC
```
-->



この状態で、[1.3inch LCD HATでの入力](/blog/2020/03/20/nintendo-switch-pro-controller-usb-gadget/#13inch-lcd-hat%E3%81%A7%E3%81%AE%E5%85%A5%E5%8A%9B)を試してみると、ちゃんとUSBサウンドデバイスとPro Controllerとして認識されています。

![pro controller and audio device](/assets/images/2020/04/17/controller-and-audio.jpg)


## 音声取り込み

UAC1 Gadgetとして振る舞っている間、[ALSA](https://ja.wikipedia.org/wiki/Advanced_Linux_Sound_Architecture)には**UAC1Gadget**という名前のサウンドカードとして認識されます。

```
pi@raspberrypi:~ $ lsmod | grep uac
usb_f_uac1             16384  2
u_audio                20480  1 usb_f_uac1
libcomposite           57344  11 u_audio,usb_f_uac1
udc_core               53248  4 dwc2,u_audio,libcomposite,usb_f_uac1
pi@raspberrypi:~ $ cat /proc/asound/cards
 0 [ALSA           ]: bcm2835_alsa - bcm2835 ALSA
                      bcm2835 ALSA
 1 [UAC1Gadget     ]: UAC1_Gadget - UAC1_Gadget
                      UAC1_Gadget 0
pi@raspberrypi:~ $ arecord -l
**** List of CAPTURE Hardware Devices ****
card 1: UAC1Gadget [UAC1_Gadget], device 0: UAC1_PCM [UAC1_PCM]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```


以下のコマンドでUAC1ガジェットから、ステレオ２チャンネル、サンプリング周波数48000Hz、量子化ビット数 符号付き16ビット、VUメーターステレオ表示しつつ、/tmp/rec.wavに音声ファイルを保存できます。

```
arecord -v -D hw:UAC1Gadget -c2 -r 48000 -f S16_LE -t wav -V stereo /tmp/rec.wav
```

ちゃんと動きました。

![arecord recording](/assets/images/2020/04/17/arecord-recording.png)


## 映像と音声をWebRTC

[前回の記事](/blog/2020/04/10/raspberrypi-hdmi-input/#webrtc)でも扱った映像のWebRTC配信に、音声も乗っけてみます。

HDMI出力はUSB Type-C端子からは取り出せないので、Nintendo Switchドックに接続する必要があります。
そして、Raspberry Pi 4とNintendo Switchドックは裏面のUSB 3.0ポートに、以下のようなUSB Type-A to USB Type−C 3.0ケーブルを使って接続します。
消費電力の関係で、USB 2.0ポートやUSB 2.0ケーブルを使うと電力不足でRaspberry Piが落ちます。
また、間にセルフパワーのUSBハブを噛ませても良いでしょう。

<a href="https://www.amazon.co.jp/Anker-PowerLine-3-0%E3%82%B1%E3%83%BC%E3%83%96%E3%83%AB-%E3%80%90Galaxy-%E3%80%81MacBook%E3%80%81Xperia/dp/B01MUCRKJS/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=30058AVVLJS1W&dchild=1=&linkCode=li3&tag=mzyy-22&linkId=36aeb22f917425f6c4debc4674a377f8&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01MUCRKJS&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B01MUCRKJS" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon.co.jp： Anker USB Type C ケーブル PowerLine USB-C & USB-A 3.0 ケーブル Xperia / Samsung Galaxy / LG / iPad Pro MacBook その他 Android Oculus Quest 等 USB-C機器対応 1.8m ブラック: 家電・カメラ](https://www.amazon.co.jp/Anker-PowerLine-3-0%E3%82%B1%E3%83%BC%E3%83%96%E3%83%AB-%E3%80%90Galaxy-%E3%80%81MacBook%E3%80%81Xperia/dp/B01MUCRKJS/ref=as_li_ss_tl?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=30058AVVLJS1W&dchild=1=&linkCode=ll1&tag=mzyy-22&linkId=2fae1ff8d7fe1be125c70bc4f0f3a34d&language=ja_JP)


<a href="https://www.amazon.co.jp/%E3%82%A8%E3%83%AC%E3%82%B3%E3%83%A0-USB3-0-AC%E3%82%A2%E3%83%80%E3%83%97%E3%82%BF%E4%BB%98-%E3%83%9E%E3%82%B0%E3%83%8D%E3%83%83%E3%83%88%E4%BB%98-U3H-T410SBK/dp/B00RT8SSFK/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=mzyy-22&linkId=624c4f81eb9d858711f826847dfbc38d&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00RT8SSFK&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B00RT8SSFK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon \| エレコム USB3.0 ハブ 4ポート ACアダプタ付 セルフ/バス両対応 マグネット付 ブラック U3H-T410SBK \| エレコム \| USBハブ 通販](https://www.amazon.co.jp/%E3%82%A8%E3%83%AC%E3%82%B3%E3%83%A0-USB3-0-AC%E3%82%A2%E3%83%80%E3%83%97%E3%82%BF%E4%BB%98-%E3%83%9E%E3%82%B0%E3%83%8D%E3%83%83%E3%83%88%E4%BB%98-U3H-T410SBK/dp/B00RT8SSFK/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=mzyy-22&linkId=f5351c12165f7c6bbdb1f84075fd1103&language=ja_JP)


ソフトウェアは今回も動作確認できればいいので、デモコードを用います。

前回はgstwebrtc-demosのコードを用いてV4L2デバイスをそのまま扱ったところ、再接続してから映像が取得できなくなるという問題を抱えていました。
これは[MMAL(Multi-Media Abstraction Layer API)](https://github.com/raspberrypi/userland/blob/5c1619589c22bc285832c533146cd4ce294a46f6/interface/mmal/mmal.h)の手続きを正しく実行することで解決できます。そして、それをやってくれるGstreamerのelement(プラグイン)が、前回少し登場したgst-rpicamsrcです。


[thaytan/gst-rpicamsrc: GStreamer element for the Raspberry Pi camera module](https://github.com/thaytan/gst-rpicamsrc)

これをv4l2srcの代わりに用いることで、再接続しても映像の取得が正しく行えるようになります。
加えて、このリポジトリのexamplesにWebRTCのデモがあるので、それをちょっと編集して音声を乗っけていきます。

[gst-rpicamsrc/webrtc-unidirectional-h264.c at 79860a0b2a0f3beef6ccfab0cf7d531e55e3b06c · thaytan/gst-rpicamsrc](https://github.com/thaytan/gst-rpicamsrc/blob/79860a0b2a0f3beef6ccfab0cf7d531e55e3b06c/examples/webrtc-unidirectional-h264.c)


```diff
diff --git a/examples/webrtc-unidirectional-h264.c b/examples/webrtc-unidirectional-h264.c
index b8a716d..b9674b3 100644
--- a/examples/webrtc-unidirectional-h264.c
+++ b/examples/webrtc-unidirectional-h264.c
@@ -185,10 +185,12 @@ create_receiver_entry (SoupWebsocketConnection * connection)
 
   error = NULL;
   receiver_entry->pipeline = gst_parse_launch ("webrtcbin name=webrtcbin stun-server=stun://" STUN_SERVER " "
-      "rpicamsrc bitrate=600000 annotation-mode=12 preview=false ! video/x-h264,profile=constrained-baseline,width=640,height=360,level=3.0 ! queue max-size-time=100000000 ! h264parse ! "
-      "rtph264pay config-interval=-1 name=payloader ! "
-      "application/x-rtp,media=video,encoding-name=H264,payload="
-      RTP_PAYLOAD_TYPE " ! webrtcbin. ", &error);
+      "rpicamsrc preview=false ! video/x-h264,profile=constrained-baseline,width=1280,height=720,level=3.1 ! queue max-size-time=100000000 ! h264parse ! "
+      "rtph264pay config-interval=-1 ! "
+      "application/x-rtp,media=video,encoding-name=H264,payload=96 ! webrtcbin. "
+      "alsasrc device=hw:UAC1Gadget ! audioconvert ! audioresample ! queue ! opusenc ! "
+      "rtpopuspay ! queue ! "
+      "application/x-rtp,media=audio,encoding-name=OPUS,payload=97 ! webrtcbin. ", &error);
   if (error != NULL) {
     g_error ("Could not create WebRTC pipeline: %s\n", error->message);
     g_error_free (error);
```

上記パッチを当て、Readmeに従って`sudo make install`までできていると、**examples/**にWebRTCデモの実行ファイルができているはずです。

ビルド前の依存パッケージの導入と実行時の注意は、[前回の記事](/blog/2020/04/10/raspberrypi-hdmi-input/#webrtc)を参考にしてください。
また、追加で`sudo apt install gstreamer1.0-alsa`をしてALSAのプラグインも導入しておく必要があります。

`OPENSSL_CONF= ./examples/webrtc-unidirectional-h264`で実行し、Chromeでみてみると、音声もWebRTCで転送できていることが確認できます。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">音でた <a href="https://t.co/gKTdyVQNAH">pic.twitter.com/gKTdyVQNAH</a></p>&mdash; 咳9週間 (@mzyy94) <a href="https://twitter.com/mzyy94/status/1251113843599634432?ref_src=twsrc%5Etfw">April 17, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## まとめ

とりあえずNintendo Switchの音声出力が取れました。

[前々回](/blog/2020/04/10/raspberrypi-hdmi-input/)はNintendo Switch Pro ControllerのWeb対応。
[前回](/blog/2020/03/20/nintendo-switch-pro-controller-usb-gadget/)はNintendo Switchゲーム画面のWeb対応。
今回はNintendo Switchゲーム音声のWeb対応。

何を作ろうとしてるか、だんだんワクワクしてきましたね？

