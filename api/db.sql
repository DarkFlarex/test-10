create table news
(
    id          int auto_increment
        primary key,
    title       varchar(255)                       not null,
    description text                               not null,
    image       varchar(255)                       null,
    created_at  datetime default CURRENT_TIMESTAMP null
);

create table comments
(
    id      int auto_increment
        primary key,
    news_id int          not null,
    author  varchar(255) null,
    text    text         not null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
);

