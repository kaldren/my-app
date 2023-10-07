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
    EmploymentId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE Countries (
    CountryId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);

CREATE TABLE Locations (
    LocationId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    CountryId INT FOREIGN KEY REFERENCES Countries(CountryId)
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

CREATE TABLE Jobs (
    JobId INT PRIMARY KEY IDENTITY(1,1),
    CompanyId INT FOREIGN KEY REFERENCES Companies(CompanyId),
    Position NVARCHAR(100) NOT NULL,
    DepartmentId INT FOREIGN KEY REFERENCES Departments(DepartmentId),
    EmploymentId INT FOREIGN KEY REFERENCES EmploymentTypes(EmploymentId),
    LocationId INT FOREIGN KEY REFERENCES Locations(LocationId),
    Salary NVARCHAR(20),
    Description NVARCHAR(1000),
    SeniorityId INT FOREIGN KEY REFERENCES Seniority(SeniorityID)
);


CREATE TABLE Languages (
    LanguageId INT PRIMARY KEY IDENTITY(1,1),
    LanguageCode NVARCHAR(10) NOT NULL UNIQUE, -- 'EN', 'BG', etc.
    LanguageName NVARCHAR(50) NOT NULL         -- 'English', 'Български', etc.
);
GO


CREATE TABLE DepartmentTranslations (
    DepartmentTranslationId INT PRIMARY KEY IDENTITY(1,1),
    DepartmentId INT NOT NULL FOREIGN KEY REFERENCES Departments(DepartmentId),
    LanguageCode NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Languages(LanguageCode),
    TranslatedName NVARCHAR(100) NOT NULL
);



CREATE TABLE LocationTranslations (
    LocationTranslationId INT PRIMARY KEY IDENTITY(1,1),
    LocationId INT NOT NULL FOREIGN KEY REFERENCES Locations(LocationId),
    LanguageCode NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Languages(LanguageCode),
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
    EmploymentId INT NOT NULL FOREIGN KEY REFERENCES EmploymentTypes(EmploymentId),
    LanguageCode NVARCHAR(10) NOT NULL FOREIGN KEY REFERENCES Languages(LanguageCode),
    TranslatedName NVARCHAR(100) NOT NULL
);

GO

CREATE TABLE Seniority (
    SeniorityID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100)
);

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

INSERT INTO Locations (Name, CountryId) VALUES
('Sofia', 26),
('Plovdiv', 26),
('Varna', 26),
('Bourgas', 26)

GO

SET IDENTITY_INSERT Companies ON;

INSERT INTO [my-app].[dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentId, LocationId, Salary, Description, SeniorityId) 
VALUES 
(1, 'Software Developer', 1, 1, 1, '50000', 'Develop and maintain web applications.', 2);

GO

INSERT INTO [my-app].[dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentId, LocationId, Salary, Description, SeniorityId) 
VALUES 
(2, 'Marketing Specialist', 2, 2, 2, '45000', 'Handle the marketing campaigns and strategies.', 1);

GO

INSERT INTO [my-app].[dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentId, LocationId, Salary, Description, SeniorityId) 
VALUES 
(3, 'Sales Manager', 3, 3, 3, '55000', 'Oversee the sales team and drive sales targets.', 3);

GO

INSERT INTO [my-app].[dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentId, LocationId, Salary, Description, SeniorityId) 
VALUES 
(4, 'HR Specialist', 4, 4, 4, '48000', 'Handle recruitment, employee relations, and HR policies.', 1);

GO

INSERT INTO [my-app].[dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentId, LocationId, Salary, Description, SeniorityId) 
VALUES 
(5, '.NET Developer', 2, 2, 2, '45000', 'As our Senior Backend Software Engineer, you''ll be instrumental in shaping the architecture, design, and implementation of our robust backend systems. Your technical expertise will be pivotal in turning complex requirements into scalable, resilient, and efficient .NET applications.', 1);

GO

INSERT INTO [my-app].[dbo].[Jobs] 
(CompanyId, Position, DepartmentId, EmploymentId, LocationId, Salary, Description, SeniorityId) 
VALUES 
(6, '.NET Developer', 1, 1, 1, '65000', 'As our Senior Backend Software Engineer, you''ll be instrumental in shaping the architecture, design, and implementation of our robust backend systems. Your technical expertise will be pivotal in turning complex requirements into scalable, resilient, and efficient .NET applications.', 1);

GO

SET IDENTITY_INSERT Companies OFF;