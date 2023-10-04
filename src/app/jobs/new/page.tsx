export default function Page() {
  return (
      <main className='border border-gray-300 rounded p-2 m-2'>

        <div>
          <p>Job title<span>*</span></p>
          <input type='text' className='rounded-2xl border-2 h-10 px-2 w-full' />
        </div>

        <div>
          <p>Job title<span>*</span></p>
          <select name="cars" id="cars" className='border-2 block w-full h-10 px-2'>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
        </select>
        </div>
      </main>
  );
}