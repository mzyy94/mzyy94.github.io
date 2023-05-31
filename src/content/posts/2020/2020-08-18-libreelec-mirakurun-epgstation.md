---
title: "LibreELECで地デジを楽しむためにMirakurunとEPGStationを一発で動かす"
date: 2020-08-18T10:20:00+09:00
published: true
toc: true
categories: ["Multimedia"]
tags: ["raspberry-pi", "docker", "mirakurun", "epgstation", "libreelec", "kodi", "pvr"]
image: "/assets/images/2020/08/18/raspberry-pi-stb.jpg"
---

```
ステイホーム
↓
おうち時間が増える
↓
テレビを見たくなる
↓
Raspberry Piで地デジを見る
```

地上デジタル放送をRaspberry Piで視聴する定番の組み合わせを、ノーコード・コマンドライン操作なしに、すなわち一発でセットアップできるようにした。

<!-- more -->

{% include toc %}

## ソフトウェア構成

どういったソフトウェアを用いるのか見ていこう。

### LibreELEC

[LibreELEC – Just enough OS for KODI](https://libreelec.tv/)

メディアセンターアプリケーションとして名を馳せる[Kodi](https://kodi.tv/)を動作させることに特化したOS。
類似のものに[osmc](https://osmc.tv/)や[OpenELEC](https://openelec.tv/)があるが、もっとも活発にメンテナンスされているのはLibreELECだ（執筆時）。

Kodiはアドオンというプラグインシステムで機能やサービスの拡張ができる。
そのアドオンを管理するためのアドオンマネージャという、言わばパッケージマネージャをKodiは有しており、依存関係の解消やアドオンリポジトリの管理などを担っている。
システムユーティリティなどを管理することもあることから、LibreELECのようなKodiのみを動かすことを想定しているOSでは、ベースとなるLinuxのパッケージマネージャを使うのではなく、Kodiのアドオンマネージャを利用するのが筋といったところだ。

LibreELECが優れている点として、2つの大きな特徴がある。Sambaの標準搭載とDockerアドオンの存在だ。

#### Sambaファイル共有サービス
![Samba config](/assets/images/2020/08/18/samba-configuration.png)

ネットワークファイル共有のデファクトであろうSamba。そのSambaファイル共有サービスがLibreELECに標準で組み込まれていて、初回セットアップ時に有効にできる（もちろん後から変更できる）。
これによって、コマンドラインを操作する必要なくLibreELECにmacOSやWindowsからファイルを転送できる。

![Samba file sharing](/assets/images/2020/08/18/samba-filesharing.png)

<iframe width="560" height="315" src="https://www.youtube.com/embed/oBlHCuGGrJ8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


#### Dockerアドオン
![Docker addon](/assets/images/2020/08/18/docker-addon.png)

LibreELECでDockerを動かすためのDockerアドオンが、LibreELECの公式アドオンリポジトリから提供されている。
Raspberry PiでもDockerは動くため、arm/arm64プラットフォーム向けのDockerイメージであれば、アドオンの形でサービスを手軽に動作させることができるのだ。

参考: [Docker comes to Raspberry Pi - Raspberry Pi](https://www.raspberrypi.org/blog/docker-comes-to-raspberry-pi/)

### Mirakurun

TVチューナーサーバーサービスであるMirakurun。
先日メジャーバージョンアップがあり、ドライバのインストールを不要としたりDocker対応が強化されたりと、より手軽に導入できるようになった。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Mirakurun 3.0.0 “Night Whale” リリースのお知らせとインストール方法<a href="https://t.co/OXS4G6C57L">https://t.co/OXS4G6C57L</a><a href="https://twitter.com/hashtag/%E7%A9%BA%E6%B0%97%E9%8C%B2%E5%AD%A6%E9%9B%BB%E5%AD%90%E7%89%88?src=hash&amp;ref_src=twsrc%5Etfw">#空気録学電子版</a></p>&mdash; 録画研究会 (@Chinachu_REC) <a href="https://twitter.com/Chinachu_REC/status/1272901743370780673?ref_src=twsrc%5Etfw">June 16, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Dockerイメージはdocker-composeで自分でビルドして利用するようにあるが、Docker Hubにも公開されている。
ただ、公開されているイメージにはRaspberry Piでネイティブに動作するarm/arm64プラットフォーム向けのものが含まれていなかったため、追加するPRを送って無事マージされた。
これでRaspberry PiでもDockerイメージのビルド不要でTVチューナーを扱えるようになる。

[リリースtagを打つときにarm/arm64ビルドのDockerイメージも作成する by mzyy94 · Pull Request #72 · Chinachu/Mirakurun](https://github.com/Chinachu/Mirakurun/pull/72)


そして、LibreELECのDockerアドオンに対応したMirakurunアドオンを作成した。これをLibreELECのKodiに導入することで、TVチューナーサーバーを手軽に立ち上げられるようになる。

[GitHub - Harekaze/docker.harekaze.mirakurun: Mirakurun Docker addon for LibreELEC](https://github.com/Harekaze/docker.harekaze.mirakurun)

### EPGStation

Mirakurunを使っていい感じにWebブラウザから地上デジタル・衛星放送の録画管理と視聴をするためのアプリケーション。こちらもDocker対応があり、Raspberry Piでも動作するarm/arm64イメージも提供されている。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">.<a href="https://twitter.com/masnagam?ref_src=twsrc%5Etfw">@masnagam</a> さんのご協力によって(私はほぼ何もしていませんが) Docker HubにてEPGStationのdockerイメージを公開できるようになりました。<br>docker-mirakurun-epgstationへの対応も追々やります。<br>ぜひご活用ください。<a href="https://t.co/z8jJKrZxNM">https://t.co/z8jJKrZxNM</a><br><br>ffmpegは含まれないので注意してください。</p>&mdash; l3tnun (@l3tnun) <a href="https://twitter.com/l3tnun/status/1259449383034077184?ref_src=twsrc%5Etfw">May 10, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Mirakurunと同じくして、LibreELEC向けのDockerアドオンに対応したEPGStationアドオンを作成した。

[GitHub - Harekaze/docker.harekaze.epgstation: EPGStation Docker addon for LibreELEC](https://github.com/Harekaze/docker.harekaze.epgstation)

### pvr.epgstation

KodiでEPGStationを管理・視聴するためのKodiアドオン。自分で作った。誕生話は以下から。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Kodi “pvr.chinachu” 輪廻転生<a href="https://t.co/ioRtK38KdU">https://t.co/ioRtK38KdU</a><a href="https://twitter.com/hashtag/c98?src=hash&amp;ref_src=twsrc%5Etfw">#c98</a> <a href="https://twitter.com/hashtag/%E7%A9%BA%E6%B0%97%E9%8C%B2%E5%AD%A6?src=hash&amp;ref_src=twsrc%5Etfw">#空気録学</a> <a href="https://twitter.com/hashtag/%E7%A9%BA%E6%B0%97%E9%8C%B2%E5%AD%A6%E9%9B%BB%E5%AD%90%E7%89%88?src=hash&amp;ref_src=twsrc%5Etfw">#空気録学電子版</a></p>&mdash; 録画研究会 (@Chinachu_REC) <a href="https://twitter.com/Chinachu_REC/status/1286871160462831616?ref_src=twsrc%5Etfw">July 25, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

このアドオンはLibreELECに依存していないため、macOSやWindows上のKodiでも利用できる。

[GitHub - Harekaze/pvr.epgstation: EPGStation for Kodi! A Kodi PVR addon of EPGStation](https://github.com/Harekaze/pvr.epgstation)

### Harekaze2 PVR Repository

これらのアドオンをまとめて提供するアドオンリポジトリも作った。GitHub Actionsで自動デプロイするように工夫してある。

[GitHub - Harekaze/repository: Remote binary repository](https://github.com/Harekaze/repository)

[harekaze.github.io/repository](https://harekaze.github.io/repository/)からアドオンリポジトリのアドオンをダウンロードし、LibreELECのKodiにインストールすることで、アドオンマネージャで管理できるようになる。さらに自動更新にも対応するので、これを使わない手は無い。


## 用意するもの

手軽に導入できそうなことがわかったので、機材を揃える。

**Rasbperry Pi 4**

これがなきゃ始まらない。4GBモデルの方が不安がないが、2GBモデルでも多分動く。

<a href="https://www.amazon.co.jp/%E3%80%90%E5%9B%BD%E5%86%85%E6%AD%A3%E8%A6%8F%E4%BB%A3%E7%90%86%E5%BA%97%E7%89%88%E3%80%91Raspberry-Pi-Model-4GB-RS%E7%89%88/dp/B07TC2BK1X/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=mzyy-22&linkId=253958ad7a06306732a35d7a4c5cd1d1&language=ja_JP" target="_blank"><img border="0"  width="250" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07TC2BK1X&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon \| 【国内正規代理店版】Raspberry Pi 4 Model B/4GB OKdo版【技適マーク付】 \| Raspberry Pi Shop by KSY \| PCパーツ 通販](https://www.amazon.co.jp/%E3%80%90%E5%9B%BD%E5%86%85%E6%AD%A3%E8%A6%8F%E4%BB%A3%E7%90%86%E5%BA%97%E7%89%88%E3%80%91Raspberry-Pi-Model-4GB-RS%E7%89%88/dp/B07TC2BK1X/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=mzyy-22&linkId=230e27678db710ac9dc1d919ff2eae2c&language=ja_JP)


※起動に最低限必要な電源やケーブル類も用意しておく

**Raspberry Pi STBケース**

映像出力には発熱を伴うので、冷却できるケースを選ぶ。
おすすめはこちら。冒頭の画像に写っているものだ。

Raspberry Piはポート類が頭の悪い配置になっているので、全て背面に寄せられるケース。
冷却ファン付きである上、microHDMIポートをType A HDMIに変換してくれ、尚且つ安価である。

<a href="https://www.amazon.co.jp/gp/product/B087G9S7ZN/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li3&tag=mzyy-22&linkId=59b76bcd38111b1f9d9654ca5d349be7&language=ja_JP" target="_blank"><img border="0" width="250" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B087G9S7ZN&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon \| GeeekPi Raspberry Pi 4セットトップボックスキット、ポート拡張ボード付き Raspberry Pi 4アクリルケース、4010ブルーLEDライトファン5V付き Raspberry Pi 4 Bに対応 \| GeeekPi \| ベアボーンPC 通販](https://www.amazon.co.jp/gp/product/B087G9S7ZN/ref=as_li_ss_tl?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=2749f179bad55eaadd5b0b016f050ff7&language=ja_JP)

**microSD**

Dockerでサービスを動かしたりするので、耐久性のある32GBくらいの容量のものが必要。
ちゃんとしたメーカーのものであればどれでも良い。

<a href="https://www.amazon.co.jp/10%E5%AF%BE%E5%BF%9C%E3%80%91Samsung-microSD%E3%82%AB%E3%83%BC%E3%83%8932GB-Nintendo-MB-MC32GA-ECO/dp/B06XSV23T1/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=mzyy-22&linkId=0508cfbe1a9eeeffd15f4f89c86fef83&language=ja_JP" target="_blank"><img border="0" width="250" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B06XSV23T1&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon.co.jp： Samsung EVO Plus 32GB microSDHC UHS-I U1 95MB/s Full HD Nintendo Switch動作確認済 MB-MC32GA/ECO 国内正規保証品: パソコン・周辺機器](https://www.amazon.co.jp/10%E5%AF%BE%E5%BF%9C%E3%80%91Samsung-microSD%E3%82%AB%E3%83%BC%E3%83%8932GB-Nintendo-MB-MC32GA-ECO/dp/B06XSV23T1/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=mzyy-22&linkId=88e2993dbce36b35e23bb5c865ed3070&language=ja_JP)


**USB地デジチューナー**

Linuxにドライバーが組み込まれているチューナーを選ぶ。
推奨はPLEXの地上デジタルチューナー。

<a href="https://www.amazon.co.jp/%E3%83%97%E3%83%AC%E3%82%AF%E3%82%B9-PX-S1UD-V2-0-PLEX-USB%E6%8E%A5%E7%B6%9A%E3%83%89%E3%83%B3%E3%82%B0%E3%83%AB%E5%9E%8B%E5%9C%B0%E4%B8%8A%E3%83%87%E3%82%B8%E3%82%BF%E3%83%ABTV%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8A%E3%83%BC/dp/B0141NFWSG/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=mzyy-22&linkId=b721f1713b705beab1f11cd41d32b3a1&language=ja_JP" target="_blank"><img border="0"  width="250" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0141NFWSG&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon.co.jp： PLEX USB接続ドングル型地上デジタルTVチューナー PX-S1UD V2.0: パソコン・周辺機器](https://www.amazon.co.jp/%E3%83%97%E3%83%AC%E3%82%AF%E3%82%B9-PX-S1UD-V2-0-PLEX-USB%E6%8E%A5%E7%B6%9A%E3%83%89%E3%83%B3%E3%82%B0%E3%83%AB%E5%9E%8B%E5%9C%B0%E4%B8%8A%E3%83%87%E3%82%B8%E3%82%BF%E3%83%ABTV%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8A%E3%83%BC/dp/B0141NFWSG/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=mzyy-22&linkId=7cb0e0457cf602b4fae00c9bbd6c2182&language=ja_JP)

<del>だけど廉価なこっちでも普通に動いたので、こちらでも良い。</del>

[<del>Amazon \| USB接続ドングル型地上デジタルTVチューナー/薄型コンパクトPC用USB地デジチューナーPC用 USBバスパワー \| MyGica \| TVチューナー・キャプチャーボード 通販</del>](https://www.amazon.co.jp/gp/product/B0869HDJHJ/ref=as_li_ss_tl?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=2554f6fb58e710c7f98fa2d0f8e5213e&language=ja_JP)

2020/09/17追記: MyGicaの安価なチューナーはもう取り扱いを終了したようだ。
{: .notice--info}
**ICカードリーダー**

B-CASカードを読むために必要。

<a href="https://www.amazon.co.jp/Gemalto-%E3%82%B8%E3%82%A7%E3%83%A0%E3%82%A2%E3%83%AB%E3%83%88-IC%E3%82%AB%E3%83%BC%E3%83%89%E3%83%AA%E3%83%BC%E3%83%80%E3%83%BB%E3%83%A9%E3%82%A4%E3%82%BF-%E5%AF%BE%E5%BF%9C%E4%BD%8F%E5%9F%BA%E3%82%AB%E3%83%BC%E3%83%89%E7%94%A8PC-HWP119316/dp/B003XF2JJY/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=mzyy-22&linkId=bb46cc12ae9a0c222cca6e9af79e41bc&language=ja_JP" target="_blank"><img border="0"  width="250" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B003XF2JJY&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon \| 【国内正規品】Gemalto ジェムアルト ICカードリーダ・ライタ IDBridge CT30 電子申告(e-Tax)対応マイナンバー・住基カード用PC USB-TR HWP119316 \| ジェムアルト \| 外付メモリカードリーダー 通販](https://www.amazon.co.jp/Gemalto-%E3%82%B8%E3%82%A7%E3%83%A0%E3%82%A2%E3%83%AB%E3%83%88-IC%E3%82%AB%E3%83%BC%E3%83%89%E3%83%AA%E3%83%BC%E3%83%80%E3%83%BB%E3%83%A9%E3%82%A4%E3%82%BF-%E5%AF%BE%E5%BF%9C%E4%BD%8F%E5%9F%BA%E3%82%AB%E3%83%BC%E3%83%89%E7%94%A8PC-HWP119316/dp/B003XF2JJY/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=mzyy-22&linkId=8af534afc3020cc24ae9c16d3d44da9a&language=ja_JP)

**B-CASカード**

安価な地デジチューナーにはB-CASカードがついていない。
無い場合は、以下のフォームから **再発行** を申し込める。

[B-CAS 株式会社 ビーエス・コンディショナルアクセスシステムズ](https://www.b-cas.co.jp/cardorder/view/order/agreement.html)

ただ、"再発行"とあるように、なくした場合や中古のチューナーを買った場合などに限られ、B-CASカードの付属しない新品のチューナーを買った場合の新規発行は受け付けていないようなので、持ってない場合は中古のTVチューナーを買うのが唯一の入手方法になる。

**ポータブルHDD**

録画データ保存用。USB 3.0対応であれば、どれでも良い。

<a href="https://www.amazon.co.jp/BUFFALO-%E3%83%9F%E3%83%8B%E3%82%B9%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3-USB3-1-USB3-0%E7%94%A8%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%96%E3%83%ABHDD-HD-PCFS1-0U3-BBA/dp/B07D795SV5/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=mzyy-22&linkId=036ad8813ebc3bb0973d9844281d86c8&language=ja_JP" target="_blank"><img border="0" width="250"  src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07D795SV5&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>

[Amazon.co.jp： BUFFALO ミニステーション USB3.1(Gen1)/USB3.0用ポータブルHDD 1TB HD-PCFS1.0U3-BBA: パソコン・周辺機器](https://www.amazon.co.jp/BUFFALO-%E3%83%9F%E3%83%8B%E3%82%B9%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3-USB3-1-USB3-0%E7%94%A8%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%96%E3%83%ABHDD-HD-PCFS1-0U3-BBA/dp/B07D795SV5/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=mzyy-22&linkId=389b1beac3d7cf2d6666ae00e5162218&language=ja_JP)

## 導入

### 1. LibreELECのイメージをRaspberry Pi Imagerで書き込む

Raspberry Pi公式のOS書き込みツールである[Raspberry Pi Imager](https://www.raspberrypi.org/downloads/)には、LibreELECが候補のOSとして登録されている。
自分のRaspberry Piにあったイメージを選択し、microSDカードに焼き込む。

![Raspberry Pi Imager](/assets/images/2020/08/18/pi-imager.png)

### 2. Raspberry Piを準備する

以下がやることリスト。
電源が最後であれば、順番通りでなくても良い。

1. microSDカードを入れる
2. TVチューナーとアンテナ端子を繋げる
3. カードリーダーとB-CASカードを接続する
4. ポータブルHDDを繋げる
5. LANケーブルを繋げる
6. HDMIケーブルでテレビに繋ぐ
7. 電源を繋ぐ

### 3. LibreELECを起動してセットアップを進める

初回の起動時にはLibreELECのセットアップが始まる。
ほとんどのテレビであれば、テレビのリモコンがHDMI/CECを通してLibreELECを操作できるようになっているため、リモコンを使ってセットアップを進めていく。リモコンが無かったり、うまく動かない場合はUSBキーボードを接続してセットアップを行うこともできる。

途中、Sambaを有効にするかのオプションが出てくるため、有効にしておくように。

デフォルト表示言語が英語のため日本語化が必要になるが、Googleがその方法を教えてくれるだろう。


セットアップ完了後は、Kodiを操作できるスマホアプリを使うと快適に利用できる。

- [「Sybu for Kodi and XBMC」をApp Storeで](https://itunes.apple.com/jp/app/sybu-for-kodi-and-xbmc/id567524653?mt=8&at=1l3v4mQ)
- [Kore, Official Remote for Kodi - Google Play のアプリ](https://play.google.com/store/apps/details?id=org.xbmc.kore&hl=ja)


### 4. リポジトリのzipをSambaで転送する

セットアップが終わると、同じLANにつながっているWindowsやmacOSからLibreELECのSambaが見えるようになっている。
SambaにあるDownloadsフォルダに[harekaze.github.io/repository](https://harekaze.github.io/repository/)からダウンロードしたリポジトリアドオンをコピーする。

![Transfer repository zip](/assets/images/2020/08/18/transfer-repository-zip.png)

### 5. アドオンマネージャからリポジトリアドオンをインストールする

Kodiのアドオンメニューを進むと、「zipﾌｧｲﾙからｲﾝｽﾄｰﾙ」というメニューがあるため、そこからリポジトリアドオンをインストールしていく。初回は「提供元不明の〜」などといった警告が出るが、遷移先の設定画面で有効にすれば良い。

![Install from zip menu](/assets/images/2020/08/18/install-from-zip.png)

zipファイル選択画面で、「ホーム→Downloads」と辿って先ほどのzipファイルを選択してインストールすれば、リポジトリが登録される。

![Select addon zip](/assets/images/2020/08/18/select-zip.png)

### 6. アドオンのインストール

![Harekaze2 repository](/assets/images/2020/08/18/harekaze2-repository.png)

「ﾘﾎﾟｼﾞﾄﾘからｲﾝｽﾄｰﾙ」メニューの中にHarekaze2リポジトリが登録されているはずなので、そこから必要なアドオンを追加していく。依存関係にあるDockerアドオンや、ffmpegアドオンもセットでインストールされるので、わざわざ先にインストールしておく必要はない。

順番はmirakurun→EPGStation→pvr.epgstationが望ましい。
Dockerイメージの取得に時間がかかるため、気長に待つ。

初期状態で特に設定をしなくても使えるようにしてあるが、SambaのConfigfilesディレクトリにMirakurunとEPGStationの設定ファイルがあるので、必要であれば調整はそこからできる。

![Samba configfiles directory](/assets/images/2020/08/18/configfiles.png)

### 7. EPGStation録画先の変更

![Choose recording location](/assets/images/2020/08/18/choose-location.png)

接続したUSBハードディスクに録画を保存するようにepgstationサービスの設定画面を開き、録画先を変更する。

### 8. pvr.epgstationの設定

![Select EPGStation server](/assets/images/2020/08/18/configure-pvrepgstation.png)

EPGStationのサービスが動いている`http://0.0.0.0:8888`を、pvr.epgstationの設定画面で指定する。
アドオンを再起動すれば、お手軽地デジ視聴環境の出来上がり。

![pvr.epgstation1](/assets/images/2020/08/18/pvr-epgstation1.png)

![pvr.epgstation2](/assets/images/2020/08/18/pvr-epgstation2.png)



### +α. 音ズレの解消

![Fix ripsync](/assets/images/2020/08/18/fix-ripsync.png)


音ズレするときは、Kodiの設定画面にあるプレイヤー設定の中の「ディスプレイの同期周波数に合わせて再生する」を有効にすると直る。


## これまでの構成との比較

遥か昔、地上デジタル放送をRaspberry Pi 2で視聴していた時期があった。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Raspberry Pi 2での地デジ視聴時の負荷<br>HWデコーダー有効にするとフレームドロップなしでCPU負荷はほぼゼロ <a href="http://t.co/rAzv7eCTGW">pic.twitter.com/rAzv7eCTGW</a></p>&mdash; 体験価値 (@mzyy94) <a href="https://twitter.com/mzyy94/status/565610656809091072?ref_src=twsrc%5Etfw">February 11, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

これまでブログで紹介してきたように、地デジの視聴構成は以下のようになっていた。

**地デジ用NAS**
- NAS用OS [**Rockstor**](http://rockstor.com/)
  - [NAS用OSにRockstorという選択 \| 犬アイコンのみっきー](../2016/2016-07-04-do-you-know-rockstor.md)
- 地上デジタル放送視聴・録画管理アプリケーション [**Chinachu**](https://github.com/Chinachu/Chinachu)
  - [RockstorにChinachuを詰め込んで録画NAS作ろ \| 犬アイコンのみっきー](../2016/2016-07-05-chinachu-rockon.md)

**Raspberry Pi 2B**
- メディアセンターアプリケーション [Kodi/XBMC](https://kodi.tv/)統合OS [**OSMC**](https://osmc.tv/)
  - [Raspberry Pi2にOSMC入れてKodi(旧:XBMC)日本語化するまで \| 犬アイコンのみっきー](../2018/2015-02-16-raspberry-pi2-osmc-jp.md)
- Kodi向けChinachu連携プラグイン [**pvr.chinachu**](https://github.com/Harekaze/pvr.chinachu)
  - [Harekaze for Kodi (pvr.chinachu) 4.0.0 リリース \| 犬アイコンのみっきー](../2017/2017-02-04-pvr-chinachu-4.md)


機器構成を練り直すついでに、導入手順を簡略化することにしたこともあって、当時と比べて随分とすっきりした。

- 地デジ用NAS → **廃止。構築不要**
- Chinachu → **EPGStation**
- OSMC → **LibreELEC**
- Raspberry Pi 2B → **Raspberry Pi 4B**
- pvr.chinachu → **pvr.epgstation**

機器構成の変化以上に、導入がものすごく手軽になった功績が大きい。

## まとめ

おうち時間を充実させていきましょう。
