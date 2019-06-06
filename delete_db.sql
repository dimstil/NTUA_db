DELETE FROM `librarydb`.`author` WHERE (`ID` = '4');

DELETE FROM `librarydb`.`belongs_to` WHERE (`isbn` = '4234567891234') and (`categoryName` = 'Academic');

DELETE FROM `librarydb`.`book` WHERE (`ISBN` = '7234567891234');

DELETE FROM `librarydb`.`borrows` WHERE (`ID` = '1') and (`ISBN` = '2234567891234') and (`copyNr` = '1') and (`date_of_borrowing` = '2019-05-01');

DELETE FROM `librarydb`.`category` WHERE (`categoryName` = 'Erotica');

DELETE FROM `librarydb`.`copies` WHERE (`ISBN` = '7234567891234') and (`copyNr` = '1');

DELETE FROM `librarydb`.`employee` WHERE (`ID` = '4');

DELETE FROM `librarydb`.`member` WHERE (`ID` = '5');

DELETE FROM `librarydb`.`permanent_employee` WHERE (`empID` = '4');

DELETE FROM `librarydb`.`publisher` WHERE (`pubName` = 'YouProd');

DELETE FROM `librarydb`.`reminder` WHERE (`empID` = '5') and (`memID` = '4') and (`ISBN` = '5234567891234') and (`copyNr` = '1') and (`date_of_borrowing` = '2019-05-15') and (`date_of_reminder` = '2019-05-22');

DELETE FROM `librarydb`.`temporary_employee` WHERE (`empID` = '9');

DELETE FROM `librarydb`.`written_by` WHERE (`ISBN` = '1234567891234') and (`ID` = '3');
