use barkeep;

create table if not exists migrations (migration int, primary key(migration));

create table bottle (
  bottle_id int not null auto_increment,
  product_id int not null,
  name varchar(200) not null,
  category varchar(200), not null,
  owner_id int not null,
  price_nok int,
  volume_ml int,
  added timestamp not null,
  sacred boolean,
  primary key (bottle_id),
  foreign key (owner_id)
);

create table user (
  user_id int not null auto_increment,
  firstname varchar(200) not null,
  lastname varchar(200) not null,
  balance int not null,
  primary key (user_id)
);

create table drink (
  id int not null auto_increment,
  drink_id int not null,
  user_id int not null,
  bottle_id int not null,
  price int not null,
  size_ml int not null,
  when timestamp not null,
  user_name varchar(400),
  bottle_name varchar(200),
  primary key (id),
  foreign key (user_id),
  foreign key (bottle_id)
);

insert into migrations (migration) values (0);
