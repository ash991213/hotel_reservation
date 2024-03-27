## DB 리플리케이션 설정

```bash
# docker-compose 실행
docker-compose up -d

# docker network 상세 조회
docker inspect mysql_net
```

```json
{
    "Name": "master",
    "EndpointID": "b4aa6567cfcf7481ecaafc8da0dd9e518c1c92653b0c5f1748c5a31fd207195b",
    "MacAddress": "02:42:ac:12:00:03",
    "IPv4Address": "172.18.0.3/16",
    "IPv6Address": ""
}
```

```bash
# master 컨테이너 shell 접속
docker exec -it master bash

# mysql 로그인
mysql -u root -p
Enter password: 1234

# 마스터 서버의 바이너리 로그 파일과 위치 확인
mysql> show master status;
```

```text
+------------------+----------+--------------+------------------+-------------------+
| File | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000003 | 2277 | | | |
+------------------+----------+--------------+------------------+-------------------+
```

```bash
# slave 컨테이너 shell 접속
docker exec -it slave bash

# mysql 로그인
mysql -u root -p
Enter password: 1234

# 복제할 마스터 서버 연결 설정
mysql> CHANGE MASTER TO MASTER_HOST='172.18.0.3',
MASTER_USER='root',
MASTER_PASSWORD='1234',
MASTER_LOG_FILE='mysql-bin.000003',
MASTER_LOG_POS=2277,
Master_Port=3306;

# 복제 프로세스 시작
mysql> start slave;

# 슬레이브 서버의 복제 상태 및 세부 정보 확인
mysql> show slave status\G;
```
