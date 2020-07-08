---
title: ネットエージェント最終面接問題 Write-up その1
date: 2015-04-13 14:08:49 +0900
category: CTF
tags: netagent
---

恒例のネットエージェントのいきなり最終面接問題が3月末に公開されました。

- [2016年度 新卒採用｜ネットエージェント株式会社](http://www.netagent.co.jp/recruit/newgraduates_2016.html)

ネットニュースサイトにも取り上げられ（[「解けたらいきなり最終面接」 ネットエージェント、今年も新卒向けに“難問”出題 - ねとらぼ](http://nlab.itmedia.co.jp/nl/articles/1503/30/news143.html)）、盛り上がりを見せていたあのmondaiです。
2016年新卒として、書類審査や2次選考を飛ばして最終面接を受けられるということなので本腰を入れて取り組んでみました。
このいきなり最終面接問題に関しては、全問正解しなければ回答の公開をしてはいけないとのことだったので察しがつくと思いますが、なんとかすべての問題をクリアできました。
これらmondaiを解いてきた過程をWrite-upとして残すことにしたので、興味がある方はご覧ください。

この記事ではmondai1からmondai4までの回答を掲載しています。

<!-- more -->
{% include toc %}


## mondai1
```
選考過程を縮めたい方に問題を用意いたしました。問題に答えると最終面接から始められます。
※２０１６年３月卒業予定の方以外も挑戦していただけますが、採用対象とはなりません。
問題：LzYxMDIvcGouaGJwLy86cHR0aA==
```

BASE64でエンコードされた文字列を渡されるので、ちょちょっとコマンドを打つと逆さまになったURLがでてきます。

なので`rev`コマンドを噛ませて逆順にしてアクセス可能なURLが表示されたらmondai1はおしまいです。



```sh
$ echo LzYxMDIvcGouaGJwLy86cHR0aA== | base64 -D | rev
```
<!--
http://pbh.jp/2016/
-->


## modai2

mondai1の答えのURLにアクセスするとzip圧縮されたファイルを入手でき、そのファイルを展開するとmondai2.txtとzip形式の圧縮ファイルがあります。mondai2.txtの内容は以下の通りでした。


```
2016の平方根の小数点以下2016桁目から20桁をパスワードにしました。
```

大きな有効数字の平方根を扱えるコマンドが*nix系システムには存在します。そう`bc`コマンドです。

この`bc`コマンドを用いて小数点以下2035桁(2015番目から20桁)の2016の平方根を計算させます。
`bc`コマンドによる出力は、適当な桁数で折り返しがあるので`perl`の正規表現を用いて削り、`tail`で終端から20バイトを取り出します。

```sh
$ echo 'scale=2015+20;sqrt(2016)' | bc | perl -pe's/\\?\n//' | tail -c20
```

<!--
74571026133060730881
-->

これをパスワードとして入力すればmondai3.zipを解凍できます。

```
$ 7z x mondai3.zip

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai3.zip

Extracting  hint3.txt
Enter password (will not be echoed) :

Extracting  mondai3.txt
Extracting  mondai4.zip

Everything is Ok

Files: 3
Size:       70392202
Compressed: 70392736
```

<!--

$ 7za x mondai3.zip -p74571026133060730881

7-Zip (a) [64] 9.38 beta  Copyright (c) 1999-2014 Igor Pavlov  2015-01-03
p7zip Version 9.38.1 (locale=ja_JP.UTF-8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai3.zip

Extracting  hint3.txt
Extracting  mondai3.txt
Extracting  mondai4.zip

Everything is Ok

Files: 3
Size:       70392202
Compressed: 70392736

-->



## mondai3

mondai3.txtの中身は以下の通り。

```
ハッシュパスワード問題
答え：３つの答えをつなげて

0f1aae8b8398c20f81e1c36e349a7880c9234c63
01821f5469967540a5a774197463e8c4d658f588
264f39cab871e4cfd65b3a002f7255888bb5ed97
```

パスワードを3つに分割してSHA1ハッシュを生成したものが記されており、それらの元の文字列を探し出せばいいというもの。広いWebの世界には単純な単語のハッシュ化前後のテーブルが存在し、手軽に利用できるものに
[SHA1 Decrypter - SHA1 Decryption, Free SHA1 Decryptor, Online SHA1 Cracker, SHA1 Security](http://www.hashkiller.co.uk/sha1-decrypter.aspx)などがあります。このサイトに問題のハッシュ値をペーストして探索をかけると1秒足らずでハッシュ化前の数値を返してくれます。

![hashkiller.png](/assets/images/{{ page.date | replace: '-', '/' | split: ' ' | first}}/hashkiller.png)

ここで得られた単語をそのままくっつけてパスワードに指定すると、mondai4.zipが解凍できます。

```sh
$ 7z x mondai4.zip

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai4.zip

Extracting  hint4.txt
Enter password (will not be echoed) :

Extracting  mondai4.png
Extracting  mondai5.zip

Everything is Ok

Files: 3
Size:       70391846
Compressed: 70391891
```

<!--
$ 7za x mondai4.zip -ptokyouenoline

7-Zip (a) [64] 9.38 beta  Copyright (c) 1999-2014 Igor Pavlov  2015-01-03
p7zip Version 9.38.1 (locale=ja_JP.UTF-8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai4.zip

Extracting  hint4.txt
Extracting  mondai4.png
Extracting  mondai5.zip

Everything is Ok

Files: 3
Size:       70391846
Compressed: 70391891

-->

## mondai4

![mondai4.png](/assets/images/{{ page.date | replace: '-', '/' | split: ' ' | first}}/mondai4.png)
mondai4.pngはヒエログリフが書かれた画像です。ヒエログリフを読解できなければ問題文すら読めない状況なので、ヒエログリフ学習サイトを探して学びます。以下のサイトを参考に3分ほどで学びました。

- [日本語五十音をヒエログリフで表現](http://www004.upp.so-net.ne.jp/anubis/j50/jp50.html)

ヒエログリフを学び終わると、すらすらと画像の文字が読めるようになるので、日本語に起こします。

```
のらかちいくち　てちのちんちもちみら　もにみちもにみら　もにとちのにみちもちい　のらもらま
```

ぱっと見で平仮名で換字式暗号化された英文もしくはローマ字の文だと想像がつきます。ここで適当な文節として二言目の「てちのちんちもちみら」をGoogleで検索してみると、上位にヒットしたものにこの暗号の手がかりがでてきます。

![techinochi-search.png](/assets/images/{{ page.date | replace: '-', '/' | split: ' ' | first}}/techinochi-search.png)

日本語キーボードのかな入力モードにしてローマ字の文を打った文は、母音に位置する「ら」や「ち」が多く登場することから、この暗号方式はカナ入力のままのローマ字打ちだと断定しました。
しかし英字キーボードユーザーなので、かなが印刷されたキーボードを持っていません。仕方なしにWikimediaでそれっぽい画像を拾ってきて、平仮名⇆アルファベット変換を行うと、上記の平仮名文字列は以下のように変換できます。

```
kotaeha wakayamano minamino misakinamae komoji
```
「答えは和歌山の南の岬名前小文字」とのことです。早速Googleマップを開いて和歌山県の南にある岬を探します。

![wakayama-map.png](/assets/images/{{ page.date | replace: '-', '/' | split: ' ' | first}}/wakayama-map.png)

探すと潮岬（読み：しおのみさき）が和歌山の南部にある岬なので、これをアルファベット小文字にしてパスワードにして回答終了…だとおもってました。
**shionomisaki**としてタイプしてもパスワードが間違っていると言われ、解凍できません。「もしや違う岬なのかな？」と思い、和歌山の岬をいろいろ調べて同じように入力しても開きません。もうだめ...と心折れそうになってしまったので、あとはBruteForceに任せようと、次のような適当なスクリプトを書いて放置しました。

```ruby
#!/usr/bin/env ruby

# kana 50 components
vowel5 = ['a', 'i', 'u', 'e', 'o']
consonant5 = ['k', 's', 'sh', 't', 'ch', 'n', 'h', 'm', 'r', 'g', 'z', 'j', 'd', 'b', 'p']
vowel3 = ['a', 'u', 'o']
consonant3 = ['y', 'ky', 'sy', 'ts', 'ny', 'hy', 'by', 'gy', 'py', 'w']


# kana list
list = ['']

for v in vowel5 do
	list.push v
end

for c in consonant5 do
	for v in vowel5 do
		list.push c + v
		list.push c[0] + c + v
	end
end

for c in consonant3 do
	for v in vowel3 do
		list.push c + v
		list.push c[0] + c + v
	end
end

list.push 'nn'


locker = Mutex::new

# Wordlist generator
queue = []
Thread.start {
	q = ['','','','','','']
	for p0 in list do
		for p1 in list do
			for p2 in list do
				for p3 in list do
					for p4 in list do
						for p5 in list do
							q[5] = p5
							qq = q.join
							unless qq =~ /^(.)\1/ then
								locker.synchronize { queue.push qq }
							end
						end
						q[4] = p4
					end
					q[3] = p3
				end
				q[2] = p2
			end
			q[1] = p1
		end
		q[0] = p0
	end
}



# Password cracker
puts 'Cracking...'
thread_count = 128
threads = []
found = false
thread_count.times do |i|
	threads << Thread.start {
		loop do
			break if found
			break unless queue
			pass = locker.synchronize { queue.shift } + "misaki"
			t = system "7za x -p#{pass} -so mondai5.zip > /dev/null 2> /dev/null"
			if t then
				found = true
				puts '## PASS FOUND ##'
				open("pass.txt", "a") {|f| f.puts pass }
				puts 'pass saved.'
			end
		end
	}
end


threads.each { |th| th.join }

```


1時間ほどお風呂に入って放置していたら、答えが吐き出されていました。
```sh
$ time ./solver.rb
Cracking...
## PASS FOUND ##
pass saved.

real    16m44.573s
user    30m36.171s
sys     18m7.269s
```

潮岬（読み：しおのみさき）の「潮」の字を「うしお」と読み違えて（？）パスワードに設定していたようです。

このパスワードを入力することでmondai5.zipを展開することができました。

```
$ 7z x mondai5.zip

7-Zip [64] 9.20  Copyright (c) 1999-2010 Igor Pavlov  2010-11-18
p7zip Version 9.20 (locale=utf8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai5.zip

Extracting  hint5.txt
Enter password (will not be echoed) :

Extracting  mondai5
Extracting  mondai6.zip

Everything is Ok

Files: 3
Size:       70380412
Compressed: 70378640
```
<!--

$ 7za x mondai5.zip -pushiomisaki

7-Zip (a) [64] 9.38 beta  Copyright (c) 1999-2014 Igor Pavlov  2015-01-03
p7zip Version 9.38.1 (locale=ja_JP.UTF-8,Utf16=on,HugeFiles=on,4 CPUs)

Processing archive: mondai5.zip

Extracting  hint5.txt
Extracting  mondai5
Extracting  mondai6.zip

Everything is Ok

Files: 3
Size:       70380412
Compressed: 70378640

-->

mondai5以降のWrite-upは明日公開します。
