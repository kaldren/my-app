'use client'
import { useState, useEffect } from 'react';
import H2 from '@/app/components/H2';
import { Company, Job } from '@/types';

export default function Page({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    async function fetchJob() {
      const response = await fetch(`/api/companies/${params.id}`);
      if (response.ok) {
        const data: Company = await response.json();
        setCompany(data);
      } else {
        console.error('Failed to fetch company details.');
      }
    }
    fetchJob();
  }, [params.id]);

  if (!company) return <div>Loading...</div>;

  return (
    <div className='flex'>
      <main className='border border-gray-300 rounded p-2 m-2'>
        <img
          src='https://assets.website-files.com/60c77302fcfa2bdb6e595f76/60c8f5679f25ae8635e4f505_image-8-cover-company-job-board-x-template.jpg'
          alt='company name'
        />

        <H2 text={company.Name} styles='font-bold text-center my-4' />

        <div className='flex justify-center'>
          <div className='flex m-2'>
            <span className='material-icons mr-2'>home</span>
            <p>{company.Website}</p>
          </div>
          <div className='flex m-2'>
            <span className='material-icons mr-2'>domain</span>
            <p>Technology</p>
          </div>
          <div className='flex m-2'>
            <span className='material-icons mr-2'>flag</span>
            <p>Founded in {company.YearFounded}</p>
          </div>
          <div className='flex m-2'>
            <span className='material-icons mr-2'>groups</span>
            <p>{company.Employees} employees</p>
          </div>
        </div>

         
        <p className='text-center my-4'>
          {company.ShortDescription}
        </p>
        
      </main>
    </div>
  );
}