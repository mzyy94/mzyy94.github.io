---
title: LinuxでQSVとH.264のエンコード対決
date: 2015-01-31 19:23:04 +0900
category: linux
tags: ffmpeg qsv x264
---

先日の記事、でLinuxでH.264の動画をエンコードできることを紹介しました。
そのベンチマークをとってみました。QSVでのエンコードとlibx264を用いたエンコードの比較となります。

今回エンコード時間の比較に用いた動画は以下のものを利用しました。

*[Big Buck Bunny](http://www.bigbuckbunny.org)*

![Big Buck Bunny](/blog/resources/images/2015/01/31/big-buck-bunny.png)

ここの、`big_buck_bunny_1080p_surround.avi`を以下の表のオプションでLibx264とQSVでのエンコードで変換し、比較をしてみました。

項目 | 値
:-----:|:-----:
音声コーデック| コピー
ビットレート|2000kbps
サイズ| 1280x720
フレームレート| 29.97

このオプションで起動すると、**ffmpeg -i big_buck_bunny_1080p_surround.avi -acodec copy -vcodec コーデック -b:v 2000k -s 1280x720 -r 30000/1001 -y 出力ファイル**という起動オプションになります。


<!-- more -->

## 仮想8コアでx264エンコード

Xeon搭載マシンで動かしているKVMに仮想8コアを割り当てた環境でエンコードしてみました。
FFmpegの粋な計らいによって、エンコード中は以下のようにたくさんのスレッドが立ちがあり、マシンはエンコードに専念していました。

![x264 8core encode](/blog/resources/images/2015/01/31/x264-8core-encode.png)

CPUはエンコード中、全コア90%前後の使用率を維持していました。そんなエンコードにかかった時間は以下の通りでした。

```
real    2m50.118s
user    20m15.617s
sys     0m7.375s
```

10分の動画を3分足らずでエンコードしてしまいました。恐るべきコア数の暴力。


## 仮想8コアでQSVエンコード

先ほどと同じ環境でQSVを用いたエンコードをしてみました。
こちらもFFmpegによって複数のスレッドによる処理がされるのですが、CPUの負荷は多くて各コア10%程度となる非常に省エネなエンコードとなっていました。


![QSV 8core encode](/blog/resources/images/2015/01/31/qsv-8core-encode.png)

こんな省エネでもエンコードに要する時間はそれほどかかりませんでした。

```
real    3m6.697s
user    2m56.301s
sys     0m4.871s
```

3分とちょっとでエンコードが完了しています。さすがにXeon 8コアにはかなわないようです。


## 仮想1コアでx264エンコード

KVMで割り当てコア数を1コアに設定し、x264を用いたエンコードをしてみました。
負荷はほぼ100%、まれに90%前後になる程度でした。


![x264 1core encode](/blog/resources/images/2015/01/31/x264-1core-encode.png)

じっくりエンコードしてかかった時間は以下のとおりです。

```
real    10m56.739s
user    10m54.374s
sys     0m1.070s
```

動画再生時間+10%程度の時間がかかっていました。


## 仮想1コアでQSVエンコード

QSVとコア数の関係性は不明ながら、比較のために同じ環境でQSVでもエンコードしてみました。
負荷はほとんどないかと思ってたのですが、エンコーダに渡す前処理などで少々CPUを使うようで、90%前後まで達したり0%付近をうろうろしたりと、不安定な負荷がかかっていました。また、なぜか2スレッドで処理していました。

![qsv 1core encode](/blog/resources/images/2015/01/31/qsv-1core-encode.png)

要した時間は以下のとおりです。

```
real    3m0.692s
user    2m35.944s
sys     0m0.972s
```

予想はついていましたが、QSVでは8コアでも1コアでもほとんど時間は変わらないようです。

## 仮想1コアで複数のQSVエンコード...?

記事公開直後にこのような気になる意見をいただきました。

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/mzyy94">@mzyy94</a> 一コア使用QSVで複数同時エンコしたらどうなるか実験してもらえるとうれしいです</p>&mdash; バッファリング (@polamjag) <a href="https://twitter.com/polamjag/status/561469823561920513">2015年1月31日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

早速、QSVでの同時エンコードを試してみました。
tmuxで分割し、上下のコンソールで同時にエンコードを開始してみた結果が以下の画像のとおりになります。

![qsv 1core multi encode](/blog/resources/images/2015/01/31/qsv-1core-multi-encode.png)

ライブラリがIGPへアクセスできないようでアクセス違反起こして終了してしまうため、QSVでの同時エンコードはダメでした。

## ファイルサイズ比較
ビットレート固定なのでそれほど違いはありませんが、ファイルサイズは以下のようになっています。

```
$ ls -l
total 1261812
-rw-rw-r--. 1 ninniku ninniku 928670754 May  6  2008 big_buck_bunny_1080p_surround.avi
-rw-rw-r--. 1 ninniku ninniku 179373021 Jan 31 02:27 big_buck_bunny_qsv.mp4
-rw-rw-r--. 1 ninniku ninniku 184045287 Jan 31 02:23 big_buck_bunny_x264.mp4
```

QSVでエンコードしたほうが4MBほどファイルサイズが小さくなっていました。

## 品質について

x264とQSVの比較では目立った差異は見受けられなかったです。視力の問題かもしれませんが。

## まとめ

動画再生時間の3分の1程度でエンコードができるQSVはLinuxでもすごい。
