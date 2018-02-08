---
title: 1万円台の格安Intel X540-T2 10GbEを買ってみた
date: 2016-07-06 03:24:50 +0900
category: network
tags: 10gbe nic x540-t2
header:
  image: /blog/resources/images/2016/07/06/card-face.jpg
---


事の発端はこちらのツイート
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Amazonに出品されてる激安X540-T2（19000円）って本物なの、大丈夫なの</p>&mdash; ゆずはら (@yuzuhara) <a href="https://twitter.com/yuzuhara/status/749804710530392065">2016年7月4日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">同じこと思っててまだ買えずにいる <a href="https://t.co/424csKrtVR">https://t.co/424csKrtVR</a></p>&mdash; ハイスクール・フリートが生きがい (@mzyy94) <a href="https://twitter.com/mzyy94/status/749821436919885824">2016年7月4日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


この低価格NICはずっと気になっていて、ほしいものリストにもずっと突っ込んでありました。
![Wishlistの画像](/blog/resources/images/2016/07/06/wishlist.png)

突っ込んだ当時の価格からずいぶんと安くなり、2016/07/04時点で2万円を切っていたので、以下のような煽りも受けたついでに2枚買ってみました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">買って確かめてくれよ（懇願 <a href="https://t.co/bWfXoO153O">https://t.co/bWfXoO153O</a></p>&mdash; ゆずはら (@yuzuhara) <a href="https://twitter.com/yuzuhara/status/749824378876022784">2016年7月4日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


買って挙動を確かめてみたレポートです。

[Amazon.co.jp： intel X540-T2: パソコン・周辺機器](https://www.amazon.co.jp/intel-X540T2-X540-T2/dp/B0077CS9UM/ref=sr_1_1?ie=UTF8&qid=1467713812&sr=8-1&tag=mzyy-22)

<!-- more -->

## Intel X540-T2

![NICの画像 form Intel](/blog/resources/images/2016/07/06/x540-t2.jpg)

[Intel® Ethernet Converged Network Adapter X540-T2 仕様](http://ark.intel.com/ja/products/58954/Intel-Ethernet-Converged-Network-Adapter-X540-T2)

一般のご家庭向けのデュアルポート10GbE NICです。
ark intelの希望カスタマー価格を見ると*$508.00 - $513.00*とあるように、執筆時の為替レートで考えても5万円は下らない代物です。
2012年発売から時が立っており、今年のQ1に後継となるX550-T2が発売されていることを考えると、価格が下がるのは納得ですが、
コンシューマー向けではない機器であるためそこまで値下がりは期待できないと思われていました。

それがついに1万円台で買えるとあって、これから一般のご家庭に急速に広まっていくNICの一つになることは間違いなしです。

[Amazon.co.jp： intel X540-T2: パソコン・周辺機器](https://www.amazon.co.jp/intel-X540T2-X540-T2/dp/B0077CS9UM/ref=sr_1_1?ie=UTF8&qid=1467713812&sr=8-1&tag=mzyy-22)

## 購入＆到着

購入を煽られてクレジットカードの締日を確認し、ポイント還元率の計算と締日が遠いカードの認証情報の登録を行って1時間ほど立ったあとにアマゾンポチｗ！
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">買いました <a href="https://t.co/QauGkl8eQw">https://t.co/QauGkl8eQw</a></p>&mdash; ハイスクール・フリートが生きがい (@mzyy94) <a href="https://twitter.com/mzyy94/status/749832787960602624">2016年7月4日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

14時頃に発注して翌日12時頃に到着しました。さすがAmazonプライムお急ぎ便ですね。
[Amazonプライムの入会はこちら](https://www.amazon.co.jp/tryprimefree?tag=mzyy-22)

![箱の画像](/blog/resources/images/2016/07/06/amazon-prime.jpg)

Twitterでは「この安さ、偽物じゃないか？」と噂されていましたが、Intelロゴはちゃんとしたものでした。

![Intelロゴの画像](/blog/resources/images/2016/07/06/intel-haitteru.jpg)

[Amazon.co.jp： intel X540-T2: パソコン・周辺機器](https://www.amazon.co.jp/intel-X540T2-X540-T2/dp/B0077CS9UM/ref=sr_1_1?ie=UTF8&qid=1467713812&sr=8-1&tag=mzyy-22)

## セットアップ

### 環境

以下の、A及びBの2台のマシンに導入しました。

A: 仮想マシン動かしてるやつ

| パーツ | 種類
|:------|:----
| CPU     | Intel Xeon E3-1245v3 3.4GHz
| Memory  | ECC DDR3-1600 16GB (8GB x 2)
| PCIe | PCI Express 3.0
| OS | ProxMox 4.2 (Debian Jessie 8.2)
| バージョン | 4.4.6-1-pve

B: NAS

| パーツ | 種類
|:------|:----
| CPU     | Intel Core i5-2405S 2.5GHz
| Memory  | DDR3-1600 16GB (8GB x 2)
| PCIe | PCI Express 2.0
| OS | Rockstor 3.8-14 (CentOS 7.2)
| バージョン | 4.6.0-1.el7.elrepo.x86_64

#### NOTE: PCI Express 2.0とPCI Express 2.1の違いについて

X540-T2はPCI Express 2.1以上の拡張カードスロットに対応しているため、Bの構成は非対応となっています。
マイナーバージョンアップ程度の変更ですが、3.0に盛り込む予定であった多くの機能をIntelが打診して無理やり2.1として出させたこともあって*[要出典]*、
数少ないPCI Express 2.1インターフェースを要求するこのNICもその追加機能を多く使っていると考えられます。

出典？：[【イベントレポート】【PCI-SIG Developers Conference 2010レポート】 PCIe Specificationの詳細 - PC Watch](http://pc.watch.impress.co.jp/docs/news/event/380216.html)

ただ、PCI Expressには下位互換性がサポートされているため、最高のパフォーマンスは出せないにしろ、動作すると予想されるため、Bの構成でも利用してみます。

### 接続

X540-T2と同時購入した*[こたつみたいなCAT7 LANケーブル](https://www.amazon.co.jp/gp/product/B00ID1S8ZW/ref=oh_aui_detailpage_o00_s00?ie=UTF8&tag=mzyy-22)*をそれぞれのポートに接続してこんな感じでつなげてみました。

![つなげた図](/blog/resources/images/2016/07/06/connected.jpg)

[Amazon.co.jp： intel X540-T2: パソコン・周辺機器](https://www.amazon.co.jp/intel-X540T2-X540-T2/dp/B0077CS9UM/ref=sr_1_1?ie=UTF8&qid=1467713812&sr=8-1&tag=mzyy-22)

### 認識

とりあえずカーネルで標準で読み込まれてたドライバで認識しました。

```
[root@rockstor ~]# lspci -d 8086: | grep Ethernet
01:00.0 Ethernet controller: Intel Corporation Ethernet Controller 10-Gigabit X540-AT2 (rev 01)
01:00.1 Ethernet controller: Intel Corporation Ethernet Controller 10-Gigabit X540-AT2 (rev 01)
[root@rockstor ~]#
```


```
[root@rockstor ~]# lspci -k -s 01:00
01:00.0 Ethernet controller: Intel Corporation Ethernet Controller 10-Gigabit X540-AT2 (rev 01)
        Subsystem: Intel Corporation Ethernet Converged Network Adapter X540-T2
        Kernel driver in use: ixgbe
01:00.1 Ethernet controller: Intel Corporation Ethernet Controller 10-Gigabit X540-AT2 (rev 01)
        Subsystem: Intel Corporation Ethernet Converged Network Adapter X540-T2
        Kernel driver in use: ixgbe
[root@rockstor ~]#
```

```
[root@rockstor ~]# modinfo ixgbe | head -6
filename:       /lib/modules/4.6.0-1.el7.elrepo.x86_64/kernel/drivers/net/ethernet/intel/ixgbe/ixgbe.ko
version:        4.2.1-k
license:        GPL
description:    Intel(R) 10 Gigabit PCI Express Network Driver
author:         Intel Corporation, <linux.nics@intel.com>
srcversion:     E252348AB8BA33BA57DD40B
[root@rockstor ~]#
```

```
root@pve:~# modinfo ixgbe | head -6
filename:       /lib/modules/4.4.6-1-pve/kernel/drivers/net/ethernet/intel/ixgbe/ixgbe.ko
version:        4.3.15
license:        GPL
description:    Intel(R) 10 Gigabit PCI Express Network Driver
author:         Intel Corporation, <linux.nics@intel.com>
srcversion:     7AED484083B2C5B86424A3A
root@pve:~#
```

Rockstor(CentOS 7.2)ではバージョン4.2.1、ProxMox(Debian 8.2)ではバージョン4.3.15のようですね


#### ドライバ導入

そのままで認識してくれましたが、せっかくなので最新のドライバを導入します。
執筆時点の最新のドライバは4.3.15なので、ProxMoxは最新版が搭載されているようです。
Rockstorのドライバをアップデートするため、
Intelから最新のドライバを拾ってきて、`tar xf && make && make install`するだけの簡単なお仕事でした。

[Download Network Adapter Driver for PCI-E* Intel® 10 Gigabit Ethernet Network Connections under Linux*](https://downloadcenter.intel.com/download/14687/PCI-E-10-Linux-)


## 検証

こんなに安くてはたしてしっかり動くのか、そこが問題です。

### 検証環境

構成は前章のセットアップの節に同じ。
Aの仮想マシン動かしてるやつをクライアント、BのNASをサーバとします。
IPアドレスは、Aを172.28.0.2/24、Bを172.28.0.3/24として設定します。

### 検証内容

#### 単線通信速度測定

iperf3を使って片方のポートに接続したLANケーブルで通信してTCPによる転送速度を測定します。
5回測定して偏りがなければ、3回目の結果を例としてあげます。

#### リンクアグリゲーション通信速度測定

デュアルポートを束ねてリンクアグリゲーションし、論理20Gbpsを構成してiperf3で通信速度を測定します。
リンクアグリゲーションの構成方法はクライアント・サーバともに同じとし、クライアント側での設定例を以下に示します。

```
root@pve:~# modprobe bonding
root@pve:~# ip addr add 172.28.0.3/24 brd + dev bond0
root@pve:~# ip link set dev bond0 up
root@pve:~# ifenslave bond0 eth2 eth3
```

5回測定して偏りがなければ、3回目の結果を例としてあげます。

#### 消費電力

AのXeonマシンにおいて、以下の4状態を10秒間ワットチェッカーで測定した結果の平均値を求めます。

- X540-T2未搭載でのアイドル時消費電力
- X540-T2搭載した状態でのアイドル時消費電力
- X540-T2搭載した状態でiperf3単線通信速度測定時の消費電力
- X540-T2搭載した状態でiperf3リンクアグリゲーション通信速度測定時の消費電力

### 結果


#### 単線通信速度測定
iperf3で5回計測した結果、偏りは生じませんでした。
平均的な数値としては、単線では帯域幅が**9.38Gbps**出るといった結果となりました。
以下に、3回目の結果を示します。


##### クライアント側

```
root@pve:~# iperf3 -c 172.28.0.2 0B 172.28.0.3
Connecting to host 172.28.0.2, port 5201
[  4] local 172.28.0.3 port 59914 connected to 172.28.0.2 port 5201
[ ID] Interval           Transfer     Bandwidth       Retr  Cwnd
[  4]   0.00-1.00   sec  1.10 GBytes  9.41 Gbits/sec   10    624 KBytes
[  4]   1.00-2.00   sec  1.09 GBytes  9.40 Gbits/sec    0    672 KBytes
[  4]   2.00-3.00   sec  1.09 GBytes  9.40 Gbits/sec    0    676 KBytes
[  4]   3.00-4.00   sec  1.09 GBytes  9.36 Gbits/sec    0    687 KBytes
[  4]   4.00-5.00   sec  1.09 GBytes  9.41 Gbits/sec    0    694 KBytes
[  4]   5.00-6.00   sec  1.09 GBytes  9.41 Gbits/sec    7    615 KBytes
[  4]   6.00-7.00   sec  1.08 GBytes  9.31 Gbits/sec   11    609 KBytes
[  4]   7.00-8.00   sec  1.06 GBytes  9.11 Gbits/sec    0    755 KBytes
[  4]   8.00-9.00   sec  1.04 GBytes  8.95 Gbits/sec    0    860 KBytes
[  4]   9.00-10.00  sec  1.05 GBytes  9.01 Gbits/sec    0    887 KBytes
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth       Retr
[  4]   0.00-10.00  sec  10.8 GBytes  9.28 Gbits/sec   28             sender
[  4]   0.00-10.00  sec  10.8 GBytes  9.27 Gbits/sec                  receiver

iperf Done.
```

##### サーバ側
```
[root@rockstor ~]# iperf3 -s -B 172.28.0.2
-----------------------------------------------------------
Server listening on 5201
-----------------------------------------------------------
Accepted connection from 172.28.0.3, port 59912
[  5] local 172.28.0.2 port 5201 connected to 172.28.0.3 port 59914
[ ID] Interval           Transfer     Bandwidth
[  5]   0.00-1.00   sec  1.05 GBytes  9.03 Gbits/sec
[  5]   1.00-2.00   sec  1.09 GBytes  9.39 Gbits/sec
[  5]   2.00-3.00   sec  1.09 GBytes  9.40 Gbits/sec
[  5]   3.00-4.00   sec  1.09 GBytes  9.36 Gbits/sec
[  5]   4.00-5.00   sec  1.10 GBytes  9.41 Gbits/sec
[  5]   5.00-6.00   sec  1.09 GBytes  9.40 Gbits/sec
[  5]   6.00-7.00   sec  1.09 GBytes  9.34 Gbits/sec
[  5]   7.00-8.00   sec  1.06 GBytes  9.11 Gbits/sec
[  5]   8.00-9.00   sec  1.04 GBytes  8.93 Gbits/sec
[  5]   9.00-10.00  sec  1.05 GBytes  9.00 Gbits/sec
[  5]  10.00-10.04  sec  43.1 MBytes  9.41 Gbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  5]   0.00-10.04  sec  0.00 Bytes  0.00 bits/sec                  sender
[  5]   0.00-10.04  sec  10.8 GBytes  9.24 Gbits/sec                  receiver
```

#### リンクアグリゲーション通信速度測定
iperf3で5回計測した結果、偏りは生じませんでした。
平均的な数値としては、リンクアグリゲーションでは帯域幅が**14.4Gbps**出るといった結果となりました。
以下に、3回目の結果を示します。

##### クライアント側

```
root@pve:~# iperf3 -c 172.28.0.2 -B 172.28.0.3
Connecting to host 172.28.0.2, port 5201
[  4] local 172.28.0.3 port 54549 connected to 172.28.0.2 port 5201
[ ID] Interval           Transfer     Bandwidth       Retr  Cwnd
[  4]   0.00-1.00   sec  1.67 GBytes  14.3 Gbits/sec    9    677 KBytes
[  4]   1.00-2.00   sec  1.68 GBytes  14.5 Gbits/sec    0    682 KBytes
[  4]   2.00-3.00   sec  1.69 GBytes  14.5 Gbits/sec  165    684 KBytes
[  4]   3.00-4.00   sec  1.72 GBytes  14.8 Gbits/sec    2    773 KBytes
[  4]   4.00-5.00   sec  1.66 GBytes  14.2 Gbits/sec  106    557 KBytes
[  4]   5.00-6.00   sec  1.62 GBytes  13.9 Gbits/sec   29    472 KBytes
[  4]   6.00-7.00   sec  1.68 GBytes  14.5 Gbits/sec   15    840 KBytes
[  4]   7.00-8.00   sec  1.63 GBytes  14.0 Gbits/sec   42    587 KBytes
[  4]   8.00-9.00   sec  1.66 GBytes  14.2 Gbits/sec   94    710 KBytes
[  4]   9.00-10.00  sec  1.62 GBytes  13.9 Gbits/sec   15    710 KBytes
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth       Retr
[  4]   0.00-10.00  sec  16.6 GBytes  14.3 Gbits/sec  477             sender
[  4]   0.00-10.00  sec  16.6 GBytes  14.3 Gbits/sec                  receiver

iperf Done.
```

##### サーバ側
```
[root@rockstor ~]# iperf3 -s -B 172.28.0.2
-----------------------------------------------------------
Server listening on 5201
-----------------------------------------------------------
Accepted connection from 172.28.0.3, port 54615
[  5] local 172.28.0.2 port 5201 connected to 172.28.0.3 port 54549
[ ID] Interval           Transfer     Bandwidth
[  5]   0.00-1.00   sec  1.60 GBytes  13.8 Gbits/sec
[  5]   1.00-2.00   sec  1.68 GBytes  14.4 Gbits/sec
[  5]   2.00-3.00   sec  1.69 GBytes  14.5 Gbits/sec
[  5]   3.00-4.00   sec  1.72 GBytes  14.8 Gbits/sec
[  5]   4.00-5.00   sec  1.66 GBytes  14.2 Gbits/sec
[  5]   5.00-6.00   sec  1.62 GBytes  13.9 Gbits/sec
[  5]   6.00-7.00   sec  1.67 GBytes  14.3 Gbits/sec
[  5]   7.00-8.00   sec  1.64 GBytes  14.1 Gbits/sec
[  5]   8.00-9.00   sec  1.66 GBytes  14.2 Gbits/sec
[  5]   9.00-10.00  sec  1.62 GBytes  13.9 Gbits/sec
[  5]  10.00-10.04  sec  62.2 MBytes  14.1 Gbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  5]   0.00-10.04  sec  0.00 Bytes  0.00 bits/sec                  sender
[  5]   0.00-10.04  sec  16.6 GBytes  14.2 Gbits/sec                  receiver
```


#### 消費電力

4状態における消費電力は以下の通りとなりました。


|状態|消費電力
|:---|----:
| 未搭載アイドル時| 38 W
| 搭載済みアイドル時 | 51 W
| 単線通信時 | 63 W 
| リンクアグリゲーション通信時 | 68 W


## まとめ
X540-T2は買いである。

[Amazon.co.jp： intel X540-T2: パソコン・周辺機器](https://www.amazon.co.jp/intel-X540T2-X540-T2/dp/B0077CS9UM/ref=sr_1_1?ie=UTF8&qid=1467713812&sr=8-1&tag=mzyy-22)
