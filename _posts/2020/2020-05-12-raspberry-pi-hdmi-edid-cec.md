---
title: "Raspberry PiでHDMIディスプレイを調査する[EDID/CEC]"
date: 2020-05-12 02:00:00 +0900
published: true
toc: true
category: Multimedia 
tags: hdmi cec edid
header:
  image: /assets/images/2020/05/12/hdmi.jpg
---

みなさん、テレビやディスプレイに備わるHDMIの情報を確認する必要に迫られることはありませんか？
1年に一度くらいはありますよね。映像がうまく映らなかったり、操作がうまくいかなかったり。
そんな時にパッとHDMIの情報を確認できるようになっておくべく、Raspberry PiとHDMIケーブルで調査できるようになっておきましょう。

はい、今回はRaspberry PiとHDMI EDID/CECの話。

<!-- more -->


## HDMI

HDMIには映像と音声の他に、様々な情報がやり取りされています。
イーサネット通信機能やHDMI入力端子から音声を出力して送り返す（！？）ARCなど、あげたらキリがないほど機能てんこ盛りです。

全ての機能に関する仕様書は[HDMI.org](https://www.hdmi.org/)でメンバー登録してライセンス料を払うことで入手できるそうですが、ちょこっとHDMIについて知りたい場合は大袈裟すぎます。
一般人にはWikipediaでも読んで知ったつもりになるくらいで十分です。私もWikipediaで知ったつもりになりました。

[HDMI - Wikipedia](https://ja.wikipedia.org/wiki/HDMI)

このWikipediaの概要に、以下に引用した興味深い一文が掲載されています。

> 物理層はTMDS ([Transition Minimized Differential Signaling](https://ja.wikipedia.org/wiki/Transition_Minimized_Differential_Signaling))、信号の暗号化はHDCP ([High-bandwidth Digital Content Protection](https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%94%E3%83%BC%E3%82%AC%E3%83%BC%E3%83%89#HDCP%EF%BC%88High-bandwidth_Digital_Content_Protection%EF%BC%89))、機器間認証はEDID ([Extended display identification data（英語版）](https://en.wikipedia.org/wiki/Extended_Display_Identification_Data))、系全体の制御系接続はCEC ([Consumer Electronics Control（英語版）](https://en.wikipedia.org/wiki/Consumer_Electronics_Control)) が採用されている。

映像と音声の伝送のほかに、機器間認証はEDIDを、制御系接続はCECを用いているとのことです。ふむふむ。

### EDID

[Extended Display Identification Data - Wikipedia（英語版）](https://en.wikipedia.org/wiki/Extended_Display_Identification_Data)

表まで使って色々と詳しく説明されていますが、噛み砕いてEDIDについて説明すると、ディスプレイの機能について出力機器に伝えるためのメタデータです。
VESAの規格に従って、対応解像度や対応周波数、メーカー名やシリアルナンバーなどが記述されています。

WindowsやmacOSがディスプレイに接続して映像を出力する時、このEDIDに記述されている対応映像情報を元に、映像出力解像度やフレームレートなどが決定されています。
Raspbianも同じくして、接続されたHDMIディスプレイのEDIDを確認しています。


### CEC

[Consumer Electronics Control - Wikipedia（英語版）](https://en.wikipedia.org/wiki/Consumer_Electronics_Control)

[CEC (Consumer Electronics Control) over HDMI - eLinux.org](https://elinux.org/CEC_(Consumer_Electronics_Control)_over_HDMI)

CECはディスプレイを操作するコントローラーで、機器を制御するものです。
テレビリモコンでAmazon Fire TVを操作したり、テレビの電源に連動してゲーム機がスリープに移行する機能はCECによるものです。

[昔紹介した](../2015/2015-08-08-pvr-chinachu-addon.md)エンターテイメントシステムの[Kodi](https://kodi.tv)もCECをサポートしています。

[CEC - Official Kodi Wiki](https://kodi.wiki/view/CEC)

Wikiにも紹介がありますが、Kodiが直接CECの実装を持っているのではなく、Pulse-EightのlibCECを用いてリモコンでの操作を可能としています。

[Pulse-Eight/libcec: USB CEC Adapter communication Library http://libcec.pulse-eight.com/](https://github.com/Pulse-Eight/libcec)

## Raspberry PiのHDMI出力

Raspberry PiのHDMI出力は、ブートローダーであり心臓部でもあるVideoCore(GPU)に直結していることもあって、レジスタ操作によってHDMIの情報にアクセスできるようになっています。

[BCM2711 datasheet ARM Peripherals](https://www.raspberrypi.org/documentation/hardware/raspberrypi/bcm2711/rpi_DATA_2711_1p0.pdf)

ただ、画面出力目的ではなくHDMIの調査目的にHDMI出力端子を使うには、VideoCoreの設定をいくつかカスタマイズする必要があります。
設定方法は恒例の**/boot/config.txt**の編集です。

ドキュメントがこちらもRaspberry Pi財団によって用意されているので参照しながら設定していきます。

[Video options in config.txt - Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/configuration/config-txt/video.md)

### HDMIの強制設定

```
hdmi_drive=2
```

> **hdmi_drive**
>
> The `hdmi_drive` command allows you to choose between HDMI and DVI output modes.
> 
> hdmi_drive | result
> :---|:---
> 1 | Normal DVI mode (no sound)
> 2 | Normal HDMI mode (sound will be sent if supported and enabled)

_引用元: [Video options in config.txt - Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/configuration/config-txt/video.md)_

HDMIはDVIと一部互換のため、DVIとして音声のない映像のみを取り扱う信号をやり取りすることもできます。
今回はHDMI信号としての情報に限って調べるため、ノイズを減らすためにHDMI信号を扱うようにしておきます。

### ホットプラグ対応

```
hdmi_force_hotplug=1
```

> **hdmi_force_hotplug**
>
> Setting `hdmi_force_hotplug` to `1` pretends that the HDMI hotplug signal is asserted, so it appears that a HDMI display is attached. In other words, HDMI output mode will be used, even if no HDMI monitor is detected.

_引用元: [Video options in config.txt - Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/configuration/config-txt/video.md)_

抜き差ししていろいろなディスプレイを調査する時や、Raspberry Piが起動してからディスプレイを接続するとき、これを有効にしておく必要があります。

### 初期CEC無効化

```
hdmi_ignore_cec_init=1
```

> **hdmi_ignore_cec_init**
>
> Setting `hdmi_ignore_cec_init` to `1` will stop the initial active source message being sent during bootup. This prevents a CEC-enabled TV from coming out of standby and channel-switching when you are rebooting your Raspberry Pi.

_引用元: [Video options in config.txt - Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/configuration/config-txt/video.md)_

Raspberry PiのHDMIは、Raspberry Piの起動時にディスプレイにCECの信号を送ってスタンバイから復帰させる機能があります。
HDMI情報の調査目的でRaspberry Piを繋げて起動すると、勝手にCECの信号を送られて困るシチュエーションもあるので、そういう場合にオフにします。

### ブースト

> **config_hdmi_boost**
>
> Configures the signal strength of the HDMI interface. The minimum value is `0` and the maximum is `11`.
> 
> The default value for the original Model B and A is `2`. The default value for the Model B+ and all later models is `5`.
> 
> If you are seeing HDMI issues (speckling, interference) then try `7`. Very long HDMI cables may need up to `11`, but values this high should not be used unless absolutely necessary.
> 
> This option is ignored on the Raspberry Pi 4.

_引用元: [Video options in config.txt - Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/configuration/config-txt/video.md)_

信号がうまく取れなかったりするときは`config_hdmi_boost`の値を変えるといいらしい。Raspberry Pi 4では動かないので効果の程はわからないです。


## EDID調査

EDIDからディスプレイの情報を取得してみます。

### EDIDのダンプ

Raspbianには`tvservice`コマンドが標準で用意されており、HDMI接続機器の情報を取得できます。EDIDのダンプもできます。
シンボリックリンクを経由したものがPATHに通っていますが、VideoCoreのレジスタを叩くためのコマンドであることから、**/opt/vc/bin/**にあります。

そしてドキュメントがRaspberry Pi財団によってWebに公開されています。（manは用意されていない。）

[tvservice - Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/raspbian/applications/tvservice.md)

Raspberry Pi起動後に接続したディスプレイに対しては、`-d`（ダンプEDID）オプション以外動いてくれません。
まあ`-d`オプションが動いてくれれば目的のEDIDのダンプは取れるので、十分です。
  
![tvservice help](/assets/images/2020/05/12/tvservice-help.png)

<!--
```
pi@raspberrypi:/tmp $ tvservice -h
Usage: tvservice [OPTION]...
  -p, --preferred                   Power on HDMI with preferred settings
  -e, --explicit="GROUP MODE DRIVE" Power on HDMI with explicit GROUP (CEA, DMT, CEA_3D_SBS, CEA_3D_TB, CEA_3D_FP, CEA_3D_FS)
                                      MODE (see --modes) and DRIVE (HDMI, DVI)
  -t, --ntsc                        Use NTSC frequency for HDMI mode (e.g. 59.94Hz rather than 60Hz)
  -c, --sdtvon="MODE ASPECT [P]"    Power on SDTV with MODE (PAL or NTSC) and ASPECT (4:3 14:9 or 16:9) Add P for progressive
  -o, --off                         Power off the display
  -m, --modes=GROUP                 Get supported modes for GROUP (CEA, DMT)
  -M, --monitor                     Monitor HDMI events
  -s, --status                      Get HDMI status
  -a, --audio                       Get supported audio information
  -d, --dumpedid <filename>         Dump EDID information to file
  -j, --json                        Use JSON format for --modes output
  -n, --name                        Print the device ID from EDID
  -l, --list                        List all attached devices
  -v, --device                      Specify the device to use (see --list)
  -h, --help                        Print this information
```
-->

HDMIケーブルでRaspberry Piとテレビを繋げてEDIDをダンプしてみます。対象は、[1年半前に買った格安65インチ4Kテレビ](../2018/2018-11-29-lowcost-65-4k-hdr-tv.md)です。
stdoutとかには出力できないので、ファイルに出力してあげます。

```
pi@raspberrypi:~ $ tvservice -d /tmp/edid.bin
Written 256 bytes to /tmp/edid.bin
```

出力したEDIDファイルは、以下のようになっています。
これだけ見るとなんのこっちゃわかりませんね。

![edid dump](/assets/images/2020/05/12/edid-dump.png)


<!--```
pi@raspberrypi:~ $ file /tmp/edid.bin 
edid.bin: EDID data, version 1.3
pi@raspberrypi:~ $ xxd /tmp/edid.bin 
00000000: 00ff ffff ffff ff00 4d79 2900 0101 0101  ........My).....
00000010: 301b 0103 8080 4878 0ada ffa3 584a a229  0.....Hx....XJ.)
00000020: 1749 4b20 0800 3140 6140 0101 0101 0101  .IK ..1@a@......
00000030: 0101 0101 0101 08e8 0030 f270 5a80 b058  .........0.pZ..X
00000040: 8a00 ba88 2100 001e 023a 8018 7138 2d40  ....!....:..q8-@
00000050: 582c 4500 ba88 2100 001e 0000 00fc 0054  X,E...!........T
00000060: 562d 6d6f 6e69 746f 720a 2020 0000 00fd  V-monitor.  ....
00000070: 0017 3d0f 883c 000a 2020 2020 2020 0169  ..=..<..      .i
00000080: 0203 47f0 5710 1f05 1420 2122 0413 0312  ..G.W.... !"....
00000090: 0716 5d5e 5f62 6364 6160 6665 2309 0701  ..]^_bcda`fe#...
000000a0: 6e03 0c00 1000 383c 2f00 8001 0203 0467  n.....8</......g
000000b0: d85d c401 7880 03e2 00c9 e305 e000 e40f  .]..x...........
000000c0: 0000 78e3 0607 0166 2156 aa51 001e 3046  ..x....f!V.Q..0F
000000d0: 8f33 00ba 8821 0000 1e00 0000 0000 0000  .3...!..........
000000e0: 0000 0000 0000 0000 0000 0000 0000 0000  ................
000000f0: 0000 0000 0000 0000 0000 0000 0000 00e2  ................
```-->


### EDID解析

Raspbianには`tvservice`とセットで同じ場所に`edidparser`コマンドがあり、これで先ほどのEDIDファイルを読める形にできます。

{% gist 9e9c3a23d84f7167d07a4e7939c85d1d edidparser%20edid.bin %}

<!--

```
pi@raspberrypi:~ $ edidparser /tmp/edid.bin 
Enabling fuzzy format match...
Parsing edid.bin...
HDMI:EDID version 1.3, 1 extensions, screen size 128x72 cm
HDMI:EDID features - videodef 0x80 !standby !suspend !active off; colour encoding:RGB444|YCbCr422; sRGB is not default colourspace; preferred format is native; does not support GTF
HDMI:EDID found monitor name descriptor tag 0xfc
HDMI:EDID monitor name is TV-monitor
HDMI:EDID found monitor range descriptor tag 0xfd
HDMI:EDID monitor range offsets: V min=0, V max=0, H min=0, H max=0
HDMI:EDID monitor range: vertical is 23-61 Hz, horizontal is 15-136 kHz, max pixel clock is 600 MHz
HDMI:EDID monitor range does not support GTF
HDMI:EDID found preferred CEA detail timing format: 3840x2160p @ 60 Hz (97)
HDMI:EDID found CEA detail timing format: 1920x1080p @ 60 Hz (16)
HDMI:EDID established timing I/II bytes are 20 08 00
HDMI:EDID found DMT format: code 4, 640x480p @ 60 Hz in established timing I/II
HDMI:EDID found DMT format: code 16, 1024x768p @ 60 Hz in established timing I/II
HDMI:EDID standard timings block x 8: 0x3140 6140 0101 0101 0101 0101 0101 0101 
HDMI:EDID found DMT format: code 4, 640x480p @ 60 Hz (4:3) in standard timing 0
HDMI:EDID found DMT format: code 16, 1024x768p @ 60 Hz (4:3) in standard timing 1
HDMI:EDID parsing v3 CEA extension 0
HDMI:EDID monitor support - underscan IT formats:yes, basic audio:yes, yuv444:yes, yuv422:yes, #native DTD:0
HDMI:EDID found DMT detail timing format: 1366x768p @ 60 Hz (81)
HDMI:EDID found CEA format: code 16, 1920x1080p @ 60Hz 
HDMI:EDID found CEA format: code 31, 1920x1080p @ 50Hz 
HDMI:EDID found CEA format: code 5, 1920x1080i @ 60Hz 
HDMI:EDID found CEA format: code 20, 1920x1080i @ 50Hz 
HDMI:EDID found CEA format: code 32, 1920x1080p @ 24Hz 
HDMI:EDID found CEA format: code 33, 1920x1080p @ 25Hz 
HDMI:EDID found CEA format: code 34, 1920x1080p @ 30Hz 
HDMI:EDID found CEA format: code 4, 1280x720p @ 60Hz 
HDMI:EDID found CEA format: code 19, 1280x720p @ 50Hz 
HDMI:EDID found CEA format: code 3, 720x480p @ 60Hz 
HDMI:EDID found CEA format: code 18, 720x576p @ 50Hz 
HDMI:EDID found CEA format: code 7, 1440x480i @ 60Hz 
HDMI:EDID found CEA format: code 22, 1440x576i @ 50Hz 
HDMI:EDID found CEA format: code 93, 3840x2160p @ 24Hz 
HDMI:EDID found CEA format: code 94, 3840x2160p @ 25Hz 
HDMI:EDID found CEA format: code 95, 3840x2160p @ 30Hz 
HDMI:EDID found CEA format: code 98, 4096x2160p @ 24Hz 
HDMI:EDID found CEA format: code 99, 4096x2160p @ 25Hz 
HDMI:EDID found CEA format: code 100, 4096x2160p @ 30Hz 
HDMI:EDID found CEA format: code 97, 3840x2160p @ 60Hz 
HDMI:EDID found CEA format: code 96, 3840x2160p @ 50Hz 
HDMI:EDID found CEA format: code 102, 4096x2160p @ 60Hz 
HDMI:EDID found CEA format: code 101, 4096x2160p @ 50Hz 
HDMI:EDID found audio format 2 channels PCM, sample rate: 32|44|48 kHz, sample size: 16 bits
HDMI:EDID found HDMI VSDB length 14
HDMI:EDID HDMI VSDB has physical address 1.0.0.0
HDMI:EDID HDMI VSDB supports AI:no, dual link DVI:no
HDMI:EDID HDMI VSDB deep colour support - 48-bit:no 36-bit:yes 30-bit:yes DC_yuv444:yes
HDMI:EDID HDMI VSDB max TMDS clock 300 MHz
HDMI:EDID HDMI VSDB content type support: game|cinema|photo|text
HDMI:EDID HDMI VSDB supports extended resolutions 1,2,3,4
HDMI:EDID ignoring non HDMI VSDB with IEEE reg 0xc45dd8
HDMI:EDID found Video Capability DB length 2
HDMI:EDID video capability: CE:1 IT:2 PT:0 QS:3
HDMI:EDID extended data block tag 0x05 length 3 not supported
HDMI:EDID extended data block YCbCr420CapMap - length 4
HDMI:EDID extended data block tag 0x06 length 3 not supported
HDMI:EDID adding mandatory support for CEA (1) 640x480p @ 60Hz
HDMI:EDID adding mandatory support for CEA (2) 720x480p @ 60Hz
HDMI:EDID adding mandatory support for CEA (17) 720x576p @ 50Hz
HDMI:EDID filtering formats with pixel clock unlimited MHz or h. blanking unlimited
HDMI:EDID best score mode initialised to CEA (1) 640x480p @ 60 Hz with pixel clock 25 MHz (score 0)
HDMI:EDID best score mode is now CEA (1) 640x480p @ 60 Hz with pixel clock 25 MHz (score 61864)
HDMI:EDID best score mode is now CEA (2) 720x480p @ 60 Hz with pixel clock 27 MHz (score 66472)
HDMI:EDID CEA mode (3) 720x480p @ 60 Hz with pixel clock 27 MHz has a score of 66472
HDMI:EDID best score mode is now CEA (4) 1280x720p @ 60 Hz with pixel clock 74 MHz (score 135592)
HDMI:EDID DMT mode (4) 640x480p @ 60 Hz with pixel clock 25 MHz has a score of 43432
HDMI:EDID best score mode is now CEA (5) 1920x1080i @ 60 Hz with pixel clock 74 MHz (score 149416)
HDMI:EDID CEA mode (7) 1440x480i @ 60 Hz with pixel clock 27 MHz has a score of 45736
HDMI:EDID best score mode is now CEA (16) 1920x1080p @ 60 Hz with pixel clock 148 MHz (score 4773832)
HDMI:EDID DMT mode (16) 1024x768p @ 60 Hz with pixel clock 65 MHz has a score of 72185
HDMI:EDID CEA mode (17) 720x576p @ 50 Hz with pixel clock 27 MHz has a score of 66472
HDMI:EDID CEA mode (18) 720x576p @ 50 Hz with pixel clock 27 MHz has a score of 66472
HDMI:EDID CEA mode (19) 1280x720p @ 50 Hz with pixel clock 74 MHz has a score of 117160
HDMI:EDID CEA mode (20) 1920x1080i @ 50 Hz with pixel clock 74 MHz has a score of 128680
HDMI:EDID CEA mode (22) 1440x576i @ 50 Hz with pixel clock 27 MHz has a score of 45736
HDMI:EDID CEA mode (31) 1920x1080p @ 50 Hz with pixel clock 148 MHz has a score of 232360
HDMI:EDID CEA mode (32) 1920x1080p @ 24 Hz with pixel clock 74 MHz has a score of 124532
HDMI:EDID CEA mode (33) 1920x1080p @ 25 Hz with pixel clock 74 MHz has a score of 128680
HDMI:EDID CEA mode (34) 1920x1080p @ 30 Hz with pixel clock 74 MHz has a score of 149416
HDMI:EDID DMT mode (81) 1366x768p @ 60 Hz with pixel clock 85 MHz has a score of 4062945
HDMI:EDID CEA mode (93) 3840x2160p @ 24 Hz with pixel clock 297 MHz has a score of 423130
HDMI:EDID CEA mode (94) 3840x2160p @ 25 Hz with pixel clock 297 MHz has a score of 439720
HDMI:EDID CEA mode (95) 3840x2160p @ 30 Hz with pixel clock 297 MHz has a score of 522664
HDMI:EDID CEA mode (96) 3840x2160p @ 50 Hz with pixel clock 594 MHz has a score of 356776
HDMI:EDID best score mode is now CEA (97) 3840x2160p @ 60 Hz with pixel clock 594 MHz (score 5622196)
HDMI:EDID CEA mode (98) 4096x2160p @ 24 Hz with pixel clock 297 MHz has a score of 224065
HDMI:EDID CEA mode (99) 4096x2160p @ 25 Hz with pixel clock 297 MHz has a score of 232360
HDMI:EDID CEA mode (100) 4096x2160p @ 30 Hz with pixel clock 297 MHz has a score of 273831
HDMI:EDID CEA mode (101) 4096x2160p @ 50 Hz with pixel clock 594 MHz has a score of 190888
HDMI:EDID CEA mode (102) 4096x2160p @ 60 Hz with pixel clock 594 MHz has a score of 224065
HDMI0:EDID preferred mode remained as CEA (97) 3840x2160p @ 60 Hz with pixel clock 594 MHz
HDMI:EDID has HDMI support and audio support
edidparser exited with code 0
pi@raspberrypi:~ $ 
```
-->

このパース結果から、以下のようなテレビの情報が取得できました。

- 画面サイズ: 128x72 cm
- 製品名: TV-monitor
- 推奨映像モード: 3840x2160p @ 60 Hz 594 MHz
- 対応音声フォーマット: 2 channels PCM, 32\|44\|48 kHz, 16 bits

## CEC調査

次はCEC調査です。
先に紹介した[libCEC](https://github.com/Pulse-Eight/libcec)には、クライアント実装として`cec-client`というCLIツールがセットで提供されています。
これを使ってCECの調査ができます。
libCECをビルドするか、`sudo apt install cec-utils`で`cec-client`が手に入ります。

`cec-client`はログ出力がモリモリでうるさいので、`-d`オプションで必要なレベルまで下げます。
普段使いは`-d 1`です。

```cpp
typedef enum cec_log_level
{
  CEC_LOG_ERROR   = 1,
  CEC_LOG_WARNING = 2,
  CEC_LOG_NOTICE  = 4,
  CEC_LOG_TRAFFIC = 8,
  CEC_LOG_DEBUG   = 16,
  CEC_LOG_ALL     = 31
} cec_log_level;
```
[libcec/cectypes.h#L828-L836 at libcec-5.0.0](https://github.com/pulse-eight/libcec/blob/libcec-5.0.0/include/cectypes.h#L828-L836)


コマンドを`-s`オプションに続けて標準入力から与えることで、CECの調査ができます。
コマンドの一覧は`echo help | cec-client -d 1 -s`でわかります。

### 接続機器の一覧

```
echo "scan" | cec-client -d 1 -s
```

同じディスプレイに繋がっていて、CECの疎通ができるデバイスの一覧を`scan`コマンドで列挙できます。
認識されているデバイスを確認することができます。

![list of hdmi devices](/assets/images/2020/05/12/list-of-devices.png)

<!--
```
pi@raspberrypi:~ $ echo scan | cec-client -d 1 -s
log level set to 1
opening a connection to the CEC adapter...
requesting CEC bus information ...
CEC bus information
===================
device #0: TV
address:       0.0.0.0
active source: no
vendor:        Unknown
osd string:    TV
CEC version:   1.4
power status:  on
language:      jpn


device #1: Recorder 1
address:       1.0.0.0
active source: no
vendor:        Pulse Eight
osd string:    CECTester
CEC version:   1.4
power status:  on
language:      eng


device #4: Playback 1
address:       4.0.0.0
active source: no
vendor:        Unknown
osd string:    AppleTV
CEC version:   unknown
power status:  standby
language:      ???


device #8: Playback 2
address:       2.0.0.0
active source: no
vendor:        Sony
osd string:    PlayStation 4
CEC version:   1.3a
power status:  standby
language:      ???


device #B: Playback 3
address:       3.0.0.0
active source: yes
vendor:        Unknown
osd string:    NintendoSwitch
CEC version:   1.3a
power status:  on
language:      ???


currently active source: Playback 3 (11)

```
-->

この列挙されている各デバイスの、`device #`の後に続く16進数がバスアドレスです。


### テレビのスリープ


```
echo "standby 0" | cec-client -d 1 -s
```

テレビのバスアドレスはよっぽどのことがない限り`0`なので、アドレス`0`に向かって`standby`コマンドを叩けば、ほとんの環境でテレビをスリープできます。

### デバイスのスリープ

```
echo "standby B" | cec-client -d 1 -s
```

先ほどのscanでバスアドレス`B`のNintendo Switchがアクティブなので、スリープさせてみます。
スリープしました。

### デバイスの復帰


```
echo "on 4" | cec-client -d 1 -s
```

これも指定したバスアドレスの機器をonにできます。
Nintendo SwitchはスリープしたらCECが切断されてしまったので、AppleTVを付けてみました。付きました。


### CECの監視

```
cec-client -m
```

流れているCECフレームを監視できます。
監視中にリモコンでテレビの画面を消してみました。

![monitor cec of standby tv](/assets/images/2020/05/12/monitor-cec.png)


**>> 0f:36** とトラフィックが流れてきているのがログに現れています。
CECのフレームは送信元4ビット、宛先4ビット、コード8ビット、それに続いて引数がつく形で表されます。
この0f:36は次のように分解できます。

- 送信元アドレス `0` テレビ
- 宛先アドレス `f` ブロードキャスト（全体）
- コード `36` standby（スタンバイ）

libCECで扱っているコードは、cectypes.hに記載があります。

[libcec/cectypes.h at libcec-5.0.0 · Pulse-Eight/libcec](https://github.com/pulse-eight/libcec/blob/libcec-5.0.0/include/cectypes.h#L749-L826)


### CECフレームの送信

```
echo "tx 10:04" | cec-client -d 1 -s
```

データ構造がわかると、CECフレームを生で送って調査したくなりますね。
そんな時に役に立つのが、CECフレームパーサ・ジェネレーターWebアプリケーションの[CEC-O-MATIC](http://www.cec-o-matic.com/)。
先ほどの監視したフレームのトラフィックもパースできます。

![cec-o-matic](/assets/images/2020/05/12/cec-o-matic.png)

**10:04**を送ってみました。

- 送信元アドレス `1` Raspberry Pi
- 宛先アドレス `0` テレビ
- コード `04` on

テレビがつきました。

## まとめ

HDMIのEDIDを調査することで、ディスプレイやテレビが対応している映像モードや音声のチャンネル数などがわかります。
映像が映らない時、出力する機器が対応しているモードがないなんてことが稀にありますが、これで確認できますね。

CECの調査では、デバイスと連動してスリープにちゃんと移行しない場合など、どのようなCECフレームがやり取りされているかを確認できます。
また、どのようなフレームを送るとどういった挙動をするのか、動作確認にも使えますね。

これらのツールでみなさん良いHDMI調査ライフを〜