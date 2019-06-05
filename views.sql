create view to_remind as
select member.id as 'ID', member.mFirst as 'First Name', member.mLast as 'Last Name', count(*) as 'Number of books'
			from borrows inner join member
            on member.id = borrows.id
			where borrows.date_of_return is null and date_add(borrows.date_of_borrowing, interval 30 day) < curdate()
            group by member.id;
            
create view employee_no_salary as
select eFirst as 'First Name' , eLast as 'Last Name'
from employee 
