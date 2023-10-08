'use client';
import { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import H2 from '@/app/components/H2';
import { Job } from '@/app/types';
import Link from 'next/link';
import { getLocalization } from '../../localizations';

export default function Page({ params }: { params: { id: string, lang: string } }) {
  const [local, setLocal] = useState<any>(null);  // <-- set default state for local
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    async function fetchLocalization() {
      const fetchedLocal = await getLocalization(params.lang);
      setLocal(fetchedLocal);
    }
    fetchLocalization();
  }, [params.lang]);

  useEffect(() => {
    async function fetchJob() {
      const response = await fetch(`/api/jobs/${params.id}`);
      if (response.ok) {
        const data: Job = await response.json();
        setJob(data);
      } else {
        console.error('Failed to fetch job details.');
      }
    }
    fetchJob();
  }, [params.id]);

  if (!job || !local) return <div>Loading...</div>; 

  let salaryDisplay;
  if (job.IsNegotiable) {
      salaryDisplay = "Negotiable";
  } else if (job.MinSalary && job.MaxSalary && job.MinSalary !== job.MaxSalary) {
      salaryDisplay = `${job.MinSalary}-${job.MaxSalary} ${job.Currency}`;
  } else if (job.MinSalary) {
      salaryDisplay = `${job.MinSalary} ${job.Currency}`;
  }

  return (
    <div className='flex'>
      <main className='w-2/3 border border-gray-300 rounded p-2 m-2'>
        <img
          src='https://assets.website-files.com/60c77302fcfa2bdb6e595f76/60c8f5679f25ae8635e4f505_image-8-cover-company-job-board-x-template.jpg'
          alt='company name'
        />

        <H2 text={job.Position} />

        <div className='flex flex-wrap justify-between my-10 mx-10'>
          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>location_on</span>
              <p className='text-gray-700'>{local.job.location}</p>
            </div>

            <p className='font-bold'>{job.Location}</p>
          </div>

          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>show_chart</span>
              <p className='text-gray-700'>{local.job.level}</p>
            </div>

            <p className='font-bold'>{job.Seniority}</p>
          </div>

          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>work</span>
              <p className='text-gray-700'>{local.job.department}</p>
            </div>

            <p className='font-bold'>{job.Department}</p>
          </div>

          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>schedule</span>
              <p className='text-gray-700'>{local.job.employmentType}</p>
            </div>

            <p className='font-bold'>{job.EmploymentType}</p>
          </div>

          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>payments</span>
              <p className='text-gray-700'>{local.job.salary}</p>
            </div>

            <p className='font-bold'>{salaryDisplay}</p>
          </div>
        </div>

        <div className='p-10'>
          <p>{job.Description}</p>
        </div>

        <Button text='Кандидатствай' />
      </main>
      <aside className='w-1/3 border border-gray-300 rounded m-2 p-10'>
        <img src='./meta.webp' alt='Meta' className='max-w-xs block m-auto' />

        <h2 className='text-center font-bold text-2xl mb-4'>
          <Link href={`/companies/${job.CompanyId}`}>
            {job.CompanyName}
          </Link>
        </h2>

        <p>{job.CompanyShortDescription}</p>
        <div className='flex flex-col mt-4'>
          <div className='flex mb-2'>
            <span className='material-icons mr-2'>home</span>
            <p>{job.CompanyWebsite}</p>
          </div>
          <div className='flex mb-2'>
            <span className='material-icons mr-2'>domain</span>
            <p>Technology</p>
          </div>
          <div className='flex mb-2'>
            <span className='material-icons mr-2'>flag</span>
            <p>Founded in {job.CompanyYearFounded}</p>
          </div>
          <div className='flex mb-2'>
            <span className='material-icons mr-2'>groups</span>
            <p>{job.CompanyEmployees} employees</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
