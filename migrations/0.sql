use barkeep;

create table if not exists migrations (migration int, primary key(migration));

create table user (
  id int not null unique,
  firstname varchar(200) not null,
  lastname varchar(200) not null,
  balance int not null,
  primary key (id)
);

create table bottle (
  id int not null auto_increment,
  product_id int not null,
  name varchar(200) not null,
  category varchar(200) not null,
  owner_id int not null,
  price_nok int,
  volume_ml int,
  size_ml int,
  added timestamp not null,
  image_thumb varchar(300),
  sacred boolean,
  owner_name varchar(400),
  primary key (id),
  foreign key (owner_id) references user (id)
);


create table drink (
  id int not null auto_increment,
  drink_id int not null,
  user_id int not null,
  bottle_id int not null,
  price int not null,
  size_ml int not null,
  poured timestamp not null,
  user_name varchar(400),
  bottle_name varchar(200),
  primary key (id),
  foreign key (user_id) references user (id),
  foreign key (bottle_id) references bottle (id)
);

insert into migrations (migration) values (0);
