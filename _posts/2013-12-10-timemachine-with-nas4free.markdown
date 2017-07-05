---
title: "NAS4FreeでTime Machineの設定するメモ"
date: 2013-12-10 12:58:47 +0900
categories: server
tags: nas4free timemachine mac
image: /blog/resources/images/2013/12/10/timemachine-with-nas4free.png
---

Mavericksの登場で手元のMacBook Airをクリーンインストールしました。
その際、バックアップから復元するような手段は取らず、必要なデータのみを移して環境を再構築しました。
というのも、いままではTime Machineでバックアップを取っていなかったがために復元する手段がなかったのです。

次のバージョンでもクリーンインストールする予定ではありますが、突然のデータ消失に備えてTime Machineでの定期バックアップをするようにしました。

Time Machineのバックアップ先としては主に利用されるのは外付けドライブやTime Capsuleなどいろいろなバックアップ先があります。
しかし、MacBook Airをポータブル端末として利用している身としては、バックアップのたびにケーブルを抜き差しするのは効率を落とすだけでなく、バックアップ中は移動ができなくなってしまうため、候補から外しました。

ケーブルレスでTime Machineの機能を使う方法としては、無線LAN経由でネットワークストレージにバックアップする方法に限られてきてしまいます。
Time Machineのバックアップ用ネットワークストレージとして、Appleからは[AirMac Time Capsule](http://store.apple.com/jp/product/ME177/airmac-time-capsule-2tb)なるものが発売されていますが、これが如何せんお高い。
主な機能としてのTime MachineのバックアップとIEEE802.11ac対応無線LANルータの２つを備えた2TBのもので29,800円するという。
もっと多機能で安価なものを自分で構成したいという欲が湧いてきました。

<!-- more -->

前置きが長くなりましたが、ここからが本題です。
NASを建ててTime Machineのバックアップ先にするというお仕事になります。

まず、NASを立てるところから始めます。既成品のNASはいじりがいがいがないので却下しました。
__たまたま__自宅にAcer Aspire H340なるサーバー用のマシンが転がっていたのでこれを流用します。
ストレージには[WD Green 3.5inch 2.0TB](http://www.amazon.co.jp/gp/product/B009QWUF6M/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B009QWUF6M&linkCode=as2&tag=mzyy940f-22)を利用します。

ハードウェアが準備出来たら次はソフトウェアです。NAS向けのOSはいくつか存在しています。

* [FreeNAS](http://freenas.org/)
* [NAS4Free](http://www.nas4free.org/)
* [OpenMediaVault](http://openmediavault.org/)
* [Openfiler](http://www.openfiler.com/)
* [CryptoNAS](http://cryptonas.org/)

どれも得意な機能を持っており、その特徴と利用したい機能が一致したものを利用すればいいのですが、今回用意したH340のマシンは256MBのオンボードフラッシュストレージを搭載しているので、その256MBに収まるものに限定することにしました。
今回リストアップしたなかでは、NAS4Freeが機能的にもよく、256MBにも収まるものでしたのでこれを選択しました。




## NAS4Freeのインストール
ダウンロードしたx8664のイメージをCDに焼き、ブートして起動してEmbeddedインストールするだけです。
このEmbeddedインストールではイメージファイルを書き込むもので、256MBに収まる用にできています。
FreeNASも同じくEmbededインストールをサポートしていますが、2GBの容量が必要とのことですので断念しました。

## 起動
ネットワークの設定をして起動し、[nas4free.local](http://nas4free.local)にアクセスします。

## 設定

### ディスクの設定

NAS4Freeが起動したら

1. Disk->Managementでディクスをオンラインにし、
2. Disk->Formatでフォーマットした後に、
3. Disk->Mount pointでマウントします。

フォーマット形式はUFSにしました。
以前、FreeNAS用にZFSで作った際にpoolを破壊してしまってデータが吹っ飛んだ経験があるため、ZFSは避けましたが、
メモリが潤沢に搭載されているシステムであればraidzを利用してもいいかと思います。

![alt](/blog/resources/images/2013/12/10/NAS4Free-1.png)
![alt](/blog/resources/images/2013/12/10/NAS4Free-2.png)
![alt](/blog/resources/images/2013/12/10/NAS4Free-3.png)


### AFPの設定
Services->AFPにて、

1. SettingsタブをEnableにし、 Enable local user authentication. にチェックしてサービスを開始し、
2. Shareタブで、

---

* Name: 適当な名前
* Comment: 適当なコメント
* Path: 先ほどマウントしたマウントポイント以下の任意のパス
* Share Character Set: UTF8
* Allow: timecapsule
* Read/Write Access: timecapsule
* Automatic disk discovery: Enable
* Automatic disk discovery mode: Time Machine

---
と、設定します。ほかはデフォルトのままにしました。

![alt](/blog/resources/images/2013/12/10/NAS4Free-4.png)
![alt](/blog/resources/images/2013/12/10/NAS4Free-5.png)
![alt](/blog/resources/images/2013/12/10/NAS4Free-6.png)

この設定で、同一ネットワークにつながったMacからTime Machineの設定を開くと以下のように、バックアップ先に設定できるようになっていると思います。


![Time Machineの設定画面](/blog/resources/images/2013/12/10/NAS4Free-7.png)


設定方法と、NASの紹介でした。
