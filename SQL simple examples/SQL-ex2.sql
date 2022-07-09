--Requirement 1/3
--Calculate the count of all grades in the system
select count(*) from Grade

--Calculate the count of all grades per Teacher in the system
select count(*) from Grade
group by teacherId

--Calculate the count of all grades per Teacher 
--in the system for first 100 Students (ID < 100)
select count(g.teacherId) from Grade g
where g.id <= 100
group by g.teacherid

--Find the maximal Grade and the average Grade per Student on all grades in the system
select g.studentid, max(grade), avg(grade) from Grade g
group by g.studentid

--Requirement 2/3
--Calculate the count of all grades per Teacher in the system
--and filter only grade count greater then 200
select t.id, count(g.grade) from Grade g
inner join teacher t on(t.id=g.teacherid)
group by t.id, g.grade > 200 

--Calculate the count of all grades per Teacher in the system for first 100 Students
--(ID < 100) and filter teachers with more than 50 grade count
select t.id, t.firstname, t.lastname, count(g.grade) from Grade g
left join teacher t on(t.id=g.teacherid)
where g.studentid < 100 
group by t.id, t.lastname, t.firstname > 200

--Find the Grade count, maximal Grade, and the average Grade per Student
--on all grades in the system. Filter only records where maximal Grade is equal to average Grade
select g.teacherid, count(g.grade), max(g.grade),avg(g.grade) from grade grade
group by g.studentid
having max(g.grade)=avg(g.grade)


--List Student firstname and lastname next to the other details from previous query
select g.teacherid, s.name, count(g.grade), max(g.grade),avg(g.grade) from grade grade
inner join student s on (s.id=g.studentid)
group by g.teacherid, s.name
having max(g.grade)=avg(g.grade)

--Requirement 3/3
--Create new view (vw_StudentGrades) that will list all studentIds and count of Grades per student
create or replace view vw_StudentGrades
as
select s.id, count(g.grade) from grade g 
inner join student s on (g.studentid=s.id)
group by s.id

--Change the view to show Student first and last names instead of StudentID
drop view vw_StudentGrades

create or replace view vw_StudentGrades
as
select distinct(s.firstname|| ' ' || s.lastname) as fullname, sum(g.grade) from grade g 
inner join student s on (g.studentid=s.id)
group by fullname

--List all rows from view ordered by biggest Grade Count
drop view vw_StudentGrades;

create or replace view vw_StudentGrades
as
select distinct(s.firstname|| ' ' || s.lastname) as name, sum(g.grade) as gradeCount from grade g 
inner join student s on (g.studentid=s.id)
group by s.firstname, s.lastname
order by sum(g.grade) desc

--Create new view vw_StudentGradeDetails that will list all Students(FirstName and LastName)
--and count the courses he passed through the exam
create or replace view vw_StudentGradeDetails
as
select distinct(s.firstname|| ' ' || s.lastname) as name, count(g.courseid) from grade g
inner join student s on(g.studentid=s.id)
where g.grade>2
group by s.firstname, s.lastname

