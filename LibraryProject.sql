-- drop database if exists librarydb;
-- create database if not exists libraryDB;
use libraryDB;

set default_storage_engine=InnoDB;
set FOREIGN_KEY_CHECKS = 1;


drop table if exists reminder;
drop table if exists borrows;
drop table if exists Member;
drop table if exists copies;
drop table if exists belongs_to;
drop table if exists written_by;
drop table if exists book;
drop table if exists Publisher;
drop table if exists author;
drop table if exists category;
drop table if exists permanent_employee;
drop table if exists temporary_employee;
drop table if exists employee;


create table if not exists Member(
    memberID int  auto_increment,
    mFirst text,
    mLast text,
    street text,
    streetNumber smallint,
    postalCode char(5),
    mBirthdate date,
    primary key (memberID),
    check (regexp_like(postalcode, '[0-9]+$') and length(postalcode) = 5)
    );

create table if not exists publisher(
	pubName varchar(60),
    estYear int,
    street text,
    streetNumber smallint,
    postalCode char(5),
    primary key (pubName),
	check (regexp_like(postalcode, '[0-9]+$') and length(postalcode) = 5)
    );

create table if not exists Book(
	ISBN char(13),
    title text,
    pubYear int,
    numpages int,
    pubName varchar(60) not null,
    primary key (ISBN),
	foreign key(pubName) references publisher(pubName) on delete cascade,
    check (regexp_like(isbn, '[0-9]+$') and length(isbn) = 13)
);

create table if not exists author(
	authID int auto_increment,
    aFirst varchar(60),
    aLast varchar(60),
    aBithdate date,
    primary key (authID)
);

create table if not exists category(
	categoryName varchar(60),
    supercategoryName varchar(60) default null,
    primary key (categoryName),
    foreign key(supercategoryName) references category(categoryName) on delete set null
    );

create table if not exists copies(
	ISBN char(13) not null, 
    copyNr int not null,
    shelf  varchar(20),
    primary key(ISBN,copyNr),
    foreign key(ISBN) references Book(ISBN) on delete cascade
);

create table if not exists employee(
	empID int auto_increment, 
    eFirst varchar(60),
    eLast varchar(60), 
    salary int,
    primary key (empID)
);

create table if not exists permanent_employee(
	empID int auto_increment, 
	hiringDate date,
    primary key (empID),
    foreign key(empID) references employee(empID) on delete cascade
);
create table if not exists temporary_employee(
	empID int auto_increment,
    contractNr varchar(30),
    primary key (empID),
    foreign key(empID) references employee(empID) on delete cascade
    );
create table if not exists borrows(
	memberID int not null,
    ISBN char(13) not null,
    copyNr int not null, 
    date_of_borrowing date not null, 
    date_of_return date not null,
    primary key(memberID, ISBN, copyNr, date_of_borrowing),
    foreign key(memberID) references Member(memberID) on delete cascade,
    foreign key(ISBN) references Book(ISBN) on delete cascade,
    foreign key(ISBN,copyNr) references copies(ISBN,copyNr) on delete cascade
);

create table if not exists belongs_to(
    isbn char(13) not null,
    categoryName varchar(60) not null,
    primary key(ISBN,categoryName),
    foreign key(ISBN) references Book(ISBN) on delete cascade,
    foreign key(categoryName) references category(categoryName) on delete cascade
);
create table if not exists reminder(
	empID int not null,
    memberID int not null,
    ISBN char(13) not null,
    copyNr int not null,
    date_of_borrowing date not null, 
    date_of_reminder date not null,
    primary key(empID,memberID,ISBN,copyNr,date_of_borrowing,date_of_reminder),
    foreign key(empID) references employee(empID) on delete cascade,
    foreign key(memberID) references Member(memberID) on delete cascade,
    foreign key(ISBN) references Book(ISBN) on delete cascade,
    foreign key(memberID, ISBN, copyNr,date_of_borrowing) references  borrows(
    memberID, ISBN, copyNr, date_of_borrowing) on delete cascade

);
create table if not exists written_by(
	ISBN char(13) not null, 
    authID int not null,
    primary key(ISBN, authID),
    foreign key(ISBN) references Book(ISBN) on delete cascade,
    foreign key(authID) references author(authID) on delete cascade
);

