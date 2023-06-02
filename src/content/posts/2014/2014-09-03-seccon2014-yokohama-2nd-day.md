---
title: SECCON 2014 横浜大会NW予選 Write-up
date: 2014-09-03T14:40:47+09:00
author: mzyy94
categories: ["CTF"]
tags: ["seccon", "seccon2014"]
image: "/assets/images/2014/9/3/KEN.JPG"
---
SECCON 2014 横浜大会に参加してきました。
NW,BIN,WEBと３部門の予選がありましたが、ネットワーク大好き♡なのでNWにチャレンジしました。

ネットワーク部門は10問ある問題を解いて答えを紙に書いて提出して採点された点数によって順位付けされ、成績優秀者10人が予選突破という選抜形式で行われました。

CTFにおけるネットワーク問題は年々減少傾向にある上、難易度を上げることが難しいとのことなので、今回は少し特殊なファイル形式で出題されていました。
例えば以下が問題1の出題ファイルです。

    Find the Key!

    0000  00 00 00 00 00 00 00 00  00 00 00 00 08 00 45 00   ........ ......E.
    0010  00 34 f3 ed 00 00 40 01  88 d9 7f 00 00 01 7f 00   .4....@. ........
    0020  00 01 08 00 bd c8 18 18  00 00 5a 6d 78 68 5a 33   ........ ..ZmxhZ3
    0030  74 7a 5a 57 4e 6a 62 32  35 7a 5a 57 4e 6a 62 32   tzZWNjb2 5zZWNjb2
    0040  35 39

そう、いいままでのpcapファイルでの出題ではなくテキストファイルでの出題となっていたのです。

このままでは今まで愛用してきたWiresharkおよび、tsharkでの解析ができません。
バイナリエディタにコピペして目grepしてもいいですが、ここはpcapファイルに変換してしまいましょう。

世の中には便利なソフトウェアが沢山あります。こんなときにもOSSが活躍します。
テキストファイルをpcapファイルに変換するソフトウェア、その名も`text2pcap`です。
これ、Wiresharkに付属してるんです。

使い方は簡単、例えば問題1の出題ファイルでは、1行目の問題文を削除してHEX部分だけにしたファイル、question-01.txtを作成し、
`text2pcap question-01.txt q01.pcap`などとすれば、Wiresharkで解析できるpcapファイルが作成されます。

さて、このようにしてさくさくと解けるファイルが作成できればあとは画面を凝視するのみ、順々に解いていきます。
## 目次


## 問題1

    Find the Key!

    0000  00 00 00 00 00 00 00 00  00 00 00 00 08 00 45 00   ........ ......E.
    0010  00 34 f3 ed 00 00 40 01  88 d9 7f 00 00 01 7f 00   .4....@. ........
    0020  00 01 08 00 bd c8 18 18  00 00 5a 6d 78 68 5a 33   ........ ..ZmxhZ3
    0030  74 7a 5a 57 4e 6a 62 32  35 7a 5a 57 4e 6a 62 32   tzZWNjb2 5zZWNjb2
    0040  35 39


簡単ですね。
tsharkでパケットをチェックしてみると、

      1   0.000000    127.0.0.1 -> 127.0.0.1    ICMP 66 Echo (ping) request  id=0x1818, seq=0/0, ttl=64

と出力されるので、ICMPメッセージにフラッグが隠されてるんだろうなーっと想像つきます。
上記のファイルを見ると、目nkfで簡単に答えが出てきます。
目nkf力が無い人は、`echo ZmxhZ3tzZWNjb25zZWNjb259|nkf -mB`とでもやるとよいでしょう。

ということでフラッグは`secconseccon`でした。

## 問題2

    開いてるTCPポートを列挙せよ


[nmaped.pcap](https://gist.github.com/mzyy94/ae0144ba055b505a17ff58b18c4e921c)


これはpcapファイルが添付されていました。
nmapでポートスキャンをしたときのログが残っているようです。
ポートが空いているということは、TCP FlagのSYNとACKが帰ってくるはずなので、SYN/ACKを返しているポートを列挙する適当なスクリプトを書きました。
node.js + node_pcapです。

```js
var filter = "tcp";

var pcap = require('pcap'),
	pcap_session = pcap.createOfflineSession("./nmaped.pcap", filter);

pcap_session.on('packet', function (raw_packet) {
	var packet = pcap.decode.packet(raw_packet);
	if (packet.link.ip.tcp.flags.syn == 1 &&
		packet.link.ip.tcp.flags.ack == 1) {
		console.log(packet.link.ip.tcp.sport);
	}
});
```

これを02-solver.jsとして保存し、`npm install pcap && node 02-solver.js | sort -n | uniq`としてあげれば答えのポートが出てきます。

## 問題3
    このパケットデータのアプリケーションプロトコルは何でしょう？
    英字でお答えください。

    0000   00 1a a0 89 a3 7f 44 94 fc 7e 1a ba 08 00 45 00  ......D..~....E.
    0010   00 4c 00 00 40 00 36 11 11 2c d2 ad a0 1b c0 a8  .L..@.6..,......
    0020   00 04 00 7b 00 7b 00 38 6d 96 1c 02 11 e8 00 00  ...{.{.8m.......
    0030   06 8b 00 00 02 9e ac 1d 02 32 d7 ad 09 99 d8 db  .........2......
    0040   8b 49 d7 ad 0a 44 7a a8 0f 7e d7 ad 0a 46 42 28  .I...Dz..~...FB(
    0050   23 a6 d7 ad 0a 46 42 2b 5a b3                    #....FB+Z.

目grepで答えはすぐにわかるんですが、確認のためにtext2pcapを用いてpcapファイルにしてtsharkに食わせてみると、以下のように出力されます。

    $ tshark -r q03.pcap
      1   0.000000 210.173.160.27 -> 192.168.0.4  NTP 90 NTP Version 3, server

NTPですね。

## 問題4

    サーバの名前は何？
    FQDNでお答えください。

    0000   00 1a a0 89 a3 7f 44 94 fc 7e 1a ba 08 00 45 00  ......D..~....E.
    0010   00 4c 00 00 40 00 36 11 11 2c d2 ad a0 1b c0 a8  .L..@.6..,......
    0020   00 04 00 7b 00 7b 00 38 6d 96 1c 02 11 e8 00 00  ...{.{.8m.......
    0030   06 8b 00 00 02 9e ac 1d 02 32 d7 ad 09 99 d8 db  .........2......
    0040   8b 49 d7 ad 0a 44 7a a8 0f 7e d7 ad 0a 46 42 28  .I...Dz..~...FB(
    0050   23 a6 d7 ad 0a 46 42 2b 5a b3                    #....FB+Z.

先ほどと同じパケットデータなので、全問でtsharkを動かしたときの出力にあるIPアドレスに向けてnslookupしてあげれば答えがでます。

    $ nslookup 210.173.160.27
    Server:		192.168.128.1
    Address:	192.168.128.1#53

    Non-authoritative answer:
    27.160.173.210.in-addr.arpa	name = ntp1.jst.mfeed.ad.jp.

    Authoritative answers can be found from:


答えは、ntp1.jst.mfeed.ad.jp.です。

## 問題5

    このパケットによると、日本時間で今何月何日何時何分何秒？

    0000   00 1a a0 89 a3 7f 44 94 fc 7e 1a ba 08 00 45 00  ......D..~....E.
    0010   00 4c 00 00 40 00 36 11 11 2c d2 ad a0 1b c0 a8  .L..@.6..,......
    0020   00 04 00 7b 00 7b 00 38 6d 96 1c 02 11 e8 00 00  ...{.{.8m.......
    0030   06 8b 00 00 02 9e ac 1d 02 32 d7 ad 09 99 d8 db  .........2......
    0040   8b 49 d7 ad 0a 44 7a a8 0f 7e d7 ad 0a 46 42 28  .I...Dz..~...FB(
    0050   23 a6 d7 ad 0a 46 42 2b 5a b3                    #....FB+Z.

これも先ほどと同じパケットです。`tshark -r 03.pcap -V`とすると、Timestampの情報が現れるので時差と到達遅延を計算してあげれば答えが出ます。

## 問題6

    空欄となっている箇所の２バイトの値は？

    00 66 77 88  99 AA 00 11  22 33 44 55  08 00 45 00
    00 54 03 76  00 00 40 01  F3 DF C0 A8  01 01 C0 A8
    01 02 08 00  48 FD 3B 04  00 6F 54 01  8D C5 00 0C
    A6 B9 08 09  0A 0B 0C 0D  0E 0F 10 11  12 13 14 15
    16 17 18 19  1A 1B 1C 1D  1E 1F 20 21  22 23 24 25
    26 27 28 29  2A 2B 2C 2D  2E 2F 30 31  32 33 34 35
    36 37

    00 11 22 33  44 55 00 66  77 88 99 AA  08 00 45 00
    00 54 1E 0A  00 00 40 01  D9 4B C0 A8  01 02 C0 A8
    01 01 00 00  -- -- 3B 04  00 6F 54 01  8D C5 00 0C
    A6 B9 08 09  0A 0B 0C 0D  0E 0F 10 11  12 13 14 15
    16 17 18 19  1A 1B 1C 1D  1E 1F 20 21  22 23 24 25
    26 27 28 29  2A 2B 2C 2D  2E 2F 30 31  32 33 34 35
    36 37

目wiresharkするとわかると思いますが、求めるフラッグはICMPのChecksumです。
計算してもいいのですが、wireshark/tsharkのチェック機能を使ってさっくりと解いてしまいます。
`--`の部分に00を埋めてわざと間違っているであるだろうChecksumを入力してpcapファイルを作成し、
tsharkで詳細情報を見ると、以下のように出力されます。

    $ tshark -r q06.pcap -V
    Frame 1: 98 bytes on wire (784 bits), 98 bytes captured (784 bits)
        Encapsulation type: Ethernet (1)
        Arrival Time: Sep  3, 2014 12:48:01.000000000 JST
        [Time shift for this packet: 0.000000000 seconds]
        Epoch Time: 1409716081.000000000 seconds
        [Time delta from previous captured frame: 0.000000000 seconds]
        [Time delta from previous displayed frame: 0.000000000 seconds]
        [Time since reference or first frame: 0.000000000 seconds]
        Frame Number: 1
        Frame Length: 98 bytes (784 bits)
        Capture Length: 98 bytes (784 bits)
        [Frame is marked: False]
        [Frame is ignored: False]
        [Protocols in frame: eth:ethertype:ip:icmp:data]
    Ethernet II, Src: 00:66:77:88:99:aa (00:66:77:88:99:aa), Dst: 00:11:22:33:44:55 (00:11:22:33:44:55)
        Destination: 00:11:22:33:44:55 (00:11:22:33:44:55)
            Address: 00:11:22:33:44:55 (00:11:22:33:44:55)
            .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
            .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
        Source: 00:66:77:88:99:aa (00:66:77:88:99:aa)
            Address: 00:66:77:88:99:aa (00:66:77:88:99:aa)
            .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
            .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
        Type: IP (0x0800)
    Internet Protocol Version 4, Src: 192.168.1.2 (192.168.1.2), Dst: 192.168.1.1 (192.168.1.1)
        Version: 4
        Header Length: 20 bytes
        Differentiated Services Field: 0x00 (DSCP 0x00: Default; ECN: 0x00: Not-ECT (Not ECN-Capable Transport))
            0000 00.. = Differentiated Services Codepoint: Default (0x00)
            .... ..00 = Explicit Congestion Notification: Not-ECT (Not ECN-Capable Transport) (0x00)
        Total Length: 84
        Identification: 0x1e0a (7690)
        Flags: 0x00
            0... .... = Reserved bit: Not set
            .0.. .... = Don't fragment: Not set
            ..0. .... = More fragments: Not set
        Fragment offset: 0
        Time to live: 64
        Protocol: ICMP (1)
        Header checksum: 0xd94b [validation disabled]
            [Good: False]
            [Bad: False]
        Source: 192.168.1.2 (192.168.1.2)
        Destination: 192.168.1.1 (192.168.1.1)
        [Source GeoIP: Unknown]
        [Destination GeoIP: Unknown]
    Internet Control Message Protocol
        Type: 0 (Echo (ping) reply)
        Code: 0
        Checksum: 0x0000 [incorrect, should be 0x50fd]
        Identifier (BE): 15108 (0x3b04)
        Identifier (LE): 1083 (0x043b)
        Sequence number (BE): 111 (0x006f)
        Sequence number (LE): 28416 (0x6f00)
        Data (56 bytes)

    0000  54 01 8d c5 00 0c a6 b9 08 09 0a 0b 0c 0d 0e 0f   T...............
    0010  10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f   ................
    0020  20 21 22 23 24 25 26 27 28 29 2a 2b 2c 2d 2e 2f    !"#$%&'()*+,-./
    0030  30 31 32 33 34 35 36 37                           01234567
            Data: 54018dc5000ca6b908090a0b0c0d0e0f1011121314151617...
            [Length: 56]


ICMPの項目を見てみると、

`Checksum: 0x0000 [incorrect, should be 0x50fd]`

とあるので、答えにコレを記入して乙です。

## 問題7

    通信相手のIPアドレスは？次の4つのパケットを見て答えよ。

    -- 1 --
    000000: FF FF FF FF  FF FF 00 66  77 88 99 AA  08 06 00 01 : .......f w.......
    000010: 08 00 06 04  00 01 00 66  77 88 99 AA  C0 A8 01 02 : .......f w.......
    000020: 00 00 00 00  00 00 C0 A8  01 01                    : ........ ..
    ==
    -- 2 --
    000000: 00 66 77 88  99 AA 00 11  22 33 44 55  08 06 00 01 : .fw..... "3DU....
    000010: 08 00 06 04  00 02 00 11  22 33 44 55  C0 A8 01 01 : ........ "3DU....
    000020: 00 66 77 88  99 AA C0 A8  01 02 00 00  00 00 00 00 : .fw..... ........
    000030: 00 00 00 00  00 00 00 00  00 00 00 00              : ........ ....
    ==
    -- 3 --
    000000: 00 11 22 33  44 55 00 66  77 88 99 AA  08 00 45 00 : .."3DU.f w.....E.
    000010: 00 54 00 00  40 00 40 01  50 C3 C0 A8  01 02 0A 14 : .T..@.@. P.......
    000020: 1E 28 08 00  D0 C0 7A 07  00 01 EA 6C  02 54 C9 72 : .(....z. ...l.T.r
    000030: 0C 00 08 09  0A 0B 0C 0D  0E 0F 10 11  12 13 14 15 : ........ ........
    000040: 16 17 18 19  1A 1B 1C 1D  1E 1F 20 21  22 23 24 25 : ........ .. !"#$%
    000050: 26 27 28 29  2A 2B 2C 2D  2E 2F 30 31  32 33 34 35 : &'()*+,- ./012345
    000060: 36 37                                              : 67
    ==
    -- 4 --
    000000: 00 66 77 88  99 AA 00 11  22 33 44 55  08 00 45 00 : .fw..... "3DU..E.
    000010: 00 54 02 95  40 00 40 01  4E 2E 0A 14  1E 28 C0 A8 : .T..@.@. N....(..
    000020: 01 02 00 00  D8 C0 7A 07  00 01 EA 6C  02 54 C9 72 : ......z. ...l.T.r
    000030: 0C 00 08 09  0A 0B 0C 0D  0E 0F 10 11  12 13 14 15 : ........ ........
    000040: 16 17 18 19  1A 1B 1C 1D  1E 1F 20 21  22 23 24 25 : ........ .. !"#$%
    000050: 26 27 28 29  2A 2B 2C 2D  2E 2F 30 31  32 33 34 35 : &'()*+,- ./012345
    000060: 36 37                                              : 67
    ==

pcapファイルを作成して、`tshark -r q07.pcap`とするだけです。それだけです。やってみてください。

## 問題8
    間違っているのは何バイト目？次の二つのパケットを見て答えよ。

    -- 1 --
    000000: FF FF FF FF  FF FF 00 11  22 33 44 55  08 06 00 01 : ........ "3DU....
    000010: 08 00 08 04  00 01 00 11  22 33 44 55  C0 A8 01 01 : ........ "3DU....
    000020: 00 00 00 00  00 00 C0 A8  01 02                    : ........ ..      
    ==
    -- 2 --
    000000: 00 11 22 33  44 55 00 66  77 88 99 AA  08 06 00 01 : .."3DU.f w.......
    000010: 08 00 08 04  00 02 00 66  77 88 99 AA  C0 A8 01 02 : .......f w.......
    000020: 00 11 22 33  44 55 C0 A8  01 01 00 00  00 00 00 00 : .."3DU.. ........
    000030: 00 00 00 00  00 00 00 00  00 00 00 00              : ........ ....    
    ==

ぱっと見で大体予想はつくのですが、今回もpcapファイルを作成して見てみます。
tsharkの出力は以下のようになりました。

    $ tshark -r q08.pcap
      1   0.000000              ->              Ethernet 2 [Malformed Packet]
      2   0.000001 00:66:77:88:99:aa -> 00:11:22:33:44:55 ARP 60 1.2.0.17 is at 0066778899aac0a8

1パケット目が壊れてるようです。
この通信はARPの問い合わせの様子を示しているようで、ARPの構造を知っていればすぐに解ける問題です。
ARPのPDUは以下のようになっています。

     0                               1
     0 1 2 3 4 5 6 7 8 9 a b c d e f 0 1 2 3 4 5 6 7 8 9 a b c d e f
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |         Hardware type         |           Protocol type       |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |  HW addr len  | Proto addr len|              OP Code          |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |                  Sender Hardware Address                      |
    +                               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |                               |   Sender Protocol Address     
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       Sender Protocol Address      |                               |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+                               +
    |                      Target Hardware Address                  |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |                  Target Protocol address                      |
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


これに0x000eから始まるEtherペイロードを合わせてみて見ると、HW addr lenの部分、すなわちARPリクエストのハードウェアアドレス長指定が間違っているのです。
この問い合わせはProtocol typeの部分からIP問い合わせであることがわかり、IPアドレス問い合わせのためにはMACアドレスに対するARP要求が行われます。
MACアドレスが物理層となり、EthernetのMACアドレスは6バイトなので、HW addr lenの部分は08ではなく、06である必要があります。

0x0012番地目の部分が間違っているので、19バイト目が答えとなります。

## 問題9
なぜか問題8と同じ


## 問題10
    このパケットデータの??の部分に表示される文字列をお答えください。

    0000  00 00 00 00 00 00 00 00  00 00 00 00 08 00 45 00   ........ ......E.
    0010  00 54 00 00 40 00 40 01  3c a7 7f 00 00 01 7f 00   .T..@.@. <.......
    0020  00 01 08 00 ba 0c 02 18  00 01 d7 c2 05 54 00 00   ........ .....T..
    0030  00 00 91 f0 0e 00 00 00  00 00 10 11 12 13 14 15   ........ ........
    0040  16 17 18 19 1a 1b 1c 1d  1e 1f 20 21 22 23 24 25   ........ .. ?????
    0050  26 27 28 29 2a 2b 2c 2d  2e 2f 30 31 32 33 34 35   ?????????????????
    0060  36 37                                              ??

パケットの問題ではないね。
ASCIIコードテーブル片手に0x21から0x37までのASCII文字を記入しておしまい。


### 感想
CTF予選問題としては出題ファイル形式含めてもちょっと優しすぎるかなぁといった印象を持ちました。
さくさくと解けるものが多く、難しいものは無かったように感じます。
ただ、text2pcapの存在を知らない人に取っては結構な時間を取られてしまう骨の折れるような問題群だったと思います。

<blockquote class="twitter-tweet" lang="ja"><p>わいわい <a href="http://t.co/YaEfzCCFq8">pic.twitter.com/YaEfzCCFq8</a></p>&mdash; 誕生日前日amzn.to/1vvKISb (@mzyy94) <a href="https://twitter.com/mzyy94/status/507067029547806720">2014, 9月 3</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
