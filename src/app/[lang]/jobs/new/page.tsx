'use client'
import Button from '@/app/components/Button';
import H2 from '@/app/components/H2';
import { useState } from 'react';

export default function Page() {

  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [employment, setEmployment] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
        const response = await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                position: position,
                department: department,
                employment: employment,
                location: location,
                salary: salary,
                description: description
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Handle the response as you see fit
        console.log(data);

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
        <input type='text' value={position} onChange={(e) => setPosition(e.target.value)} className='rounded-2xl border-2 h-10 px-2 w-full' />
      </div>

      <div className='mb-5'>
        <p>
          Отдел <span>*</span>
        </p>
        <select
          name='department'
          id='department'
          className='border-2 block w-full h-10 px-2'
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value=''></option>
          <option value='tech'>Технологии</option>
          <option value='marketing'>Маркетинг</option>
          <option value='transport'>Транспорт</option>
          <option value='sales'>Продажби</option>
        </select>
      </div>

      <div className='mb-5'>
        <p>
          Вид заетост <span>*</span>
        </p>
        <select
          name='employment'
          id='employment'
          className='border-2 block w-full h-10 px-2'
          value={employment}
          onChange={(e) => setEmployment(e.target.value)}
        >
          <option value=''></option>
          <option value='fulltime'>Пълно работно време</option>
          <option value='parttime'>Частична заетост</option>
          <option value='remote'>От разстояние</option>
          <option value='freelance'>Freelance</option>
          <option value='temporary'>Временна работа</option>
          <option value='internship'>Стажант</option>
          <option value='commission'>Комисионна</option>
          <option value='consultant'>Консултант</option>
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
          Заплата, лв (нето) <span>*</span>
        </p>
        <input type='text' value={salary} onChange={(e) => setSalary(e.target.value)} className='rounded-2xl border-2 h-10 px-2 w-full' />
        <span>Може да използвате и диапазон, например 1500-2000лв.</span>
      </div>
      <div className='mb-5'>
        <p>
          Описание <span>*</span>
        </p>
        <textarea 
          value={description} onChange={(e) => setDescription(e.target.value)} 
          className='rounded-2xl border-2 h-20 px-2 w-full overflow-y-auto'
      ></textarea>

        <span>Опишете позицията възможно най-точно</span>
      </div>

      <div>
      <Button text="Публикувай" onClick={handleSubmit} />
      </div>
    </main>
  );
}