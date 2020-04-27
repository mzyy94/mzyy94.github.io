---
title: サーバーの発熱でこたつを温める
date: 2014-12-10 00:02:35 +0900
category: server
tags: kotatsu
header:
  image: /assets/images/2014/12/10/kotatsu.jpg
---
この記事は[coins Advent Calendar](http://www.adventar.org/calendars/443)の一部です。


寒い日が続きますね。昨夜の外気温は摂氏2度でした。みなさんいかがお過ごしでしょうか。

我が家は先月下旬にこたつを出しました。こたつから出られない生活が続いております。
故に、こんなスライドをLTで発表しました。

[こたつ - coinsLT #1](http://www.slideshare.net/mzyy94/kotatsu)

<iframe src="//www.slideshare.net/slideshow/embed_code/key/jCZ4AoE4pZYtYR" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/mzyy94/kotatsu" title="こたつ - coinsLT #1" target="_blank">こたつ - coinsLT #1</a> </strong> from <strong><a target="_blank" href="//www.slideshare.net/mzyy94">Yuki Mizuno</a></strong> </div>

ITによってこたつ生活のQoLが向上したのですが、まだ改善の余地はあります。
そう、__熱源の有効利用__です。

みなさんご存知の通り、PC機器は熱を持ちます。この熱、せっかくなので有効活用したくありませんか？
ということで、実際にサーバー・デスクトップPCを熱源にしてこたつを温めてみる実験をしてみました。

<!-- more -->

## どのように熱源として活用するか

冒頭に掲載したスライドにあるように、すでにすべてのサーバーはLANケーブルと電源さえあれば動作し利用できるようになっています。
なので、我が家では電源とLANをこたつまで引っ張り、設置場所をこたつのなかに変えるだけで熱源として利用することができます。


__※熱を持つマシンは火災の危険があり、その危険度はアパートを燃やしてVPSを借りるという炎上マーケティングに利用されるほどです。真似する際は十分に注意してください。__

## 実験環境

|        日時      |             場所           | 外気温 |
|:----------------:|:--------------------------:|:------:|
|2014/12/9 19:04:22|学園都市内のマンションの一室|  2  ℃  |

LTで発表した2つのシステムをこたつ内で動作させて、熱の有効利用ができるかどうかを検証してみます。


## 録画サーバー

![Recording Server](/assets/images/2014/12/10/recording-server.jpg)

まずは録画サーバーを熱源としてこたつを温めてみたいと思います。
主な熱源となりうるパーツは以下の通りです。

|パーツ|種類|
|:----:|:--------------:|
| CPU  | Intel Celeron 847 |
| GPU  | n/a |
| HDD  | 3x WD Green 3TB |
| SSD  | 1x SanDisk 128GB |
|Power | 200W FlexATX |

24時間稼働を前提に構成したサーバーなので低消費電力のパーツが多いですが、HDD3台の発熱は結構なものであると思います。


### 実験

いつもの利用方法を想定して、電源を入れてアニメを2本、計50分ストリーミング再生して温度上昇がどれほどかを実験してみます。

![temperature1](/assets/images/2014/12/10/recording-server-temperature1.jpg)

電源をいれる直前のこたつ内の温度は16.0℃でした。アニメを再生しているときの録画サーバーの消費電力は平均40.4Wでした。

![power1](/assets/images/2014/12/10/recording-server-power.jpg)

## 結果

体温が熱源となることがないよう、寒いこたつの外でアニメを2本みた後のこたつ内の温度はどうなったでしょうか。

![temperature2](/assets/images/2014/12/10/recording-server-temperature2.jpg)

1時間の録画サーバーの稼働でなんとこたつ内の温度は21.2℃になりました。5.2℃の上昇です。
なんとなく温もりを感じられますが、まだまだこたつとしては物足りなさを感じてしまう温度です。


## ゲームストリームサーバー

![GameStream Server](/assets/images/2014/12/10/gamestream-server.jpg)
そこで、ゲームストリームサーバーを追加してあらたな熱源としてこたつを温めてみたいと思います。
主な熱源となりうるパーツは以下の通りです。

|パーツ|種類|
|:----:|:--------------:|
| CPU  | Intel Core i5-2405S |
| GPU  | ZOTAC GeForce 750Ti|
| HDD  | n/a|
| SSD  | 1x Transcend 128GB |
|Power | 200W FlexATX |

ゲーミングマシンとあって、発熱の多いGPUを搭載しているのが特長です。


### 実験
先ほどの録画サーバーによって温まったこたつに、ゲームストリームサーバーを追加して、2台のマシンでどれほどこたつを温められるかを実験してみます。
こちらもいつもの利用方法を想定して、電源を入れてゲームを1チャプター、約30分プレイしてこたつ内を温めます。

![temperature1](/assets/images/2014/12/10/gamestream-server-temperature1.jpg)

電源をいれる直前のこたつ内の温度は20.8℃でした。アニメを再生した直後より少し下がっていますが、これはこたつ内にサーバーを搬入した際に、こたつ外の冷えた空気が入ったためです。
ゲームをプレイしているときの2台のマシンの消費電力は平均120Wでした。

![power2](/assets/images/2014/12/10/gamestream-server-power.jpg)

### 結果

1回死んでしまいましたが、なんとかチャプターをクリアできました。透明なハンターは強い。
さて、こたつ内の温度はどうなったでしょうか。

![temperature2](/assets/images/2014/12/10/gamestream-server-temperature2.jpg)

30分間のゲームプレイで、温度はなんと26.1℃になりました。2台のマシンで16.0℃から26.1℃にまで暖かくなりました。10℃も！！
こたつに入ってみると、眠りを誘う温もりを感じられるほどでした。普通にあったかい。


## まとめ

いくらサーバーの発熱がすごいからと、室温を劇的に上げることはできませんが、こたつの中なら10℃ほど温められることがわかりました。寒い冬にはもってこいのお得情報です。
しかし、こたつの中は埃が多く、炎上してVPSを借りる羽目になることもあるので、くれぐれも真似する際は十分に注意をはらって行ってください。


明日のcoins Advent Calendarは[カブさん](https://twitter.com/azuma962)です。
