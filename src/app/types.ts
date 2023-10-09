export interface Company {
    Name: string;
    YearFounded: number;
    Employees: number;
    Address: string;
    Website: string;
    Facebook: string;
    LinkedIn: string;
    ShortDescription: string;
  }
  

export interface Job {
    Position: string;
    Department: string;
    EmploymentType: string;
    Location: string;
    MinSalary: number;
    MaxSalary: number;
    Currency?: string;
    IsNegotiable: boolean;
    Description: string;
    Seniority: string;
    CompanyId: number;
    CompanyName: string;
    CompanyYearFounded: number;
    CompanyEmployees: number;
    CompanyAddress: string;
    CompanyWebsite: string;
    CompanyFacebook: string;
    CompanyLinkedIn: string;
    CompanyShortDescription: string;
  }
  
  export interface Department {
    DepartmentId: number;
    DepartmentName: string;
  }

  export interface EmploymentType {
    EmploymentTypeId: number;
    EmploymentTypeName: string;
  }

  export interface Currency {
    CurrencyId: number;
    CurrencyCode: string;
    CurrencyName: string;
  }