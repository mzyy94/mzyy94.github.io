---
title: KodiでChinachuの録画を観るAdd-on作った
date: 2015-02-24T19:28:35+09:00
author: mzyy94
categories: ["Multimedia"]
tags: ["kodi", "osmc", "chinachu", "raspberry-pi", "sbc"]
image: "/assets/images/2015/02/24/addon-info.png"
---

Raspberry Pi2でKodi（旧：XBMC)が快適に動き、地デジのLIVE視聴環境として優れているので、
Chinachuの本領である録画した動画の視聴したみが高まってきました。

Kodiには簡単にAdd-onが作れる仕組みがあり、動画や音楽のコンテンツを独自で配信・管理する仕組みがつくれます。
Chinachuには録画ファイルの情報とストリーミング視聴ができるREST APIが搭載されているので、
これを叩いてKodiで動画コンテンツを視聴できるAdd-onを作ったのでお知らせいたします。

## 目次


## Kodi/XBMC Add-on

KodiではPythonを用いてGUIやコンテンツを操るAdd-onを作成できるようになっています。
Add-on作成に関する情報は[Add-on development - Kodi](http://kodi.wiki/view/Add-on_development)にあるので、作成はそこまで難しくないです。
コンテンツ管理プラグインの他にも、スキンやバックグラウンドサービスも同じAdd-onの構造で作成できるので興味がある人は作ってみてください。

## Chinachu client add-on

ChinachuのREST APIを叩いて動画を取得してコンテンツ一覧に表示、再生、そしてChinachuサーバー上の録画データを削除できるAdd-onを作成しました。

__[https://github.com/mzyy94/plugin.video.chinachu](https://github.com/mzyy94/plugin.video.chinachu)__


Releaseのページからダウンロードして設定のアドオンからzipファイルからインストールでインストールしてください。
その後、有効なアドオンの一覧からビデオアドオンにあるChinachu clientを探し、設定を開いてChinachuの動くサーバーのアドレスとその他オプションを設定すると利用できるようになります。

### 使い方
利用方法は、Kodiトップにあるビデオメニューの中のビデオアドオンからChinachu clientを起動するだけです。

![Launch Chinachu client](/assets/images/2015/02/24/launch-chinachu-client.png)

一覧の動画を選択した状態で右クリックを押すかメニューを表示すると、メニュー中に削除の項目があります。
これを選択すると、確認ダイアログ表示の後、Chinachuで管理されている__録画ファイルと録画情報の両方を削除__します。
キャンセルはできないのでご注意を。

![File deletion](/assets/images/2015/02/24/deletion-dialog.png)

### 設定

![Configuratoin window](/assets/images/2015/02/24/configuration-window.png)


Chinachu clientには幾つか設定を設けてあります。

#### 基本
基本となるChinachuのURLの設定は必須です。Chinachu-WUIのAPIを叩くので、プロトコルとポート番号を含めたURLを設定してください。

![General configuratoin](/assets/images/2015/02/24/general-configuration.png)

#### ストリーミング
ストリーミングカテゴリにはChinachu WUIでストリーミングする際に指定するものと同じ感覚で設定してください。
MPEG-2 ハードウェアデコーダーを導入してあるRasPi2ではこのオプションは未設定の方が良いと思います。

#### サムネイル
サムネイルカテゴリには、Chinachu APIのpreview.jpgを取得してKodiのサムネイルフォルダにキャッシュするオプションがあります。
avconvで生成している都合上、取得には時間がかかるので必要でなければ無効のままにしておくことをお勧めします。
また、一度サムネイルを取得し始めるとKodiを終了するまでバックグラウンドで取得し続けます。さらに、未取得のサムネイルは毎回取得しに行きます。
この点ご注意ください。

サムネイルが不要になった際は、キャッシュのクリアもできます。

#### 動画情報
動画情報カテゴリでは、動画情報に関する細かなオプションがあります。

エピソード番号を強制的に指定オプションは、一部のテーマ向けの設定です。
放送日がエピソード番号が指定されていないと表示されないテーマがあるため、放送日が表示されない動画がある場合は有効にしてください。
このオプションが有効の場合、バラエティ番組など連続したエピソードがない放送にエピソード番号に1を指定します。

チャンネル名を表示する場所を選択するオプションも、一部のテーマ向けの設定です。
通常、チャンネル名はスタジオとして動画情報に登録されている場合、動画の詳細情報に表示されるのですが、テーマによってはスタジオを表示しないものがあるようです。
チャンネル名が表示されないなと思ったらこのオプションをいじってみてください。


### 動作してる図
こんなかんじです。
スキンは一番上はConfluenceで他はTitanです。

![Preview1](/assets/images/2015/02/24/preview1.png)
![Preview2](/assets/images/2015/02/24/preview2.png)
![Preview3](/assets/images/2015/02/24/preview3.png)
![Preview4](/assets/images/2015/02/24/preview4.png)
![Preview5](/assets/images/2015/02/24/preview5.png)


## まとめ
Raspberry Pi2は買いである
