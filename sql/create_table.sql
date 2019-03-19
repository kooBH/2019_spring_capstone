create database mydb;
use mydb;

create table sensors (
  /* id is intger and is not null
  has automatically increasing value
  and is primary key
   */
id int not null auto_increment primary key,

seq int(10) unsigned,
device decimal(4,0) unsigned,
unit decimal(2,0) unsigned,
type char(1),
value decimal(10,4),
ip char(15),
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE USER 'ubuntu'@'localhost' IDENTIFIED BY 'zpfpdlf213';
GRANT ALL PRIVILEGES ON mydb.* TO 'ubuntu'@'localhost';
FLUSH PRIVILEGES;
