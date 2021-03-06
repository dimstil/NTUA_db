drop database if exists librarydb;
create database if not exists libraryDB;
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
    ID int  auto_increment,
    mFirst text not null,
    mLast text not null,
    street text not null,
    streetNumber smallint not null,
    postalCode char(5) not null,
    mBirthdate date not null,
    primary key (ID),
    check (regexp_like(postalcode, '^[0-9]+$') and length(postalcode) = 5)
    );

create table if not exists publisher(
	pubName varchar(60),
    estYear int,
    street text,
    streetNumber smallint,
    postalCode char(5),
    primary key (pubName),
	check (regexp_like(postalcode, '^[0-9]+$') and length(postalcode) = 5),
	check (regexp_like(estYear, '^[0-9]+$'))
    );

create table if not exists Book(
	ISBN char(13),
    title text,
    pubYear int,
    numpages int,
    pubName varchar(60) not null,
    primary key (ISBN),
	foreign key(pubName) references publisher(pubName) on delete no action on update cascade,
    check (regexp_like(isbn, '^[0-9]+$') and length(isbn) = 13),
	check (regexp_like(pubYear, '^[0-9]+$')),
	check (regexp_like(numpages, '^[0-9]+$'))
);

create table if not exists author(
	ID int auto_increment,
    aFirst varchar(60),
    aLast varchar(60),
    aBirthdate date,
    primary key (ID)
    );

create table if not exists category(
	categoryName varchar(60),
    supercategoryName varchar(60) default null,
    primary key (categoryName),
    foreign key(supercategoryName) references category(categoryName) on delete set null on update cascade
    );

create table if not exists copies(
	ISBN char(13) not null, 
    copyNr int default 1,
    shelf  varchar(20) default 'A800',
    primary key(ISBN,copyNr),
    foreign key(ISBN) references Book(ISBN) on delete cascade on update cascade
);

create table if not exists employee(
	ID int auto_increment, 
    eFirst varchar(60),
    eLast varchar(60), 
    salary int,
    primary key (ID),
    check (salary >= 0)
);

create table if not exists permanent_employee(
	empID int auto_increment, 
	hiringDate date,
    primary key (empID),
    foreign key(empID) references employee(ID) on delete cascade on update cascade
);
create table if not exists temporary_employee(
	empID int auto_increment,
    contractNr varchar(30),
    primary key (empID),
    foreign key(empID) references employee(ID) on delete cascade on update cascade
    );
create table if not exists borrows(
	ID int not null,
    ISBN char(13) not null,
    copyNr int not null, 
    date_of_borrowing date not null, 
    date_of_return date null,
    primary key(ID, ISBN, copyNr, date_of_borrowing),
    foreign key(ID) references Member(ID) on delete cascade on update cascade,
    foreign key(ISBN) references Book(ISBN) on delete cascade on update cascade,
    foreign key(ISBN,copyNr) references copies(ISBN,copyNr) on delete cascade on update cascade,
    check (date_of_return > date_of_borrowing)
);
create table if not exists belongs_to(
    isbn char(13) not null,
    categoryName varchar(60) not null,
    primary key(ISBN,categoryName),
    foreign key(ISBN) references Book(ISBN) on delete cascade on update cascade,
    foreign key(categoryName) references category(categoryName) on delete no action on update cascade
);

create table if not exists reminder(
	empID int not null,
    memID int not null,
    ISBN char(13) not null,
    copyNr int not null,
    date_of_borrowing date not null, 
    date_of_reminder date not null,
    primary key(empID,memID,ISBN,copyNr,date_of_borrowing,date_of_reminder),
    foreign key(empID) references employee(ID) on delete cascade on update cascade,
    foreign key(memID) references Member(ID) on delete cascade on update cascade,
    foreign key(ISBN) references Book(ISBN) on delete cascade on update cascade,
    foreign key(memID, ISBN, copyNr,date_of_borrowing) references  borrows(
    ID, ISBN, copyNr, date_of_borrowing) on delete cascade on update cascade

);
create table if not exists written_by(
	ISBN char(13) not null, 
    ID int not null,
    primary key(ISBN, ID),
    foreign key(ISBN) references Book(ISBN) on delete cascade on update cascade,
    foreign key(ID) references author(ID) on delete no action on update cascade
);

