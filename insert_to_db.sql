INSERT INTO `librarydb`.`author` (`authID`, `aFirst`, `aLast`, `aBithdate`) VALUES ('1', 'Manos', 'Gianakakis', '1960-02-13');
INSERT INTO `librarydb`.`author` (`authID`, `aFirst`, `aLast`, `aBithdate`) VALUES ('2', 'Sofoklis', 'Tsapas', '1958-11-19');
INSERT INTO `librarydb`.`author` (`authID`, `aFirst`, `aLast`, `aBithdate`) VALUES ('3', 'Xristiana', 'Arbeler', '1988-12-21');
INSERT INTO `librarydb`.`author` (`authID`, `aFirst`, `aLast`, `aBithdate`) VALUES ('4', 'Marina', 'Karakwstena', '1990-10-17');
INSERT INTO `librarydb`.`author` (`authID`, `aFirst`, `aLast`, `aBithdate`) VALUES ('5', 'Leonidas', 'Petropoulos', '1982-04-26');

INSERT INTO `librarydb`.`publisher` (`pubName`, `estYear`, `street`, `streetNumber`, `postalCode`) VALUES ('OfhsProd', '1997', 'Amalias', '18', '12345');
INSERT INTO `librarydb`.`publisher` (`pubName`, `estYear`, `street`, `streetNumber`, `postalCode`) VALUES ('StylProd', '1997', 'Amalias', '20', '12345');
INSERT INTO `librarydb`.`publisher` (`pubName`, `estYear`, `street`, `streetNumber`, `postalCode`) VALUES ('AndrProd', '1997', 'Amalias', '22', '12345');
INSERT INTO `librarydb`.`publisher` (`pubName`, `estYear`, `street`, `streetNumber`, `postalCode`) VALUES ('YouProd', '1984', 'Gounari', '65', '15773');
INSERT INTO `librarydb`.`publisher` (`pubName`, `estYear`, `street`, `streetNumber`, `postalCode`) VALUES ('AraPakisProd', '1875', 'Arapaki', '38', '17676');

INSERT INTO `librarydb`.`book` (`ISBN`, `title`, `pubYear`, `numpages`, `pubName`) VALUES ('1234567891234', 'A title', '2000', '412', 'OfhsProd');
INSERT INTO `librarydb`.`book` (`ISBN`, `title`, `pubYear`, `numpages`, `pubName`) VALUES ('2234567891234', 'B title', '2001', '400', 'OfhsProd');
INSERT INTO `librarydb`.`book` (`ISBN`, `title`, `pubYear`, `numpages`, `pubName`) VALUES ('3234567891234', 'C title', '2001', '224', 'OfhsProd');
INSERT INTO `librarydb`.`book` (`ISBN`, `title`, `pubYear`, `numpages`, `pubName`) VALUES ('4234567891234', 'D title', '2002', '300', 'StylProd');
INSERT INTO `librarydb`.`book` (`ISBN`, `title`, `pubYear`, `numpages`, `pubName`) VALUES ('5234567891234', 'E title', '2014', '830', 'AraPakisProd');

INSERT INTO `librarydb`.`belongs_to` (`isbn`, `categoryName`) VALUES ('1234567891234', 'Drama');
INSERT INTO `librarydb`.`belongs_to` (`isbn`, `categoryName`) VALUES ('4234567891234', 'Novel');
INSERT INTO `librarydb`.`belongs_to` (`isbn`, `categoryName`) VALUES ('4234567891234', 'Erotica');
INSERT INTO `librarydb`.`belongs_to` (`isbn`, `categoryName`) VALUES ('3234567891234', 'Thriller');
INSERT INTO `librarydb`.`belongs_to` (`isbn`, `categoryName`) VALUES ('5234567891234', 'Biography');

INSERT INTO `librarydb`.`member` (`memberID`, `mFirst`, `mLast`, `street`, `streetNumber`, `postalCode`, `mBirthdate`) VALUES ('1', 'Kleanthis', 'Koutsikos', 'Kolokotrwni', '12', '15773', '1997-04-30');
INSERT INTO `librarydb`.`member` (`memberID`, `mFirst`, `mLast`, `street`, `streetNumber`, `postalCode`, `mBirthdate`) VALUES ('2', 'Xaris', 'Karamouzas', 'Othwnos', '3', '19884', '1996-11-25');
INSERT INTO `librarydb`.`member` (`memberID`, `mFirst`, `mLast`, `street`, `streetNumber`, `postalCode`, `mBirthdate`) VALUES ('3', 'Paris', 'Tsoutsoukos', 'Amalias', '29', '12523', '1990-07-11');
INSERT INTO `librarydb`.`member` (`memberID`, `mFirst`, `mLast`, `street`, `streetNumber`, `postalCode`, `mBirthdate`) VALUES ('4', 'Giorgos', 'Karapatsias', 'Kastorias', '14', '15968', '1991-06-13');
INSERT INTO `librarydb`.`member` (`memberID`, `mFirst`, `mLast`, `street`, `streetNumber`, `postalCode`, `mBirthdate`) VALUES ('5', 'Kwstis', 'Paparatsis', 'Psaromaxala', '18', '12336', '1994-09-24');

INSERT INTO `librarydb`.`copies` (`ISBN`, `copyNr`, `shelf`) VALUES ('1234567891234', '1', 'A123');
INSERT INTO `librarydb`.`copies` (`ISBN`, `copyNr`, `shelf`) VALUES ('3234567891234', '1', 'A982');
INSERT INTO `librarydb`.`copies` (`ISBN`, `copyNr`, `shelf`) VALUES ('2234567891234', '1', 'B234');
INSERT INTO `librarydb`.`copies` (`ISBN`, `copyNr`, `shelf`) VALUES ('4234567891234', '1', 'C150');
INSERT INTO `librarydb`.`copies` (`ISBN`, `copyNr`, `shelf`) VALUES ('5234567891234', '1', 'D487');

INSERT INTO `librarydb`.`borrows` (`memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_return`) VALUES ('3', '1234567891234', '1', '2019-05-03', '2019-05-10');
INSERT INTO `librarydb`.`borrows` (`memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_return`) VALUES ('2', '3234567891234', '1', '2019-05-07', '2019-05-14');
INSERT INTO `librarydb`.`borrows` (`memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_return`) VALUES ('4', '5234567891234', '1', '2019-05-15', '2019-05-22');
INSERT INTO `librarydb`.`borrows` (`memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_return`) VALUES ('1', '2234567891234', '1', '2019-05-02', '2019-05-09');
INSERT INTO `librarydb`.`borrows` (`memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_return`) VALUES ('5', '4234567891234', '1', '2019-05-01', '2019-05-08');

INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('1', 'Kwnstantina', 'Skovola', '80');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('2', 'Marigw', 'Papadiamadi', '5');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('3', 'Magdalini', 'Psarakwstena', '60');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('4', 'Filio', 'Skafida', '57');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('5', 'Aris', 'Kozuris', '6');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('6', 'Nikos', 'Karapaulos', '2');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('7', 'Theano', 'Petrwna', '15');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('8', 'Asimakis', 'Boulgaris', '26');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('9', 'Baggelis', 'Kastanas', '71');
INSERT INTO `librarydb`.`employee` (`empID`, `eFirst`, `eLast`, `salary`) VALUES ('10', 'Giannis', 'Barolis', '13');

INSERT INTO `librarydb`.`permanent_employee` (`empID`, `hiringDate`) VALUES ('1', '2018-04-13');
INSERT INTO `librarydb`.`permanent_employee` (`empID`, `hiringDate`) VALUES ('2', '2018-10-20');
INSERT INTO `librarydb`.`permanent_employee` (`empID`, `hiringDate`) VALUES ('3', '2019-11-11');
INSERT INTO `librarydb`.`permanent_employee` (`empID`, `hiringDate`) VALUES ('4', '2019-01-30');
INSERT INTO `librarydb`.`permanent_employee` (`empID`, `hiringDate`) VALUES ('5', '2019-08-14');

INSERT INTO `librarydb`.`temporary_employee` (`empID`, `contractNr`) VALUES ('6', '459201');
INSERT INTO `librarydb`.`temporary_employee` (`empID`, `contractNr`) VALUES ('7', '293114');
INSERT INTO `librarydb`.`temporary_employee` (`empID`, `contractNr`) VALUES ('8', '789345');
INSERT INTO `librarydb`.`temporary_employee` (`empID`, `contractNr`) VALUES ('9', '165483');
INSERT INTO `librarydb`.`temporary_employee` (`empID`, `contractNr`) VALUES ('10', '794362');

INSERT INTO `librarydb`.`reminder` (`empID`, `memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_reminder`) VALUES ('3', '2', '3234567891234', '1', '2019-05-07', '2019-05-14');
INSERT INTO `librarydb`.`reminder` (`empID`, `memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_reminder`) VALUES ('1', '5', '4234567891234', '1', '2019-05-01', '2019-05-08');
INSERT INTO `librarydb`.`reminder` (`empID`, `memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_reminder`) VALUES ('4', '3', '1234567891234', '1', '2019-05-03', '2019-05-10');
INSERT INTO `librarydb`.`reminder` (`empID`, `memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_reminder`) VALUES ('2', '1', '2234567891234', '1', '2019-05-02', '2019-05-09');
INSERT INTO `librarydb`.`reminder` (`empID`, `memberID`, `ISBN`, `copyNr`, `date_of_borrowing`, `date_of_reminder`) VALUES ('5', '4', '5234567891234', '1', '2019-05-15', '2019-05-22');

INSERT INTO `librarydb`.`written_by` (`ISBN`, `authID`) VALUES ('1234567891234', '3');
INSERT INTO `librarydb`.`written_by` (`ISBN`, `authID`) VALUES ('4234567891234', '5');
INSERT INTO `librarydb`.`written_by` (`ISBN`, `authID`) VALUES ('2234567891234', '1');
INSERT INTO `librarydb`.`written_by` (`ISBN`, `authID`) VALUES ('5234567891234', '4');
INSERT INTO `librarydb`.`written_by` (`ISBN`, `authID`) VALUES ('3234567891234', '2');
