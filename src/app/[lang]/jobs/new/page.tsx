'use client'
import Button from '@/app/components/Button';
import H2 from '@/app/components/H2';
import { Currency, Department, EmploymentType } from '@/app/types';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { lang: string } }) {

  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  const [departments, setDepartments] = useState<Department[] | null>(null);
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[] | null>(null);
  const [salaryType, setSalaryType] = useState('fixed');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [currency, setCurrency] = useState('BGN');
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(`/api/departments`);
        if (response.ok) {
          const data: Department[] = await response.json();
          setDepartments(data);
        }
      } catch (error) {
        console.error('Failed to fetch department details.');
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
        console.error('Failed to fetch employmentType details.');
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
        console.error('Failed to fetch employmentType details.');
      }
    }

    fetchDepartments();
    fetchEmploymentTypes();
    fetchCurrencies();
  }, []);

  if (!departments || !employmentTypes || !currencies) return <div>Loading...</div>;

  async function handleSubmit() {
    try {
        const response = await fetch(`/${params.lang}/api/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CompanyId: 1,
                DepartmentId: 1,
                Position: "C# dev",
                EmploymentTypeId: 1,
                LocationId: 1,
                MinSalary: 4000,
                MaxSalary: 6000,
                IsNegotiable: false,
                CurrencyId: 2,
                Description: "Microsoft Azure expert",
                SeniorityId: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Handle the response as you see fit
    } catch (error) {
        console.error("There was an error:", error);
    }
}

  return (
    <main>
      <H2 text='Публикувай работна позиция' />
      <div className='mb-5'>
        <p>
          Позиция <span>*</span>
        </p>
        <input
          type='text'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className='rounded-2xl border-2 h-10 px-2 w-full'
        />
      </div>

      <div className='mb-5'>
        <p>
          Отдел <span>*</span>
        </p>
        <select
          name='department'
          id='department'
          className='border-2 block w-full h-10 px-2'
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value=''></option>
          {departments.map((dept) => (
            <option key={dept.DepartmentId} value={dept.DepartmentId}>
              {dept.DepartmentName}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-5'>
        <p>
          Вид заетост <span>*</span>
        </p>
        <select
          name='employmentType'
          id='employmentType'
          className='border-2 block w-full h-10 px-2'
          onChange={(e) => setEmploymentType(e.target.value)}
        >
          <option value=''></option>
          {employmentTypes.map((emp) => (
            <option key={emp.EmploymentTypeId} value={emp.EmploymentTypeId}>
              {emp.EmploymentTypeName}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-5'>
        <p>
          Локация <span>*</span>
        </p>
        <select
          name='location'
          id='location'
          className='border-2 block w-full h-10 px-2'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value=''></option>
          <option value='sofia'>София</option>
          <option value='plovdiv'>Пловдив</option>
          <option value='varna'>Варна</option>
          <option value='bourgas'>Бургас</option>
        </select>
      </div>
      <div className='mb-5'>
        <p>
          Тип на заплатата <span>*</span>
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
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className='rounded-2xl border-2 h-10 px-2 w-full'
            />
          </div>
        )}
        {salaryType === 'range' && (
          <div>
            <p>Минимална заплата</p>
            <input
              type='number'
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className='rounded-2xl border-2 h-10 px-2 w-full'
            />
            <p>Максимална заплата</p>
            <input
              type='number'
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              className='rounded-2xl border-2 h-10 px-2 w-full'
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
          Описание <span>*</span>
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='rounded-2xl border-2 h-20 px-2 w-full overflow-y-auto'
        ></textarea>

        <span>Опишете позицията възможно най-точно</span>
      </div>

      <div>
        <Button text='Публикувай' onClick={handleSubmit} />
      </div>
    </main>
  );
}