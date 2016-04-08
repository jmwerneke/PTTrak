create database `sacsos`;
GRANT ALL PRIVILEGES ON *.* TO `sacsos_user`@`*` identified by 'ilike7';
use `sacsos`;

create table `reviews`
(
`id` int  not null auto_increment,
`resource_id` varchar(25) not null,
`resource_type` varchar(25) not null,
`rating` int not null default 0,
`body` text,
primary key (id)

) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;