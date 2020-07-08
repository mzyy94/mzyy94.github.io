---
title: KVMでQSVするためIntel HD Graphicsパススルーするー
date: 2014-12-12 23:59:49 +0900
category: Multimedia
tags: kvm qsv kernel linux
---

この記事は[Linux Advent Calendar 2014](http://qiita.com/advent-calendar/2014/linux) 12日目の記事です。

12月も中頃となり寒い日が続きますね。みなさん体調はいかがでしょうか。

先日の[こたつを温める実験](../2014/2014-12-10-kotatsu-heating.md)で十分な熱を得られることを知ってしまい、つい調子に乗って動画のエンコードをこたつの中でやってしまって、40℃超の高温になるという経験を得るなど、新しい発見のある毎日です。

こたつ温め実験で使った録画サーバーはCPUがIntel Celeron 847はとても貧弱で、動画をH.264にエンコードしようものなら30分のアニメで8時間かかってしまうほどです。
なんとか短時間で動画エンコードできないかと悩んでいたところ、Intel QuickSync Video(以下QSV、詳細は後述)がLinuxもサポートされていることを思い出し、LinuxでQSVエンコードをしてみようと思い立ちました。

QSVを利用できるベアメタルマシンは我が家に2台あり、より新しいものはCPUにXeon E3v3を搭載しています。
このマシンではKVMで仮想マシンを複数立ち上げていて、カーネルコンパイルなどのCIを回したり、クロスコンパイル環境を構築しているものです。
今回はそのマシンに録画用仮想マシンを立て、録画に必要なUSBデバイスとPCI ExpressのレーンとQSVエンコードのためにIntel HD Graphicsのパススルーを試みる記録の第1章となります。

<!-- more -->
{% include toc %}


## Intel QuickSync Video

[IntelのQSV公式サイト](http://www.intel.co.jp/content/www/jp/ja/architecture-and-technology/quick-sync-video/quick-sync-video-general.html)に情報が載っていますが簡単にまとめます。

Intel Quick Sync Videoとは、Sandy Bridge世代のCore iシリーズのIntel CPUに搭載されているIntel HD Graphicsによる、動画のハードウェアエンコード・デコード技術のことです。
対象となるコーデックはH.264とH.262のみですが、エンコードに関してはソフトウェアで行うものよりもQSVを利用したものの方が圧倒的に高速（ただし品質は低下する模様）です。

QSVをオープンソースな動画エンコードソフトウェアで利用する動きは近頃活発であり、有名どころとしては[Handbrake](https://handbrake.fr)が最新版である[バージョン0.10.0でQSVエンコードをサポート](https://handbrake.fr/news.php?article=27)し始めました。
[VLC](http://www.videolan.org)も[バージョン2.10からQSVエンコードをサポート](http://www.videolan.org/vlc/releases/2.1.0.html)しています。

ただ、これらのオープンソースソフトウェア(OSS)によって、QSVによるH.264エンコード高速化の恩恵を受けられるのは、両者ともいまのところWindows版のみとなっています。


## QSV on Linux

Windows向けにしかOSSのQSVエンコーダーがないからって、なにもLinuxでQSVでエンコードできないわけではないのです。
ffmpegのエンコードコーデックとして、LinuxでもQSVエンコードができる[qsv-ffmpeg-codec](https://github.com/shenhailuanma/qsv-ffmpeg-codec)なるものがあるのです。
これを利用するには、Intel Media SDKを導入する必要がありますが、これによってOSSでのQSVエンコードがLinuxでもできるのです。


## Intel Media SDK

Intel HD GraphicsをLinuxで利用するためにはSDKが必要となります。そのSDKがこれ、Intel Media SDKです。これは現在、[Intel(r) Medoa Server Studio 2015](https://software.intel.com/en-us/intel-media-server-studio)(以下IMSS)に含まれる形で提供されています。IMSS 2015 R2ではUbuntuとSUSE Linuxがサポートされています。


## Intel HD Graphics pass-through

いろいろなシステムの説明を終えたのでここからが本題です。
KVMでIntel HD Graphicsをpass-throughする方法を手順を追って説明していきます。

仮想マシンでのPCIデバイスのパススルーはよく行われており、XenにおいてはGPUパススルーによって[家庭内VDIサーバーを作る](http://www.slideshare.net/zgock/203o)というような例があります。

<iframe src="//www.slideshare.net/slideshow/embed_code/key/bjnCgn3SxvB1Nf" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/zgock/203o" title="Xenとzfsで作る家庭内VDIサーバ" target="_blank">Xenとzfsで作る家庭内VDIサーバ</a> </strong> from <strong><a target="_blank" href="//www.slideshare.net/zgock">zgock</a></strong> </div>

XenによるPCIパススルーの記事はたくさん見つかるものの、KVMによるPCIパススルーに関するものは少なく、ましてやCPU内臓GPUのパススルーは皆無と言ってもいいほどです。
これは、KVMにおいてPCIパススルーをするにはIntel VT-dテクノロジーが必要なので、ユーザーが限られてしまうのも影響しているかもしれません。

KVMでPCIパススルーするための手がかりを`make menuconfig`で調べたところ、次の2つのオプションを有効化することでIntel HD GraphicsをKVMにパススルーできそうだということがわかりました。

![Intel IOMMU](/assets/images/2014/12/12/Intel-IOMMU-option.png)
![Intel VFIO](/assets/images/2014/12/12/VFIO-option.png)

Intel IOMMUはIntel VT-dの機能をカーネルで有効にするものです。
また、VFIOはIOMMUによるデバイスへのアクセスを提供するものです。

これらを有効にしてコンパイル && インストールしカーネルをKVMでPCIデバイスパススルーできるようにします。

その次はqemuの起動オプションです。
まず、ベアメタルマシン上ではどのようにIntel HD Graphicsが認識されているのかを調べます。

![Intel HD Graphics host](/assets/images/2014/12/12/Intel-HD-Graphics-Host.png)

バス00:02.0にIntel HD Graphicsが認識されています。

このバス 00:02.0をPCIデバイスとしてパススルーするため、kvmの起動オプションに`-device vfio-pci,host=00:02.0,id=hostpci0,bus=ich9-pcie-port-1,addr=0x0,x-vga=on -machine type=q35`を追加します。

**追記(2015/1/30)** このとき、CPUタイプのオプションを`-cpu Haswell,kvm=off,+x2apic`とすることを忘れないでください。
{: .notice--info}

すると、ゲストLinuxにしっかりとIntel HD Graphicsが渡されていることがわかります。

![Intel HD Graphics guest](/assets/images/2014/12/12/Intel-HD-Graphics-Guest.png)

## Intel Media SDK Install

この先の記事が長くなってしまったのでIMSSのインストール以降は後ほど別記事に書きます。。


## まとめ

KVMでもPCIパススルーして幸せになろう！


明日はmasami256さんです。
