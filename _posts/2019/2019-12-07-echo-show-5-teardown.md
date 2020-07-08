---
title: "Echo Show 5で遊びたい　-分解編-"
date: 2019-12-07 02:00:00 +0900
published: true
toc: true
category: Gadget 
tags: echo alexa teardown amazon iot
image:
  path: /assets/images/2019/12/07/BANNER.JPG
  thumbnail: /assets/images/2019/12/07/BANNER.JPG
---

自由を求めるべく、自分好みに染められないかを探求する第一歩。Amazon Echo Show 5をはちゃめちゃにする。

## Echo Show 5

<a href="https://www.amazon.co.jp/Echo-Show-5-%E3%82%A8%E3%82%B3%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%BC5-%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E4%BB%98%E3%81%8D%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%82%B9%E3%83%94%E3%83%BC%E3%82%AB%E3%83%BC-with-Alexa-%E3%83%81%E3%83%A3%E3%82%B3%E3%83%BC%E3%83%AB/dp/B07KD87NCM/ref=as_li_ss_il?ref_=nav_custrec_signin&&linkCode=li3&tag=mzyy-22&linkId=077b852ff4f8f6794ffb523ddfec50b9&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07KD87NCM&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li3&o=9&a=B07KD87NCM" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

Amazonが今年5月に予約販売を開始したディスプレイ付きスマートスピーカー「[Echo Show 5](https://www.amazon.co.jp/Echo-Show-5-%E3%82%A8%E3%82%B3%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%BC5-%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E4%BB%98%E3%81%8D%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%82%B9%E3%83%94%E3%83%BC%E3%82%AB%E3%83%BC-with-Alexa-%E3%83%81%E3%83%A3%E3%82%B3%E3%83%BC%E3%83%AB/dp/B07KD87NCM/ref=as_li_ss_tl?ref_=nav_custrec_signin&&linkCode=ll1&tag=mzyy-22&linkId=3cfa7bd32e260d1de990bfcd9e68958d&language=ja_JP)」をご存知か。
これはAmazoが近年、力を入れているAlexaスマートプラットフォーム構想の一端を握るスマートスピーカーEchoシリーズのうち、5.5インチの小型ディスプレイを搭載したものである。

これまでのディスプレイつきEchoの国内ラインナップは少なく、このShow 5と、より小さな2.5インチの円形ディスプレイを搭載したEcho Spot、そして10.1インチの大型ディスプレイを搭載した[Echo Show(第二世代)](https://www.amazon.co.jp/Echo-Show-%E3%82%A8%E3%82%B3%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%BC-%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E4%BB%98%E3%81%8D%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%82%B9%E3%83%94%E3%83%BC%E3%82%AB%E3%83%BC-with-Alexa-%E3%82%B5%E3%83%B3%E3%83%89%E3%82%B9%E3%83%88%E3%83%BC%E3%83%B3/dp/B0793DZCR6/ref=as_li_ss_tl?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=echo+show&qid=1575653432&smid=AN1VRQENFRJN5&sr=8-2&linkCode=ll1&tag=mzyy-22&linkId=f2f7e2757185180e8814fde62f76b9e4&language=ja_JP)がある。ただ、Echo Spotは取り扱いが終了しているため、現時点ではShow 5とShow(第二世代)の2種類がディスプレイつきEchoとして販売されている。
そんなEcho Show 5を、手始めに分解してみる。

<!-- more -->

<img src="/assets/images/2019/12/07/IMG_1425.JPG" alt="echo spot" width="500px" />


## Alexaへの不信感

これらのAlexaデバイスは声でアプリや家電を操作でき便利な反面、プライバシーに関しては不透明な部分が多くある。
音声操作の間の録音データをクラウド(Amazonのサーバー)にアップロードすることは利用規約にも書かれているが、声に限らず可能な音源を操作時以外にも収集していたという、まことしやかな話が流れてきたのだ。

[Amazon.co.jp ヘルプ: Alexa利用規約](https://www.amazon.co.jp/gp/help/customer/display.html?nodeId=201809740)

スマートスピーカー登場初期から、競合より有利な状態(音声認識能力や反応精度等)になるためのには盗聴器として動かした方が賢い。多くの学習用音声データに限らず、ユーザーの個人情報から趣味など、大変に多くのことを知ることができるかだ。故に、スマートスピーカーはクラウド事業者からしたらスマート盗聴器の他にないと考えていた。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">スマート盗聴器をみんな好んで買って家に設置するもんだからクラウド事業者はウハウハですよほんと</p>&mdash; ワンストップ申請 (@mzyy94) <a href="https://twitter.com/mzyy94/status/938470302010425344?ref_src=twsrc%5Etfw">2017年12月7日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


案の定、噂段階だが盗聴器として用いられたとのニュースが今回世間を賑わせたのだ。そしてこの噂は技術的に可能である上に、ほとんどのスマートデバイスは暗号化されたネットワークでデータを送受信しているため、通信内容を精査できずに疑いを晴らすのは難しい。噂のソースは不明瞭だが、信憑性がゼロとは言い難い状況から、スマートスピーカーなんて使うものかと強い意志を固めることとなった。

余談はここら辺にして、本題に入ろう。

## Echo Show 5を自由に使う

先に掲載したEcho Spotの取り扱い終了を示すスクリーンショットからも分かるように、スマートスピーカーなんて使うまいと言っていながら、Echo SpotとEcho Show 5を持っている。
これには理由があって、Alexaとして欲しかったのではなく、小さな小型ディスプレを備える魅力的な解析心をくすぐられるハードウェアとして購入した次第である。
実際、これまでスマートスピーカーとしては使っておらず、開封後数十分で分解バラバラにしてきた。

### 自由とは

スマートスピーカーにおける自由な利用とは、先のような盗聴の危険がなく、自分の管理下における状態のことを指す。これを叶えるため、次から述べる取り組みを行なった。

### Echo Show 5の周辺情報収集

何事も先ずは情報収集から始める。
Echo Show 5は、使われているプロセッサや対応無線方式などのハードウェア情報が、丁寧にもAmazonの販売ページに記載されている。

ここから得られるは、プロセッサにMediaTek MT 8163を採用し、Wi-Fi 5 の5GHz対応であるとの情報だ。

そしてAmazonの開発者ページやGitHubを調べていくと、MediaTek MT 8163 を搭載するEcho Show 5のOSがFire OS 6であるという情報を集められる。

- [Fireタブレットのデバイス仕様（カスタムテーブル） \| Fireタブレット](https://developer.amazon.com/ja/docs/fire-tablets/ft-specs-custom.html)
- [Fireタブレットのデバイス仕様（全一覧） \| Fireタブレット](https://developer.amazon.com/ja/docs/fire-tablets/ft-device-and-feature-specifications.html)
- [firefox-echo-show/device_reference.md at master · mozilla-mobile/firefox-echo-show · GitHub](https://github.com/mozilla-mobile/firefox-echo-show/blob/master/docs/device_reference.md)

そしてこのFire OS 6とは、Android 7.1.2 Nougatをフォークとしたものを源流とし、Amazonデバイスに適した形に手を加えられているものである。
Android搭載なので、いじりがいがありそう。しかしそんな簡単にいじられるようになってはいない。fastbootは使えても、一般権限では[adb](https://developer.android.com/studio/command-line/adb)は使えないようにしてあるのだ。

- [Fire OSの概要 \| Amazon Fire TV](https://developer.amazon.com/ja/docs/fire-tv/fire-os-overview.html)

分解して高い権限を得られないかどうか、ハードウェアから探ってみることにした。

## 分解

ザザーっと写真だけ
滑り止めシートを剥がすとT6ネジが現れるので、簡単に開けられる。
こういう電動ねじ回しだと楽に開けられた。

<a href="https://www.amazon.co.jp/Xiaomi-Wowstick1F-%E7%B2%BE%E5%AF%86%E3%83%89%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E3%82%BB%E3%83%83%E3%83%88-56%E7%A8%AE%E9%A1%9ES2%E3%83%93%E3%83%83%E3%83%88-%E3%83%9A%E3%83%B3%E5%9E%8B%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%A5%E3%83%BC%E3%83%89%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC/dp/B07SSZX76W/ref=as_li_ss_il?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=wowstick&qid=1575653300&sr=8-6&linkCode=li2&tag=mzyy-22&linkId=fac5eba7de2252c3b2f85887a9346a15&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07SSZX76W&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li2&o=9&a=B07SSZX76W" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon \| Xiaomi Wowstick1F+ 電動 精密ドライバーセット usb充電 ドライバー コードレス リチウム電池 小型 USB充電式 56種類S2ビット 正逆転可能 LED付 コードレス ペン型スクリュードライバー 携帯便利 精密製品修理 \| インパクトドライバー](https://www.amazon.co.jp/Xiaomi-Wowstick1F-%E7%B2%BE%E5%AF%86%E3%83%89%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E3%82%BB%E3%83%83%E3%83%88-56%E7%A8%AE%E9%A1%9ES2%E3%83%93%E3%83%83%E3%83%88-%E3%83%9A%E3%83%B3%E5%9E%8B%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%A5%E3%83%BC%E3%83%89%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC/dp/B07SSZX76W/ref=as_li_ss_tl?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&keywords=wowstick&qid=1575653300&sr=8-6&linkCode=ll1&tag=mzyy-22&linkId=396109fd68d27a00cf2165a91a7f27b9&language=ja_JP)


![echo show 5 teardown](/assets/images/2019/12/07/IMG_1496.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1497.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1498.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1499.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1500.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1501.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1504.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1505.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1506.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1507.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1508.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1510.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1511.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1512.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1513.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1514.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1515.JPG)
![echo show 5 teardown](/assets/images/2019/12/07/IMG_1516.JPG)


-----

いろいろな基板があらわになってかわいい。テストパッドくらいかな、ぱっと見でいじる道筋は。
シールドの下へのアクセスや、フラッシュメモリへの直アクセスをしてadb有効化とかできないものか。
解析には時間がかかる。趣味となると尚更時間がとれない。続きはいつになることやら。この前のセキュリティコンテストでのJailbreak手法とかもやりたいね。

- [Zero Day Initiative — Pwn2Own Tokyo 2019 – Day One Results](https://www.zerodayinitiative.com/blog/2019/11/6/pwn2own-tokyo-2019-day-one-results)
- [Zero Day Initiative — Diving Deep Into a Pwn2Own Winning WebKit Bug](https://www.zerodayinitiative.com/blog/2019/11/25/diving-deep-into-a-pwn2own-winning-webkit-bug)

