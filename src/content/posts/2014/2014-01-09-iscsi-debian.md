---
title: debianでiscsi target/initiator動作させるメモ
date: 2014-01-09T13:45:08+09:00
categories: ["Network"]
tags: ["iscsi", "debian"]
---

Linux上でのiSCSIパケット収集のためにVirtual Boxで作成した、Debian 7.0.0にiSCSI initiatorとtargetを入れたときのメモを起こしておきます。

<!-- more -->

今回iSCSIパケットの収集をする必要があったので、Linux上で動くように導入しました。
iSCSIの説明はまた今度にするとして、簡単に用語を定義しておくと、
iSCSIターゲット
- iSCSIサーバー
iSCSIイニシエータ
- iSCSIクライアント


対象とするシステムは以下のとおりです。

  Initiator |     Target
:----------:|:------------:
Debian 7.0.0| Debian 7.0.0
仮想1コアCPU|仮想1コアCPU
 512MB RAM  | 512MB RAM
 10GB SSD   | 10GB SSD

全く同じシステムで、初期インストール時の設定はminimalです。（gccなどはおろか、sshdも入っていない状態）

iSCSIに関するパッケージは以下のとおり。targetはiscsitargetとiscsitarget-dkms、イニシエータはopen-iscsiとなっています。

```
root@debian:~# aptitude search iscsi
p   iscsitarget                                            - iSCSI Enterprise Target userland tools
p   iscsitarget-dkms                                       - iSCSI Enterprise Target kernel module source - dkms version
p   libiscsi-bin                                           - iSCSI client shared library - utilities
p   libiscsi-dev                                           - iSCSI client shared library
p   libiscsi1                                              - iSCSI client shared library
p   open-iscsi                                             - High performance, transport independent iSCSI implementation
```

まずサーバーとなるターゲットのインストールから。
rootで`aptitude install iscsitarget iscsitarget-dkms`としてパッケージインストールして下記のとおりに設定し、iSCSIターゲットを有効にします。

   ファイルパス |   変更内容
:--------------:|:----------------------:
/etc/default/iscsitarget | ISCSITARGET_ENABLE=falseをtrueに

そして、iSCSIとして提供するデバイスを設定します。
この設定ファイルは/etc/iet/ietd.confに追記して設定します。

iSCSIターゲットの設定書式は設定ファイルにもサンプルがありますが、最小限の記述は以下の様な形式になります。
ここではfileioタイプを用い、単一ファイルをあたかもSCSIデバイスとして利用する方法を取ります。

```
Target iqn.yyyy-mm.&lt;reversed domain name&gt;[:identifier]
   Lun 0 Path=&lt;image file path&gt;,Type=fileio,ScsiId=&lt;id&gt;,ScsiSN=&lt;sn&gt;
```

各所で紹介されている記事にはScsiIDやScsiSNを指定していないものもありましたが、open-iscsi 2.0.873@Debian 7.0.0ではSCSIデバイスとして認識されないのでちゃんとつけておきましょう（これがわからず1時間くらい考えこんでた）。

Pathで指定するファイルは`dd if=/dev/zero of=/disk.img bs=1 count=0 seek=10G`などで適当につくってしまいましょう。
今回はこのように設定しました。

```
Target iqn.2014-01.localhost:fileio.test
   Lun 0 Path=/root/disk.img,Type=fileio,ScsiId=test,ScsiSN=test
```

ここまででターゲットの設定は終わりなので、サービスを再起動します。

```
root@debian:~# service iscsitarget restart
Removing iSCSI enterprise target devices: :.
Starting iSCSI enterprise target service:.
.
```

エラーに関しては多くは出力されないので、`dmesg | tail`で確認するなりした方がいいと思います。
正常に動作しているかどうかは`neststat -a | grep iscsi`や`lsof -i:3260`で状態をみて判断します。

繋げてみないことには動作確認は取れませんので、クライアントとしてのopen-iscsiをインストールします。
`aptitude install open-iscsi`として、iscsiイニシエータを導入します。

最低限の動作には設定は必要ないのでこのままコマンドを入力して接続していきます。
`dpkg -L open-iscsi`すると、いくつかiscsiで始まるコマンドがインストールされていますが、すべてを統合的に実行できるiscsiadmを利用します。

iscsiadmに関して詳しいことはmanを見るとして、今回繋げるためには以下のようにして簡単ログインしてしまいましょう。

```
root@debian:~# iscsiadm -m discovery -t sendtargets -p 127.0.0.1 -l
```

オプションに関して詳しいことはmanをみてもらうとして、今回使ったオプションは次のような意味を持っています。

Option | Sense
-------|-------
-m     | モード指定
discovery|iSCSIターゲット探索
-t     |タイプ指定
sendtargets|準iSCSIプロトコルを用いているターゲット探索
-p|ネットワークポータル指定
 127.0.0.1|指定ネットワークアドレス
-l|ログイン

これで接続し、ちゃんとSCSIデバイスとして認識できていればdmesgに以下のように出ます。

```
[ 6484.501041] scsi3 : iSCSI Initiator over TCP/IP
[ 6484.764505] scsi 3:0:0:0: Direct-Access     IET      VIRTUAL-DISK     0    PQ: 0 ANSI: 4
[ 6484.765289] sd 3:0:0:0: [sdb] 2097152 512-byte logical blocks: (1.07 GB/1.00 GiB)
[ 6484.765325] sd 3:0:0:0: [sdb] Write Protect is off
[ 6484.765328] sd 3:0:0:0: [sdb] Mode Sense: 77 00 00 08
[ 6484.765389] sd 3:0:0:0: [sdb] Write cache: disabled, read cache: enabled, doesn't support DPO or FUA
[ 6484.766030]  sdb: unknown partition table
[ 6484.766303] sd 3:0:0:0: [sdb] Attached SCSI disk
[ 6484.766417] sd 3:0:0:0: Attached scsi generic sg2 type 0
```

こんなかんじの出力があれば、大体検討はつくと思いますが、/dev/sdbにiSCSIターゲットがSCSIデバイスとして認識されています。
このブロックデバイスをパーティショニングし、フォーマットし、マウントすることで実際にディスクとして利用することが出来ます。
こんなかんじです。

```
root@debian:~# fdisk /dev/sdb
Device contains neither a valid DOS partition table, nor Sun, SGI or OSF disklabel
Building a new DOS disklabel with disk identifier 0x86017ce7.
Changes will remain in memory only, until you decide to write them.
After that, of course, the previous content won't be recoverable.

Warning: invalid flag 0x0000 of partition table 4 will be corrected by w(rite)

Command (m for help): n
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
Select (default p):
Using default response p
Partition number (1-4, default 1):
Using default value 1
First sector (2048-2097151, default 2048):
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-2097151, default 2097151):
Using default value 2097151

Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
root@debian:~# mkfs -t ext4 /dev/sdb1
mke2fs 1.42.5 (29-Jul-2012)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
65536 inodes, 261888 blocks
13094 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=268435456
8 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376
 
Allocating group tables: done
Writing inode tables: done
Creating journal (4096 blocks): done
Writing superblocks and filesystem accounting information: done
 
root@debian:~# mkdir mount
root@debian:~# mount /dev/sdb1 mount/
root@debian:~# df -h
Filesystem                                              Size  Used Avail Use% Mounted on
rootfs                                                   19G 1022M   17G   6% /
udev                                                     10M     0   10M   0% /dev
tmpfs                                                    50M  240K   50M   1% /run
/dev/disk/by-uuid/f5aa3b2c-46ae-4b43-8191-1173de38f1d8   19G 1022M   17G   6% /
tmpfs                                                   5.0M     0  5.0M   0% /run/lock
tmpfs                                                   276M     0  276M   0% /run/shm
/dev/sdb1                                              1007M   18M  939M   2% /root/mount
```


あとはマウントしたディレクトリに対して好き放題アクセスしたら、切り離しておきます。

```
root@debian:~# iscsiadm -m session -u
```

オプションは、

Option | Sense
-------|-------
-m     | モード指定
session|現在はられているセッションを指定
-u|ログアウト

以上がまっさらな状態からiSCSIイニシエータ／ターゲットを導入して繋げるまで、です。
これらをインストールして動作するまでにしたログに関してはgistにあげてありますので、より詳しく見たい方などよければご参照ください。

[https://gist.github.com/mzyy94/8329470](https://gist.github.com/mzyy94/8329470)
