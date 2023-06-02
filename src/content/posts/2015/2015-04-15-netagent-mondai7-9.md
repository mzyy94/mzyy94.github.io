---
title: ネットエージェント最終面接問題 Write-up その3
date: 2015-04-15T00:01:21+09:00
author: mzyy94
categories: ["CTF"]
tags: ["netagent"]
---

あのネットエージェントのいきなり最終面接問題を解いたのでWrite-upを書きました。

- [2016年度 新卒採用｜ネットエージェント株式会社](http://www.netagent.co.jp/recruit/newgraduates_2016.html)

これまでのmondaiはLinuxやOS Xがあれば解くことができていましたが、mondai7からはWindowsの実行ファイル形式やMicrosoft Officeドキュメントが登場したりと、そろそろWindowsがない環境には手厳しい問題となってきました。
なので、今回の記事に掲載のmondaiはすべて（`file`コマンドでのファイル情報調査以外）、Windows上での解法となっております。

昨日の[mondai6までの解法](../2015/2015-04-14-netagent-mondai5-6.md)に続いて本日はmondai7、mondai8、mondai9の解法を公開します。

## 目次


## mondai7

mondai7はnormal.exeというWIN/PE32実行ファイルを解析して答えを得る問題のようです。

```sh
$ file normal.exe
normal.exe: PE32 executable for MS Windows (GUI) Intel 80386 32-bit
```

今回はIDA Pro(demo)を使って解析してみます。

![normal-ida1.png](/assets/images/2015/04/15/normal-ida1.png)

IDAに解析させて表示を見てみると、おもむろに正解を表示するらしい*aCorrectKeyIsS*がみつかります。
ここまで来る過程をアセンブリ表示で追っていくことにします。

![normal-ida2.png](/assets/images/2015/04/15/normal-ida2.png)

*aCorrectKeyIsS* はsprintfで渡されるテンプレート文字列で、そこにコマンドライン引数が埋め込められるようにいなっているようです。
このことから、normal.exeにキー候補の文字列をコマンドライン引数として渡して実行し、なにか判定があり、それが正しい場合に **Correct! KEY is :** に続いてその文字列が表示されるようになっていることがわかります。

![normal-ida3.png](/assets/images/2015/04/15/normal-ida3.png)

すこし遡ってみると、キーが表示される部分のサブルーチンへ来る前に、なにやら条件分岐があります。
コマンドライン第一引数の文字長をstrlenでチェックし、0x0A(=10)と比較し、合致しない場合に **Try Again!** と表示する処理がみつかりました。
このことから、キーは10文字長であることがわかります。


![normal-ida4.png](/assets/images/2015/04/15/normal-ida4.png)

キーが表示される直前に行われる処理を見てみると、サブルーチン *sub_4011C0* を呼んだ戻り値が0の場合、 **Try Again!** の表示をさせるようになっています。
 *sub_4011C0* にはコマンドライン引数を渡しているので、この引数が何か特定の文字列と比較されていると推測できます。

![normal-ida5.png](/assets/images/2015/04/15/normal-ida5.png)


サブルーチン *sub_4011C0* のはじめの方では、ループインデックス（以下、i）を0にしたりと、forループの初期化が行われている様子がつかめます。このループの中の処理を見てみます。

![normal-ida6.png](/assets/images/2015/04/15/normal-ida6.png)

このforループでは、iが0x0A(=10)になるまでループが回れば1を、途中でbreakが発生すれば0をサブルーチン呼び出し元に返すような処理をしています。
途中でbreakが発生する条件は、ループ内で呼ばれる*sub_401170*の戻り値と謎の配列*dword_40C068*の比較が偽である場合となっています。
要するに、このループがi=10になるまで回らないと呼び出し元に0が返され、 **Try Again!** が表示されるということです。

コマンドライン引数のi番目の文字が引数として渡されて呼び出されている*sub_401170*を見てみます。

![normal-ida7.png](/assets/images/2015/04/15/normal-ida7.png)

*sub_401170*はサブルーチンの引数で与えられた文字（＝コマンドライン引数のi番目の文字）が、謎の文字列 **"efyTUwxqrY..."** の中の何番目に出てくるかを、forループを回して一つずつチェックしているようです。そしてサブルーチンの戻り値として、謎の文字列の何番目に引数の文字が現れたかを呼び出し元に返しています。

![normal-ida8.png](/assets/images/2015/04/15/normal-ida8.png)

謎の配列*dword_40C068*の中身を見に行くと、unsignled long型の配列として、数値が格納されていました。
先のサブルーチン *sub_4011C0* のループ内では、コマンドライン引数のi番目の文字を *sub_401170* に渡し、謎の文字列の何番目に出現するかを取得し、その値とこの *dword_40C068* のi番目の数値を比較して、同じであればループを継続するという処理でした。

ここまでの調査を基にまとめると、このプログラムの処理は簡易的に以下のようになっていることがわかります。

- コマンドライン引数に与えられた文字列があり、
- その文字列は10文字であり、
- その文字列の1文字1文字が謎の文字列 **"efyTUwxqrY..."** の何番目に位置するかを調べていて、
- その位置がすべて謎の配列 *dword_40C068* に定義されたもの同じであれば **Correct! Key is :** に続けて引数を表示する

なので逆に考えると、謎の文字列の中の、謎の配列に定義されている場所の文字を抽出すればキーが見つかるということです。
パパッと以下のようなものを書いてキーを抽出します。

```ruby
##!/usr/bin/env ruby

string = "efyTUwxqrYHEFmduCJAXQpgKLBnhiltINPGOoszkMDvcjabSZRVW"
indexes = [0x03, 0x24, 0x2b, 0x1b, 0x0f, 0x17, 0x2d, 0x25, 0x24, 0x0f]

key = ""

for i in indexes do
	key += string[i]
end

p key
```

<!--
$ ruby mondai7.rb
"TochuKasou"
-->

試しにnormal.exeの引数に、このコードを実行して得られたキーを与えて実行してみたところ、以下のようになりました。

![TochuKasou.png](/assets/images/2015/04/15/TochuKasou.png)

この文字列を与えてmondai8.zipを解凍してmondai7は終了です。

```sh
> 7z.exe x mondai8.zip

7-Zip [64] 9.35 beta  Copyright (c) 1999-2014 Igor Pavlov  2014-12-07

Processing archive: mondai8.zip

Extracting  mondai8.tc
Enter password (will not be echoed):

Extracting  mondai8.txt
Extracting  mondai9.zip

Everything is Ok

Files: 3
Size:       70339136
Compressed: 70339594

Kernel  Time =     0.015 =    0%
User    Time =     1.170 =   21%
Process Time =     1.185 =   22%    Virtual  Memory =      2 MB
Global  Time =     5.379 =  100%    Physical Memory =      4 MB
```

<!--
$ wine 7z x mondai8.zip -pTochuKasou

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai8.zip

Extracting  mondai8.tc
Extracting  mondai8.txt
Extracting  mondai9.zip

Everything is Ok

Files: 3
Size:       70339136
Compressed: 70339594
-->

## mondai8

なにやら怪しげなファイルmondai8.tcと問題文mondai8.txtがあります。mondai8.txtには以下のような記述がありました。
```
TrueCrypt pass:mondai8
漢字８文字
```

mondai8.tcはTrueCryptファイルで、開くためのパスワードはmondai8であるとのことです。そしてこのmondai8の答えは漢字8文字ということでしょう。
TrueCryptでmondai8.tcをマウントして中を見てみました。

![mondai8-files.png](/assets/images/2015/04/15/mondai8-files.png)


こういったCTF系の問題でイメージファイルが配布されるときは、フォレンジック問題であると相場が決まっているので、TrueCryptでマウントしたらAutopsyで調査します。

![autopsy.png](/assets/images/2015/04/15/autopsy.png)

マウントした際に表示されていたファイルになかった「今日の本.xlsx」という削除されたファイルが見つかりました。怪しいですね。
復元してファイルを開いてみます。


![todaysbook1.png](/assets/images/2015/04/15/todaysbook1.png)
![todaysbook2.png](/assets/images/2015/04/15/todaysbook2.png)
![todaysbook3.png](/assets/images/2015/04/15/todaysbook3.png)

シート1にはアルファベットと2つの数字が書かれた行があり、シート2には、[青空文庫の奇談クラブ](http://www.aozora.gr.jp/cards/001670/card56113.html)からコピーされたであろう本の内容が書かれていました。

シート3には、key:passwordに対応するanswerを入力するような空欄がありました。
このpasswordという文字列はきっとシート1のアルファベットと2つの数字に対応していて、1つ目の数字は行番号、2つ目の数字はその行の文字の位置を指しているだろうと思いました。
Excel Onlineの印刷機能でシート2をHTML形式にし、保存したのちテキストに変換して[kidanclub.txt](https://gist.github.com/mzyy94/409d925fa2d176fac1b393398529eff8)を作成し、
シート1を基に、アルファベット**"password"**に対応する行から文字を抽出するコードを書きました。


![print-book.png](/assets/images/2015/04/15/print-book.png)

```ruby
##!/usr/bin/env ruby
password = [
	[119,161], # p
	[ 62, 11], # a
	[276, 40], # s
	[276, 40], # s
	[ 18, 58], # w
	[239, 44], # o
	[236,  7], # r
	[185,  7]  # d
]

book = File.open(ARGV[0], "r").readlines
key = ""
for i in password do
    # One-based numbering
	key += book[i[0] - 1][i[1] - 1]
end

p key
```

引数に先ほど作成した[kidanclub.txt](/assets/data/2015/04/15/kidanclub.txt)を与えて実行してみると、漢字8文字のパスワードを得ることができました。

<!--
$ ruby mondai8.rb kidanclub.txt
"意気揚揚明鏡止水"
-->

mondai5同様、非ASCII文字のパスワードなので、`7z.exe`を利用してmondai9.zipを解凍しておしまいです。

```sh
> 7z.exe x mondai9.zip

7-Zip [64] 9.35 beta  Copyright (c) 1999-2014 Igor Pavlov  2014-12-07

Processing archive: mondai9.zip

Extracting  mondai10.tc
Enter password (will not be echoed):

Extracting  mondai9.pkt

Everything is Ok

Files: 2
Size:       68517107
Compressed: 68241943

Kernel  Time =     0.046 =    1%
User    Time =     0.733 =   16%
Process Time =     0.780 =   17%    Virtual  Memory =      2 MB
Global  Time =     4.536 =  100%    Physical Memory =      4 MB
```

<!--
$ wine 7z.exe x mondai9.zip -p意気揚揚明鏡止水

7-Zip [64] 9.35 beta  Copyright (c) 1999-2014 Igor Pavlov  2014-12-07

Processing archive: mondai9.zip

Extracting  mondai10.tc
Extracting  mondai9.pkt

Everything is Ok

Files: 2
Size:       68517107
Compressed: 68241943

Kernel  Time =     0.046 =    5%
User    Time =     0.733 =   87%
Process Time =     0.780 =   93%    Virtual  Memory =      2 MB
Global  Time =     0.836 =  100%    Physical Memory =      4 MB
-->

## mondai9


mondai9.pktは`file`コマンドによると、little-endianなpcapファイルのようです。

```
$ file mondai9.pkt
mondai9.pkt: tcpdump capture file (little-endian) - version 2.4 (Ethernet, capture length 65535)
```

また、拡張子pktはWindowsの関連付けでは、Wiresharkで開けるファイルとなっています。
早速Wiresharkで見てみます。

![mondai9-wireshark1.png](/assets/images/2015/04/15/mondai9-wireshark1.png)

ざっと目を通した感じ、`tcpdump -f 'tcp port 80'`によって、fast-uploader.comにアクセスしている様子をキャプチャしたもののようです。

![mondai9-wireshark2.png](/assets/images/2015/04/15/mondai9-wireshark2.png)

httpリクエストで絞り込むと、POSTメソッドによってファイルを幾つかアップロードしているようです。

![mondai9-wireshark3.png](/assets/images/2015/04/15/mondai9-wireshark3.png)

アップロードしたファイルを抽出しようとメニューのHTTP objectから抽出を試みたのですが、Wiresharkでは*multipart/form-data*としてPOSTされたデータ中のファイルはうまく取り出せないようなので、NetworkMinerを使います。

![mondai9-networkminer.png](/assets/images/2015/04/15/mondai9-networkminer.png)

NetworkMinerで4つのアップロードされたファイルを抽出したところ、文字化けした2つのExcelファイルと1つのWordファイル、パスワードのかかったzipファイルがありました。
パスワードをクラックするとWordファイルが出てきたので、4つのOfficeファイルを開いてみました。

![office-files.png](/assets/images/2015/04/15/office-files.png)

どのOfficeファイルにも文字の記入はなく、答えらしきものがみつかりません。
ファイル名で検索してみたりいろいろしたあと、ファイルのメタ情報を詮索してみることにしたところ、文字化けしたWordファイルにそれらしきものがあることに気づきました。

![word-property.png](/assets/images/2015/04/15/word-property.png)


これパスワードとしてmondai10.tcをTrueCryptでマウントしてみたところ、開くことができました。


明日は最終問題、mondai10のWrite-upを公開します。
