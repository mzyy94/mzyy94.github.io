---
title: KodiとChinachuで地デジLive視聴 on Raspberry Pi2 w/ OSMC
date: 2015-02-21 07:02:43 +0900
category: Multimedia
tags: kodi chinachu osmc dtv raspberry-pi sbc
image:
  path: /assets/images/2015/02/21/kodi-livetv.png
  thumbnail: /assets/images/2015/02/21/kodi-livetv.png
---


どうも、Raspberry Pi2で遊ぶ毎日が続いております。
Raspberry Pi model B（2ではない）にRaspbmcを入れて昨年の夏頃からChinachu経由で地上デジタル放送を視聴する環境を構築していたのですが、
いかんせんスペックが低く、チャンネル切り替え時などにもたついていました。

Raspberry Pi2が発売され、従来の6倍のパフォーマンスが発揮できるようになり、もたつきがなく不便しなくなってきたので、
Raspbmc改めOSMCで地デジ視聴をする方法をまとめます。

<!-- more -->
{% include toc %}



## PVRクライアント
Kodi(旧:XBMC)にはテレビ放送を視聴するためのPVRクライアントという機能があります。
テレビ放送の配信携帯に合わせていくつかPVRクライアントがAdd-onとして提供されていますが、汎用的につかえるものに
[XBMC IPTV Simple Client](https://github.com/afedchin/xbmc-addon-iptvsimple/)というものがあります。

XBMCからKodiに名称変更した際に、Kodi本体にこれらのPVRクライアントはあらかじめバンドルされるようになり、
これまでは各自ビルドしてインストールしていたのが、設定して有効化するだけで使えるようになっています。
もちろんこのIPTV Simple Clientもバンドルされています。これを使って地デジを視聴する環境を構築します。

### IPTV Simple Client
このAdd-onは、m3u形式で配信されているチャンネル配信情報と、[XMLTV形式](http://wiki.xmltv.org/index.php/XMLTVFormat)で配信されている番組表情報を用いてネットワーク経由でテレビを視聴することができるPVRクライアントです。
数あるプレイリストフォーマットの中でも一般的な形式であるm3uと、[MythTV](http://www.mythtv.org/)などのテレビ視聴・録画クライアントがサポートするEPG番組表形式であるXMLTVを用いているため、テレビ放送配信側となるサーバーがサポートしていれば簡単に地デジをKodiで視聴できます。

今回テレビ放送を配信するサーバーとしてはChinachuを使いますが、残念ながら上記のm3u形式のチャンネル情報とXMLTV形式の番組表情報は提供されていません。
なので、Chinachuに2つのファイルを追加して機能を追加することで対応するようにしました。


## Chinachu
数ある地デジ録画管理ソフトウェアの中でもモダンなデザインで、使い勝手がよくREST APIを提供している素敵なソフトウェアです。
Chinachuは番組の録画・再生が主な機能とされていますが、現在放送中の番組の視聴にも対応しており、APIを経由することでいろいろなクライアントから再生することができます。
しかし、前途の通りChinachuが提供するAPIでは、IPTV Simple Clientが対応するm3u形式のプレイリストやXMLTV形式の番組表情報は取得できません。
幸いなことに、ChinachuへのAPIの追加は難しくなく、Chinachuが動作するディレクトリ直下にある__api__ディレクトリにAPIリソース情報とスクリプトを配置することで必要なAPIを追加することができます。

IPTV Simple Clientに必要な、

* m3u形式でのチャンネル配信情報
* XMLTV形式での番組表情報

の二つをAPIで提供するファイルを作りました。
以下からダウンロードしてapiディレクトリのファイルをChinachuのapiディレクトリに放り込んでください。

_[https://github.com/mzyy94/Chinachu-IPTV-API-addon](https://github.com/mzyy94/Chinachu-IPTV-API-addon)_

これを導入すると、

* `/api/iptv/channel.m3u8`にチャンネル配信情報
* `/api/iptv/epg.xml`にXMLTV情報

が提供されるようになります。

## KodiでSimple IPTV Clientの設定

サーバー側の準備は整ったのでKodiの方の設定をします。前回の記事で日本語化したRaspberry Pi2で動くOSMC上のKodiでの設定方法になります。

上記の通り、KodiにはPVRクライアントが導入されているので、Add-on管理から設定をして有効化するだけで準備ができます。


まず、設定のAdd-onの中にある無効なアドオンからPVR Simple IPTV Clientを探して選択し、設定画面を開きます。

![Disabled add-ons](/assets/images/2015/02/21/disabled-addons.png)
![IPTV Simple client](/assets/images/2015/02/21/iptv-simple-client-addon.png)

設定画面にあるM3UプレイリストのURLとXMLTV URLにChinachuのWUIが動作するURLに続けて、下図のように設定します。
各自環境に合わせて`chinachu:10772`の部分を書き換えてください。

![Add-on configure1](/assets/images/2015/02/21/addon-configure1.png)
![Add-on configure2](/assets/images/2015/02/21/addon-configure2.png)

設定を終えたらSimple IPTV Clientの__有効__を選択して有効にし、Kodiの全体の設定にあるLive TV設定に移動してLCD有効(誤訳？)すると、
トップの画像のようにライブTVの項目が現れ、PVRが利用できるようになります。

![Enable PVR](/assets/images/2015/02/21/enable-pvr.png)

m3uプレイリストとしてAPIが提供するチャンネルは、Chinachuの設定ファイルに記載の通りの順番でサブチャンネル含め配信しているので、
後日紹介するであろうリモコンを使ってチャンネル切り替えを行う場合は、Live TV設定のチャンネルマネージャーからグループ管理を行って、
不要なチャンネルを隠すことでリモコンでの操作に適したチャンネルのみを切り替え可能にできます。

![Channel Manager1](/assets/images/2015/02/21/channel-manager1.png)
![Channel Manager2](/assets/images/2015/02/21/channel-manager2.png)
![Channel Manager3](/assets/images/2015/02/21/channel-manager3.png)

ここまで終わった状態で、Kodiのトップに移動するとライブTVの項目が増えているはずです。これを選択すると、デフォルトではEPG番組表が表示されます。
Kodi上でキーボードのEを押すと同じようにEPG番組表が表示されます。

![PVR EPG view](/assets/images/2015/02/21/pvr-epg.png)

ここで、バックスペースキーを押すとチャンネル一覧を表示するメニューが現れるので、そちらに切り替えると現在放送中の番組情報が表示されます。
もしくはキーボードのHを押すことでチャンネル一覧が表示できます。

![PVR Channel view](/assets/images/2015/02/21/pvr-channel.png)


ここで好きなようにチャンネルを切り替え、地デジを観ることができます。


## まとめ

MPEG-2ライセンスを導入してあるRaspberry Pi2だとサクサク地デジが見られる。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Raspberry Pi 2での地デジ視聴時の負荷<br>HWデコーダー有効にするとフレームドロップなしでCPU負荷はほぼゼロ <a href="http://t.co/rAzv7eCTGW">pic.twitter.com/rAzv7eCTGW</a></p>&mdash; はいふりを見て®︎™ (@mzyy94) <a href="https://twitter.com/mzyy94/status/565610656809091072">2015年2月11日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
