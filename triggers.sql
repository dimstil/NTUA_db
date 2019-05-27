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

create trigger borrow_5_books
before insert on borrows
for each row
begin
if exists (select distinct borrows.memberid 
			from borrows 
            where borrows.date_of_return is null 
            having count(*) = 5)
then
signal sqlstate '45000';
end if;
end; $$