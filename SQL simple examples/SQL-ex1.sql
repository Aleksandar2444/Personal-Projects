--Find all Employees with FirstName = Antonio
select * from Employee
where FirstName = 'Antonio'

--Find all Employees with DateOfBirth greater than 01.01.1979
select * from Employee
where Employee.dateofbirth > '01.01.1979'

--Find all Male Employees
select * from Employee
where Employee.gender = 'M'

--Find all Employees with LastName starting with 'T'
select * from Employee e
where e.lastname iLike 'T%'

--Find all Employees hired in January/1988..(2011/2012)
select * from Employee e
where e.hiredate >= '01.01.2011'
and e.hiredate < '02.01.2011'

select * from Employee where hiredate between '01.01.2012' and '02.01.2012'

--Find all Employees with LastName starting with 'J'/'T' hired in January/1988..(2013/2014)
select * from Employee e
where e.lastname iLike 'T%'
and e.hiredate between '01.01.2013' and '02.01.2013'

--Find all Employees with FirstName = Antonio/Gordana ordered by Last Name
select * from Employee e
where e.firstname = 'Gordana'
order by e.lastname 

--List all Employees ordered by FirstName
select * from Employee e
order by e.firstname 

--Find all Male employees ordered by HireDate, starting from the last hired
select * from Employee e
where e.gender = 'M'
order by e.hiredate desc

--List all Business Entity region and Customer region names in single result
--set with duplicates
select BusinessEntity."region" from BusinessEntity
union all
select Customer."regionname" from Customer

--List all Business Entity region and Customer region names in single result
--set without duplicates
select BusinessEntity."region" from BusinessEntity
union
select Customer."regionname" from Customer

--List all common region names between BusinessEntity and Customers
select BusinessEntity."region" from BusinessEntity
intersect
select Customer."regionname" from Customer

--Provide create table script for the Order table where it won't allow
--an orderDate before 01.01.2012
create table new_order (
id serial primary key NOT NULL,
	orderDate date check (orderDate >= '01.01.2012')
)

--Provide create table script for the Product table where the price
--will always be at least 20% higher than the cost
create table new_product (
id serial primary key NOT NULL,
	Price float(2),
	Cost float(2) check ( Cost < ((20/100) * Price + Price))
)

--Provide create table script for the Product table where all 
--description values will be Unique
create table new_product1 (
id serial primary key NOT NULL,
	Description text UNIQUE
)

--Create Foreign key constraints for the Order table with script
alter table public."Order"
add constraint "Order_foreignKey" foreign key (employeeid)
references public.employee(id)

--List all possible combinations of Customer names and Product names
--that can be ordered from a specific customer
select c.Name as CustomerName, p.Name as ProductName
from Customer c
cross join Product p

--List all Business Entities that has any order
select distinct b.Name
from "Order" o
inner join BusinessEntity b on b.id = o.businessentityid

--List all Business Entites without orders
select distinct b.Name
from "Order" o
inner join BusinessEntity b on b.id = o.businessentityid
where o.businessentityid is null

--List all Customers without orders (using Right Join and Left Join)
select c.* from "Order" o
right join Customer c on o.CustomerId = c.id
where o.CustomerId is null

select c.* from "Order" o
left join Customer c on o.CustomerId = c.id
where o.CustomerId is null







