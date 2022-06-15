---
title: "Photon Mono 4K 光造形3Dプリンターを導入した"
date: 2022-06-15 2:00:00 +0900
published: true
toc: true
category: 3D Print
tags: anycubic photon thingiverse
image:
  path: /assets/images/2022/06/15/photon_mono_4k_sample_print.jpg
  thumbnail: /assets/images/2022/06/15/photon_mono_4k_sample_print.jpg
---

ついに3Dプリンターを購入した。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">𝑚𝑦 𝑛𝑒𝑤 𝑔𝑒𝑎𝑟 <a href="https://t.co/aG8nI3wjDf">pic.twitter.com/aG8nI3wjDf</a></p>&mdash; 6月 (@mzyy94) <a href="https://twitter.com/mzyy94/status/1509743062805020673?ref_src=twsrc%5Etfw">April 1, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

これまで3Dプリントの必要に迫られてきたことは何度もあり、その度にShapewaysでプリントを外注してきた。
費用は高くつく上に、造形物が手元に届くまで数日から数週間かかっていた。

{% include post-link.html slug="shapeways-sterling-sliver" %}
{% include post-link.html slug="shapeways-reterminal-plastic-case" %}

それでも3Dプリンターを買わず、金銭的時間的コストが掛かる外注を選択する理由は簡単で、導入コストとランニングコストを天秤に掛けても外注の方がパフォーマンスが良いと判断したからだ。
そんな考えを持っていたが、[ラピッドプロトタイピング](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%94%E3%83%83%E3%83%89%E3%83%97%E3%83%AD%E3%83%88%E3%82%BF%E3%82%A4%E3%83%94%E3%83%B3%E3%82%B0)で3Dモデルを頻繁にプリントする必要に駆られ、時間的コストが無視できないようになってきた。

そこで導入を検討していると、近頃のコンシューマ向け3Dプリンターはこれらのコスト問題が減少していたこともあり、早速購入した。

<!-- more -->

{% include toc %}

## ANYCUBIC Photon Mono 4K

<a href="https://www.amazon.co.jp/ANYCUBIC-Photon-3D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC-%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E4%BB%98%E3%81%8D-%E3%82%A2%E3%83%83%E3%83%97%E3%82%B0%E3%83%AC%E3%83%BC%E3%83%89/dp/B09M6ZYGRP?&linkCode=li2&tag=mzyy-22&linkId=f4cf391a378ec961b55a60e741cfb208&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B09M6ZYGRP&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li2&o=9&a=B09M6ZYGRP" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[ANYCUBIC Photon Mono 4K 3Dプリンター 光造形 6.23" モノクロム スクリーン付き アップグレード LCD レジン 3D プリンタ 高速 超高精度 印刷サイズ 165 x 132 x 80mm : 産業・研究開発用品](https://www.amazon.co.jp/ANYCUBIC-Photon-3D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC-%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E4%BB%98%E3%81%8D-%E3%82%A2%E3%83%83%E3%83%97%E3%82%B0%E3%83%AC%E3%83%BC%E3%83%89/dp/B09M6ZYGRP?&linkCode=ll1&tag=mzyy-22&linkId=e901bcec89c0da7ac37948becb23d369&language=ja_JP&ref_=as_li_ss_tl)

購入したのはANYCUBIC社のPhoton Mono 4K。昨年11月に発売となったANYCUBIC社の新製品だ。気になるお値段は29,999円（購入時・税込み）と3万円でお釣りが一円返ってくるという安値っぷり。
今ではクーポンやセールが常時適用され、3万円を切る価格で買えることがほとんどだ。

検討材料として造形精度はもちろんのこと、導入コストが低く（＝安価）、ランニングコストが低く（＝プリント不良や材料費が少ない）、時間的コストが低い（＝プリント時間が短い）の**3C**を重視して探した結果、この機種になった。

### LCD光造形法

安価な家庭用3Dプリンターといえば、材料のフィラメントを送り出して熱で溶解して積み上げていくFDM方式の熱溶解積層法の印象が強かったが、液体のレジンを材料として紫外線で固める光造形法の製品も安くあることを知った。
光造形法の中でもSLA方式やDLP方式は値段が嵩むものの、LCDパネルを採用したLCD光造形法の安価な製品が多く登場していた。

安さゆえに精度が気になるところだが、ここ1年くらいで4K解像度のモノクロLCDを使った製品が各社から発売されており、FDM方式のものよりも速度と精度が出るとの触れ込みだった。
材料のレジンの保管も楽で、FDM方式のフィラメントでは湿度の管理や場所を取るという問題があるが、レジンはボトルのキャップをしっかり閉めて冷暗所に保管するだけなのでメリットが多い。

参考: [光造形式３DプリンターのSLA式とDLP式とLCD式の違いって何？　光学式３Dプリンターの構造の違いについて - DreamerDreamのブログ](https://dreamerdream.hateblo.jp/entry/2019/07/21/120000)


## 道具を揃える

消耗品や必要な道具を揃えた。利用しているものを紹介する。

### 水洗いレジン

通常は光造形の3Dプリンターで造形する場合、材料となるレジンをプリントした後にIPA(イソプロピルアルコール)で洗浄する必要がある。
IPAは有機溶剤であるため管理や処分が大変な上に費用も嵩むとあって、できることなら扱いたくないものだ。
そんな望みが叶う水洗いレジンというものが存在することを今回初めて知った。バケツに入れた水でじゃぶじゃぶ洗うだけで洗浄完了となるのだ。

通常のレジンとは違いIPAによる洗浄が不要になる分、少し割高になる。
その分IPAを扱わなくて良いという価値に対して十分に釣り合うと見込んだため、水洗いレジンを最初から購入することにした。

<a href="https://www.amazon.co.jp/SK%E6%9C%AC%E8%88%97-3D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC%E7%94%A8-500g-SK%E6%B0%B4%E6%B4%97%E3%81%84%E3%83%AC%E3%82%B8%E3%83%B3-_SK02W/dp/B07ZH6BMDD?th=1&linkCode=sl1&tag=mzyy-22&linkId=0c422d7f3e0986780ce7ab1a55892f5f&language=ja_JP&ref_=as_li_ss_tl" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07ZH6BMDD&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li2&o=9&a=B07ZH6BMDD" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[SK本舗 光造形 3Dプリンター用 レジン 500g SK水洗いレジン (白色)\_SK02W \| 造形材料 \| 産業・研究開発用品](https://www.amazon.co.jp/SK%E6%9C%AC%E8%88%97-3D%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC%E7%94%A8-500g-SK%E6%B0%B4%E6%B4%97%E3%81%84%E3%83%AC%E3%82%B8%E3%83%B3-_SK02W/dp/B07ZH6BMDD?th=1&linkCode=sl1&tag=mzyy-22&linkId=0c422d7f3e0986780ce7ab1a55892f5f&language=ja_JP&ref_=as_li_ss_tl)


### ニトリル手袋

未硬化のレジンは肌に直接触れるとアレルギー反応を起こすとのことなので、プリント直後の造形物を洗浄する際に対薬性のあるニトリルの手袋を着用する。
一日に何度か続けてプリントすることがあるため、着脱を容易にするためにポリエチレンの手袋をした上に着けて利用している。

<a href="https://www.amazon.co.jp/%E4%BD%BF%E3%81%84%E3%81%8D%E3%82%8A%E6%89%8B%E8%A2%8B-%E3%83%8B%E3%83%88%E3%83%AA%E3%83%AB%E3%82%B4%E3%83%A0-%E6%A5%B5%E3%81%86%E3%81%99%E6%89%8B-M%E3%82%B5%E3%82%A4%E3%82%BA-%E9%A3%9F%E5%93%81%E8%A1%9B%E7%94%9F%E6%B3%95%E9%81%A9%E5%90%88/dp/B01JFXQ29U?th=1&linkCode=li2&tag=mzyy-22&linkId=dc801da1182b60404a6ab874096dd744&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01JFXQ29U&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li2&o=9&a=B01JFXQ29U" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon \| 使いきり手袋 ニトリルゴム 極うす手 Mサイズ ホワイト 100枚 粉なし 左右両用タイプ 食品衛生法適合 調理 掃除 毛染め 介護 使い捨て \| ファミリー \| ドラッグストア](https://www.amazon.co.jp/%E4%BD%BF%E3%81%84%E3%81%8D%E3%82%8A%E6%89%8B%E8%A2%8B-%E3%83%8B%E3%83%88%E3%83%AA%E3%83%AB%E3%82%B4%E3%83%A0-%E6%A5%B5%E3%81%86%E3%81%99%E6%89%8B-M%E3%82%B5%E3%82%A4%E3%82%BA-%E9%A3%9F%E5%93%81%E8%A1%9B%E7%94%9F%E6%B3%95%E9%81%A9%E5%90%88/dp/B01JFXQ29U?th=1&linkCode=sl1&tag=mzyy-22&linkId=51ab0397b9b0f94263ce97e426f36e0f&language=ja_JP&ref_=as_li_ss_tl)


### UVライト

光造形の3Dプリントでは造形物を乾燥後に再度硬化させる必要がある。いわゆる二次硬化と言うやつで、紫外線を当てられれば太陽光でも代用できるのだが、UVライトを用いるのが確実なようだ（後述）。
どれくらいの出力でどれくらいの時間が最適なのかがわからなかったのもあって、レジンアクセサリの硬化でよく利用されているUV蛍光管の36W出力タイプのこれにした。

<a href="https://www.amazon.co.jp/%E3%80%90%E3%83%AA%E3%83%A5%E3%83%9F%E3%82%A8%E3%83%A9%E3%80%91%E3%80%90CX111S%E3%80%9136W-%E3%83%AC%E3%82%B8%E3%83%B3%E6%B6%B210%EF%BD%87%E4%BB%98%E3%81%8D-%E3%82%BF%E3%82%A4%E3%83%9E%E3%83%BC%E4%BB%98%E3%81%8D-%E3%83%AC%E3%82%B8%E3%83%B3%E3%80%90%E5%AE%89%E5%BF%83%E3%81%AE3%E3%82%AB%E6%9C%88%E4%BF%9D%E8%A8%BC%E3%80%91%E3%80%90%E5%88%86%E3%81%8B%E3%82%8A%E3%82%84%E3%81%99%E3%81%84%E5%8F%96%E6%89%B1%E8%AA%AC%E6%98%8E%E6%9B%B8%E4%BB%98%E3%80%91%E3%80%90%E3%82%AB%E3%83%A9%E3%83%BC%EF%BC%9A%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88-%E3%83%AC%E3%82%B8%E3%83%B3%E6%B6%B210%EF%BD%87%E3%80%91/dp/B07KWT5YQ2?th=1&linkCode=sl1&tag=mzyy-22&linkId=9cd3ec70e6963084e8d4bf2fe2f2d120&language=ja_JP&ref_=as_li_ss_tl" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07KWT5YQ2&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li2&o=9&a=B07KWT5YQ2" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon \| 【リュミエラ】【CX111S】36W UVライト レジン液10ｇ付き ハイパワー タイマー付き ジェル レジン【安心の3カ月保証】【分かりやすい取扱説明書付】【カラー：ホワイト+レジン液10ｇ】 \| リュミエラ \| 硬化用ライト 通販](https://www.amazon.co.jp/%E3%80%90%E3%83%AA%E3%83%A5%E3%83%9F%E3%82%A8%E3%83%A9%E3%80%91%E3%80%90CX111S%E3%80%9136W-%E3%83%AC%E3%82%B8%E3%83%B3%E6%B6%B210%EF%BD%87%E4%BB%98%E3%81%8D-%E3%82%BF%E3%82%A4%E3%83%9E%E3%83%BC%E4%BB%98%E3%81%8D-%E3%83%AC%E3%82%B8%E3%83%B3%E3%80%90%E5%AE%89%E5%BF%83%E3%81%AE3%E3%82%AB%E6%9C%88%E4%BF%9D%E8%A8%BC%E3%80%91%E3%80%90%E5%88%86%E3%81%8B%E3%82%8A%E3%82%84%E3%81%99%E3%81%84%E5%8F%96%E6%89%B1%E8%AA%AC%E6%98%8E%E6%9B%B8%E4%BB%98%E3%80%91%E3%80%90%E3%82%AB%E3%83%A9%E3%83%BC%EF%BC%9A%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88-%E3%83%AC%E3%82%B8%E3%83%B3%E6%B6%B210%EF%BD%87%E3%80%91/dp/B07KWT5YQ2?th=1&linkCode=sl1&tag=mzyy-22&linkId=9cd3ec70e6963084e8d4bf2fe2f2d120&language=ja_JP&ref_=as_li_ss_tl)

### 百均の茶こしとジャムの瓶

余ったレジンを保管するためのセット。バットに残ったレジンを茶こしで漉しながらジャムの瓶に入れて冷暗所に保管する。
茶こしは使い捨てのストレーナーを使う人もいるし、ジャムの瓶は耐薬品性が強そうって理由で選んだだけなので、あくまで参考程度に。


### FEPフィルム

レジンバット(レジン液を入れる容器)の底はフィルムになっていて、使用を重ねるごとに白く濁ってくる。こうなると造形精度が落ちたりプリントミスが発生したりする。
最悪の場合は消耗や劣化によってフィルムが破れてバットの中のレジンが漏れ出し、3Dプリンターがレジン液まみれになるのでそうなる前に交換すべきである。

いつでも対応できるよう交換用のフィルムとフレームのセットを購入した。
しかし10回ほどプリントした今でも目立つ傷はなく、濁りも新品のフィルムと比較してもぱっと見ではわからないほどなのでまだ交換はしていない。
交換手順は簡単で、ネジを外して交換用のフレームと取り替えるだけだ。FEPフィルム単体でも各社から発売されているので、フレームを流用してサイズの合うものに自分で換装する方法で安く済ませることもできる。

<a href="https://www.amazon.co.jp/gp/product/B08YK6PRF6?ie=UTF8&psc=1&linkCode=li2&tag=mzyy-22&linkId=4e5ead0c53280d5bd2fd7834dfffb00c&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08YK6PRF6&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li2&o=9&a=B08YK6PRF6" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon.co.jp: ANYCUBIC FEP ファイル（レジンタンク用） フレーム付き Photon Mono/Photon Mono 4kに適用 3dプリンター光造形 専用 FEP Film 2pcs: 産業・研究開発用品](https://www.amazon.co.jp/gp/product/B08YK6PRF6?ie=UTF8&psc=1&linkCode=ll1&tag=mzyy-22&linkId=7c19db9a3f9a5ba9b15b1bb5082984c1&language=ja_JP&ref_=as_li_ss_tl)

## プリントする

ANYCUBICの3Dプリンターは3Dプリント界隈では有名どころなので、プリントに関しては多くの知見がインターネットにある。
同様にしてここでは実際に利用した経験を基に、失敗談やコツをプリント手順に沿ってまとめておく。

従来機のPhoton Monoの使用感については、次のブログで多く語られていた。

[光造形3Dプリンタ入門した - おめが？日記_(2)](https://omega.hatenadiary.jp/entry/2021/06/16/022510)

### モデリング

3Dプリントするモデルを作成するか、入手することから始める。
3Dモデリング/3D CADソフトは数多くあるが、昔から使っているAutodesk製品でいつもモデリングしている。

[個人用 Fusion 360 - Autodesk](https://www.autodesk.co.jp/products/fusion-360/personal)

オープンな3Dモデルの入手は数多く公開されている[Thingiverse](https://www.thingiverse.com/)を重宝している。

このステップで躓くとしたらAutodesk Fusion 360の使い方だが、おすすめできる文献がなくなってしまった。
以下のブログでも紹介されているが、「Fusion 360でCAD設計を覚えよう」シリーズがインターネットから消え去ってしまったのだ。
なので自力で調べて優良な資料を探し当てるという壁が最初に立ちはだかる。

[生活で役立つ 3D プリントの事例と学び方の紹介 - Zopfcode](https://www.zopfco.de/entry/2020/12/19/212202)


### 3Dモデルをスライス: 付属ソフトが安定

LCD方式やDLP方式の光造形法の3Dプリンターでは、3Dモデルを一層一層プリントしていく。
このためのデータを作るのがスライサーソフトで、界隈ではCHITUBOXが有名だ。
Amazon.co.jpのレビューにはCHITUBOXがまだ対応していないとあったが、バージョン 1.9.2ではプリンターリストにPhoton Mono 4Kがちゃんと登録されていた。

[CHITUBOX - All-in-one SLA/DLP/LCD Slicer丨3D printing preprocessing software](https://www.chitubox.com/en/index)

![CHITUBOX Photon Mono 4K profile](/assets/images/2022/06/15/chitubox-photon-mono4k.png)


最初はPhoton Mono 4K付属のPhoton Workshopで作成していたが、こちらの方が便利だとの口コミを見たのでCHITUBOXに移行してみた。
確かに自動サポート（支え）追加の賢さやレイアウトなどは優秀だが、CHITUBOXで作成したデータではプリントミスが多く発生した（3回中2回）。
Photon Mono 4K本体でのプレビュー表示もおかしかったので、結局Photon Workshopで作成するようになった。

スライサーで重要になるのが、レジンごとの紫外線照射時間などの指定である。SK本舗の水洗いレジンでは推奨露光時間が表にまとめられている。

[プリンター別SK本舗特製レジン露光時間一覧表 – SK本舗-3Dプリンターとレジンの通販・購入](https://skhonpo.com/pages/exposuretime)

追加で買ったNOVA3Dの水洗いレジンと合わせて、スライサーで設定してうまく出力されている値を表に示す。

水洗いレジン | SK本舗(灰/白) | NOVA3D(黒)
:---:|------:|--------:
Layer Thickness | 0.050 | 0.050
Normal Exposure Time | 2.000 | 1.500
Off Time | 0.500 | 0.500
Bottom Exposure Time | 30.000 | 25.000
Bottom Layers | 6 | 5
Anti-alias | 1 | 1 


<a href="https://www.amazon.co.jp/gp/product/B087JFCWZ5?ie=UTF8&psc=1&linkCode=li2&tag=mzyy-22&linkId=73e5d1152842f160fa65e8233cfb53fe&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B087JFCWZ5&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li2&o=9&a=B087JFCWZ5" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[Amazon \| NOVA3D UVレジン水洗可能 405nm LCD SLA 3Dプリンター用 な光硬化 3D樹脂 500g 黒 \| 造形材料 \| 産業・研究開発用品 通販](https://www.amazon.co.jp/gp/product/B087JFCWZ5?ie=UTF8&psc=1&linkCode=sl1&tag=mzyy-22&linkId=9186080e1f4d978a9b0fc5756f82ef09&language=ja_JP&ref_=as_li_ss_tl)

### スライスデータをプリント: 脱落防止のコツ

Photon Mono 4Kのバットに水洗いレジンを入れてプラットフォームを取り付け、本体の準備をする。
用意したプリントデータをUSBメモリーに入れ、本体の画面から選択しプリント開始して待つだけ。
特にハマりポイントはないが、プリントに失敗したパターンと対処を挙げておく。


一時停止による脱落
: 脱落が気になったり造形の経過が知りたくて途中で一時停止したとき、サポートが途切れ造形物が脱落していたことがあった。
一時停止するとプラットフォームが大きく持ち上がり、再開するとバットの高さまで戻るというこの動きにわずかなズレがありそう。
細いサポートが多かったり複雑な3Dモデルでは一時停止しないことを心がける。
プラットフォームにレジンが固着した時にバットのフィルムから剥がれるバリバリ音がするはずなので、できるだけこの音だけで脱落を判断するようにした。

気泡による脱落
: よく振って混ぜたレジンをバットに流し込むことによって、気泡が発生した状態でプリントを開始してしまったことにより発生した可能性のあるパターン。
プラットフォームが気泡を抱えたままレジンの中に沈んで紫外線を照射されるため、気泡のある部分にはレジンが無い状態となり固着に失敗。
気泡が消えるようにバットのレジン液を優しくかき混ぜるか、気泡がなくなるまで我慢して待つことで回避できる。
せっかちなのでプラットフォームをホームポジションに下げた状態から数mm上げてレジンを投入する荒技を編み出し、気泡がプラットフォームの下に入らないようにして対処してしまうようになった。


カッピングによる破損
: 水中でコップを逆さにして持ち上げると中が真空になり水で満たされたままになるように、3Dプリンターで逆さに出力される造形物でも同様に中がレジン液で満たされてしまう。
この状態になることをカッピングと言うようで、中が空洞の直方体のケースを3Dプリントした時に起きてしまった。
カッピングが起きると造形物に発生するのが、形状の変形や層の剥離などの破損だ。最悪の場合は破裂を起こすそうだ。
これを避けるためカッピングが起きない方向に回転させて配置するか、空気の通り道のためスライサーで1mm程度の穴を底に近い側面に開けることで回避できる。

[カッピングによる破裂 \| Support \| Formlabs](https://support.formlabs.com/s/article/Cupping-Blowout?language=ja)

### 洗浄と乾燥: 破損の予防

![Washing](/assets/images/2022/06/15/washing.jpg)

プリント完了後は手袋をしてプラットフォームを取り外し、洗浄を行う。バケツや洗面器に張った水でジャブジャブして使い捨て歯ブラシでゴシゴシすれば余分なレジンを簡単に落とせる。

その後、軽く流水で流したらプラットフォームから造形物をPhoton Mono 4Kに付属のヘラで剥がすのだが、ここで破損することが何度かあった。
何度かの失敗経験を重ねてコツをつかむことで破損は減らすことができたが、特に成功率を上げるのに効果的だったのは**剥がす前にぬるま湯でプラットフォームごと造形物を温める**方法だ。

あとは丸一日ほど暗所で保管して乾燥させる。

### 二次硬化: UVライトで4分間

乾燥したらヌメっとした手触りからスベっとした手触りに変わっているので、二次硬化を行う。
太陽光で硬化させたりUVライトで硬化させたりと方法はいくつかあるが、具体的なUV出力や照射時間の情報が見当たらなかった。
水洗いレジンの販売元のSK本舗ですら、「これといった正解はない」と言う始末。

![youtube PoJloRBXQ88](/assets/images/2022/06/15/youtube.png)

画像引用元: [【3Dプリンターの後処理】光造形3Dプリンターのレジン洗浄方法や二次硬化を初心者向けに徹底解説！｜Phrozen Sonic Mini 4K - YouTube](https://www.youtube.com/watch?v=PoJloRBXQ88&t=220s)

試しに太陽光で昼頃から日没まで二次硬化をしてみたところ、割れてしまっていた。数時間の二次硬化は長すぎるようだ。

正解がわからないので正解なのかわからないが、今は36WのUV蛍光管ライトで120秒を2回、ひっくり返して照射すること計4分で二次硬化を済ませている。
感覚としては、乾燥後でもわずかにねっとりとした手触りが目立つ造形物の側面が、サラッとしたものに変化したら二次硬化ができた合図だと思うことにしてる。

擬音語で表すならば、ヌメッ→スベッ→サラッという順に硬化していく。

### 後片付け: 排水処理とバットの洗浄

レジンのような液体合成樹脂を下水道に流すのは推奨されていない。使用済みレジンはもちろんのこと、プリント後の造形物を洗浄した水にも含まれるため、これを取り除く処理を行う。
水洗いレジンでプリントした造形物を流水ではなくバケツの水で洗浄したのはこういった理由によるものだ。よって、残ったレジンをジャムの瓶に戻した後のバットもこのバケツの水で洗うことになる。

バケツの中に混じるレジンを取り除くには太陽光で硬化させて濾すのが一般的だが、時間がかかるのでUVライトを10分ほど直接照射させて硬化させる。
硬化と言っても造形物のようにしっかりと硬い塊ができることはなく、フニャッとしたゆるい固形が漂うようになる。これを濾して排水処理はおしまい。
環境のためここまで手をかけているが、家庭から出る程度の液体合成樹脂を直接下水に流してしまうことは規制されているわけではないので、モラルさえ捨てればそのまま捨てても刑に処されることはないらしい。

乾いたバットのフィルムはアルコールが含まれているレンズクリーナーできれいに拭いて後片付けの完了だ。

<a href="https://www.amazon.co.jp/gp/product/B07BHSKKSN?ie=UTF8&th=1&linkCode=li2&tag=mzyy-22&linkId=99810235b692b304ebb2c31f6e9010e8&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07BHSKKSN&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=mzyy-22&language=ja_JP&l=li2&o=9&a=B07BHSKKSN" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

[HAKUBA レンズクリーニングティッシュ 個装 50枚入り 速乾 アルコール使用 ウェットタイプ KMC-77 レンズやフィルター出先でも簡単にクリーニング : 家電＆カメラ](https://www.amazon.co.jp/gp/product/B07BHSKKSN?ie=UTF8&th=1&linkCode=sl1&tag=mzyy-22&linkId=1bdb6e0a972dfa827239e9f5793b2e4d&language=ja_JP&ref_=as_li_ss_tl)

## 精度

家庭用3Dプリンターの精度を甘くみていたからか、想像をはるかに超える高さだった。
XY軸精度0.035mmとZ軸精度0.01mmだけあって、出力された造形物からは家庭用3Dプリンターらしさは感じられない。

計測するとXYZ各軸の寸法は各辺300.00mmの立方体を出力して±0.02mm程度の誤差が生じるものの、これは洗浄や硬化のプロセスによっても変化するため、±0.1mm程度の精度でよければ十分にデータ通りのものが出力される。
精密なパーツをプリントする場合はレジンの特性や洗浄から硬化までの過程を繰り返し、状況に応じた誤差を加味した設計をすることで0.01mmの精度も達成できそうだ。

縦0.50mm横0.50mmで高さ3.00mmの支柱を1.50mm間隔で並べたものを出力してみたが、綺麗に出来上がった。

![Slits CAD](/assets/images/2022/06/15/slits-cad.png)
![Slits detail](/assets/images/2022/06/15/slits-detail.jpg)

積層痕はほとんどの場合気になることはないが、小さな部品や手触りを重視するものではヤスリがけ等で表面処理をしたほうがよい。
直径14.90mmの押しボタンを設計して出力した造形物が以下になる。ドーム状に盛り上がっている部分は積層痕が目立ち手触りもざらざらするが、側面は滑らかに仕上がっている。

![button CAD](/assets/images/2022/06/15/button-cad.png)
![Surface detail](/assets/images/2022/06/15/button-detail.jpg)

## 実用3Dモデル

プロトタイピングとは別で、いくつかオープンな3Dモデルをプリントしてみた。
その中で実際に3Dプリントしてみて便利に使えた造形物を紹介しておく。

### Photon Mono 4Kのプラットフォーム傾斜パーツ

[Anycubic Photon Mono Dripping Hook by PiN0YChris - Thingiverse](https://www.thingiverse.com/thing:4611512)

Photon Mono 4Kなどの光造形3Dプリンターでは、出力直後はプラットフォームや造形物に未硬化レジンが多く付着している。
この残留レジンをバットに戻すため、プラットフォームを45度傾けて雫が滴りやすくするためのパーツ。
Photon Mono用だがPhoton Mono 4Kでも使えた。

プリント完了後にプラットフォームを一度外して装着する手間はあるが、結構な量のレジンがバットに戻っていくので最初に作っておくと便利。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">今更ながら3Dプリンタ補助器具を3Dプリントした <a href="https://t.co/9MazdUS6ry">pic.twitter.com/9MazdUS6ry</a></p>&mdash; 6月 (@mzyy94) <a href="https://twitter.com/mzyy94/status/1522253455863468035?ref_src=twsrc%5Etfw">May 5, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


### レジンバットの液切り台

![Resin VAT drainer](/assets/images/2022/06/15/resin-drainer.jpg)

[Anycubic Photon VAT drainer by leenanj - Thingiverse](https://www.thingiverse.com/thing:3374579)

レジンバットに残ったレジンを容器に戻す液切り台。バットを立てかけて下に空き瓶を置くことで、最後の一滴まで残ったレジンを再利用できる。
何度かプリントした後やレジンのゴミが残っているとわかる場合などは、茶漉しをセットして固形のレジンを濾して回収する。

### IKEAの有孔ボードSKÅDISに電池を保管するケース

![Skadis mount things](/assets/images/2022/06/15/skadis-things.jpg)

[Battery Dispenser for Skadis (AA & AAA) by Jobsis - Thingiverse](https://www.thingiverse.com/thing:3160395)

[IKEAで売ってる有孔ボード](https://www.ikea.com/jp/ja/p/skadis-pegboard-white-30320806/)に引っ掛けられる単三の電池をストックするケース。[同じくIKEAの単三充電池](https://www.ikea.com/jp/ja/p/ladda-rechargeable-battery-hr06-aa-1-2v-50504692/)を収納するのに最適だ。

注意点として、この3Dモデルを用いて出力したものは寸法が合わなかった。プリントして二次硬化していざ取り付けようとしたら有孔ボードに突起が刺さらなかったのだ。
Thingiverseのコメント欄にも同様の問題に直面した人のコメントがあるが、光造形でプリントすると突起の位置に上下に2mmのずれが生じるようだ（なんで？）。

結局下の突起を2mmほどリューターで削ってことなきを得たが、この問題に悩まされる人が対処したRemixが公開されているので、光造形で作成する場合はこちらを用いる方がよさそうだ。

[Remixes for Battery Dispenser for Skadis (AA & AAA) by Jobsis - Thingiverse](https://www.thingiverse.com/thing:3160395/remixes)

### IKEAの有孔ボードSKÅDISにM5Stack Atom/Matrixをかけるやつ

[M5Stack Atom Skadis mount by Zulimaine - Thingiverse](https://www.thingiverse.com/thing:4606687)

先ほどのIKEAの有孔ボードのバッテリーケースの奥に取り付けられているもの。USBポートにもアクセスできるのでそのまま利用することもできる。
フックの奥行きと有孔ボードの厚みがきっちり作られているので、有孔ボードに勢いよく取り付けようとするとフック部分が折れてしまうので注意。


### ペットボトルキャップを蓋に利用する小物入れ

![PET bottle cap case](/assets/images/2022/06/15/bottle-cap-case.jpg)


[Mini Container with PET Bottle Cap Size by Tokyo_Bird - Thingiverse](https://www.thingiverse.com/thing:4900080)

[Tray with 3 or 5 spaces for Mini Container by gdPupo - Thingiverse](https://www.thingiverse.com/thing:4902847)

Thingiverseでフィーチャーされていたので作ってみた。3種類のケースをプリントし、3つのケースが収まる土台もプリントした。
スリットの無いタイプのケースはカッピングが起きるので、あらかじめスライサーで下部側面に直径2mmの穴を開けてプリントした。
強度もしっかりあり、ネジなどの細かいものを入れるケースとして重宝している。ペットボトルキャップを使える点もSDGs的にGoodだ。


## まとめ

本体は約3万円とお手軽価格であるにもかかわらず、ここまで精度の高いものが出来上がるとは思っていなかった。
本体の他にレジン液や消耗品を揃えても初期投資は4万円を切り、これならもっと早くから導入しても良かったと後悔するほどだ。
高さの低いものであればプリントは1時間足らずで出来上がるので、寸法の確認と修正を経て再出力するサイクルを迅速に回すことができた。
二次硬化を終えるとしっかりとした強度も得られるとあって、とてもラピッドプロトタイピングに向いているなと実感した。

これからは一家に１台3Dプリンターの時代だ。今すぐ導入しよう。
