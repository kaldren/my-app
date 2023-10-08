DROP TABLE IF EXISTS dbo.[Jobs]
GO

DROP TABLE IF EXISTS dbo.[EmploymentTypeTranslations]
GO

DROP TABLE IF EXISTS dbo.[CountryTranslations]
GO

DROP TABLE IF EXISTS dbo.[DepartmentTranslations]
GO

DROP TABLE IF EXISTS dbo.[LocationTranslations]
GO

DROP TABLE IF EXISTS dbo.[Departments]
GO

DROP TABLE IF EXISTS dbo.[EmploymentTypes]
GO

DROP TABLE IF EXISTS dbo.[Locations]
GO

DROP TABLE IF EXISTS dbo.[Companies]
GO

DROP TABLE IF EXISTS dbo.[Languages]
GO

DROP TABLE IF EXISTS dbo.[Countries]
GO

-- Create the Departments table
CREATE TABLE Departments (
    DepartmentId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);

GO

CREATE TABLE EmploymentTypes (
    EmploymentTypeId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE Countries (
    CountryId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);

GO

CREATE TABLE Locations (
    LocationId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    CountryId INT NOT NULL FOREIGN KEY REFERENCES Countries(CountryId)
);
GO


CREATE TABLE Companies (
    CompanyId INT PRIMARY KEY IDENTITY(1,1),
	Name NVARCHAR(50) NOT NULL,
    YearFounded INT NOT NULL,
	Employees INT NOT NULL,
	Address NVARCHAR(100) NOT NULL,
	Website NVARCHAR(50) NOT NULL,
	Facebook NVARCHAR(50) NOT NULL,
	LinkedIn NVARCHAR(50) NOT NULL,
	ShortDescription NVARCHAR(200) NOT NULL
);
GO

CREATE TABLE Seniority (
    SeniorityID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100)
);

GO

CREATE TABLE Currencies (
    CurrencyId INT PRIMARY KEY IDENTITY(1,1),
    CurrencyCode NVARCHAR(3) NOT NULL UNIQUE,
    CurrencyName NVARCHAR(50) NOT NULL
);

GO

CREATE TABLE Jobs (
    JobId INT PRIMARY KEY IDENTITY(1,1),
    CompanyId INT NOT NULL FOREIGN KEY REFERENCES Companies(CompanyId),
    Position NVARCHAR(100) NOT NULL,
    DepartmentId INT  NOT NULL FOREIGN KEY REFERENCES Departments(DepartmentId),
    EmploymentTypeId INT  NOT NULL FOREIGN KEY REFERENCES EmploymentTypes(EmploymentTypeId),
    LocationId INT  NOT NULL FOREIGN KEY REFERENCES Locations(LocationId),
    MinSalary DECIMAL(20, 2) NULL,
    MaxSalary DECIMAL(20, 2) NULL,
    CurrencyId INT NULL FOREIGN KEY REFERENCES Currencies(CurrencyId),
    IsNegotiable BIT NOT NULL DEFAULT 0,
    Description NVARCHAR(1000) NOT NULL,
    SeniorityId INT  NOT NULL FOREIGN KEY REFERENCES Seniority(SeniorityID)
);

GO

CREATE TABLE Languages (
    LanguageId INT PRIMARY KEY IDENTITY(1,1),
    LanguageCode NVARCHAR(10) NOT NULL UNIQUE, -- 'EN', 'BG', etc.
    LanguageName NVARCHAR(50) NOT NULL         -- 'English', 'Български', etc.
);
GO


CREATE TABLE DepartmentTranslations (
    DepartmentTranslationId INT PRIMARY KEY IDENTITY(1,1),
    DepartmentId INT NOT NULL FOREIGN KEY REFERENCES Departments(DepartmentId),
    LanguageId INT NOT NULL FOREIGN KEY REFERENCES Languages(LanguageId),
    TranslatedName NVARCHAR(100) NOT NULL
);

GO

CREATE TABLE SeniorityTranslations (
    SeniorityTranslationId INT PRIMARY KEY IDENTITY(1,1),
    SeniorityId INT NOT NULL FOREIGN KEY REFERENCES Seniority(SeniorityId),
    LanguageId INT NOT NULL FOREIGN KEY REFERENCES Languages(LanguageId),
    TranslatedName NVARCHAR(100) NOT NULL
);

GO

CREATE TABLE LocationTranslations (
    LocationTranslationId INT PRIMARY KEY IDENTITY(1,1),
    LocationId INT NOT NULL FOREIGN KEY REFERENCES Locations(LocationId),
    LanguageId INT NOT NULL FOREIGN KEY REFERENCES Languages(LanguageId),
    TranslatedName NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE CountryTranslations (
    CountryTranslationId INT PRIMARY KEY IDENTITY(1,1),
    CountryId INT NOT NULL FOREIGN KEY REFERENCES Countries(CountryId),
    LanguageCode NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Languages(LanguageCode),
    TranslatedName NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE EmploymentTypeTranslations (
    EmploymentTypeTranslationId INT PRIMARY KEY IDENTITY(1,1),
    EmploymentTypeId INT NOT NULL FOREIGN KEY REFERENCES EmploymentTypes(EmploymentTypeId),
    LanguageId INT NOT NULL FOREIGN KEY REFERENCES Languages(LanguageId),
    TranslatedName NVARCHAR(100) NOT NULL
);

GO

INSERT INTO dbo.[Languages] (LanguageCode, LanguageName)
VALUES
('en', 'English'),
('bg', 'Bulgarian')
GO

INSERT INTO Seniority (Name)
VALUES 
('Intern'),
('Entry-level'),
('Junior'),
('Mid-level'),
('Senior'),
('Lead'),
('Manager'),
('Director'),
('Vice President'),
('CEO'),
('CFO'),
('COO'),
('CTO'),
('CMO'),
('CIO'),
('CHRO'),
('CCO'),
('CDO');

GO

-- INSERT DATA
INSERT INTO Countries (Name) VALUES
('Afghanistan'),
('Albania'),
('Algeria'),
('Andorra'),
('Angola'),
('Antigua and Barbuda'),
('Argentina'),
('Armenia'),
('Australia'),
('Austria'),
('Azerbaijan'),
('Bahamas'),
('Bahrain'),
('Bangladesh'),
('Barbados'),
('Belarus'),
('Belgium'),
('Belize'),
('Benin'),
('Bhutan'),
('Bolivia'),
('Bosnia and Herzegovina'),
('Botswana'),
('Brazil'),
('Brunei'),
('Bulgaria'),
('Burkina Faso'),
('Burundi'),
('Cabo Verde'),
('Cambodia'),
('Cameroon'),
('Canada'),
('Central African Republic'),
('Chad'),
('Chile'),
('China'),
('Colombia'),
('Comoros'),
('Congo, Democratic Republic of the'),
('Congo, Republic of the'),
('Costa Rica'),
('Cote d''Ivoire'),
('Croatia'),
('Cuba'),
('Cyprus'),
('Czechia'),
('Denmark'),
('Djibouti'),
('Dominica'),
('Dominican Republic'),
('Ecuador'),
('Egypt'),
('El Salvador'),
('Equatorial Guinea'),
('Eritrea'),
('Estonia'),
('Eswatini'),
('Ethiopia'),
('Fiji'),
('Finland'),
('France'),
('Gabon'),
('Gambia'),
('Georgia'),
('Germany'),
('Ghana'),
('Greece'),
('Grenada'),
('Guatemala'),
('Guinea'),
('Guinea-Bissau'),
('Guyana'),
('Haiti'),
('Honduras'),
('Hungary'),
('Iceland'),
('India'),
('Indonesia'),
('Iran'),
('Iraq'),
('Ireland'),
('Israel'),
('Italy'),
('Jamaica'),
('Japan'),
('Jordan'),
('Kazakhstan'),
('Kenya'),
('Kiribati'),
('Korea, North'),
('Korea, South'),
('Kosovo'),
('Kuwait'),
('Kyrgyzstan'),
('Laos'),
('Latvia'),
('Lebanon'),
('Lesotho'),
('Liberia'),
('Libya'),
('Liechtenstein'),
('Lithuania'),
('Luxembourg'),
('Madagascar'),
('Malawi'),
('Malaysia'),
('Maldives'),
('Mali'),
('Malta'),
('Marshall Islands'),
('Mauritania'),
('Mauritius'),
('Mexico'),
('Micronesia'),
('Moldova'),
('Monaco'),
('Mongolia'),
('Montenegro'),
('Morocco'),
('Mozambique'),
('Myanmar'),
('Namibia'),
('Nauru'),
('Nepal'),
('Netherlands'),
('New Zealand'),
('Nicaragua'),
('Niger'),
('Nigeria'),
('North Macedonia'),
('Norway'),
('Oman'),
('Pakistan'),
('Palau'),
('Palestine'),
('Panama'),
('Papua New Guinea'),
('Paraguay'),
('Peru'),
('Philippines'),
('Poland'),
('Portugal'),
('Qatar'),
('Romania'),
('Russia'),
('Rwanda'),
('Saint Kitts and Nevis'),
('Saint Lucia'),
('Saint Vincent and the Grenadines'),
('Samoa'),
('San Marino'),
('Sao Tome and Principe'),
('Saudi Arabia'),
('Senegal'),
('Serbia'),
('Seychelles'),
('Sierra Leone'),
('Singapore'),
('Slovakia'),
('Slovenia'),
('Solomon Islands'),
('Somalia'),
('South Africa'),
('South Sudan'),
('Spain'),
('Sri Lanka'),
('Sudan'),
('Suriname'),
('Sweden'),
('Switzerland'),
('Syria'),
('Taiwan'),
('Tajikistan'),
('Tanzania'),
('Thailand'),
('Timor-Leste'),
('Togo'),
('Tonga'),
('Trinidad and Tobago'),
('Tunisia'),
('Turkey'),
('Turkmenistan'),
('Tuvalu'),
('Uganda'),
('Ukraine'),
('United Arab Emirates'),
('United Kingdom'),
('United States of America'),
('Uruguay'),
('Uzbekistan'),
('Vanuatu'),
('Vatican City'),
('Venezuela'),
('Vietnam'),
('Yemen'),
('Zambia'),
('Zimbabwe');

GO

INSERT INTO [dbo].[Companies] 
    ([NAME], [YearFounded], [Employees], [Address], [Website], [Facebook], [LinkedIn], [ShortDescription]) 
VALUES 
    ('Apple Inc.', 1976, 147000, '1 Apple Park Way, Cupertino, CA 95014, USA', 'https://www.apple.com', 'https://www.facebook.com/apple', 'https://www.linkedin.com/company/apple', 'Apple designs, manufactures, and markets a broad range of consumer technology products, including smartphones, personal computers, tablets, wearables, and accessories.'),

    ('Microsoft Corporation', 1975, 181000, '1 Microsoft Way, Redmond, WA 98052, USA', 'https://www.microsoft.com', 'https://www.facebook.com/Microsoft', 'https://www.linkedin.com/company/microsoft', 'Microsoft develops, licenses, and supports a wide range of software products, computing devices, and services.'),

    ('Google (Alphabet Inc.)', 1998, 156500, '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA', 'https://www.google.com', 'https://www.facebook.com/Google', 'https://www.linkedin.com/company/google', 'Google specializes in internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.'),

    ('Amazon.com, Inc.', 1994, 1298000, '410 Terry Ave N, Seattle, WA 98109, USA', 'https://www.amazon.com', 'https://www.facebook.com/Amazon', 'https://www.linkedin.com/company/amazon', 'Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.'),

    ('Facebook, Inc.', 2004, 63373, '1601 Willow Road, Menlo Park, CA 94025, USA', 'https://www.facebook.com', 'https://www.facebook.com/facebook', 'https://www.linkedin.com/company/facebook', 'Facebook is an American online social media and social networking service company.');

GO

INSERT INTO Departments (Name) VALUES
('Manufacturing'),
('Drivers'),
('Telecommunications'),
('IT and Software'),
('Finance'),
('Marketing and Advertising'),
('Trade'),
('Healthcare'),
('Education'),
('Engineering'),
('Construction'),
('Humanities and Arts'),
('Tourism and Hotel Management'),
('Agriculture and Forestry'),
('Sports and Recreation'),
('Research Activities'),
('Legal Services'),
('Human Resources'),
('Real Estate'),
('Administration'),
('Security and Protection'),
('Energy'),
('Media and Communications'),
('Transport and Logistics'),
('Customer Service'),
('Architecture and Design'),
('Environment and Ecology'),
('Marine and River Transport'),
('Aviation'),
('Insurance');

GO

INSERT INTO EmploymentTypes (Name) VALUES
('Full-Time'),
('Part-Time'),
('Remote'),
('Freelance/Contractual'),
('Temporary'),
('Internship'),
('Shift Work'),
('Gig Work'),
('Commission-Based'),
('Consultant');

GO


INSERT INTO [dbo].[Locations] (Name, CountryId)
VALUES 
('Blagoevgrad', 26),
('Burgas', 26),
('Varna', 26),
('Veliko Tarnovo', 26),
('Vidin', 26),
('Vratsa', 26),
('Gabrovo', 26),
('Dobrich', 26),
('Kardzhali', 26),
('Kyustendil', 26),
('Lovech', 26),
('Montana', 26),
('Pazardzhik', 26),
('Pernik', 26),
('Pleven', 26),
('Plovdiv', 26),
('Razgrad', 26),
('Ruse', 26),
('Silistra', 26),
('Sliven', 26),
('Smolyan', 26),
('Sofia', 26),
('Stara Zagora', 26),
('Targovishte', 26),
('Haskovo', 26),
('Shumen', 26),
('Yambol', 26);

GO

-- Insert statements
INSERT INTO Currencies (CurrencyCode, CurrencyName)
VALUES ('EUR', 'Euro');

INSERT INTO Currencies (CurrencyCode, CurrencyName)
VALUES ('USD', 'US Dollar');

INSERT INTO Currencies (CurrencyCode, CurrencyName)
VALUES ('BGN', 'Bulgarian Lev');

GO

SET IDENTITY_INSERT Companies ON;

-- First Job (Fixed Salary of 50000)
INSERT INTO [dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentTypeId, LocationId, MinSalary, MaxSalary, CurrencyId, IsNegotiable, Description, SeniorityId) 
VALUES 
(1, 'Software Developer', 1, 1, 1, 50000, 75000, 1, 0, 'Develop and maintain web applications.', 2);
GO

-- Second Job (Fixed Salary of 45000)
INSERT INTO [dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentTypeId, LocationId, MinSalary, MaxSalary, CurrencyId, IsNegotiable, Description, SeniorityId) 
VALUES 
(2, 'Marketing Specialist', 2, 2, 2, 45000, 45000, 2, 0, 'Handle the marketing campaigns and strategies.', 1);
GO

-- Third Job (Fixed Salary of 55000)
INSERT INTO [dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentTypeId, LocationId, MinSalary, MaxSalary, CurrencyId, IsNegotiable, Description, SeniorityId) 
VALUES 
(3, 'Sales Manager', 3, 3, 3, 55000, 55000, 3, 0, 'Oversee the sales team and drive sales targets.', 3);
GO

-- Fourth Job (Fixed Salary of 48000)
INSERT INTO [dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentTypeId, LocationId, MinSalary, MaxSalary, CurrencyId, IsNegotiable, Description, SeniorityId) 
VALUES 
(4, 'HR Specialist', 4, 4, 4, 48000, 48000, 1, 0, 'Handle recruitment, employee relations, and HR policies.', 1);
GO

-- Fifth Job (Fixed Salary of 45000)
INSERT INTO [dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentTypeId, LocationId, MinSalary, MaxSalary, CurrencyId, IsNegotiable, Description, SeniorityId) 
VALUES 
(5, '.NET Developer', 2, 2, 2, 45000, 45000, 1, 1, 'As our Senior Backend Software Engineer, you''ll be instrumental in shaping the architecture, design, and implementation of our robust backend systems. Your technical expertise will be pivotal in turning complex requirements into scalable, resilient, and efficient .NET applications.', 1);

GO

SET IDENTITY_INSERT Companies OFF;

GO

DECLARE @BGLangId AS INT
SELECT @BGLangId = LanguageId FROM dbo.[Languages] WHERE LanguageCode = 'BG'

INSERT INTO [dbo].[DepartmentTranslations] (DepartmentId, LanguageId, TranslatedName)
VALUES
(1, @BGLangId, N'Производство'),
(2, @BGLangId, N'Шофьори'),
(3, @BGLangId, N'Телекомуникации'),
(4, @BGLangId, N'IT и Софтуер'),
(5, @BGLangId, N'Финанси'),
(6, @BGLangId, N'Маркетинг и Реклама'),
(7, @BGLangId, N'Търговия'),
(8, @BGLangId, N'Здравеопазване'),
(9, @BGLangId, N'Образование'),
(10, @BGLangId, N'Инженерство'),
(11, @BGLangId, N'Строителство'),
(12, @BGLangId, N'Хуманитарни науки и Изкуства'),
(13, @BGLangId, N'Туризъм и Хотелско управление'),
(14, @BGLangId, N'Земеделие и Горско стопанство'),
(15, @BGLangId, N'Спорт и Развлечения'),
(16, @BGLangId, N'Научни изследвания'),
(17, @BGLangId, N'Правни услуги'),
(18, @BGLangId, N'Човешки ресурси'),
(19, @BGLangId, N'Недвижими имоти'),
(20, @BGLangId, N'Администрация'),
(21, @BGLangId, N'Сигурност и Защита'),
(22, @BGLangId, N'Енергетика'),
(23, @BGLangId, N'Медии и Комуникации'),
(24, @BGLangId, N'Транспорт и Логистика'),
(25, @BGLangId, N'Обслужване на клиенти'),
(26, @BGLangId, N'Архитектура и Дизайн'),
(27, @BGLangId, N'Околна среда и Екология'),
(28, @BGLangId, N'Морски и Речен транспорт'),
(29, @BGLangId, N'Авиация'),
(30, @BGLangId, N'Застраховане');

GO

-- First, declare a variable to hold the LanguageId for Bulgarian
DECLARE @BGLanguageId AS INT
SELECT @BGLanguageId = LanguageId FROM dbo.[Languages] WHERE LanguageCode = 'BG'

-- Insert translated employment types into the EmploymentTypeTranslations table
INSERT INTO [dbo].[EmploymentTypeTranslations] (EmploymentTypeId, LanguageId, TranslatedName)
VALUES 
(1, @BGLanguageId, N'Пълен работен ден'), -- Full-Time
(2, @BGLanguageId, N'Непълен работен ден'), -- Part-Time
(3, @BGLanguageId, N'От разстояние'), -- Remote
(4, @BGLanguageId, N'Свободна практика/Договор'), -- Freelance/Contractual
(5, @BGLanguageId, N'Временна'), -- Temporary
(6, @BGLanguageId, N'Стаж'), -- Internship
(7, @BGLanguageId, N'Смяна'), -- Shift Work
(8, @BGLanguageId, N'По поръчка'), -- Gig Work
(9, @BGLanguageId, N'На комисионна основа'), -- Commission-Based
(10, @BGLanguageId, N'Консултант') -- Consultant

GO

-- First, declare a variable to hold the LanguageId for Bulgarian
DECLARE @BGLanguageId AS INT
SELECT @BGLanguageId = LanguageId FROM dbo.[Languages] WHERE LanguageCode = 'BG'

-- Insert translated seniority levels into the SeniorityTranslations table
INSERT INTO [my-app].[dbo].[SeniorityTranslations] (SeniorityId, LanguageId, TranslatedName)
VALUES 
(1, @BGLanguageId, N'Стажант'),  -- Intern
(2, @BGLanguageId, N'На начално ниво'),  -- Entry-level
(3, @BGLanguageId, N'Младши'),  -- Junior
(4, @BGLanguageId, N'Средно ниво'),  -- Mid-level
(5, @BGLanguageId, N'Старши'),  -- Senior
(6, @BGLanguageId, N'Водач'),  -- Lead
(7, @BGLanguageId, N'Мениджър'),  -- Manager
(8, @BGLanguageId, N'Директор'),  -- Director
(9, @BGLanguageId, N'Вицепрезидент'),  -- Vice President
(10, @BGLanguageId, N'Изпълнителен директор'),  -- CEO
(11, @BGLanguageId, N'Финансов директор'),  -- CFO
(12, @BGLanguageId, N'Директор по операции'),  -- COO
(13, @BGLanguageId, N'Технически директор'),  -- CTO
(14, @BGLanguageId, N'Маркетингов директор'),  -- CMO
(15, @BGLanguageId, N'Директор по информационни технологии'),  -- CIO
(16, @BGLanguageId, N'Директор по човешки ресурси'),  -- CHRO
(17, @BGLanguageId, N'Комерсиален директор'),  -- CCO
(18, @BGLanguageId, N'Директор по цифрови технологии')  -- CDO

GO

INSERT INTO [my-app].[dbo].[LocationTranslations] ([LocationId], [LanguageId], [TranslatedName])
VALUES 
(1, 2, N'Благоевград'),
(2, 2, N'Бургас'),
(3, 2, N'Варна'),
(4, 2, N'Велико Търново'),
(5, 2, N'Видин'),
(6, 2, N'Враца'),
(7, 2, N'Габрово'),
(8, 2, N'Добрич'),
(9, 2, N'Кърджали'),
(10, 2, N'Кюстендил'),
(11, 2, N'Ловеч'),
(12, 2, N'Монтана'),
(13, 2, N'Пазарджик'),
(14, 2, N'Перник'),
(15, 2, N'Плевен'),
(16, 2, N'Пловдив'),
(17, 2, N'Разград'),
(18, 2, N'Русе'),
(19, 2, N'Силистра'),
(20, 2, N'Сливен'),
(21, 2, N'Смолян'),
(22, 2, N'София'),
(23, 2, N'Стара Загора'),
(24, 2, N'Търговище'),
(25, 2, N'Хасково'),
(26, 2, N'Шумен'),
(27, 2, N'Ямбол');

GO

-- Create a server-level login
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = 'MyAppLogin')
    CREATE LOGIN MyAppLogin WITH PASSWORD = 'Parola123';
ELSE
    ALTER LOGIN MyAppLogin WITH PASSWORD = 'Parola123';

-- Switch to your specific database
USE [my-app];

-- Create a database user associated with the login
CREATE USER MyAppUser FOR LOGIN MyAppLogin;

-- Grant full access to the database (optional, be careful with this)
EXEC sp_addrolemember 'db_owner', 'MyAppUser';

GO
