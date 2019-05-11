drop table if exists test.reminder;
drop table if exists test.borrows;
drop table if exists test.Member;
drop table if exists test.copies;
drop table if exists test.belongs_to;
drop table if exists test.written_by;
drop table if exists test.book;
drop table if exists test.Publisher;
drop table if exists test.author;
drop table if exists test.category;
drop table if exists test.permanent_employee;
drop table if exists test.temporary_employee;
drop table if exists test.employee;

create table if not exists test.Member(
	memberID int PRIMARY KEY AUTO_INCREMENT not null,
    Mfirst text,
    Mlast text,
    Street text,
    number smallint,
    postalCode char(5),
    Mbirthdate int
    );

create table if not exists test.publisher(
	pubName varchar(60) primary key not null,
    estYear int,
    street text,
    number smallint,
    postalCode char(5)
    );

create table if not exists test.Book(
	ISBN char(16) PRIMARY KEY not null,
    title text,
    pubYear int,
    numpages int,
    pubName varchar(60) not null,
	foreign key(pubName) references publisher(pubName) 
);
create table if not exists test.author(
	authID int PRIMARY KEY auto_increment not null,
    AFirst varchar(60),
    ALast varchar(60),
    Abithdate int
);
create table if not exists test.category(
	categoryName varchar(60) primary key not null,
    supercategoryName varchar(60),
    foreign key(supercategoryName) references category(categoryName)
    );
create table if not exists test.copies(
	ISBN char(16) not null, 
    copyNr int not null,
    shelf  varchar(20),
    primary key(ISBN,copyNr),
    foreign key(ISBN) references Book(ISBN)
);
create table if not exists test.employee(
	empID int primary key auto_increment not null, 
    EFirst varchar(60),
    ELast varchar(60), 
    salary int
);
create table if not exists test.permanent_employee(
	empID int primary key auto_increment not null , 
	HiringDate date,
    foreign key(empID) references employee(empID)
);
create table if not exists test.temporary_employee(
	empID int primary key auto_increment not null,
    ContractNr varchar(30),
    foreign key(empID) references employee(empID)
    );
create table if not exists test.borrows(
	memberID int not null,
    ISBN char(16) not null,
    copyNr int not null, 
    date_of_borrowing date not null, 
    date_of_return date not null,
    primary key(memberID, ISBN, copyNr, date_of_borrowing),
    foreign key(memberID) references Member(memberID),
    foreign key(ISBN) references Book(ISBN),
    foreign key(ISBN,copyNr) references copies(ISBN,copyNr)
);
create table if not exists test.belongs_to(
	ISBN char(16) not null, 
    categoryName varchar(60) not null,
    primary key(ISBN,categoryName),
    foreign key(ISBN) references Book(ISBN),
    foreign key(categoryName) references category(categoryName)
);
create table if not exists test.reminder(
	empID int not null, 
    memberID int not null, 
    ISBN char(16) not null,
    copyNr int not null,
    date_of_borrowing date not null, 
    date_of_reminder date not null,
    primary key(empID,memberID,ISBN,copyNr,date_of_borrowing,date_of_reminder),
    foreign key(empID) references employee(empID),
    foreign key(memberID) references Member(memberID),
    foreign key(ISBN) references Book(ISBN),
    foreign key(memberID, ISBN, copyNr,date_of_borrowing) references  borrows(
    memberID, ISBN, copyNr, date_of_borrowing)

);
create table if not exists written_by(
	ISBN char(16) not null, 
    authID int not null,
    primary key(ISBN, authID),
    foreign key(ISBN) references Book(ISBN),
    foreign key(authID) references author(authID)
);
