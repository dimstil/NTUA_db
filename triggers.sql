delimiter $$
create trigger existing_book
before insert on book
for each row
begin
IF EXISTS (select * from book
	where (isbn = new.isbn)
 ) THEN
  SIGNAL SQLSTATE '45000'
  SET MESSAGE_TEXT = 'Book already exists!';
END IF;
end; $$

create trigger create_category_on_book_insert 
after insert on belongs_to
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

create trigger nonexisting_book_belongs_to
before insert on belongs_to
for each row
begin
if not exists (select * from book
				where (isbn = new.isbn))
then
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Book does not exist!';
end if;
end; $$

create trigger nonexisting_values_written_by
before insert on written_by
for each row
begin
if not exists (select * from book
				where (isbn = new.isbn))
or not exists (select * from author
				where (authID = new .authID))
then
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Book or author do not exist!';
end if;
end; $$