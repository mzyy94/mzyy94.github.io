---
layout: post
title: "Raspberry Pi2にOSMC入れてKodi(旧:XBMC)日本語化するまで"
date: 2015-02-16 20:05:56 +0900
comments: true
categories: raspberry-pi
tags: osmc kodi
topimg: /blog/resources/images/2015/02/16/raspi2.jpg
---

今月頭の発表で一気に盛り上がりを見せた[Raspberry Pi 2 Model B](http://www.raspberrypi.org/products/raspberry-pi-2-model-b/)。もちろん発売日に購入しました。
手元にはRaspberry Pi BとGalileo Gen2の2つのLinuxが動く小型ボードがあるんですが、主にメディアセンター用途で使おうとしていたRaspberry Pi Bに性能面で不満を抱いていたため、今回この新バージョン購入は即決しました。

Raspberry Piでのメディアセンター用途で代表的なのは[Raspbmc](http://www.raspbmc.com/)ですが、
このプロジェクトは[OSMC](https://osmc.tv/about/)に移行するようで、2015年2月2日のFinalリリースの配布をもって終了となりました。

ということで、Raspberry Pi 2 Model B(以下、RPi2B)にOSMCを導入して日本語化するまでのメモを残します。

<!-- more -->

# OSMCインストール

![OSMC Installer](/blog/resources/images/2015/02/16/osmc-installer.png)

OSMCは[https://osmc.tv/download/](https://osmc.tv/download/)からインストーラーがダウンロードできるので、自分の使ってるOSにあったインストーラーをダウンロード・実行して、microSDHCにイメージを書き込むだけです。2015/2/16時点での最新版であるAlpha 4をインストールしました。

# 日本語化

![OSMC main menu](/blog/resources/images/2015/02/16/osmc-mainmenu.png)

起動するとこんな感じです。OSMCテーマ標準のフォントは流行りのLightなウェイトを持つRobotoとOpenSansが利用されているため、もちろんのこと日本語は表示できません。
テーマのデザインを損ねることなく、日本語でも美しい細字のフォントで表示したく思い、[M+ FONT](http://mplus-fonts.sourceforge.jp/mplus-outline-fonts/index.html)を利用することにしました。

M+ FONTはJIS第一水準までの漢字を網羅し、極細から極太まで7種のウェイトを収録した美しいフリーフォントです。
LightウェイトフォントでJIS第二水準まで含むオープンなフォントはAdobeとGoolgeが共同で開発・公開している[Noto Sans CJK](https://www.google.com/get/noto/cjk.html)/[Source Han Sans](https://github.com/adobe-fonts/source-han-sans/tree/release)があります。しかし、OpenTypeフォントとしての配布である上に、TrueTypeに変換しても18MB前後のフォントファイルとなってしまい、Kodiで読み込めないことを確認したのでM+ FONTを利用します。

M+ FONTを利用するため、OSMC上で以下のスクリプトを実行するか、`curl -L http://git.io/pjg5 | sh -`とするとデフォルトフォントをM+ FONTに差し替えられます。
OSMCへはSSHで（USER/PASSともに`osmc`）ログインしてください。※パスワードの変更をお忘れなく。

<script src="https://gist.github.com/mzyy94/15ee1b3880107e9d7ece.js"></script>


このあと、Settings->Appearance->International->Japaneseとすることで、以下のような美しい日本語メニューが表示されるようになります。

（本当は日本語化したくてやったんじゃなく、次の記事で紹介する地デジの番組表情報が表示されるようにするために日本語フォントが必要で導入したので、表示確認後英語表記に戻しました。）

![OSMC JP](/blog/resources/images/2015/02/16/osmc-mainmenu-jp.png)


# MPEG-2ライセンス購入

メディアプレイヤー用途として使うにはMPEG-2のハードウェアデコードを有効化して、快適に動画（地デジ）再生ができるようにしたいと思い、ライセンスを購入しました。

Raspberry PiはMPEG-2ハードウェアデコーダーの利用にライセンス料を課しているので、£2.40支払ってキーを入手します。
[ライセンスキーストア](http://www.raspberrypi.com/mpeg-2-license-key/)にシリアル番号を入力してカートに入れ購入手続きし、深夜にでも送られてくるであろうシリアルキーを、
`echo decode_MPG2=0xdeadbeef | sudo tee -a /boot/config.txt`のようにしてハードウェア設定ファイルに追記し再起動してハードウェアデコーダーを有効にします。

これで快適に地デジなどの動画が再生できるようになります。


# 次回予告
Raspberry Pi 2で地デジ視聴する

