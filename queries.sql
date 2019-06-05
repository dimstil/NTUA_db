select count(*) from member;
select copies.isbn, count(*) from copies group by copies.isbn;
select book.isbn, book.title, book.numpages from book order by book.numpages desc;
select member.mFirst, member.mLast, count(*) from member inner join borrows on borrows.id = member.id where borrows.date_of_return is null group by member.id having count(*) >= 3;
select distinct borrows.isbn from (select borrows.isbn as isbn, m1.ID as ID from member as m1 inner join borrows on m1.ID = borrows.ID) as borrowed_books_by inner join borrows on borrows.isbn = borrowed_books_by.isbn where borrows.ID  != borrowed_books_by.ID;
select book.isbn, book.title, belongs_to.categoryName from book left join belongs_to on book.isbn = belongs_to.isbn;
select book.isbn, book.title, author.aFirst, author.aLast from book left join written_by on book.isbn = written_by.isbn inner join author on written_by.ID = author.ID;