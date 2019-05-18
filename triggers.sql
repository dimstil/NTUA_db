delimiter $$
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

