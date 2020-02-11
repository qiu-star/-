create database universe;
use universe;
set names utf8mb4;
create table phenomenon(
    id int not null primary key,
    name varchar(255),
    src_name varchar(255)
);
insert into phenomenon values(1,'日食','riShi');
insert into phenomenon values(2,'行星连珠','lianZhu');
insert into phenomenon values(3,'冲日','chongRi');
insert into phenomenon values(4,'凌日','lingRi');
insert into phenomenon values(5,'合日','heRi');
