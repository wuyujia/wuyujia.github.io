---
title: Mac移动硬盘不识别问题修复
index: true
---

## 上来就贴原文地址
[原文](https://zhuanlan.zhihu.com/p/346106923)

## 问题现象
1T的USB移动设备插入Mac电脑无法装载

在【磁盘工具】中能看到移动硬盘，但是处于卸载状态，并且无法装载，也无法修复，整个人都不好了。

但是，在windows系统中，它能被正常装载，能读取/写入文件

## 问题解决

感谢大佬的命令。让我重获新生

1. 打开「终端」，输入「diskutil list」 查看自己宗卷名字，能看到名字就能继续往下进行修复
``` bash
➜  ~ diskutil list
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *500.3 GB   disk0
   1:                        EFI EFI                     314.6 MB   disk0s1
   2:                 Apple_APFS Container disk1         500.0 GB   disk0s2

/dev/disk1 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +500.0 GB   disk1
                                 Physical Store disk0s2
   1:                APFS Volume APPLE SSD AP0512M Me... 117.5 GB   disk1s1
   2:                APFS Volume Preboot                 81.3 MB    disk1s2
   3:                APFS Volume Recovery                530.0 MB   disk1s3
   4:                APFS Volume VM                      1.1 GB     disk1s4
   5:                APFS Volume APPLE SSD AP0512M Media 11.2 GB    disk1s5

/dev/disk2 (external, physical):    // 这个就是我的移动硬盘
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *1.0 TB     disk2
   1:               Windows_NTFS Backup Plus             1.0 TB     disk2s1
```

2. 输入：「ps aux | grep fsck」回车, 确认进程是否存在？
``` bash
➜  ~ ps aux | grep fsck 
root              3891   0.9  0.0  6374120  12640   ??  U     1:02下午   0:02.45 /System/Library/Filesystems/exfat.fs/Contents/Resources/./fsck_exfat -y /dev/rdisk2s1
xxxx           4471   0.0  0.0  4399360    796 s002  S+    1:05下午   0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn --exclude-dir=.idea --exclude-dir=.tox fsck
```

3. 输入：「sudo pkill -f fsck」回车
``` bash
➜  ~ sudo pkill -f fsck
Password:
```

4. 然后，硬盘就回来了，回来了～～，能读取之后，可以考虑先备份数据。

5. 到【磁盘工具】中，对移动硬盘进行急救，由于上一个步骤我没有备份，文件比较多，占用500G，我运行了急救，结果～～，运行了很久很久。

6. 搞定！