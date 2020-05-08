---
title: クリスマスなのでLinuxでQSVエンコードする
date: 2015-12-21 23:58:29 +0900
category: Multimedia
tags: ffmpeg imss qsv xeon linux
header:
  image: /assets/images/2015/12/21/ffmpeg-cmd.png
---

こちらは[DTV Advent Calendar](http://www.adventar.org/calendars/835) 21日目の記事です。

みなさん録画データの管理はどうしていますか？
視聴したら消す人もいれば、視聴しても残しておく人、視聴してない詰みTSがたくさんある人、いろいろあると思います。
残しておけば不慮の事故がない限り、いつでも見返すことができますが、どんどんとHDDの空き容量が少なくなっていくのが現実です。
私は録画データは変換せずに取って置く人間なので、Disk fullで録画失敗した回数は数知れず、これまで2年間で10TB超の録画が溜まっています。
年末の大掃除も兼ねて、いくつか録画データを削除したくもなかなか踏み切れず、結局空き容量は一つも増えていません。

これでは年始の相棒スペシャルが録画できないので、録画データを消さずに空き容量を増やさなければなりません。
そこで考えられるのが動画のエンコード。DTV Advent Calendar経由でこの記事に他取り付いた人にとっては当たり前のことかもしれませんが、録画データをH.264エンコードして保管することにしました。

そこで検討する必要があるのがエンコード方法。
地デジにおいてはx264を用いたソフトウェアエンコードが一般的なようですが、他にもNVidia製GPUを用いたnvencやIntel CPUに搭載のグラフィックプロセッサによるQuick Sync Video(QSV)などがあります。
Linuxにおいてはffmpeg/x264のソフトウェアエンコードの方法ばかりがWebに蔓延する中、他の方法はほとんど取り上げられていません。寂しいです。

前置きが長くなりましたが、LinuxでQSVエンコードする方法をご紹介します。

<!-- more -->

## FFmpegによるLinuxでのQSVエンコード

今年の頭に書いた記事でもLinuxでのQSVを取り上げました(../2015/2015-01-30-intel-qsv-on-linux.md#$5))。しかしあれから約１年が経ち、いろいろと変わってきたので
環境の再構築とパッケージの修正などを行いました。
QSVエンコード環境の導入に関して必要なエンコーダーは、自分で用意する必要もなくなり、QSVを利用できる環境も大きく変わりました。

今回紹介するバージョンでは以下の環境でのみ動作します。

|  項目名| 対応環境 |
|:------:|:--------:|
|  CPU   | Haswell/Broadwell Core iシリーズ, Xeon E3 v3/v4 with GPU |
|  OS    | CentOS 7.1 |

### 環境構築

今回構成するシステムは下図のようになっています。


<img src="/assets/images/2015/12/21/recording-server.png" width="640" height="480">


PT3とUSB ICカードリーダーをパススルーした[Chinachu](https://github.com/kanreisa/Chinachu)環境に加えて、Intel HD GraphicsをパススルーしたQSVエンコード用のCentOSを[ProxMox VE](https://pve.proxmox.com/)の上で動作させています。
今回はQSVのお話なのでChinachuの環境構築の紹介はしません。

#### Intel HD Graphics Pass-through

昨年のLinux Advent CalendarにてIntel HD Graphics Pass-throughを取り上げましたが(../2014/2014-12-12-kvm-intel-hd-graphics-passthrough.md#$5))、あれから1年が経ち色々と変わってきている部分があります。
1年前は[ProxMox](https://www.proxmox.com/) 3.2で構築していた仮想マシンも今では4.1となり、自前でカーネルをビルドする必要がなくなったことが大きな違いです。
そのため、ProxMoxのカーネルはそのままに、Pass-through機能を有効にする設定をいじるだけでIntel HD Graphicsのパススルーができます。

前回の方法では自前ビルドのカーネルで有効にしていたIOMMUの機能が、ProxMox 4.1の標準カーネルではデフォルト無効になっているので、有効にしてあげるように起動時パラメータを指定します。
root権限で以下のように実行し、IOMMUを有効化します。

```
# sed -i -e 's/\(GRUB_CMDLINE_LINUX="\)\(.*"\)/\1intel_iommu=on \2/' /etc/default/grub
# grub-mkconfig -o /boot/grub/grub.cfg
# reboot
```

IOMMUが有効になれば、あとは仮想マシンの設定ファイルにIntel HD Graphicsをパススルーする記述を加えるのみです。
全体的には以下のようなPorxMox仮想マシン設定ファイルが出来上がりました。

```
bios: ovmf
boot: cdn
bootdisk: sata0
cores: 4
cpu: host
hostpci0: 00:02.0,pcie=1,rombar=on,x-vga=on
ide2: iso-image:iso/CentOS-7-x86_64-Minimal.iso,media=cdrom
machine: q35
memory: 4096
name: QSV
net0: e1000=66:63:63:25:51:27,bridge=vmbr0
numa: 0
ostype: l26
sata0: local:115/vm-115-disk-1.qcow2,size=32G
serial0: socket
smbios1: uuid=4b9f905b-66a5-4858-b1db-914bfd369aeb
sockets: 1
```

CentOSにてQSV対応カーネルをビルドする都合上、4コア割り当てていますが環境構築後は1コアに変更しても十分なパフォーマンスが発揮できます。
あとはこのパススルーした仮想マシンにCentOS 7.1をインストールし、QSVエンコード環境を作っていきます。
仮想マシンであろうがなかろうが続くQSV環境の導入に関する話で行うことは全く一緒なので、素のCentOS 7.1で行っているものとして読んでください。


### Intel Media Server Studio

今年の頭に書いた記事でもIntel Media Server Studio(以下、MSS)を紹介しましたが、当時は数千ドルする有償SDKのみの公開だったため、試用期間しか利用できず、導入方法とエンコードの実験を行うだけでした。
しかし、今年9月にMSSのアップデートがあり、バージョンR6の登場とともに無償のCommunity Editionが公開され、私的利用の範囲で無期限で利用することができるようになりました。
今回はそれを導入し、QSVによる動画のH.264エンコードを行います。

[Intel® Media Server Studio \| Intel® Developer Zone](https://software.intel.com/en-us/intel-media-server-studio)

![Get Intel Media Server Studio](/assets/images/2015/12/21/get-mss.png)

手順は前に紹介した時のものとあまり大きくは変わらないのですが、今回もMSSのインストールスクリプトに少々バグがあります。
文字でつらつらと説明するのも読者側からすればめんどくさいの一言で嫌われてしまう記事になってしまうので、MSSのインストールスクリプトを用意しました。

[**mzyy94/QSV-on-Linux on GitHub**](https://github.com/mzyy94/QSV-on-Linux)

README.mdを読み、スクリプトの内容を確認し、MSSを用意したら以下のようにコマンドを叩くとインストールされます。

```
$ ./install-MSS.sh
```

### FFmpegによるQSVエンコード
FFmpegもバージョンアップがあり、昨日2015/12/20にバージョン2.8.4が公開されました。
この1年のバージョンアップの間に標準でQSVエンコーダーが搭載され手動で追加する必要がなくなりました。
しかし今回導入したMSS 2015 R6では必要なファイルが不足しているため、いくつか手を加えなければいけません。
これもまた何をするかを事細かに説明するよりかはスクリプト実行で導入できた方が楽なので、よしなにしてくれるものを用意してあります。

先ほどのリポジトリに移動し、以下のようにすることでQSVに対応したFFmpegができあがります。

```
$ ./build-ffmpeg.sh
```

他のエンコーダー/デコーダーが必要な場合は適宜修正して導入してください。

### 地デジをエンコード

DTV(Digital TeleVision = デジタルテレビ放送) Advent Calendarのネタなので、地上デジタル放送の録画TSファイルをエンコードしてやっと完結です。
ということで、2015/12/19放映のご注文はうさぎですか??第11羽をエンコードしてみます。

```
$ ffmpeg -y -i gr23608-18yd.m2ts -f mp4 -vcodec h264_qsv -vprofile main -level 4.1 -s 1280x720 -r 24 -q 20 -acodec copy gochiusa11.mp4
```


と、エンコードしてみたものの、ProxMox 4.xのバグらしいものを踏んでしまい、ホストOSがｶｰﾈﾙﾊﾟﾆｯｸになってしまったために、エンコードが終了しませんでした。
なので投稿日の夕方になってベアメタルマシンに導入して試しています（故にAdvent Calendarに間に合わなカッタ）。

#### 結果

約9分でQSVによるH.264エンコードが終わりました。

| 項目 | 元ファイル | 変換後ファイル |
|:----:|:-----:|:---------:|
| 長さ | 29:56 | 29:56(カットなし) |
| ファイルサイズ | 1963490988 bytes (1.87GB) | 62257131 bytes (594MB)  |
| 解像度 | 1440x1088 | 1280x738 |
| フレームレート | 29.97 | 24.00 |
| 動画コーデック | MPEG-2 | H.264 |
| 音声コーデック | AAC | AAC(無変換) |


##### 元ファイル(MPEG-2)

[![シャロシコ Original](/assets/images/2015/12/21/syaro-original.png)](/assets/images/2015/12/21/syaro-original.png)

##### 変換後ファイル(H.264)

[![シャロシコ QSV](/assets/images/2015/12/21/syaro-qsv.png)](/assets/images/2015/12/21/syaro-qsv.png)


-----


以上、DTV Advent Calendar 21日目の記事でした。
明日は[rndomhack](https://twitter.com/rndomhack)さんです。
