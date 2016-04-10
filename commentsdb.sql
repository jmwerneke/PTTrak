create database `sacsos`;

GRANT ALL PRIVILEGES ON *.* TO `sacsos_user`@`localhost` identified by 'ilike7';

use `sacsos`;

create table `reviews`
(
`id` int  not null auto_increment,
`resource_id` varchar(25) not null,
`resource_type` varchar(25) not null,
`rating` int null ,
created_at TIMESTAMP default CURRENT_TIMESTAMP,
primary key (id)

) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

create table ratings
(
`location_id` varchar(25) not null,
`rating` int not null default 0,
`num_ratings` int not null default 1,
primary key (location_id)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;


ALTER TABLE `sacsos`.`reviews` 
CHANGE COLUMN `rating` `rating` INT(11) NULL DEFAULT NULL;
