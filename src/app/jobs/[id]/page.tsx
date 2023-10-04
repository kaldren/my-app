export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className='flex'>
      <main className='w-2/3 border border-gray-300 rounded p-2 m-2'>
        <img
          src='https://assets.website-files.com/60c77302fcfa2bdb6e595f76/60c8f5679f25ae8635e4f505_image-8-cover-company-job-board-x-template.jpg'
          alt='company name'
        />
        <h2 className='text-2xl font-bold text-center my-10'>
          Backend Software Engineer
        </h2>

        <div className='flex flex-wrap justify-between my-10 mx-10'>
          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>location_on</span>
              <p className='text-gray-700'>Location</p>
            </div>

            <p className='font-bold'>Remote</p>
          </div>

          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>show_chart</span>
              <p className='text-gray-700'>Level</p>
            </div>

            <p className='font-bold'>Senior</p>
          </div>

          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>work</span>
              <p className='text-gray-700'>Department</p>
            </div>

            <p className='font-bold'>Development</p>
          </div>

          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>schedule</span>
              <p className='text-gray-700'>Type</p>
            </div>

            <p className='font-bold'>Full-time</p>
          </div>

          <div className='flex flex-col text-center'>
            <div className='flex mb-2'>
              <span className='material-icons'>payments</span>
              <p className='text-gray-700'>Salary</p>
            </div>

            <p className='font-bold'>$100,000</p>
          </div>
        </div>

        <div className='p-10'>
          <p>
            TECHNICAL PROJECT LEADER FOR AUTOMOTIVE Company Description Welcome to
            a place where your ideas lead to something big. Welcome to Bosch.
            Bosch is a leading global supplier of technology and services for the
            automotive industry. Bosch Engineering Center Sofia was founded in
            2019 as an integral part of Bosch worldwide engineering network. Today
            our team of over 600 talented software and hardware professionals work
            on the latest automotive technologies which shape the future of
            mobility. Some of our focus areas include Automated Driving Systems,
            Artificial Intelligence for accident prevention, Driver Assistance,
            Autonomous Parking, Electric Mobility and eBike Systems. Our mission
            is to contribute to safer mobility through software technologies with
            care for the environment and society. Join our team and help us
            transform the automotive industry! We are looking for the right person
            for the following vacancy: Technical Project Leader
          </p>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto my-4">
          APPLY
        </button>

      </main>
      <aside className='w-1/3 border border-gray-300 rounded m-2 p-10'>
      <img
          src='/meta.webp'
          alt='Meta'
          className='max-w-xs block m-auto'
        />
        <h2 className='text-center font-bold text-2xl mb-4'>Meta</h2>
        <p>
        <span className='font-bold'>Meta</span>, formerly known as Facebook, is a technology company that focuses on building a comprehensive metaverse, connecting people through a variety of platforms and augmented/virtual reality experiences.
        </p>
        <div className='flex flex-col mt-4'>
        <div className='flex mb-2'>
            <span className='material-icons mr-2'>home</span>
              <p>
                https://meta.com
              </p>
          </div>
          <div className='flex mb-2'>
            <span className='material-icons mr-2'>domain</span>
              <p>
                Technology
              </p>
          </div>
          <div className='flex mb-2'>
            <span className='material-icons mr-2'>flag</span>
              <p>
                Founded in 2004
              </p>
          </div>
          <div className='flex mb-2'>
            <span className='material-icons mr-2'>groups</span>
              <p>
                76,000 employees
              </p>
          </div>
        </div>
      </aside>
    </div>
  );
}