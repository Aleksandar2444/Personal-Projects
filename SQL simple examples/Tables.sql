-- My first SQL homework

Create Table Student (
Id serial Primary Key NOT NULL,
	FirstName varchar(20) NOT NULL,
	LastName varchar(30) NOT NULL,
	DateOfBirth date,
	EnrolledDate date,
	Gender nchar(1),
	NationalIdNumber varchar(20),
	StudentCardNumber varchar(20),
	created_at timestamp DEFAULT NOW()
)

Create Table Teacher (
Id serial Primary Key NOT NULL,
	FirstName varchar(20) NOT NULL,
	LastName varchar(20) NOT NULL,
	DateOfBirth date,
	AcademicRank varchar(20),
	HireDate date,
	created_at timestamp DEFAULT NOW()
)

Create Table Grade (
Id serial Primary Key NOT NULL,
	StudentId int,
	CourseId int,
	TeacherId int,
	Grade smallint,
	Comment varchar(100),
	CreatedDate date,
	created_at timestamp DEFAULT NOW()
)

Create Table Course (
Id serial Primary Key NOT NULL,
	Name varchar(20) NOT NULL,
	Credit int,
	AcademicYear int,
	Semester int,
	created_at timestamp DEFAULT NOW()
)

Create Table AchievementType (
Id serial Primary Key NOT NULL,
	Name varchar(40) NOT NULL,
	Description varchar NOT NULL,
	ParticipationRate numeric,
	created_at timestamp DEFAULT NOW()
)

Create Table GradeDetails (
Id serial Primary Key NOT NULL,
	GradeId int,
	AchievementTypeId int,
	AchievementPoints int,
	AchievementMaxPoints int,
	AchievementDate date,
	created_at timestamp DEFAULT NOW()
)

