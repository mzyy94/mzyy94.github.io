---
title: "Jetson Xavier NXで使えるNano用ケースを2つ試した"
date: 2020-06-09T00:10:00+09:00
author: mzyy94
categories: ["Gadget"]
tags: ["jetson", "xavier", "nx", "nano", "case"]
image: "/assets/images/2020/06/09/IMG_5087.jpg"
---

エッジAIスーパーコンピューターのNVIDIA Jetsonとの付き合いは長く、2015年に買った[Shield TVをJetson TX1化](https://forum.xda-developers.com/shield-tv/general/build-kernel-source-boot-to-ubuntu-t3274632)したのを発端に、遊び初めて5年となる。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">SHIELD TV <a href="http://t.co/K4iEW26mM2">pic.twitter.com/K4iEW26mM2</a></p>&mdash; ミ゛ (@mzyy94) <a href="https://twitter.com/mzyy94/status/614300280687980544?ref_src=twsrc%5Etfw">June 26, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">旧Shield TV、CUDAボードとしてしか使ってないので</p>&mdash; ミ゛ (@mzyy94) <a href="https://twitter.com/mzyy94/status/823039187167285249?ref_src=twsrc%5Etfw">January 22, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

昨年末の11月頭、NVIDIAはJetson Xavier NXを2020年3月に399 USDで発売するとプレスリリースを出していた。

[NVIDIA Announces Jetson Xavier NX, World’s Smallest Supercomputer for AI at the Edge \| NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-announces-jetson-xavier-nx-worlds-smallest-supercomputer-for-ai-at-the-edge)

3月になり、待てど暮らせど発売されている気配がなかったが、4月に入り[プロダクションモジュールが流通しているらしきツイート](https://twitter.com/alfredplpl/status/1255084490340184065)を見かけ、開発者キットの発売は5月のGTC 2020で告知されるとの情報も流れていた。その情報の通り、GTC 2020のオンライン開催と時を同じくして、やっとのことで
Jetson Xavier NX開発者キットが発売された。

[組み込み/エッジ システム用の Jetson Xavier NX \| NVIDIA](https://www.nvidia.com/ja-jp/autonomous-machines/embedded-systems/jetson-xavier-nx/)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">𝑚𝑦 𝑛𝑒𝑤 𝑔𝑒𝑎𝑟 <a href="https://t.co/6BB3gbgysT">pic.twitter.com/6BB3gbgysT</a></p>&mdash; ミ゛ (@mzyy94) <a href="https://twitter.com/mzyy94/status/1262214518110711810?ref_src=twsrc%5Etfw">May 18, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


届いてしばらく放置していたが、早速使ってみるかと思い立ちSDカードイメージを焼いて火を入れてみると、Shield TVで苦労していた時と比べてあっけなく起動してしまった。

さて、無事起動することがわかって、色々と検証をしていこうと思ったものの、Jetson Xavier NX開発者キットは、そのままでは基板剥き出しである。
この状態では怖くてとても常用できないので、ケースを探すことにした。

## 目次


## Jetson Xavier NX用のケース

5月末時点では、手に入るJetson Xavier NX用として販売されているケースは見つけられなかった。残念。

## Jetson Xavier NXとJetson Nanoのサイズ互換

Jetson Xavier NX開発者キットは、無線LANアンテナを備えたプラスチックの検証台にねじ止めされている。
アンテナと共にこの検証台から取り外すと、Jetson Nano開発者キット (rev. B01)とよく似たサイズの基板単体となる。
さらにねじ穴の位置もI/Oポートの位置も、ファン（Nanoではヒートシンク）の位置までも全て同じように見える。

確信がないので、[Jetson Download Center](https://developer.nvidia.com/embedded/downloads)からそれぞれの開発者キットの3D CADモデルファイルをダウンロードして、見比べてみた。

![xavier nx top](/assets/images/2020/06/09/Top3518_3668_A02_3509_A01_0204.stp.png)

![jetson nano top](/assets/images/2020/06/09/Jetson_Nano_Dev_Kit_3D_b01.stp.png)


ねじ穴の位置もI/Oポートの位置も、ファン（Nanoではヒートシンク）の位置も、同じだということがわかった。

これが意味することは、Jetson Nano (rev. B01)のケースが流用できる可能性が非常に高いということだ。

と言うわけで、Jetson Nano開発者キットのケースを探して買うことにした。


## Waveshare Acrylic Clear Case for Jetson Nano

![Waveshare Acrylic Clear Case for Jetson Nano](/assets/images/2020/06/09/jetson-nano-case-a-5_3.jpg)

製品ページ・引用元: [Acrylic Case (Type A) for the Jetson Nano Developer Kit](https://www.waveshare.com/jetson-nano-case-a.htm)

Waveshare製のアクリルで簡易的にJetson Nano B01を保護できるケース。
魅力はなんと言っても安い点。

せんごくネット通販で800円（税込み・購入時価格）で手に入った。

[16566 Jetson Nano用 アクリルクリアケース - せんごくネット通販](https://www.sengoku.co.jp/mod/sgk_cart/detail.php?code=EEHD-5KVV)

![Acrylic Case Top](/assets/images/2020/06/09/IMG_5087.jpg)

組み立てに悩みようもないシンプルな構造。

![Acrylic Case 40 pin header](/assets/images/2020/06/09/IMG_5091.jpg)
![Acrylic Case SD Card Slot](/assets/images/2020/06/09/IMG_5095.jpg)

microSDカードの出し入れをするための開口部は大きく、40ピンヘッダーへのアクセスも容易にできる設計で、最小サイズで組み上がるコンパクトさも相まって「良い」の一言が出る。

![Acrylic Case Camera Connector](/assets/images/2020/06/09/IMG_5090.jpg)
![Acrylic Case I/O Port](/assets/images/2020/06/09/IMG_5092.jpg)

I/Oポートの寸法も2つあるカメラコネクタの端子へのアクセスもバッチリなので、小型で安価なケースを探している場合はこのケースがベスト。

ただ、電源ボタンがないのと、電源ボタン用の接続ピンにコネクタを繋げる余裕がないため、電源を頻繁にON/OFFする使い方には向かない。
電源を付けっぱなしにする使い方、あるいは逆に稀にしか電源を入れない使い方には向いていると思う。

### 無線LANアンテナの取り付けについて

<a href="https://www.amazon.co.jp/gp/product/B07K564T9L/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=mzyy-22&linkId=01798636b9a995f572b81fbd14997fac&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07K564T9L&Format=_SL500_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=mzyy-22&language=ja_JP" ></a>


[Amazon \| NGFF M.2 ネットワーク カード用 6dBi RP-SMA アンテナ U.FL ピグテール ケーブル \| orangejuice.tech \| 無線LAN用アンテナ 通販](https://www.amazon.co.jp/gp/product/B07K564T9L/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=mzyy-22&linkId=605a16669ce9a06953457d05373400f0&language=ja_JP)


アンテナを取りつける穴があるので、上記のようなダイポールアンテナを買い足して、ケースと無線LANモジュールに取り付けることで技術的にはWi-FiとBluetoothが使えるようになる。

しかし、今回のように検証台とアンテナを取り外し、ケースを取り替え、無線出力に関係するアンテナを新たに購入して付け替えるとなると、[電波法](https://www.tele.soumu.go.jp/horei/reiki_honbun/72001000001.html)第三十八条の七第四項の条文中にある**特定無線設備の変更の工事**を行ったと解釈でき、技適マークの表示を除去する義務が発生し、結果として技術基準適合証明が外れて法的には使えないとも捉えられるため、注意したい。ただし、**特定無線設備の変更の工事**の解釈がずれていた場合はこの限りではないので、各自の責任のもと判断されたい。

### 無線LANアンテナの取り付けについて2

Jetson Xavier NXに刻印のある技適マークには、以下の番号が記されている。

- 技術基準適合証明 工事設計認証番号: 201-180775
- 技術基準適合認定 設計認証番号: D180171201

工事設計認証番号の情報を検索すると、以下のページにJetson Xavier NX搭載モジュールの技術基準適合証明情報が記載されている。

[工事設計認証番号 201-180775 総務省 電波利用ホームページ \| 技術基準適合証明等を受けた機器の検索](https://www.tele.soumu.go.jp/giteki/SearchServlet?pageID=jg01_01&PC=201&TC=N&PK=1&FN=200514N201&SN=%94%46%8F%D8&LN=6&R1=*****&R2=*****)

![Jetson Xavier NX Antenna](/assets/images/2020/06/09/jetson-xavier-nx-antenna.png)

画像引用元: [201-180775_01_001.pdf](https://www.tele.soumu.go.jp/giteki/SearchServlet2?PageID=jt01&ATF=41905001)

Realtek RTL8822CEと認証情報ページに添付されているPDFに掲載された複数のアンテナが適合証明をうけているとわかる。
認証制度を歪曲して解釈すれば、このPDFに掲載されているアンテナ同士で交換しても、技術基準適合証明を受けた状態から変更がない、すなわち**特定無線設備の変更の工事**を行っていないとも捉えられる。このPDFに掲載されているアンテナを手に入れて取り付けるのは、工事設計認証番号: 201-180775の認証を受けている組み合わせ通りであるため、変更の範疇を超えないという考えだ。
ただし、**特定無線設備の変更の工事**の解釈がずれていた場合はこの限りではないので、各自の責任のもと判断されたい。

といった感じでダイポールアンテナを繋げるのはとてもめんどくさいので、念のため、無線LANモジュールごと取り外しておいた。

どうしても適法にWi-FiやBluetoothを使いたい場合、Jeton Xavier NXに付属のアンテナを検証台から取り外しアクリルケースに取り付ければ、無線設備に変更は生じないため、この問題を回避できるはずだ。


## Waveshare Jetson Nano Metal Case (C)

![Waveshare Jetson Nano Metal Case (C)](/assets/images/2020/06/09/jetson-nano-case-c-7.jpg)

製品ページ・引用元: [Metal Case (Type C) for the Jetson Nano Developer Kit](https://www.waveshare.com/jetson-nano-case-c.htm)

同じくWaveshareの金属ケース。電源ボタンと状態LEDつき。
金属ケースにしては比較的安価。

アクリルケースを使っていたものの、電源ボタンが欲しくなったのでこれを買い足し。
マルツで2,100円（税抜き・購入時価格）で手に入った（SeeedStudio製と書かれているがWaveshareの箱に入って届いた）。

[Jetson Nano用メタルケース(ファン、カメラホルダー付き) 110991384｜電子部品・半導体通販のマルツ](https://www.marutsu.co.jp/pc/i/1633552/)

Jetson Nano用の金属ケースには、よりコンパクトな[Type B](https://www.waveshare.com/wiki/Jetson_nano_case_(B))も販売していたが、それは旧リビジョン向け。
Type BはXavier NXやJetson Nano B01の電源ボタンやLEDの接続ができない上に、カメラコネクタの位置が合わないので間違って買わないこと。

付属品が多く複雑そうに見えるが、組み立て方はWikiに書いてある。

[Jetson Nano Case (C) - Waveshare Wiki](https://www.waveshare.com/wiki/Jetson_Nano_Case_(C))


![Metal Case Internal](/assets/images/2020/06/09/IMG_5104.jpg)

4G拡張ボードを載せられるようにスペースが確保されているため、サイズは大きめ。
内部には余裕があり、microSDカードはライザーアダプタを介して接続するようになっている。

![Metal Case I/O Port](/assets/images/2020/06/09/IMG_5110.jpg)


![Metal Case Top](/assets/images/2020/06/09/IMG_5106.jpg)

I/Oポートはぴったり設計。使う予定のない4G拡張ボード用の穴が開いてるのがちょっと残念。

![Metal Case Button and SD Card slot](/assets/images/2020/06/09/IMG_1825.jpg)

![Metal Case 40 pin header](/assets/images/2020/06/09/IMG_5112.jpg)

念願の電源ボタンとリセットボタン。押しやすくて感度も良好。
ライザーケーブルと基板で横向きに出している40pinヘッダーには、ピン配置が書かれていて色々繋げて遊ぶときに便利そう。


## まとめ

Jetson Xavier NX開発者キットにはJetson Nano用ケースも使えた。
安くて小さくて電源ボタン要らなければ[Acrylic Clear Case for Jetson Nano](#waveshare-acrylic-clear-case-for-jetson-nano)、電源ボタンが欲しくて比較的安くてコンパクトなのが欲しければ[Jetson Nano Metal Case (C)](#waveshare-jetson-nano-metal-case-c)がおすすめ。

2個もケース買っちゃったし給付金でもう一個Xavier NX買おうかな。
