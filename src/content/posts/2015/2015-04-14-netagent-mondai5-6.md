---
title: ネットエージェント最終面接問題 Write-up その2
date: 2015-04-14T00:05:14+09:00
categories: ["CTF"]
tags: ["netagent"]
---


ネットニュースサイトにも取り上げられ、盛り上がりを見せていたネットエージェントのいきなり最終面接mondaiのWrite-upその2です。

- [「解けたらいきなり最終面接」 ネットエージェント、今年も新卒向けに“難問”出題 - ねとらぼ](http://nlab.itmedia.co.jp/nl/articles/1503/30/news143.html)

某所ではこれらのmondaiを10分で解けたとの声が上がっているようで、世の中にはこの記事とは比べ物にならないくらい効率のよい解き方をしている方がいるようです。それらの解法と比べると、この記事の解法は全部解くのに数日かかっているので、内容が無いも同然という位置付けとなります。
もし10分で解いた猛者たちの解法が公開されていたら、この記事ではなくそちらをご覧になることをお勧めします。

昨日の[mondai1からmondai4までのWrite-upの記事](../2015/2015-04-13-netagent-mondai1-4.md)に続き、今日はmondai5とmondai6のWrite-upを公開します。

<!-- more -->
## 目次


## mondai5

mondai4.zipを解凍した際に出てきたファイル、mondai5は何だろうかと`file`コマンドを用いて調べると、ASCII textであるらしいことがわかります。テキストエディタで開いてみると、各行76文字で折り返されている、長いBASE64エンコードされた文字列が記載されていました。
そのまま`base64`に食べさせてデコードします。
```sh
$ base64 -D mondai5 -o mondai5-1
```

デコードしてできたmondai5-1を`file`コマンドで調べてみるとまたもASCII textで、内容も先ほどと同じように、各行76文字で折り返されたBASE64エンコード文字列が書かれています。
同じように`base64`でデコードしてmondai5-2を作成します。

作成したmondai5-2を調べると、なんとmondai5、mondai5-1と同じ形で、またもBASE64エンコード文字列が書かれてるASCII textでした。
これもまた`base64`でデコードしてmondai5-3を作成します。
できあがった**mondai5-3も同じ形式**なので、同様の手順でmondai5-4を作成します。

mondai5-4は`file`コマンドで調べると、以下のように返してきます。
```sh
$ file mondai5-4
mondai5-4: uuencoded or xxencoded text
```

uuencodeされた文字列が格納されているようです。
`uudecode`コマンドでmondai5-5を作成します。

```sh
$ uudecode -o mondai5-5 mondai5-4
```

mondai5-5を調べてみるとgzip圧縮ファイルだということがわかります。
```sh
$ file mondai5-5
mondai5-5: gzip compressed data, from Unix, last modified: Thu Mar 19 17:31:56 2015
```

`gunzip`で解凍してmondai5-6を作成します。

```sh
$ gunzip -d mondai5-5 -c > mondai5-6
```

mondai5-6を調査してみましょう。`file`コマンドによるとzip圧縮ファイルとのことなので、中身を調べてみます。
```sh
$ file mondai5-6
mondai5-6: Zip archive data, at least v1.0 to extract
$ 7z l mondai5-6
7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Listing archive: mondai5-6

--
Path = mondai5-6
Type = zip
Physical Size = 1472

   Date      Time    Attr         Size   Compressed  Name
------------------- ----- ------------ ------------  ------------------------
2015-03-18 18:50:16 ....A         1332         1332  nek
------------------- ----- ------------ ------------  ------------------------
                                  1332         1332  1 files, 0 folders
```

nekというファイルが格納されているようです。`7z`コマンドで解凍してnekを取り出します。

```sh
$ 7z x mondai5-6

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai5-6

Extracting  nek

Everything is Ok

Size:       1332
Compressed: 1472
```

nekを調べると、bzip圧縮ファイルとのことなので、`bzip2`コマンドで解凍します。

```sh
$ file nek
nek: bzip2 compressed data, block size = 900k
$ bzip2 -d nek -c > mondai5-8
```

mondai5-8は7z圧縮ファイルとのことなので、`7z`コマンドで解凍します。
```sh
$ file mondai5-8
mondai5-8: 7-zip archive data, version 0.3
$ 7z x mondai5-8

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai5-8

Extracting  n

Everything is Ok

Size:       974
Compressed: 1082
```

これによって、nというファイルが展開されます。このファイルはrar圧縮ファイルとのことなので`unrar`で解凍します。

```sh
$ file n
n: RAR archive data, v1d, os: Win32
$ unrar x n

UNRAR 5.20 beta 1 freeware      Copyright (c) 1993-2014 Alexander Roshal


Extracting from n

Extracting  ne                                                        OK
All OK
```

neというファイルが出てきましたね。neはlha圧縮されたファイルとのことなので、`lha`コマンドで解凍します。

```sh
$ file ne
ne: LHarc 1.x/ARX archive data [lh0]
$ lha x ne
nex     - Melted   :  o
```

nexファイルが出来上がりました。はい。調べるとxz圧縮なので`xz`で解凍します。

```sh
$ file nex
nex: xz compressed data
$ xz -d nex -c > mondai5-12
```

ちょっと疲れたのでコーヒーを飲みます。

mondai5-12を`file`コマンドで調べると、なんと、判定してくれません！（貧弱なfileめ）

```sh
$ file mondai5-12
mondai5-12: data
```

マジックナンバーを見てみると、MSWIMとなってることが確認出ました。

```sh
$ xxd mondai5-12 | head -2
0000000: 4d53 5749 4d00 0000 d000 0000 000d 0100  MSWIM...........
0000010: 8000 0000 0000 0000 4ef7 dcb4 6e01 bfe4  ........N...n...
```

Googleで「"MSWIM" magic number」として調べると、1番目に次のページがヒットします。

[Windows Imaging Format - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Windows_Imaging_Format)

このWikipediaの記事の最後に、*LZX圧縮だし7zとかで開けるよ（意訳）*と書いてあるので、`7z`で展開を試みてみます。

```sh
$ 7z x mondai5-12

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai5-12

Extracting  QRcode

Everything is Ok

Size:       16052
Compressed: 17310
```

あっさりと展開でき、QRcodeという名のファイルが出てきました。
このファイルの形式はSun raster image dataとのことです。

```sh
$ file QRcode
QRcode: Sun raster image data, 123 x 123, 8-bit, RGB colormap
```

画像データらしいですが、開けるアプリケーションを持ち合わせていないので、ImageMagickに投げ込んでみます。

```sh
$ convert QRcode qrcode.png
$ file qrcode.png
qrcode.png: PNG image data, 123 x 123, 4-bit grayscale, non-interlaced
```

さすがImageMagick難なく変換できたすごい！
簡単に開ける形式の画像ファイルができたので開いてみます。

![qrcode.png](/assets/images/2015/04/14/qrcode.png)

[半分食べられてしまったパンケーキ](../2014/2014-12-07-seccon2014-online.md)ではなく、普通のQRコードでした。

適当なQRコードリーダーで読み込むと、以下のような文字列が得られます。
```
+BCcENQQxBEMEQAQwBEgEOgQw-
```
+で始まり-で終わる文字列、そう、UTF-7エンコード文字列です。
+と-の間はUTF-16のBASE64エンコード文字列（ただしパッディングの=が省略されている）なので、`nkf`で変換してみます。
```sh
$ echo BCcENQQxBEMEQAQwBEgEOgQw | nkf -mB -W16B
```

<!--
Чебурашка
-->

何やらロシア語らしきものが出てきます。意味を調べると、ロシアの絵本のキャラクターとのことです。

![Cheburashka.jpg](/assets/images/2015/04/14/Cheburashka.jpg)


これ以上解くものがなくなったので、これがmondai5の答えのようです。しかし`7z`コマンドで解凍を試みても、パスワードが違うと言われる始末です。

p7zipの`7z`コマンドによる非ASCII文字パスワード付き7zipの解凍・圧縮は、環境によって正しく処理されないということを、以前日本語パスワードをセットしたときに経験したのを思い出し、本家7zipの`7z.exe`を使って解凍をしてみます。


```
$ wine 7z.exe x mondai6.zip

7-Zip [64] 9.35 beta  Copyright (c) 1999-2014 Igor Pavlov  2014-12-07

Processing archive: mondai6.zip

Extracting  hint6.txt
Enter password (will not be echoed):

Extracting  mondai6.txt
Extracting  mondai7.zip

Everything is Ok

Files: 3
Size:       70362410
Compressed: 70373511

Kernel  Time =     0.046 =    1%
User    Time =     0.780 =   17%
Process Time =     0.826 =   18%    Virtual  Memory =      2 MB
Global  Time =     4.394 =  100%    Physical Memory =      4 MB
```

<!--
$ wine 7z.exe x mondai6.zip -pЧебурашка

7-Zip [64] 9.35 beta  Copyright (c) 1999-2014 Igor Pavlov  2014-12-07

Processing archive: mondai6.zip

Extracting  hint6.txt
Extracting  mondai6.txt
Extracting  mondai7.zip

Everything is Ok

Files: 3
Size:       70362410
Compressed: 70373511

Kernel  Time =     0.046 =    5%
User    Time =     0.811 =   89%
Process Time =     0.858 =   94%    Virtual  Memory =      2 MB
Global  Time =     0.909 =  100%    Physical Memory =      4 MB
-->


解凍できました！（やっと終わった。。）

## mondai6

mondai6.txtには以下のように記載がありました。
```
http://49.212.84.208/cgi-bin/hode7hb376dgeas6df783gr4/mondai6.cgi
```
実際にこのURLにアクセスしに行くと、次のようなレスポンスを得られました。

```
$ curl -v http://49.212.84.208/cgi-bin/hode7hb376dgeas6df783gr4/mondai6.cgi
* Hostname was NOT found in DNS cache
*   Trying 49.212.84.208...
* Connected to 49.212.84.208 (49.212.84.208) port 80 (#0)
> GET /cgi-bin/hode7hb376dgeas6df783gr4/mondai6.cgi HTTP/1.1
> User-Agent: curl/7.37.1
> Host: 49.212.84.208
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Tue, 07 Apr 2015 08:20:21 GMT
* Server Apache/2.2.3 (CentOS) is not blacklisted
< Server: Apache/2.2.3 (CentOS)
< Connection: close
< Transfer-Encoding: chunked
< Content-Type: text/html; charset=utf-8
<
{ [data not shown]

* Closing connection 0
<HTML><BODY>use R4000
</BODY></HTML>
```

なにやらR4000を使えとの文字だけが返ってきました。
R4000でGoogle検索すると、MIPSのプロセッサ情報がいくつか引っかかります。
MIPS R4000を搭載したデバイスでアクセスすればいいのかな？と思ったので、
Googleで「MIPS R4000 デバイス」で検索し、MIPS R4000搭載のデバイスを探してみました。


![mips-r4000-search.png](/assets/images/2015/04/14/mips-r4000-search.png)

検索結果1ページ目によると、PSPに搭載されているとの情報がいくつかヒットしていました。
早速PSPのブラウザからアクセスする際に送られるUser-Agentを調べてみます。

[userAgent一覧/ユーザーエージェント一覧](http://www.openspc2.org/userAgent/)

このサイトによると、PSPのUAは、
```
Mozilla/4.0 (PSP PlayStation Portable); 2.00)
```
となっているようです。

早速このUAで先ほどのURLにアクセスしてみます。

```
$ curl -v -A 'Mozilla/4.0 (PSP PlayStation Portable); 2.00)' http://49.212.84.208/cgi-bin/hode7hb376dgeas6df783gr4/mondai6.cgi
* Hostname was NOT found in DNS cache
*   Trying 49.212.84.208...
* Connected to 49.212.84.208 (49.212.84.208) port 80 (#0)
> GET /cgi-bin/hode7hb376dgeas6df783gr4/mondai6.cgi HTTP/1.1
> User-Agent: Mozilla/4.0 (PSP PlayStation Portable); 2.00)
> Host: 49.212.84.208
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Tue, 07 Apr 2015 08:31:47 GMT
* Server Apache/2.2.3 (CentOS) is not blacklisted
< Server: Apache/2.2.3 (CentOS)
< Content-Length: 42
< Connection: close
< Content-Type: text/html; charset=utf-8
<
* Closing connection 0
<HTML><BODY>de la Bucure?ti
</BODY></HTML>
```

レスポンスが変わりました。知らない国の言葉で書かれていたのでGoogle翻訳にタイプしてみると、ルーマニア語であるとの情報を得ました。

先ほどのレスポンスの一部文字が"?"となっているので、ルーマニア語を許容するヘッダーを付加すると表示が変わるかもしれないと思い、Accept-Languageにルーマニア語を指定してアクセスしてみました。

```
$ curl -v -H 'Accept-Language: ro-RO' -A 'Mozilla/4.0 (PSP PlayStation Portable); 2.00)' http://49.212.84.208/cgi-bin/hode7hb376dgeas6df783gr4/mondai6.cgi
* Hostname was NOT found in DNS cache
*   Trying 49.212.84.208...
* Connected to 49.212.84.208 (49.212.84.208) port 80 (#0)
> GET /cgi-bin/hode7hb376dgeas6df783gr4/mondai6.cgi HTTP/1.1
> User-Agent: Mozilla/4.0 (PSP PlayStation Portable); 2.00)
> Host: 49.212.84.208
> Accept: */*
> Accept-Language: ro-RO
>
< HTTP/1.1 200 OK
< Date: Tue, 07 Apr 2015 08:35:33 GMT
* Server Apache/2.2.3 (CentOS) is not blacklisted
< Server: Apache/2.2.3 (CentOS)
< Connection: close
< Transfer-Encoding: chunked
< Content-Type: text/html; charset=utf-8
<
* Closing connection 0
<HTML><BODY>key: Minesweeper1990
</BODY></HTML>
```

表示が変わり、mondai6の答えが出てきました。mondai7.zipのパスワードに指定して解凍してmondai6はおしまいです。

```
$ 7z x mondai7.zip

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai7.zip

Extracting  hint7.txt
Enter password (will not be echoed) :

Extracting  mondai8.zip
Extracting  normal.exe

Everything is Ok

Files: 3
Size:       70383731
Compressed: 70362268
```

<!--
$ 7z x mondai7.zip -pMinesweeper1990

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai7.zip

Extracting  hint7.txt
Extracting  mondai8.zip
Extracting  normal.exe

Everything is Ok

Files: 3
Size:       70383731
Compressed: 70362268
-->

明日はmondai7からmondai9までのWrite-upを公開する予定です。
