delimiter $$
create trigger create_category_on_book_insert
before insert on belongs_to
for each row
begin
if not exists (select * from category
				where (categoryName = new.categoryName))
then
insert into category(categoryName) 
values (new.categoryName)
on duplicate key update categoryName= new.categoryName;
end if;
end; $$

delimiter $$
create trigger borrow_5_books
before insert on borrows
for each row
begin
if exists (select distinct borrows.id 
			from borrows 
            where borrows.date_of_return is null and borrows.id = new.id
            having count(*) = 5)
then
signal sqlstate '45000'
SET MESSAGE_TEXT = 'Cannot borrow more than 5 books!';
end if;
end; $$

delimiter $$
create trigger cannot_borrow
before insert on borrows
for each row
begin
if exists (select distinct borrows.id 
			from borrows 
            where borrows.id=new.id and borrows.date_of_return is null and date_add(borrows.date_of_borrowing, interval 30 day) < curdate()
            )
then
signal sqlstate '45000'
SET MESSAGE_TEXT = 'Expired book found!';
end if;
end; $$

delimiter $$
create trigger copy_on_first_insert
after insert on book
for each row
begin
if (select count(*)
from copies 
where copies.isbn = new.isbn) = 0
then
insert into copies(isbn, copyNr, shelf) 
values (new.isbn, 1, "A800");
end if;
end; $$

delimiter $$
create trigger auto_increment_copies_number
before insert on copies
for each row
begin
if exists (select distinct isbn from copies where copies.isbn = new.isbn)
then
set new.copyNr = (select max(copyNr)
from copies
where copies.isbn = new.isbn) + 1;
end if;
end; $$
