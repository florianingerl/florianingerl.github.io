drop table if exists users;

create table users (
    id Integer  primary key AUTOINCREMENT,
    nickname Text NOT NULL,
    password Text NOT NULL,
    email Text NOT NULL
);

insert into users (nickname, password, email)
values ("Flori", "ABC", "imelflorianingerl@gmail.com"),
        ("Hermann", "ABCD", "Ingerl-HESF@online.de");