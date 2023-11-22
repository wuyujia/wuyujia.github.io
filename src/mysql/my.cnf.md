---
title: MySQL配置
index: true
---


## 慢SQL语句检测时间
查询
``` shell
mysql> show variables like 'long_query_time';
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+
```
临时修改（针对不重启服务器生效）
``` shell
mysql> set session long_query_time=1;
Query OK, 0 rows affected (0.00 sec)

mysql> set global long_query_time=1;
Query OK, 0 rows affected (0.00 sec)
```
永久修改（my.cnf）

## my.cnf
``` config
[client]
port = 3306
socket = /data/3306/tmp/mysql.sock
default-character-set = utf8mb4

[mysql]
no-auto-rehash
max_allowed_packet = 128M
default_character_set = utf8mb4

# The MySQL server
[mysqld]
###base
port = 3306
user = mysql
basedir = /usr/local/mysql
datadir = /data/3306/data
pid-file = /data/3306/tmp/mysql.pid
socket = /data/3306/tmp/mysql.sock
default_time_zone = '+8:00'
character-set-client-handshake = FALSE
character_set_server = utf8mb4
collation-server = utf8mb4_unicode_ci   ##8.0 开始 utf8mb4_0900_ai_ci
init_connect='SET NAMES utf8mb4'
#tmpdir = /dev/shm
server-id = 250
skip_name_resolve = 1
skip_external_locking = 1
lower_case_table_names = 1
federated
innodb_print_all_deadlocks = 1
explicit_defaults_for_timestamp = true
gtid_mode = ON
enforce_gtid_consistency = 1
sql_mode = NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES   ###only_full_group_by

# logs
long_query_time = 1
slow_query_log = 1
slow_query_log_file = /data/3306/logs/slow.log
log_slow_admin_statements=1   ##ddl是否记录
#binlog_rows_query_log_events=1  ##在binlog中记录原始sql
log_error = /data/3306/logs/mysql-error.log
#log_timestamps=SYSTEM   ##5.7.2新增参数

#### slave config
relay_log = /data/3306/logs/relay-bin
max_relay_log_size = 1024M
#skip_slave_start = 1
#slave-skip-errors = 1062,1032
#read_only = 1
#super_read_only=1
master_info_repository = TABLE
relay_log_info_repository = TABLE
slave_parallel_type=LOGICAL_CLOCK  
slave_parallel_workers=16
slave_preserve_commit_order=1
transaction_write_set_extraction =XXHASH64
binlog_transaction_dependency_tracking=WRITESET
binlog_transaction_dependency_history_size=50000
relay_log_recovery = 1

######## binlog
binlog_format = row
log_bin    = /data/3306/logs/mysql-bin
log_slave_updates = true
binlog_cache_size = 8M
max_binlog_size = 1G
max_binlog_cache_size = 4G
expire_logs_days = 7   ###binlog_expire_logs_seconds
log_bin_trust_function_creators = 1
############ myisam
key_buffer_size = 64M
#bulk_insert_buffer_size = 32M

########## PGA
sort_buffer_size = 8M
read_buffer_size = 8M
join_buffer_size = 32M
read_rnd_buffer_size = 32M
query_cache_type = 0
query_cache_size = 0M
table_open_cache = 1024
table_definition_cache = 1024
open_files_limit = 65536
back_log = 512
max_connections = 2000
max_user_connections = 1500
max_connect_errors = 10000
max_allowed_packet = 128M
thread_cache_size = 128
thread_stack=256k
tmp_table_size=32M ### 内存临时表的上线
max_heap_table_size=32M

# InnoDB
default-storage-engine = innodb
#transaction_isolation = READ-COMMITTED
innodb_data_home_dir = /data/3306/data
innodb_log_group_home_dir = /data/3306/data
innodb_data_file_path = ibdata1:1G:autoextend
innodb_buffer_pool_size = 4G
innodb_buffer_pool_instances    = 8
#innodb_additional_mem_pool_size = 16M
innodb_log_file_size = 1024M
innodb_log_buffer_size = 32M
innodb_log_files_in_group = 3
innodb_flush_log_at_trx_commit = 1
sync_binlog = 1000
innodb_lock_wait_timeout = 10
innodb_sync_spin_loops = 40
innodb_max_dirty_pages_pct = 80
innodb_thread_concurrency = 0
innodb_thread_sleep_delay = 500
innodb_concurrency_tickets = 1000
innodb_flush_method = O_DIRECT
innodb_file_per_table = 1
innodb_read_io_threads = 24
innodb_write_io_threads = 24
innodb_io_capacity = 2000
innodb_file_format = Barracuda
innodb_file_format_max = Barracuda
innodb_purge_threads=1
innodb_purge_batch_size = 32
innodb_old_blocks_pct=50
innodb_stats_on_metadata=0
wait_timeout = 3600
innodb_fast_shutdown = 1
optimizer_switch='mrr=on,mrr_cost_based=off,batched_key_access=on'

[mysqldump]
quick
max_allowed_packet = 128M
#myisam_max_sort_file_size = 10G

[myisamchk]
key_buffer_size = 64M
sort_buffer_size = 512k
read_buffer = 2M
write_buffer = 2M

[mysqlhotcopy]
interactive-timeout
```