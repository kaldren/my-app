'use client'
import Button from '@/app/components/Button';
import H2 from '@/app/components/H2';
import { Country, Currency, Department, EmploymentType, Location, Salary } from '@/app/types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


export default function Page({ params }: { params: { lang: string } }) {
  const { push } = useRouter();
  const minDescriptionLength = 1;
  const minPositionLength = 1;

  const [submitBtnClicked, setSubmitBtnClicked] = useState(false);

  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState<Department | null>(null);
  const [employmentType, setEmploymentType] = useState<EmploymentType | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [salary, setSalary] = useState<Salary>({
    MinSalary: 0,
    MaxSalary: 0,
    IsNegotiable: true
  });
  const [description, setDescription] = useState('');

  const [departments, setDepartments] = useState<Department[] | null>(null);
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[] | null>(null);
  const [salaryType, setSalaryType] = useState('fixed');
  const [currency, setCurrency] = useState('BGN');
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [locations, setLocations] = useState<Location[] | null>(null);

  async function fetchLocations() {
    try {
      const response = await fetch(`/api/locations`);
      if (response.ok) {
        const data: Location[] = await response.json();
        setLocations(data);
      }
    } catch (error) {
      console.error('Failed to fetch Location details.');
    }
  }

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(`/api/departments`);
        if (response.ok) {
          const data: Department[] = await response.json();
          setDepartments(data);
        }
      } catch (error) {
        console.error('Failed to fetch Department details.');
      }
    }

    async function fetchEmploymentTypes() {
      try {
        const response = await fetch(`/api/employmentTypes`);
        if (response.ok) {
          const data: EmploymentType[] = await response.json();
          setEmploymentTypes(data);
        }
      } catch (error) {
        console.error('Failed to fetch EmploymentType details.');
      }
    }

    async function fetchCurrencies() {
      try {
        const response = await fetch(`/api/currencies`);
        if (response.ok) {
          const data: Currency[] = await response.json();
          setCurrencies(data);
        }
      } catch (error) {
        console.error('Failed to fetch Currency details.');
      }
    }

    async function fetchCountries() {
      try {
        const response = await fetch(`/api/countries`);
        if (response.ok) {
          const data: Country[] = await response.json();
          setCountries(data);
        }
      } catch (error) {
        console.error('Failed to fetch Country details.');
      }
    }



    fetchDepartments();
    fetchEmploymentTypes();
    fetchCurrencies();
    fetchCountries();
    // fetchLocations();
  }, []);

  if (!departments || !employmentTypes || !currencies || !countries) return <div>Loading...</div>;

  async function handleSubmit() {
    setSubmitBtnClicked(true);
    // form validation
    if (!department || !employmentType || !currency || !country || !location || !salary || !position) {
      return;
    }

    try {
        const response = await fetch(`/${params.lang}/api/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CompanyId: 1,
                DepartmentId: department.DepartmentId,
                Position: position,
                EmploymentTypeId: employmentType.EmploymentTypeId,
                LocationId: location.LocationId,
                MinSalary: salary.MinSalary,
                MaxSalary: salary.MaxSalary,
                IsNegotiable: salary.IsNegotiable,
                CurrencyId: 2,
                Description: description,
                SeniorityId: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let jsonResponse = await response.json();

        toast.success('New job has been posted.');
        push(`/jobs/${jsonResponse.jobId}`);

    } catch (error) {
        console.error("There was an error:", error);
    }
}

  return (
    <main>
      <H2 text='Публикувай работна позиция' />
      <div className='mb-5'>
        <p>
          Позиция <span className='text-red-600'>*</span>
        </p>
        <input
          type='text'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className={`rounded-2xl border-2 h-10 px-2 w-full ${submitBtnClicked && position.length < minPositionLength ? 'border-l-red-600 border-l-2 border-red-600' : ''}`}
        />
      </div>

      <div className={`mb-5`}>
        <p>
          Отдел <span className='text-red-600'>*</span>
        </p>
        <select
          name='department'
          id='department'
          className={`border-2 block w-full h-10 px-2 ${submitBtnClicked && department === null ? 'border-l-red-600 border-l-2 border-red-600' : ''}`}
          onChange={(e) => {
            setDepartment(prevState => ({
              ...prevState,
              DepartmentId: +e.target.value,
              DepartmentName: ''
            }))
          }}
        >
          {department === null && <option key="disabled-option-department" value=""></option>}
          {departments.map((dept) => (
            <option key={dept.DepartmentId} value={dept.DepartmentId}>
              {dept.DepartmentName}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-5'>
        <p>
          Вид заетост <span className='text-red-600'>*</span>
        </p>
        <select
          name='employmentType'
          id='employmentType'
          className={`border-2 block w-full h-10 px-2 ${submitBtnClicked && employmentType === null ? 'border-l-red-600 border-l-2 border-red-600' : ''}`}
          onChange={(e) => {
            setEmploymentType(prevState => ({
              ...prevState,
              EmploymentTypeId: +e.target.value,
              EmploymentTypeName: ''
            }))
          }}
        >
          {employmentType === null && <option key="disabled-option-employmentType" value=""></option>}
          {employmentTypes.map((emp) => (
            <option key={emp.EmploymentTypeId} value={emp.EmploymentTypeId}>
              {emp.EmploymentTypeName}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-5'>
        <p>
          Държава <span className='text-red-600'>*</span>
        </p>
        <select
          name='country'
          id='country'
          className={`border-2 block w-full h-10 px-2 ${submitBtnClicked && country === null ? 'border-l-red-600 border-l-2 border-red-600' : ''}`}
          onChange={(e) => {
            setCountry(prevState => ({
              ...prevState,
              CountryId: +e.target.value,
              CountryName: ''
            }));

            if (locations === null || locations.find(l => l.CountryId !== country?.CountryId)) {
              fetchLocations();
            }
          }}
        >
          {country === null && <option key="disabled-option-country" value=""></option>}
          {countries.map((loc) => (
            <option key={loc.CountryId} value={loc.CountryId}>
              {loc.CountryName}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-5'>
        <p>
          Локация <span className='text-red-600'>*</span>
        </p>
        <select
          name='location'
          id='location'
          disabled={country === null && locations === null}
          className={`border-2 block w-full h-10 px-2 ${submitBtnClicked && location === null ? 'border-l-red-600 border-l-2 border-red-600' : ''}`}
          onChange={(e) => {
            const [locationId, countryId] = e.target.value.split(',').map(Number);
            setLocation(prevState => ({
              ...prevState,
              LocationId: locationId,
              CountryId: countryId,
              LocationName: '', // assuming you don't want to set this here
            }));
          }}
        >
          {location === null && <option key="disabled-option-location" value=""></option>}
          {locations?.map((loc) => (
            <option key={loc.LocationId} value={`${loc.LocationId},${loc.CountryId}`}>
              {loc.LocationName}
            </option>
          ))}
        </select>
      </div>
      
      <div className='mb-5'>
        <p>
          Тип на заплатата <span className='text-red-600'>*</span>
        </p>
        <div className='flex my-4'>
          <label className='flex justify-between mr-2'>
            <input
              type='radio'
              value='fixed'
              checked={salaryType === 'fixed'}
              onChange={() => setSalaryType('fixed')}
            />
            <span className='ml-2'>Фиксирана</span>
          </label>
          <label className='mr-2'>
            <input
              type='radio'
              value='range'
              checked={salaryType === 'range'}
              onChange={() => setSalaryType('range')}
            />
            <span className='ml-2'>Диапазон</span>
          </label>
          <label className='mr-2'>
            <input
              type='radio'
              value='negotiable'
              checked={salaryType === 'negotiable'}
              onChange={() => setSalaryType('negotiable')}
            />
            <span className='ml-2'>По договаряне</span>
          </label>
        </div>
        {salaryType === 'fixed' && (
          <div>
            <p>Фиксирана заплата</p>
            <input
              type='number'
              value={salary.MaxSalary}
              className='rounded-2xl border-2 h-10 px-2 w-full'
              onChange={(e) => {
                setSalary(prevState => ({
                  ...prevState,
                  MinSalary: +e.target.value,
                  MaxSalary: +e.target.value,
                  IsNegotiable: false
                }));
              }}
            />
          </div>
        )}
        {salaryType === 'range' && (
          <div>
            <p>Минимална заплата</p>
            <input
              type='number'
              className='rounded-2xl border-2 h-10 px-2 w-full'
              value={salary.MinSalary}
              onChange={(e) => {
                setSalary(prevState => ({
                  ...prevState,
                  MinSalary: +e.target.value,
                  IsNegotiable: false
                }));
              }}
            />
            <p>Максимална заплата</p>
            <input
              type='number'
              className='rounded-2xl border-2 h-10 px-2 w-full'
              value={salary.MaxSalary}
              onChange={(e) => {
                setSalary(prevState => ({
                  ...prevState,
                  MaxSalary: +e.target.value,
                  IsNegotiable: false
                }))
              }}
            />
          </div>
        )}
        {salaryType === 'negotiable' && <div>Заплатата е по договаряне.</div>}

        {(salaryType === 'range' ||
          salaryType === 'fixed') && (
            <select
              name='currencies'
              id='currencies'
              className='border-2 block w-full h-10 px-2 my-2'
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((c) => (
                <option key={c.CurrencyId} value={c.CurrencyId}>
                  {c.CurrencyCode}
                </option>
              ))}
            </select>
          )}
      </div>

      <div className='mb-5'>
        <p>
          Описание на позицията <span className='text-red-600'>*</span>
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`rounded-2xl border-2 h-20 px-2 w-full overflow-y-auto ${submitBtnClicked && description.length < 50 ? 'border-l-red-600 border-l-2 border-red-600' : ''}`}
        ></textarea>

        <span>Оставащи задължителни символи: {description.length < minDescriptionLength ? minDescriptionLength - description.length : 0}</span>
      </div>

      <div>
        <Button text='Публикувай' onClick={handleSubmit} />
      </div>
    </main>
  );
}