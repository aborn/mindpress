
-- 创建用户
create user 'mindpress'@'%' identified by 'Mind@22press#';
-- 授权
-- ALTER USER 'maisy'@'%' IDENTIFIED WITH mysql_native_password BY '';
grant all privileges on *.* to 'mindpress'@'%';
-- 更新
flush privileges;
