---
title: MacBook Airをオーブンで焼きリンゴ（修理）
date: 2017-09-15 00:40:29 +0900
category: Gadget
tags: apple baking macbookair
image:
  path: /assets/images/2017/09/15/baking.jpg
  thumbnail: /assets/images/2017/09/15/baking.jpg
---


夏も終わりを迎えた頃、突然MacBook Airが起動しなくなった。気温が高く湿気が多い日本の夏。仕様の動作上限温度35℃、上限相対湿度90％を超えかねないため、致死には十分な環境である。

[MacBook Air - 仕様 - Apple（日本）](https://www.apple.com/jp/macbook-air/specs/)

さて、壊れたので修理に出そうと思い立ちApple Store銀座に出向いたのだが、ジーニアスバーでの見積もりはロジックボードの不調で53,000円とのことであった。
2013年のモデルを修理するために、2017年モデルの新品購入価格の半額ほどの価格を投資するのは考え物である。
ましてやiPhone Xの半分の性能だ。
おまけにバッテリーにも問題が予見されるとあって、総コストを考えると今後数年間にわたって使い続けるより、新しいモデルを買ったほうが良いと購入を促された。
そして修理は諦め、自分でなんとかする方法を模索することにした。

<!-- more -->
{% include toc %}


<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">MacBook Air Mid2013、歴代のMacBookシリーズの中で一番ロジックボード修理代金が高いようで、53,000円+税と言われたのでオーブンに放り込むことが決定した</p>&mdash; ふぇねっくのやべーやつ (@mzyy94) <a href="https://twitter.com/mzyy94/status/902800288242843649">2017年8月30日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## 故障の症状について

今回故障した症状としては、起動時に警告音が以下のように3回鳴るのを繰り返し、一切のOS起動シーケンスに突入しないというものであった。

<blockquote class="twitter-video" data-lang="ja"><p lang="ja" dir="ltr">うーん  焼くしかないか <a href="https://t.co/ieZUMeXdCL">pic.twitter.com/ieZUMeXdCL</a></p>&mdash; ふぇねっくのやべーやつ (@mzyy94) <a href="https://twitter.com/mzyy94/status/908327245885747200">2017年9月14日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

何かしらの診断機能が起動時にハードウェアをテストし、動作条件に満たない不具合が見つかったことを知らせているのだと推測できる。

## 故障原因の特定

ジーニアスバーでは単にロジックボードの故障と告げられたが、バックヤードでの故障確認をしたとの会話の中で、次のような発言があった。

> こういう症状の場合、メモリが取り外せるモデルだったらメモリ交換で治ることがあるんですが、このモデルはオンボードメモリなのでやっぱりロジックボードごと交換する必要がありますね。

とぼとぼと家に帰りこの言葉を思い出したのでいろいろと調べてみたところ、症状と合致するApple公式サポート記事が見つかった。

[電源投入自己テストでのビープ音について - Part 2 - Apple サポート](https://support.apple.com/ja-jp/HT1547)

起動時の警告音の回数と、上記のサポートサイトの記事により、メモリバンクの不調が原因とみられる。
これまでMacBook Airを適当な運搬や落下等の過酷な利用をしていたため、メモリバンクの不調の根本的な原因はBGAのはんだクラックと仮定した。


## ベイクドMacBook Air

### ベイクドGPUとの出会い

2014年の夏、Kernel/VM探検隊＠北陸１に参加したのが出会いのきっかけであった。遠く北陸は金沢まで夜行バスで到達し、疲弊しているところに初っ端からぶっ飛んだプレゼンテーションを見聞きしたため鮮明に覚えている。

<iframe src="//www.slideshare.net/slideshow/embed_code/key/H4qTVgGeZbXDZd?startSlide=2" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/naotokawahara3/alongtimeagoin-tottori-web" title=" ベイクドGPU Kernel/VM北陸1" target="_blank"> ベイクドGPU Kernel/VM北陸1</a> </strong> from <strong><a href="//www.slideshare.net/naotokawahara3" target="_blank">nkawahara Kawahara</a></strong> </div>

是非ともスライドに目を通してほしいが、関心が薄い方のために簡単に内容を要約すると、いくつもの故障したGPUのリフローを家庭で行い、再生した結果を評価したものである。
対象は**はんだクラックが起きていると想定されるGPU**で、家庭でのリフローではオーブンを用い、はんだの融点を考慮して行っていた。
このスライドにある融点に関する情報及び加熱手順を参考に、オーブンでの加熱によるMacBook AirのBGAメモリのリフローを試みることとした。



### 分解

MacBook Airはデスクトップマシン向けGPUのように基板が丸出しではないので、分解しロジックボードを取り出す必要がある。
2017年となった今ではインターネットが極度に発達しているため、「macbook air 2013 logic board repair」などと検索すれば一つの苦労もなくロジックボードの取り出し方解説がみつかった。

<iframe src="https://jp.ifixit.com/Guide/embed/16945" width="600" height="438" allowfullscreen frameborder="0"></iframe>

手持ちの特殊精密ドライバーを用いて手順に従い、分解を進めること10分。いとも簡単にロジックボードの取り外しが完了した。

<a href="https://www.amazon.co.jp/dp/B01MUCQB1O//ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=mzyy-22&linkId=582cbadddc622cf4b063d65f217b6ddc" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01MUCQB1O&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22" ></a>


### 加熱

ロジックボードの取り外しができたので、オーブンの予熱を開始した。
Appleは鉛フリーはんだを用いているため、鉛フリーはんだの融点に達する温度での加熱をする必要がある。

[環境 - より安全な素材 - Apple（日本）](https://www.apple.com/jp/environment/safer-materials/)

先ほどのスライドより、鉛フリーはんだの融点は216℃～220℃と示されているため、 __220℃で4分__ の加熱をすることとした。

![heating](/assets/images/2017/09/15/heating.jpg)

予熱をしている間に、グリスをふき取り、アルミホイルで包むなどの加熱への準備を進めた。
予熱が終わり4分間の加熱をし、自然冷却を行い待つこと30分。
分解とは逆の手順で組み込み、恐る恐る電源を入れた。

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="ja" dir="ltr">んんんwwww焼いたら動いた <a href="https://t.co/9Aks3CT0cu">pic.twitter.com/9Aks3CT0cu</a></p>&mdash; ふぇねっくのやべーやつ (@mzyy94) <a href="https://twitter.com/mzyy94/status/908343638614085632">2017年9月14日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

起動した。

## まとめ

動作はするようになったものの、このブログ記事を書いている最中にも突然電源が落ちるような症状が頻発している。
たまったもんじゃない。
このままではまともに使い続けられないので、データを取り出したらMacBook Proでも買い足すとする。
