

## 简易跳班机

``` python
#! /bin/python3

import pexpect
import os
import time

lines = 2
columns = 100

def run_cmd(cmd, patterns):
        child = pexpect.spawn(cmd, encoding='utf-8')
        index = child.expect(patterns, timeout=10)
        return [index, child]

def ssh_client(host, user, port, passwd):
        ssh_newkey = 'yes/no'
        ssh_passwd = 'assword:'
        ssh_confirm = 'yes'
        ssh_refuse = 'Connection refused'
        ssh_login = 'Last login:'
        ssh_repeat_passwd = 'Permission denied, please try again'
        ssh_noroutetohost = 'No route to host'
        ssh_conntimeout = 'Connection timed out'
        # 运行ssh完整的命令
        ssh_cmd = "ssh {u}@{h} -p {p}".format(u=user, h=host, p=port)
        # 初始化一个句柄，并获取索引号
        index, child = run_cmd(ssh_cmd, [
                ssh_newkey,
                ssh_passwd,
                ssh_refuse,
                ssh_login,
                ssh_noroutetohost,
                ssh_conntimeout,
                pexpect.EOF,
                pexpect.TIMEOUT
        ])
        try:
                if index == 0:
                        time.sleep(1)
                        child.sendline(ssh_confirm)
                        # 一般第一次ssh时，会让输入yes/no之类的，所以匹配到这个的时候，就做一次递归
                        return ssh_client(host, user, port, passwd)
                elif index == 1:
                        print("Begin Load Password...")
                        child.sendline(passwd)
                        result = child.expect([
                                ssh_repeat_passwd,
                                ssh_login,
                        ])
                        if result == 1:
                                print("{} login success (-_-)".format(host))
                                child.interact()
                                return
                        elif result == 0:
                                # 说明密码错误，需要重新输入密码，并进行递归
                                passwd = input('Passwd: ').strip()
                                return sshclient(host, user, port, passwd)
                elif index == 2:
                        print("Connect refused, Pls check ssh port.")
                        return
                elif index == 3:
                        print("Login success")
                        child.interact()
                        return
                elif index == 4:
                        print("The host %s connected faild: No route to host" % host)
                        return
                elif index == 5:
                        print("The host %s connected faild: Connection timeout" % host)
                        return
                elif index == 6:
                        print("Abnormal exit")
                        return
                elif index == 7:
                        print("Timeout for connect host %s, pls check network" % host)
                        return
                return
        except Exception as e:
                raise e

def read_config():
        hosts = [
                { 'host': '', 'port': '', 'user': '', 'passwd': '', 'remark': '' },
                { 'host': '', 'port': '', 'user': '', 'passwd': '', 'remark': '' },
                { 'host': '', 'port': '', 'user': '', 'passwd': '', 'remark': '' },
                { 'host': '', 'port': '', 'user': '', 'passwd': '', 'remark': '' },
        ]
        return hosts

def print_help(hosts):
        print("""
################################################################################
        """)
        print("""
                        \033[7m星河简易跳版机\033[0m
        """)
        for idx in range(len(hosts)):
                print("\033[1m{n}): {host} \t({user}) \t说明: {remark};\033[0m".format(n=idx, host=hosts[idx]['host'], user=hosts[idx]['user'], remark=hosts[idx]['remark']))
        print("")
        return input("\033[7m请选择序号进行登录, 输入 exit 或 Ctrl+c 退出:\033[0m ")


if __name__ == '__main__':
        #ssh_client('172.16.116.43', 'root', '39876', 'Sd@Im&e17LH')
         configs = read_config()
         while True:
                try: 
                        choice = print_help(configs)
                        if choice == "":
                                continue
                        if choice == 'exit':
                                break
                        try:
                                choice = int(choice)
                                if choice >= len(configs) or choice < 0 :
                                        print("\033[31m入错误，请重新输入\033[0m")
                                        continue
                        except Exception as e:
                                print("\033[31m输入错误，请重新输入\033[0m")
                        ssh_client(configs[choice]['host'], configs[choice]['user'], configs[choice]['port'], configs[choice]['passwd'])
                except KeyboardInterrupt as e:
                        break
                except Exception as e:
                        continue





```