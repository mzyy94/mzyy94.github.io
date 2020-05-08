---
title: Kodi Chinachu PVRアドオンでRasPi2/Android TVをテレビに
date: 2015-08-08 20:51:33 +09:00
category: Multimedia
tags: android chinachu dtv kodi osmc pvr
header:
  image: /assets/images/2015/08/08/chinachu-pvr-client-1_0_0.png
---
暑い日が続きますね。こういう日はエアコンの効いた部屋でだらだらとテレビを見たいものです。
しかしテレビをもっておりません。27インチのモニタを持っているのみです。

ただ、今年２月に記事にしたように、Raspberry Pi2 + OSMC + Kodi(XBMC) + add-onで地デジの視聴環境は出来上がっており、
だらだらとテレビを見ることができる状態にあります。

- [Raspberry Pi2にOSMC入れてKodi(旧:XBMC)日本語化するまで](../2015/2015-02-16-raspberry-pi2-osmc-jp.md)
- [KodiとChinachuで地デジLive視聴 on Raspberry Pi2 w/ OSMC](../2015/2015-02-21-kodi-livetv-chinachu.md)
- [KodiでChinachuの録画を観るAdd-on作った](../2015/2015-02-24-kodi-chinachu-addon.md)


これでだいたい十分に地デジを視聴できるようになったのですが、最近Android TVを手にし、同じように上記記事のように
地デジ視聴環境を整えて見ていたらいくつか不満が出てきました。

1. ビデオAdd-onとテレビAdd-onを切り替えるのが面倒くさい
2. Python製のためか、録画データJSONパースに時間がかかってる
3. 録画予約の取り消しができない
4. Chinachu側に手を加えるのはスマートではない


そこで思い立ってKodi/XBMC向けのテレビadd-on(PVR add-on)を作って、上記問題の解決に取り組みました。

<!-- more -->


## Chinachu PVR add-on

ということで出来上がったのがChinachu PVR add-onです。
２月に記事にしたIPTV Simple Client Add-onと同種のPVR（Personal Video Recorder）Add-onで、
上記記事で紹介した２つのAdd-onを複合して成り立っていた地デジ視聴環境と比べて、以下の利点があります。

1. １つのAdd-onでLive視聴・録画視聴ともにできる
2. より高速なJSONパースでストレスの少ないデータの読み込み
3. 録画予約のON/OFFができる
4. Chinachuの標準APIを使っているのでChinachu側に手を加える必要なし(推奨バージョンはREADME.mdに記載)


これらの利点を備えたPVR add-on、Chinachu PVR add-onのバージョン1.0.0が出来上がりました。

## pvr.chinachu 1.0.0

Kodi/XBMCにおけるPVR Add-onのリポジトリ命名規則は習慣によって、pvr.[バックエンドの名前]となっているようです。
なのでpvr.chinachuという名でリポジトリを立ててあります。

[**mzyy94/pvr.chinachu**](https://github.com/mzyy94/pvr.chinachu)

PVR Add-onは共有ライブラリの形で提供する必要があるため、Pythonで書けるビデオAdd-onとは違って各プラットフォーム向けにバイナリ形式の実行可能ファイルを提供する必要があります。
記事タイトルではRasPi2/Android TVとありますが、バージョン1.0.0で提供してるバイナリファイルの対象プラットフォームはLinux amd64/armv7(RasPi2含む), OS X 64bit, Android arm(TV含む)となっています。
Autotools依存で作り始めたため、Windowsでのビルド環境を作るのが大変だったのでバイナリファイルの提供はしていませんが、VSプロジェクトを作ればビルドできるはずです。

ビルド方法、インストール方法、設定項目などの説明はリポジトリのREADME.mdに記載してあります。
注意点として、*現時点でKodi 15.0 Isengardにしか対応していない*ので、他のバージョンのKodi/XBMCでは利用できません。
Raspberry Pi2でOSMCを利用している人は、以下の記事に目を通し、`sudo apt-get update && sudo apt-get dist-upgrade -y`をしてKodi 15.0にしてから導入してください。

[OSMC » OSMC’s July update lands (a little late) with Kodi 15](https://osmc.tv/2015/08/osmcs-july-update-lands-a-little-late-with-kodi-15/)

パブリックリリース記念(?)として、インストール方法といくつか機能を説明します。

### インストール

Chinachu側はREADME.mdに記載のバージョンもしくは最新版を利用していれば、特に設定は必要ありません。
ただ、Live視聴時のチャンネル切り替えパフォーマンスや、録画とLive視聴の衝突回避のためにも、README.mdの推奨バージョンを導入することをお勧めします。

Kodi/XBMCでAdd-onをインストールしたことがある人は知っていると思いますが、zip圧縮されたパッケージをメニューから選択するだけで、KodiにAdd-onを追加することができます。
自分でビルドする方は各自ビルドし、ビルド済み実行ファイルを必要とする人は、以下のページからプラットフォームにあったパッケージをダウンロードしてください。

[releases - mzyy94/pvr.chinachu](https://github.com/mzyy94/pvr.chinachu/releases)

Kodiを起動し、zip形式のパッケージをSettings -> Add-ons -> Install from zip-file から選択し、Add-onsの階層にあるPVR clientsからChinachu PVR clientを探し出して設定を行ってください。

![install from zip](/assets/images/2015/08/08/install-from-zip.png)

設定項目に関しては[wiki/configuration - mzyy94/pvr.chinachu](https://github.com/mzyy94/pvr.chinachu/wiki/configuration)にまとめてあります。

その後、Settings -> TV -> GeneralからEnabledにしてPVR add-onを開始してください。

![enable tv](/assets/images/2015/08/08/enable-tv.png)

** ※Android/Android TV環境ではこのままでは動作しないことがあるので、[wiki/Android-Installation - mzyy94/pvr.chinachu](https://github.com/mzyy94/pvr.chinachu/wiki/Android-Installation)を参考に少しいじってください。 **

![top menu](/assets/images/2015/08/08/top-menu.png)

PVRプラグインが有効になるとKodiのメイン画面にTVの項目が現れ、Chinachuから取得したデータにアクセスできるサブ項目も現れます。
Skinによっては録画中や録画予約済みの項目がメイン画面に表示されたりします。

サブ項目のChannelsで各チャンネルで現在放送中の番組を、Guideでテレビ番組表を確認でき、Recordingsで録画の視聴、Timerで録画予約の確認、Searchで番組検索ができます。
Skinごとの差異や日本語設定にしていると項目名が違いますが、似たような項目が現れると思います。
表示言語を日本語に設定していない場合、Settings -> Appearance -> Skin -> Fontsから日本語表示に対応しているフォント（例：Arial）を選択しておかないと、文字化けして使い物にならいのでご注意を。

![font settings](/assets/images/2015/08/08/font-settings.png)

### Channels

![channels page](/assets/images/2015/08/08/channels-page.png)

Chinachuから取得したチャンネルの一覧と、現在放送中の番組が表示されるページです。
チャンネルを選択するとライブ視聴ができます。

画像ではチャンネル横に曲ごとのアイコンをつけていますが、自動で取得するように実装していないので、
必要であればSettings -> TV -> General -> Channel managerにてアイコンの追加ができるのでそこで追加するようにしてください。

ちなみにここで表示されるチャンネルはGR/BS/CSと、地デジ・BS・CSを分けてグループ化してあるので、項目が多すぎる場合はメニューから表示するグループを選択することができます。

![channel manager](/assets/images/2015/08/08/channel-manager.png)
![channel group](/assets/images/2015/08/08/channel-group.png)

### Guide

![guide page](/assets/images/2015/08/08/guide-page.png)

Chinachuから取得した番組表情報を、チャンネルごとに表示するページです。
テーマによっては番組のジャンルごとに色分けがされて表示されます。

番組表形式の表示方法以外にも、いくつかメニューから表示形式を選ぶことができます。
バージョン1.0.0では番組表の番組選択からの録画予約に対応していないので、番組情報の確認とチャンネルの切り替えだけとなります。

### Recordings

![recordings page](/assets/images/2015/08/08/recordings-page.png)

名前の通り、録画した番組を視聴できるページです。
選択すると再生することができます。
デフォルト設定ではサムネイルを録画開始３０秒地点のものを表示するようにしてありますが、設定で変更できます。

### Timer

![timer page](/assets/images/2015/08/08/timer-page.png)

タイマーと名のつくこのページでは、録画予約を確認できます。
現バージョンでは新たに追加することはできませんが、予約のStateをActive/Inactiveにすることで、Chinachuの録画予約をSkip/Unskipできるようになっています。

### Search

![search page](/assets/images/2015/08/08/search-page.png)

番組検索ができるページがSearchページです。
今の所、番組タイトルのみを対象としており、かつ大文字小文字・全角半角を厳しく判定しているので、すこしでも違うとヒットしません。
バージョン1.0.0では、検索してもできることは番組情報の表示だけなので、録画予約の設定や、
検索ワードに関して改良の余地アリなので今後改良していきたいです。

### オマケ

![pvr information](/assets/images/2015/08/08/pvr-information.png)

Settings -> System info -> PVR Serviceからチャンネル数や録画済み番組数、録画予約数が確認できます。

## まとめ

Raspberry Pi2でもAndroid TV（一手間必要）でも快適に地デジ見れるようになったので、[チューナーなし50インチ4Kディスプレイ](http://japanese.engadget.com/2015/08/06/7-5000-50-4k-q-display-4k50-upq/)が欲しくなってしまった。
