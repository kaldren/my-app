export default function Page({ params }: { params: { id: string } }) {
  return (
  <div className='flex'>
    <main className='w-2/3 border border-gray-300 rounded p-2 m-2'>
      <img src='https://assets.website-files.com/60c77302fcfa2bdb6e595f76/60c8f5679f25ae8635e4f505_image-8-cover-company-job-board-x-template.jpg' alt='company name' />
      <h2 className='text-2xl font-bold text-center my-4'>Backend Software Engineer</h2>

      <div className="flex flex-col">
        <div className="flex mb-4">
            <img src="path-to-your-image.jpg" alt="Description" className="w-1/2" />
            <p className="mr-4">Your text here</p>
        </div>

        <p>Your bottom text here</p>
      </div>

      <p>
        TECHNICAL PROJECT LEADER FOR AUTOMOTIVE
        Company Description

        Welcome to a place where your ideas lead to something big. Welcome to Bosch.

        Bosch is a leading global supplier of technology and services for the automotive industry.

        Bosch Engineering Center Sofia was founded in 2019 as an integral part of Bosch worldwide engineering network.

        Today our team of over 600 talented software and hardware professionals work on the latest automotive technologies which shape the future of mobility. Some of our focus areas include Automated Driving Systems, Artificial Intelligence for accident prevention, Driver Assistance, Autonomous Parking, Electric Mobility and eBike Systems.

        Our mission is to contribute to safer mobility through software technologies with care for the environment and society. Join our team and help us transform the automotive industry!

        We are looking for the right person for the following vacancy:

        Technical Project Leader
      </p>
    </main>
    <aside className='w-1/3 border border-gray-300 rounded p-2 m-2'>
      <h2>
        TECHNICAL PROJECT LEADER FOR AUTOMOTIVE, Роберт Бош ЕООД
      </h2>
    </aside>
  </div>
  )
}