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
	NAME NVARCHAR(50) NOT NULL,
    YearFounded INT NOT NULL,
	Employees INT NOT NULL,
	Address NVARCHAR(50) NOT NULL,
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
    Salary NVARCHAR(100),
    Description NVARCHAR(MAX)
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
