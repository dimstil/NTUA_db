UPDATE `librarydb`.`author` SET `aFirst` = 'Nikos' WHERE (`ID` = '1');

UPDATE `librarydb`.`belongs_to` SET `categoryName` = 'Biography' WHERE (`isbn` = '4234567891234') and (`categoryName` = 'Erotica');

UPDATE `librarydb`.`book` SET `title` = 'H title', `pubYear` = '2005' WHERE (`ISBN` = '7234567891234');

UPDATE `librarydb`.`borrows` SET `date_of_borrowing` = '2019-05-03' WHERE (`ID` = '5') and (`ISBN` = '4234567891234') and (`copyNr` = '1') and (`date_of_borrowing` = '2019-05-01');

UPDATE `librarydb`.`category` SET `categoryName` = 'Autobiography' WHERE (`categoryName` = 'Biography');

UPDATE `librarydb`.`copies` SET `shelf` = 'D488' WHERE (`ISBN` = '5234567891234') and (`copyNr` = '2');

UPDATE `librarydb`.`employee` SET `eFirst` = 'Aristidis', `salary` = '100' WHERE (`ID` = '5');

UPDATE `librarydb`.`member` SET `street` = 'Agiou Kwnstantinou' WHERE (`ID` = '3');

UPDATE `librarydb`.`permanent_employee` SET `hiringDate` = '2019-01-31' WHERE (`empID` = '4');

UPDATE `librarydb`.`publisher` SET `estYear` = '1997' WHERE (`pubName` = 'YouProd');

UPDATE `librarydb`.`reminder` SET `empID` = '3' WHERE (`empID` = '2') and (`memID` = '1') and (`ISBN` = '2234567891234') and (`copyNr` = '1') and (`date_of_borrowing` = '2019-05-01') and (`date_of_reminder` = '2019-05-09');

UPDATE `librarydb`.`temporary_employee` SET `contractNr` = '459123' WHERE (`empID` = '6');

UPDATE `librarydb`.`written_by` SET `ID` = '1' WHERE (`ISBN` = '4234567891234') and (`ID` = '5');