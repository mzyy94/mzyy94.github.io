---
title: 一般のご家庭向けEAP-SIM認証Wi-Fi
date: 2016-10-09T16:00:00+09:00
author: mzyy94
categories: ["Network"]
tags: ["eap-sim", "802.1x", "sim"]
redirect_from: /blog/2016/10/09/household-eap-sim-wifi/
image: "/assets/images/2016/10/09/slide1.jpg"
---

ご家庭のWi-Fi、まだパスワード認証ですか？

こんにちは。陽炎型航洋直接教育艦 晴風の艦長、岬明乃です。
昨日開催された[カーネル／VM探検隊](http://www.kernelvm.org/)で、晴風の艦内無線LANの構築をした話をしてきました。


<iframe src="//www.slideshare.net/slideshow/embed_code/key/BGDboydffkwEnw" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/mzyy94/subscriber-identity-module-66892458" title="Subscriber Identity Module" target="_blank">Subscriber Identity Module</a> </strong> from <strong><a target="_blank" href="//www.slideshare.net/mzyy94">Yuki Mizuno</a></strong> </div>

発表枠は手軽な20分だったこともあり、聞いていて飽きてしまうであろう詳細な構成方法などを省いたため、構築についての手順を書き記しておきます。

<!-- more -->
## 目次


## 実習期間中の艦内無線LAN事情

晴風クラスに限らず、横須賀女子海洋学校の1年次の実習では30人前後の船員を乗せて航海に出ます。
艦の仲間のネットワークアクセスを管理するため、艦内無線LANでは802.1XによるWPA2エンタープライズ認証を設けるのがルールとなっています。
802.1X認証の方法は特に学校からの指定はなく、みんな好きなRADIUSサーバを建てて認証基盤を構築しています。
これも実習の一環というわけです。

晴風では、FreeRADIUSを採用し、EAP-TLSでみんなのユーザ名とパスワードをセットして使ってもらうつもりでした。
しかしです。このご時世、パスワードなる脆弱なものを利用するのは少数派なのです。
そこで主計科の子たちと一緒に考えた末、EAP-SIMによるパスワードレス認証を導入することとなりました。

## 晴風艦内EAP-SIM認証Wi-Fi構築

さて、実際に構築した手順を説明していきます。

### SIMカードの読み込み下準備

ここで必要になるハードウェアは、PC/SCカードリーダとICカードアダプタ、SIMカード変換アダプタです。


<a href="https://www.amazon.co.jp/Gemalto-%E3%82%B8%E3%82%A7%E3%83%A0%E3%82%A2%E3%83%AB%E3%83%88-IC%E3%82%AB%E3%83%BC%E3%83%89%E3%83%AA%E3%83%BC%E3%83%80%E3%83%BB%E3%83%A9%E3%82%A4%E3%82%BF-%E5%AF%BE%E5%BF%9C%E4%BD%8F%E5%9F%BA%E3%82%AB%E3%83%BC%E3%83%89%E7%94%A8PC-HWP119316/dp/B003XF2JJY/ref=as_li_ss_il?s=computers&ie=UTF8&qid=1475987930&sr=1-2&keywords=gemalto+%E3%82%AB%E3%83%BC%E3%83%89%E3%83%AA%E3%83%BC%E3%83%80&linkCode=li3&tag=mzyy-22&linkId=9d64adcf0113625ebf4f506686687dc6" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B003XF2JJY&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22" ></a>


<a href="https://www.amazon.co.jp/gp/product/B00G1BJ5TY//ref=as_li_ss_il?&linkCode=li3&tag=mzyy-22&linkId=513e6f72dde319e4cdba6dc2aa22683a" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00G1BJ5TY&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22" ></a>


<a href="https://www.amazon.co.jp/Nano-MicroSIM-%E5%A4%89%E6%8F%9B%E3%82%A2%E3%83%80%E3%83%97%E3%82%BF-4%E7%82%B9%E3%82%BB%E3%83%83%E3%83%88-%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88/dp/B00PESJ072/ref=as_li_ss_il?s=electronics&ie=UTF8&qid=1475988345&sr=1-8&keywords=nanoSIM%E5%A4%89%E6%8F%9B%E3%82%A2%E3%83%80%E3%83%97%E3%82%BF%E3%83%BC&linkCode=li3&tag=mzyy-22&linkId=ffdb8e98f3f5b5db08bb78437cd00fc2" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00PESJ072&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22" ></a>


必要なソフトウェアは、

- [PCSC Lite](https://pcsclite.alioth.debian.org/pcsclite.html)
- [pyscard](https://github.com/LudovicRousseau/pyscard)
- [pySIM](https://github.com/mzyy94/pysim)

です。よしなにインストールしてくれればいいのですが、依存関係がごにょっとしてるのでDebianでのセットアップ例を挙げておきます。

```
$ sudo apt-get install pcscd pcsc-tools libccid libpcsclite-dev
$ sudo apt-get install python python-setuptools python-serial python-dev swig git curl
$ mkdir -p ~/.cache/
$ cd ~/.cache/
$ curl -O http://ludovic.rousseau.free.fr/softwares/pcsc-tools/smartcard_list.txt
$ git clone https://github.com/LudovicRousseau/pyscard /tmp/pyscard
$ cd /tmp/pyscard
$ sudo python setup.py build_ext install
$ git clone https://github.com/mzyy94/pysim ~/pysim && cd ~/pysim
```


### SIMへのアクセスの確認
スライドで発表した通り、SIMにはいろいろな情報が詰まっています。
ICCIDやIMSIを確認してみたい場合は、pySIMの`pySim-read.py`を実行してみてください。情報がだばぁっとでてこれば成功です。
このとき、上記のGemaltoのICカードリーダを使っている場合は、`-p 0`オプションをつけることでリーダから読み込むことができます。



### FreeRADIUSのEAP-SIM設定
発表スライドでは、simtriplets.datに認証情報を書き込む方法を記しました。
この方法は、Debianで`apt-get install freeradius`で入るバージョンやFreeRADIUSの標準ビルド設定では無効化されています。
晴風では多くの艦員のSIM認証情報を書き込むため、FreeRADIUSをソースからビルドしてsimtripletsの読み込みを有効化していました。

しかし、ご家庭では30を超える認証情報を追加することはほとんどないだろうということで、一般的なFreeRADIUSのユーザ設定と同じ方法を紹介します。

#### EAP-SIM有効化

EAP-SIMは標準では無効化されているので、これを有効化します。
有効化といっても大層なことはせず、設定ファイル`/etc/freeradius/eap.conf`に2行追加するだけですけどね。

<script src="https://gist.github.com/mzyy94/589e1a1177036df883ae3e91ef0132de.js?file=eap.conf.patch"></script>

<!--
```diff
diff --git a/eap.conf b/eap.conf
index 797130d..435f7e6 100644
--- a/eap.conf
+++ b/eap.conf
@@ -15,6 +15,8 @@
 #  See experimental.conf for documentation.
 #
        eap {
+               sim {
+               }
                #  Invoke the default supported EAP type when
                #  EAP-Identity response is received.
                #
```
-->

有効化ついでに`/etc/freeradius/clients.conf`のsecretも変えておくとわかりやすくていいですね。

<script src="https://gist.github.com/mzyy94/589e1a1177036df883ae3e91ef0132de.js?file=clients.conf.patch"></script>

<!--
```diff
diff --git a/clients.conf b/clients.conf
index d5b1f74..036e053 100644
--- a/clients.conf
+++ b/clients.conf
@@ -98,7 +98,7 @@ client localhost {
        #  The default secret below is only for testing, and should
        #  not be used in any real environment.
        #
-       secret          = testing123
+       secret          = eap-sim

        #
        #  Old-style clients do not send a Message-Authenticator
```
-->


#### EAP-SIM認証情報の設定
発表でも述べた通り、SIMの仕様書にあるコマンドを送ってチャレンジする認証情報を生成しなければいけません。
加えて、得た情報をFreeRADIUSのusersファイルの書式にしたがって編集する必要があります。
EAP-SIMのリクエストの仕様上、IMSIからHNIを推定してMCCとMNCを特定してユーザ名を作り上げるのは正直言って面倒です。

なのでコマンド一発でusersファイルが作成できるツールを[https://github.com/mzyy94/pysim/](https://github.com/mzyy94/pysim/)に同梱してあります。
`./pySim-gen-eapsim-user.py`をバシっと叩いて一瞬でusersファイルを作れます。


```
~/pysim$ ./pySim-gen-eapsim-user.py -p 0 | sudo tee -a /etc/freeradius/users
# IMSI: 440103152044102
# NTT DoCoMo Kansai Inc.
1440103152044102@wlan.mnc010.mcc440.3gppnetwork.org  Auth-Type := EAP, EAP-Type := SIM
        EAP-Sim-Rand1 = 0x6d58e5afebffe3f480738f104a74afb8,
        EAP-Sim-SRES1 = 0xbd952f43,
        EAP-Sim-KC1 = 0x610f35c9208e1448,
        EAP-Sim-Rand2 = 0xc22413df2efea1e70197ea58519a72f0,
        EAP-Sim-SRES2 = 0x90f003a1,
        EAP-Sim-KC2 = 0x095001424f8fb62a,
        EAP-Sim-Rand3 = 0x60a5dc16de844884dea914cd41113477,
        EAP-Sim-SRES3 = 0xff0444b3,
        EAP-Sim-KC3 = 0xcff6d25c04ab4474,
```


### 無線LAN APの設定

ここはみんな自前の無線LAN環境があると思うので、一例としてEAP-SIM認証が最低限動作するhostapdの構成を記しておきます。
詳しい設定項目などは、[Hostapd - Gentoo Wiki](https://wiki.gentoo.org/wiki/Hostapd) をご参照ください。
また、[WLX 202](https://www.amazon.co.jp/%E3%83%A4%E3%83%9E%E3%83%8F-Yamaha-WLX202-%EF%BC%BB%E7%84%A1%E7%B7%9ALAN%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%EF%BC%BD/dp/B01D2QBF02/ref=as_li_ss_tl?ie=UTF8&qid=1475994913&sr=8-1&keywords=wlx202&linkCode=ll1&tag=mzyy-22&linkId=367f85f6bf22e56c6ab5521d89450c6d)など、
お手持ちの無線LAN APで外部RADIUSサーバに対応しているものをお持ちであれば、FreeRADIUSのアドレスの指定とsecretの設定をすることで利用できるでしょう。


#### hostapdの設定

必要なツールのインストール`apt-get install hostapd bridge-utils`。
そして、**/etc/network/interfaces**をこんな感じに。

<script src="https://gist.github.com/mzyy94/589e1a1177036df883ae3e91ef0132de.js?file=interfaces"></script>

<!--
```
source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback

allow-hotplug eth0
iface eth0 inet manual

allow-hotplug wlan0
iface wlan0 inet manual

auto br0
iface br0 inet dhcp
bridge_ports eth0
```
-->

で、**/etc/hostapd/hostapd.conf**をこう。

<script src="https://gist.github.com/mzyy94/589e1a1177036df883ae3e91ef0132de.js?file=hostapd.conf"></script>

<!--
```
interface=wlan0
bridge=br0
driver=nl80211

ctrl_interface=/var/run/hostapd
ctrl_interface_group=0

ssid=EAP-SIM_AP

hw_mode=g
channel=8

eap_server=0 # Disable embedded eap server

# WPA2 Enterprise
wpa=2
ieee8021x=1
wpa_key_mgmt=WPA-EAP
rsn_pairwise=CCMP

# RADIUS authentication
auth_algs=1
auth_server_addr=127.0.0.1
auth_server_port=1812
auth_server_shared_secret=eap-sim
```
-->

### 自宅EAP-SIM無線LANアクセスポイントへの接続

あとは`hostapd`を立ち上げて接続するだけ！とお思いでしょうが、残念ならがクライアント側にAPの登録が必要となることがあります。
iOSでは、WPA2 EnterpriseのアクセスポイントをデフォルトでEAP-TLSとして認識し、加えてiPhone/iPad側でEAP-SIMとして接続させる方法がありません。
立ち上げたAPがEAP-SIM認証であることを教え込むために、構成プロファイルを作成する必要があります。

![apple configurator2](/assets/images/2016/10/09/apple-configurator2.png)

macOSが動く環境をお持ちの方は、[Apple Configurator 2](https://itunes.apple.com/jp/app/apple-configurator-2/id1037126344?mt=12)で上図のように作成するか、
もしくは*EAP-SIM_AP*向けに作った以下の構成プロファイル（XMLファイル）のAP名を変更したものをiOSデバイスにインストールして準備完了です。

<script src="https://gist.github.com/mzyy94/589e1a1177036df883ae3e91ef0132de.js?file=EAP-SIM_AP.mobileconfig"></script>

最後にお待ちかね、`hostapd /etc/hostapd/hostapd.conf`で起動させて接続してみましょう！


```
$ sudo hostapd /etc/hostapd/hostapd.conf
Configuration file: /etc/hostapd/hostapd.conf
Using interface wlan0 with hwaddr dc:fb:02:9b:11:ef and ssid "EAP-SIM_AP"
wlan0: RADIUS Authentication server 127.0.0.1:1812
wlan0: interface state UNINITIALIZED->ENABLED
wlan0: AP-ENABLED
wlan0: STA f4:0f:24:ea:95:13 IEEE 802.11: authenticated
wlan0: STA f4:0f:24:ea:95:13 IEEE 802.11: associated (aid 1)
wlan0: CTRL-EVENT-EAP-STARTED f4:0f:24:ea:95:13
wlan0: CTRL-EVENT-EAP-PROPOSED-METHOD vendor=0 method=1
wlan0: STA f4:0f:24:ea:95:13 WPA: pairwise key handshake completed (RSN)
wlan0: AP-STA-CONNECTED f4:0f:24:ea:95:13
wlan0: STA f4:0f:24:ea:95:13 RADIUS: starting accounting session 57F9E33F-00000000
wlan0: STA f4:0f:24:ea:95:13 IEEE 802.1X: authenticated - EAP type: 18 (SIM)
```

## まとめ
海の仲間は家族だから！
