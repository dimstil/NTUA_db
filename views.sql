create view to_remind as
select member.id, member.mFirst, member.mLast, count(*) 
			from borrows inner join member
            on member.id = borrows.id
			where borrows.date_of_return is null and date_add(borrows.date_of_borrowing, interval 30 day) < curdate()
            group by member.id;
            
create view employee_no_salary as
select eFirst, eLast 
from employee 