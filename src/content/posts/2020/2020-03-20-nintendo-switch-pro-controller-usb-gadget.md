---
title: "スマホでNintendo Switchを操作する 〜 USB GadgetでPro Controllerをシミュレート 〜"
date: 2020-03-20T01:50:00+09:00
published: true
toc: true
categories: ["Game"]
tags: ["nintendo", "switch", "usb", "hid", "usb-gadget", "sbc"]
image: "/assets/images/2020/03/20/switch-remote-control.jpg"
---

あつまれ どうぶつの森の配信が開始されましたね。いくつか積みゲーが増え始めたNintendo Switchも、また新たにゲームが増えて稼働時間が伸びる一方です。

物をよくなくす身として、ゲームがしたいときにコントローラーが見つからないことは日常茶飯事です。
テレビやエアコンのリモコンもよく消えるので、スマートフォンから操作できるようにしています。スマート家電、文明の利器ですね。
コントローラーが見つからないとき、スマートフォンから操作はできないのでゲームはお預けです。

家電はスマホでスマートに操作できるのに、ゲームはレガシーなコントローラーを探さなきゃいけないなんて、なんてスマートじゃないのでしょう。
どうぶつたちの住む無人島に到達できやしません。

と言うことで、スマートフォンでNintendo Switchを操作出来るようにすべく奮闘した記録です。
概要としては、Raspberry PiでNintendo Switch Pro Controllerをシミュレートし、Wi-Fi経由でスマホから操作する話です。
ちょっと分量が多いので読むのは大変かも。

<!-- more -->
{% include toc %}

## Nintendo Switch Pro Controller

言わずと知れた、任天堂純正のNintendo Switch向けワイヤレスコントローラーです。Nintendo Switch本体と比べても大柄なボディは手になじみ、疲れをあまり感じさせません。
おちつきのあるダークな色合いが上品さを演出していますが、彩度が低いため、よく行方不明になります。

[Amazon \| 【任天堂純正品】Nintendo Switch Proコントローラー \| ゲーム](https://www.amazon.co.jp/%E4%BB%BB%E5%A4%A9%E5%A0%82-Nintendo-Switch-Pro%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%A9%E3%83%BC/dp/B01NCX3W3O/ref=as_li_ss_tl?ref_=nav_ya_signin&&linkCode=ll1&tag=mzyy-22&linkId=8042ff62f0a570bdd0ad6f41fac393dd&language=ja_JP)

<a href="https://www.amazon.co.jp/%E4%BB%BB%E5%A4%A9%E5%A0%82-Nintendo-Switch-Pro%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%A9%E3%83%BC/dp/B01NCX3W3O/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=%E3%82%B9%E3%82%A4%E3%83%83%E3%83%81+Pro+Controller&qid=1584556077&s=videogames&sr=1-3&linkCode=li3&tag=mzyy-22&linkId=d95f52eefae959908facac13d2cf9c08&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01NCX3W3O&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

Nintendo Switchは、このPro Controllerなど、任天堂製か公式ライセンス商品しかコントローラーとして認識してくれません。
2017年の年末に没頭していたSplatoon 2で、自動ドット絵作画ツールを作った時も、公式ライセンス商品であるHORIのPokken Padをシミュレートして使っていました。

{% include post-link.html slug="doitsu-no-ika" %}

Pokken Padは、先の記事の通りArduinoベースでのシミュレート実績もあるので比較的簡単にシミュレートできます。
しかしジャイロやジョイスティックがないので、多くのゲームに対応しようとするには不向きです。

今回はこのPro Controllerをなくしても大丈夫なように、シミュレートしていきます。

### リバースエンジニアリング

Nintendo Switchに関するリバースエンジニアリングは発売から間も無くして賑わいをみせ、今では多くの情報がインターネットに流れています。
その代表的なものとして、Nintendo_Switch_Reverse_Engineeringといった資料群がGitHubにあります。

[dekuNukem/Nintendo_Switch_Reverse_Engineering: A look at inner workings of Joycon and Nintendo Switch](https://github.com/dekuNukem/Nintendo_Switch_Reverse_Engineering)

ここにはJoyconやPro Controller、そしてNintendo Switch本体のリバースエンジニアリングを行った結果がいくつか載っています。
これと共に、実際のNintendo SwitchにおけるPro Controllerの挙動を突き合わせれば、シミュレートすることができる算段です。

## USB Gadget API

USB Gadget APIとは、Linux KernelにおけるUSBデバイスのペリフェラル、周辺機器側として動作する機能のことです。
簡単に言うと、Raspberry Piがキーボードとかゲームパッドになるよってやつです。
ハードウェアのサポートも必要ですが、最近話題のRaspberry Pi 4や[昔紹介したNanoPi NEO2](../2017/2017-11-10-nanopineo2-homekit.md)などが対応しています。

[USB Gadget API for Linux — The Linux Kernel documentation](https://www.kernel.org/doc/html/v4.19/driver-api/usb/gadget.html)

USB Gadgetを作成する方法としては、カーネルモジュールをロードする方法や、[configfs](https://www.kernel.org/doc/Documentation/filesystems/configfs/configfs.txt)を用いてファイルシステムベースで定義する方法があります。

また、上記ドキュメントに例として挙げられているように、以下のようなUSBデバイスをシミュレートできます。

> - networking subsystem (for network gadgets, like the CDC Ethernet Model gadget driver)
> - data capture drivers, perhaps video4Linux or a scanner driver; or test and measurement hardware.
> - input subsystem (for HID gadgets)
> - sound subsystem (for audio gadgets)
> - file system (for PTP gadgets)
> - block i/o subsystem (for usb-storage gadgets)
> - ... and more

このうち、コントローラーなどは**input subsystem (for HID gadgets)**にあたり、USB HIDプロトコルをシミュレートする必要があります。
裏を返せば、USB GadgetでPro ControllerのUSB HIDプロトコルをシミュレートできれば、技術的には問題は解決です。

## USB HID

USB HIDプロトコルは、簡単にいえばキーボードやマウス、コントローラーなど、USB経由でやり取りする入力機器のデータのプロトコルを、**HID Report Descriptor**と言う定義情報を通して定義する物です。
入力機器のデータのやり取りは、一般的なUSBデバイスと同じく、[USB Request Block (URB)](https://www.kernel.org/doc/html/v4.19/driver-api/usb/URB.html)で行い、それの各ビットが入力情報の何を指しているかを定義しています。

定義はUsage itemと言う形で記され、そのUsage、すなわち用途については、以下のUSB-IFの公式ドキュメントに記載があります。
実際にPro ControllerのHID Report Descriptorを調べたりしたとき、この情報は必要となってきます。

[HID Usage Tables 1.12 \| USB-IF](https://www.usb.org/document-library/hid-usage-tables-112)


## 実装調査

Raspbianで`lsusb`を用いてUSB Device decriptorを調査するところから始めます。

```
pi@raspberrypi:~ $ uname -a
Linux raspberrypi 4.19.97-v7l+ #1294 SMP Thu Jan 30 13:21:14 GMT 2020 armv7l GNU/Linux

pi@raspberrypi:~ $ lsusb
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 003: ID 057e:2009 Nintendo Co., Ltd 
Bus 001 Device 002: ID 2109:3431 VIA Labs, Inc. Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

pi@raspberrypi:~ $ lsusb -d 057e: -v 2> /dev/null
Bus 001 Device 003: ID 057e:2009 Nintendo Co., Ltd 
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               2.00
  bDeviceClass            0 
  bDeviceSubClass         0 
  bDeviceProtocol         0 
  bMaxPacketSize0        64
  idVendor           0x057e Nintendo Co., Ltd
  idProduct          0x2009 
  bcdDevice            2.00
  iManufacturer           1 Nintendo Co., Ltd.
  iProduct                2 Pro Controller
  iSerial                 3 000000000001
  bNumConfigurations      1
  Configuration Descriptor:
    bLength                 9
    bDescriptorType         2
    wTotalLength       0x0029
    bNumInterfaces          1
    bConfigurationValue     1
    iConfiguration          0 
    bmAttributes         0xa0
      (Bus Powered)
      Remote Wakeup
    MaxPower              500mA
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        0
      bAlternateSetting       0
      bNumEndpoints           2
      bInterfaceClass         3 Human Interface Device
      bInterfaceSubClass      0 
      bInterfaceProtocol      0 
      iInterface              0 
        HID Device Descriptor:
          bLength                 9
          bDescriptorType        33
          bcdHID               1.11
          bCountryCode            0 Not supported
          bNumDescriptors         1
          bDescriptorType        34 Report
          wDescriptorLength     203
         Report Descriptors: 
           ** UNAVAILABLE **
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x81  EP 1 IN
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0040  1x 64 bytes
        bInterval               8
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x01  EP 1 OUT
        bmAttributes            3
          Transfer Type            Interrupt
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0040  1x 64 bytes
        bInterval               8
Device Status:     0x0001
  Self Powered
```

肝心な**HID Report Descriptor**は** UNAVAILABLE **となっていて、`lsusb`では取得できませんでした。そのため、`usbhid-dump`を用います。
`usbhid-dump`は`sudo apt-get install -y hidrd`で入手できます。

```
pi@raspberrypi:~ $ sudo usbhid-dump -d057e
001:004:000:DESCRIPTOR         1583574828.992958
 05 01 15 00 09 04 A1 01 85 30 05 01 05 09 19 01
 29 0A 15 00 25 01 75 01 95 0A 55 00 65 00 81 02
 05 09 19 0B 29 0E 15 00 25 01 75 01 95 04 81 02
 75 01 95 02 81 03 0B 01 00 01 00 A1 00 0B 30 00
 01 00 0B 31 00 01 00 0B 32 00 01 00 0B 35 00 01
 00 15 00 27 FF FF 00 00 75 10 95 04 81 02 C0 0B
 39 00 01 00 15 00 25 07 35 00 46 3B 01 65 14 75
 04 95 01 81 02 05 09 19 0F 29 12 15 00 25 01 75
 01 95 04 81 02 75 08 95 34 81 03 06 00 FF 85 21
 09 01 75 08 95 3F 81 03 85 81 09 02 75 08 95 3F
 81 03 85 01 09 03 75 08 95 3F 91 83 85 10 09 04
 75 08 95 3F 91 83 85 80 09 05 75 08 95 3F 91 83
 85 82 09 06 75 08 95 3F 91 83 C0
```

### USB GadgetでHIDシミュレート実験

この結果より、configfsを用いてUSB Gadgetを構成し、Pro Controllerをシミュレートします。
configfsを用いたUSBデバイスのUSB Gadget APIでの実装方法は、Linuxの公式ドキュメントにて説明されています。

[Linux USB gadget configured through configfs — The Linux Kernel documentation](https://www.kernel.org/doc/html/v5.3/usb/gadget_configfs.html)

また、HID Report Descriptorは`report_desc`に記すと以下のドキュメントにあります。

[Linux USB HID gadget driver — The Linux Kernel documentation](https://www.kernel.org/doc/html/v5.3/usb/gadget_hid.html#configuration-with-configfs)

これらを参考にした以下のShell Scriptで、Raspberry PiをPro Controllerを模したUSB Gadgetにできます。

Raspbianでは、dwc2モジュールをロードしておくため、/boot/config.txtに`dtoverlay=dwc2`を、/etc/modulesに`dwc2`と`libcomposite`を追記する必要があります。

[firmware/README at 1.20200212 · raspberrypi/firmware](https://github.com/raspberrypi/firmware/blob/1.20200212/boot/overlays/README#L675-L683)

{% gist 60ae253a45e2759451789a117c59acf9 add_procon_gadget.sh %}

Raspberry Pi 4をUSB 2.0 Type-CケーブルでmacOSにつなげた状態でこれを実行すると、以下のようにPro Controllerっぽく認識してくれます。
そしてRaspberry Pi側には、**/dev/hidg0** といったスペシャルファイルが出来上がります。

![macOS USB Pro Controller detected](/assets/images/2020/03/20/macos-usb-info.png)

あとは、**/dev/hidg0** に書き込むデータを準備するまでです。

## 挙動解析

実際にコントローラーからどういったデータが送られているか、挙動をみてみるのが手っ取り早いので、さくっとみてみます。
手元で動かしているMacBook ProとPro ControllerをUSB Type-Cケーブルで接続します。Pro⇄Pro。

macOSで手軽にコントローラーの挙動を調査する方法として、パッと思いついたのがHTML5の[Gamepad API](https://developer.mozilla.org/ja/docs/Web/API/Gamepad_API)。
モダンブラウザではHTML5 APIの一つとしてGamepad APIをサポートしているので、[HTML5 Gamepad Tester](https://html5gamepad.com/)でみてみました。

![chrome screen shot](/assets/images/2020/03/20/html5gamepad-chrome.png)

ChromeではちゃんとGamepad APIで認識しているようです。

### 通信内容

一般的なUSB接続で、またまた一般的なURBでやり取りしているため、一般的なパケットキャプチャーソフトウェアでキャプチャできます。
[Wireshark](https://www.wireshark.org/)の出番です。

macOSではいとも簡単にUSBデバイスキャプチャができるので、公式Wikiを参考に`sudo ifconfig XHC20 up`でXHCインターフェースを有効にし、XHC20インターフェースを対象にキャプチャしてみます。

[CaptureSetup/USB - The Wireshark Wiki](https://wiki.wireshark.org/CaptureSetup/USB#macOS)

USBケーブルを繋げてすぐにMacとPro Controllerが通信を始め、しばらくの手続きののちに、入力データらしき物を返し続けるようになりました。

![wireshark screen shot](/assets/images/2020/03/20/wireshark-pro-con-capture.png)

このとき通信を行っていたのはGoogle Chromeで、Gamepad APIの初期化をUSBデバイス認識時に行っているようでした。

キャプチャしたデータを見てわかったこととして、入力データの通信内容がHID Report Descriptorに記されている定義と違う謎があると言うことです。
いったいどんな謎があるのでしょうか。。深掘りしてみます。

## Pro Controllerの解析

### HID Report Descriptorの謎

先の`usbhid-dump`でダンプしたHID Report Descriptorの内容を、先ほど紹介したHID Usage Tablesで内容を確認すると、一般的なコントローラーとは大きく違うことがわかってきました。
ダンプした内容はUSB-IFのドキュメントを参照して一つ一つデコードして見てみるもよしですが、コピペでデコードしてくれるWebサービスがあるので、それを使ってみてみます。

[USB Descriptor and Request Parser](https://eleccelerator.com/usbdescreqparser/)


デコードした結果は、以下のようになっています。

{% gist 60ae253a45e2759451789a117c59acf9 hid_report_descriptor %}


入力機器からのデータを示すInputの他にOutputがあるのに加え、一番気になるのは、`0x06, 0x00, 0xFF,  //   Usage Page (Vendor Defined 0xFF00)` の部分です。独自のデータ定義が含まれていることを指しています。
これは単純に入力情報だけをUSB Gadget経由で送出していればいいわけではなく、一筋縄ではいかないことを意味しています。

InputとOutputは各Report IDを持つ入出力が何を示すかを記しています。Report IDとは、URBパケットのヘッダを除くデータの1バイト目のことです。
Input、すなわちPro Controllerからのデータを示すReport IDは、`0x81`, `0x21`, `0x30`の3つがあり、Output、すなわちNintendo SwitchからPro Controllerに送られるデータのReport IDは、`0x01`, `0x10`, `0x80`, `0x82`の4つがあることがわかります。

Input Report ID `0x30`にだけ、詳細にどのビットがどの入力を示すかが定義されています。
正しくデコードできていないところをHIDの仕様を元に正すと、下表の通りに入力データの各ビットの値をコントローラの各入力として定義していることがわかりました。

Usage | Usage | Logical Min/Max | Report Size(bits) | Report Count |
---:|---|:---:|:---:|:--:|
`09` | Button | 0/1 | 1 | 10 
`09` | Button | 0/1 | 1 | 4 
- | (blank) | -/- | 1 | 2
`010001` | Pointer | 0/65534 | 16 | 4 |
`010030` | X | (ditto) | (ditto) |  
`010031` | Y | (ditto) | (ditto) |  
`010032` | Z | (ditto) | (ditto) |  
`010035` | Rz | (ditto) | (ditto) |  
`010039` | Hat switch | 0/7 | 4 |  1
`09` | Button | 0/1 | 1 | 4 

これを噛み砕くと、`0x30`で始まるURBのデータは、

- 先頭から10ビットは各種ボタン(A/B/X/Y/L/R/L2/R2/L3/R3かな？)
- 続く4ビットも各種ボタン(-/+/capture/homeかな?)
- 2ビット飛んで
- 左右のJoyスティックのX軸Y軸それぞれを16bitのunsgined short型で4つ
- 十字キーの入力を0-7までの45度ずつで示して
- 謎のボタン4つ

となるはずですが、Wiresharkで観測したデータはこの通りではありませんでした。

一つ例をあげるとこんな感じです。

```
0000   30 df 91 00 80 00 31 28 7c dc 37 7b 0a 00 00 00
0010   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0020   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0030   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
```

これを先ほどまとめたUsageの表の通りにバイナリ表現にして分解して、愚直に解釈しいくと、以下のようになっていると読み取れます。

Bits | Usage | Description |
---:|---|:---:|
`1101111110` | Button | ABXYLRなどのボタンが8つ同時に押されてる
`0100` | Button | ボタンが１つ押されてる
`0000000010000000` | Pointer X | スティックが少し倒されてる
`0000000000110001` | Pointer Y | スティックが少し倒されてる
`0010100001111100` | Pointer Z | スティックが結構倒されてる
`1101110000110111` | Pointer Rz | スティックがものすごく倒されてる
`0111` | Hat switch | 十字キーが315度の位置に入力されている
`1011` | Button | 謎のボタンが3つ押されてる

はい。こんな入力してません。何かがおかしい。

解決の糸口を探すため、何かしらの実装をみてみる必要があります。

### Chromium nintendo_controller実装

Chromeで[HTML5 Gamepad Tester](https://html5gamepad.com/)をみたときは左右のJoyスティックの座標を正しく認識していましたが、この状態でSafariでも見てみるとどうでしょう。

![safari screen shot](/assets/images/2020/03/20/html5gamepad-safari.png)

Joyスティックは正しく表示されない上に、何も操作していなくてもボタンが押されているような挙動をしています。

これはどういうことかと言うと、Chromeの大元となるChromiumの実装には、nintendo_controller.ccといった、Pro Controllerを含む任天堂製のコントローラーのためのドライバーが、ブラウザのレイヤーで実装されているからでした。

対してSafariのベースであるWebKitにはこういった実装がないため、先に示したHID Report Descriptorを愚直に解釈し、その入力値をコントローラー入力としてAPIに出していたためにおかしな挙動をしていたのです。

[chromium/nintendo_controller.cc at 8dda15b2f1c013956e1e7cd75223d617af694694 · chromium/chromium](https://github.com/chromium/chromium/blob/8dda15b2f1c013956e1e7cd75223d617af694694/device/gamepad/nintendo_controller.cc)

このコードから、大まかな初期化処理を行う必要性がわかります。さらに、後述しますが、コントローラーの入力データの謎フォーマットも解けるのです。

まずは初期化処理を、キャプチャしたデータを元に解析していきます。

## リバースエンジニアリング

ChromiumのGemapad APIの実装がどういったやり取りを行っていたかを、Nintendo_Switch_Reverse_Engineeringを参考に紐解いていきます。
WiresharkでキャプチャしたURB Interruptで送受信されているデータは、大まかに以下の5つのパターンでした。

- `80 0X`で始まるChromiumからの要求(Output Report)
- `81 0X`で始まるPro Controllerからの応答(Input Report)
- `01 XX`で始まるChromiumからの要求(Output Report)
- `21 XX`で始まるPro Controllerからの応答(Input Report)
- `30 XX`で始まるPro Controllerからの応答(Input Report)

これらを[chromium/nintendo_controller.cc](https://github.com/chromium/chromium/blob/8dda15b2f1c013956e1e7cd75223d617af694694/device/gamepad/nintendo_controller.cc)と[Nintendo_Switch_Reverse_Engineering/USB-HID-Notes.md](https://github.com/dekuNukem/Nintendo_Switch_Reverse_Engineering/blob/012d8117a3725dcc13374d5844786ca2d650db5f/USB-HID-Notes.md)を元に解き明かしていくと、次のようになっていることがわかりました。

- `80 0X`: ChromiumからのUSB HID初期化要求
  - X=1: Macアドレス要求
  - X=2: ハンドシェイク
  - X=3: baudrate設定
  - X=4: USB HID通信開始
- `81 0X`: Pro ControllerからのUSB HID初期化応答
- `01 XX`: ChromiumからのUART要求
  - XX: カウンター
- `21 XX`: Pro ControllerからのUART応答+コントローラー入力
- `30 XX`: Pro Controllerからのコントローラー入力

UART要求に関しては、11バイト目から[Nintendo_Switch_Reverse_Engineering/bluetooth_hid_subcommands_notes.md](https://github.com/dekuNukem/Nintendo_Switch_Reverse_Engineering/blob/66935b7f456f6724464a53781035d25a215d7caa/bluetooth_hid_subcommands_notes.md)に記載のサブコマンドを送ることで、値の取得や設定を行っていました。


### SwitchとPro Controllerをバイパス

次のようにRaspberry Pi 4とNintendo Switch、そしてPro Controllerを配線します。

![bypass pro controller](/assets/images/2020/03/20/bypass-pro-controller.jpg)

Raspberry Pi 4には、ヒートシンク機能付きケースを付けてあります。
数あるヒートシンク機能付きケースの中でも、HATを固定できるねじ穴が上に出てるのがこの製品にした決め手です。

<a href="https://www.amazon.co.jp/gp/product/B07X47L6DD/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=0a54d809ccd910e81a24a46a564e9077&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07X47L6DD&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon \| Geekworm Raspberry pi 4(ラズベリーパイ4モデルB) CNC超薄型アルミ合金パッシブ冷却金属ケース、ラズパイ4モデルBのみに適用 \| Geekworm \| ベアボーンPC 通販](https://www.amazon.co.jp/gp/product/B07X47L6DD/ref=as_li_ss_tl?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=ea0b8274695e7a1074770a391235d70c&language=ja_JP)


このとき、Raspberry Pi 4に接続したPro Controllerは、hidrawデバイスとして`/dev/hidraw0`にスペシャルファイルができます。
これに対してHIDのデータをファイルとして読み書きできます。

```
pi@raspberrypi:~ $ sudo dmesg | grep -A7 057e
[ 7201.091044] usb 1-1.3: New USB device found, idVendor=057e, idProduct=2009, bcdDevice= 2.00
[ 7201.091060] usb 1-1.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[ 7201.091074] usb 1-1.3: Product: Pro Controller
[ 7201.091087] usb 1-1.3: Manufacturer: Nintendo Co., Ltd.
[ 7201.091099] usb 1-1.3: SerialNumber: 000000000001
[ 7201.112454] input: Nintendo Co., Ltd. Pro Controller as /devices/platform/scb/fd500000.pcie/pci0000:00/0000:00:00.0/0000:01:00.0/usb1/1-1/1-1.3/1-1.3:1.0/0003:057E:2009.0002/input/input1
[ 7201.114447] hid-generic 0003:057E:2009.0002: input,hidraw0: USB HID v1.11 Joystick [Nintendo Co., Ltd. Pro Controller] on usb-0000:01:00.0-1.3/input0
```

この`/dev/hidraw0`とconfigfsで作った`/dev/hidg0`を相互に繋げると、Nintendo SwitchとPro Controllerでやり取りする通信の間に割り込む事ができます。
割り込んで、URBデータをダンプしてみます。


{% gist 60ae253a45e2759451789a117c59acf9 bypass_procon.py %}

これをroot権限で実行すると、Nintendo SwitchとPro Controllerの間でやり取りしているデータが流れてきます。
`30 XX`で始まるPro Controllerからの入力データが多すぎるので、それを非表示にして初期化処理に絞ってみてみます。

{% gist 60ae253a45e2759451789a117c59acf9 bypass_procon_log.txt %}


この結果をNintendo_Switch_Reverse_Engineeringの資料を元にデコードすると、次のようにやり取りしていることがわかりました。
SPIの部分は、[Nintendo_Switch_Reverse_Engineering/spi_flash_notes.md](https://github.com/dekuNukem/Nintendo_Switch_Reverse_Engineering/blob/66935b7f456f6724464a53781035d25a215d7caa/spi_flash_notes.md)を参考にしました。


Command | SubCommand | Description
:-----:|:----:|----
`08 05` | - | Disable USB HID Joystick report
`08 01` | - | Request Mac Address
`08 02` | - | Handshake
`01 XX` | `03` | [UART] Set input report mode: 48
`08 04` | - | Enable USB HID Joystick report
`01 XX` | `48` | [UART] Enable vibration: False
`01 XX` | `02` | [UART] Request device info
`01 XX` | `08` | [UART] Set shipment low power state
`01 XX` | `10` | [SPI] "Serial number" Len: 16
`01 XX` | `10` | [SPI] "Controller Color" Len: 13
`01 XX` | `01` | [UART] Bluetooth manual pairing
`01 XX` | `03` | [UART] Set input report mode: 48
`01 XX` | `04` | [UART] Trigger buttons elapsed time
`01 XX` | `10` | [SPI] "Factory Sensor and Stick parameter" Len: 24
`01 XX` | `10` | [SPI] "Stick Data" Len: 18
`01 XX` | `10` | [SPI] "Analog sticks Calibration" Len: 24
`01 XX` | `10` | [SPI] "Factory configuration & calibration 2" Len: 25
`01 XX` | `10` | [SPI] "6-Axis Calibration" Len: 24
`01 XX` | `40` | [UART] Enable IMU: True
`01 XX` | `48` | [UART] Enable vibration: True
`01 XX` | `21` | [UART] Set NFC/IR MCU configuration: 33
`01 XX` | `30` | [UART] Set player lights: 1


最低限、初期化処理でこれらのやり取りが完了できれば、Pro ControllerとしてNintendo Switchが認識してくれるでしょう。

ダンプしたデータを流用し、対応する応答が返せるようにします。

### 入力データ

初期化処理の次は、入力データを紐解きます。
Pro Controllerからのボタンの入力データは、**`08 04` Enable USB HID Joystick report**がSwitchからPro Controllerに送られると、一秒間におよそ80回の周期で`30 XX`で始まるURBをPro Controllerが送りつけてくるようになります。

この`30 XX`で始まるデータは、前途の通りHID Report Descriptorで通知されている通りではないので、どういった定義で値が意味をなしているかを通信からは断定できません。
ですが、先のchromiumのnintendo_controllerのソースコードに、どのビットがどのボタンであるかなど定義を読み取るれる実装がありました。


<table style="text-align: center">
    <thead>
        <tr>
            <th>Bytes/Bits</th>
            <th>7</th>
            <th>6</th>
            <th>5</th>
            <th>4</th>
            <th>3</th>
            <th>2</th>
            <th>1</th>
            <th>0</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>0x00</th>
            <td colspan="8">0x30</td>
        </tr>
        <tr>
            <th>0x01</th>
            <td colspan="8">timestamp</td>
        </tr>
        <tr>
            <th>0x02</th>
            <td colspan="4" style="border-right: 1px solid #8f8f8f">connection_info</td>
            <td colspan="4">battery_level</td>
        </tr>
        <tr>
            <th>0x03</th>
            <td>ZR</td>
            <td>R</td>
            <td>SR(right)</td>
            <td>SL(right)</td>
            <td>A</td>
            <td>B</td>
            <td>X</td>
            <td>Y</td>
        </tr>
        <tr>
            <th>0x04</th>
            <td>Grip</td>
            <td>(none)</td>
            <td>Cap</td>
            <td>Home</td>
            <td>ThumbL</td>
            <td>ThumbR</td>
            <td>+</td>
            <td>-</td>
        </tr>
        <tr>
            <th>0x05</th>
            <td>ZL</td>
            <td>L</td>
            <td>SL(left)</td>
            <td>SR(left)</td>
            <td>Left</td>
            <td>Right</td>
            <td>Up</td>
            <td>Down</td>
        </tr>
        <tr>
            <th>0x06</th>
            <td colspan="8">analog[0]</td>
        </tr>
        <tr>
            <th>0x07</th>
            <td colspan="8">analog[1]</td>
        </tr>
        <tr>
            <th>0x08</th>
            <td colspan="8">analog[2]</td>
        </tr>
        <tr>
            <th>0x09</th>
            <td colspan="8">analog[3]</td>
        </tr>
        <tr>
            <th>0x0a</th>
            <td colspan="8">analog[4]</td>
        </tr>
        <tr>
            <th>0x0b</th>
            <td colspan="8">analog[5]</td>
        </tr>
    </tbody>
</table>


## Raspberry Piでシミュレート

ここまで集めた情報でPro Controllerをシミュレートするに必要なものは揃いました。
これを元に、Raspberry Pi 4でPro Controllerをシミュレートできるかどうかを試してみます。

### 1.3inch LCD HATでの入力

まずは小さい構成で動くかどうかです。
入力はWaveshareのディスプレイ付きHATのボタン入力を使います。

[1.3inch IPS LCD display HAT for Raspberry Pi, 240x240 pixels, SPI interface](https://www.waveshare.com/1.3inch-lcd-hat.htm)

![connect Raspberry Pi to Switch](/assets/images/2020/03/20/connect-pi-to-switch.jpg)

パッドの上下左右の入力はそのまま十字キーへ、押し込みを+、KEY1,KEY2,KEY3を順にA,B,Homeに割り当てます。
ついでにコントローラーの色を変えられるっぽかったので、Raspberry Piカラーにしてみました。
上の写真にも写ってる通り、USB接続として認識されたコントローラーのボディがラズベリーカラーで、ボタンが葉っぱグリーンになってます。

{% gist 60ae253a45e2759451789a117c59acf9 simulate_procon.py %}

動かしてみると、期待通りちゃんとコントローラーとして認識され、操作できました。

![Input from Raspberry Pi](/assets/images/2020/03/20/raspberry-pi-lcd-hat-input.jpg)


### スマホからの入力

あとはWi-Fi経由でスマホをRaspberry Piに接続し、入力をエミュレートすれば良いだけです。

バックエンドの言語はCで、ライブラリは、スマホとの通信に[h2o](https://github.com/h2o/h2o)と[wslay](https://github.com/tatsuhiro-t/wslay)を、JSONパーサーに[jansson](https://github.com/akheron/jansson)、USB Gadgetの作成と接続に[libusbgx](https://github.com/libusbgx/libusbgx)を、USB Gadgetの監視に[libevent](https://libevent.org/)を用いました。
フロントエンドはHTML5+JavaScriptで、全画面表示のためにPWA技術を、コントローラーの描画に[pixi.js](https://www.pixijs.com/)を用いました。

バックエンドをGoやRustなどのモダン言語を使わなかったのは、ちょっとまだ追加で実装したいものがある関係で、あえてCを選んだが故です。

**追記(2020/05/09)** やっぱりCで書くの辛くなってきたのでGoで書き直した。
[mzyy94/nscon: Nintendo Switch Controller simulator written in go](https://github.com/mzyy94/nscon)
{: .notice--info}

実際に動作している様子がこちら。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">スマホをNintendo Switchのコントローラーにできたやつ <a href="https://t.co/cM9BgcWktl">pic.twitter.com/cM9BgcWktl</a></p>&mdash; 咳4週間 (@mzyy94) <a href="https://twitter.com/mzyy94/status/1240606803093671937?ref_src=twsrc%5Etfw">March 19, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## まとめ

これでコントローラーが見つからなくてもスマホがあればどうぶつの森ができるようになりました。やったね。
まあスマホもよくなくすんですけどね。

---

### 参考リンク

- [linux/gadget-testing.rst at a2d79c7174aeb43b13020dd53d85a7aefdd9f3e5 · torvalds/linux](https://github.com/torvalds/linux/blob/a2d79c7174aeb43b13020dd53d85a7aefdd9f3e5/Documentation/usb/gadget-testing.rst)
- [chromium/keyboard_gadget.py at 2ca8c5037021c9d2ecc00b787d58a31ed8fc8bcb · chromium/chromium](https://github.com/chromium/chromium/blob/2ca8c5037021c9d2ecc00b787d58a31ed8fc8bcb/tools/usb_gadget/keyboard_gadget.py)
- [Hori Pad for Nintendo Switch USB Descriptor (dumped through lsusb)](https://gist.github.com/jwiki95/86dcf36103ce799b3e262ed7b4245da6)
- [HID Protocol for Bluetooth / USB · Issue #7 · dekuNukem/Nintendo_Switch_Reverse_Engineering](https://github.com/dekuNukem/Nintendo_Switch_Reverse_Engineering/issues/7)
- [HID-Joy-Con-Whispering/hidtest.cpp at master · shinyquagsire23/HID-Joy-Con-Whispering](https://github.com/shinyquagsire23/HID-Joy-Con-Whispering/blob/master/hidtest/hidtest.cpp)
