--Requirement 1/3
--Calculate (price + cost) / weight for all products
select name,(price+cost)/weight as productCalculation from product

--Get a round number that is higher or equal for the costs and a round number that is lower or equal for the prices for all products
select name,cost,ceil(cost) as higherorequal,floor(cost) as lowerorequal from product

--Get all orders and generate a random number between 0 and 100 for every order
select o.*, Round(random() * 100) from public."Order" o

--Concatenate the name, region and zipcode from every business entity and add the delimiter ‘; ‘ between them
select concat(b.name,';',b.region,';',b.zipcode) from public.businessentity b
--or
select b.name||';'||b.region ||';'||b.zipcode as concat from public.businessentity b

--Declare temp table that will contain LastName and HireDate columns. The HireDate column must not allow dates after 01.01.2010. Insert 5 rows of dummy data and display every row inserted
create temporary table temp_table(
id serial primary key not null,
LastName varchar(20),
HireDate date check (HireDate < '01.01.2010')
)

select * from temp_table

insert into temp_table (LastName,HireDate)
values
('Ichev','01.01.2005'),
('Bobski','01.01.2009'),
('Testerson','01.01.2001'),
('Doe','01.01.2006'),
('Jolie','01.01.2007');

--Requirement 2/3
--Create a function (get_employees_hired_later_than) that will return 
--all employees that were hired after a provided date. 
--Return the following columns:
--The first and last name concatenated into one column with a space between them. The column should be named “Full name”
--The age that the employee was at the time he was employed. Column should be named “Age of employee on hiring”
--The national ID number concatenated with the gender, with a ‘; ‘ delimiter between them
create or replace function get_employees_hired_later_than(Hire_Date date)
	returns table(
	Fullname text,
	Ageofemployeeonhiring interval	
	)
	language plpgsql
as
$$
begin
	return query
	select concat(e.firstname,' ',e.lastname) as Fullname,
	age(e.hiredate::date,e.dateofbirth::date) as Ageofemployeeonhiring,
	concat(e.nationalidnumber,';',e.gender)
	from public.employee e
	where e.hiredate>=Hire_Date;
end;
$$;

select * from get_employees_hired_later_than('01.01.2014')
--or
select *,(e.hiredate::date-e.dateofbirth::date),age(e.hiredate::date,e.dateofbirth::date),concat(e.nationalidnumber,';',e.gender) from public.employee e

--Requirement 3/3
--Create a function (get_employee_orders) that will return all orders done by a specific employee
--Return  the following  columns:
--The first 3 letters of the name, the last 3 characters of the code and the full description concatenated delimited with the character ‘; ‘ 
--of the product for which the order was made
--The quantity of the order
--The business entity name for which the order was made
