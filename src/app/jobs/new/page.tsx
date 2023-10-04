import Button from '@/app/components/Button';
import H2 from '@/app/components/H2';

export default function Page() {
  return (
    <main>
      <H2 text='Публикувай работна позиция' />
      <div className='mb-5'>
        <p>
          Позиция <span>*</span>
        </p>
        <input type='text' className='rounded-2xl border-2 h-10 px-2 w-full' />
      </div>

      <div className='mb-5'>
        <p>
          Отдел <span>*</span>
        </p>
        <select
          name='cars'
          id='cars'
          className='border-2 block w-full h-10 px-2'
        >
          <option value='volvo'>Volvo</option>
          <option value='saab'>Saab</option>
          <option value='opel'>Opel</option>
          <option value='audi'>Audi</option>
        </select>
      </div>

      <div className='mb-5'>
        <p>
          Вид заетост <span>*</span>
        </p>
        <select
          name='cars'
          id='cars'
          className='border-2 block w-full h-10 px-2'
        >
          <option value='volvo'>Volvo</option>
          <option value='saab'>Saab</option>
          <option value='opel'>Opel</option>
          <option value='audi'>Audi</option>
        </select>
      </div>

      <div className='mb-5'>
        <p>
          Локация <span>*</span>
        </p>
        <select
          name='cars'
          id='cars'
          className='border-2 block w-full h-10 px-2'
        >
          <option value='volvo'>Volvo</option>
          <option value='saab'>Saab</option>
          <option value='opel'>Opel</option>
          <option value='audi'>Audi</option>
        </select>
      </div>
      <div className='mb-5'>
        <p>
          Заплата, лв (нето) <span>*</span>
        </p>
        <input type='text' className='rounded-2xl border-2 h-10 px-2 w-full' />
        <span>Може да използвате и диапазон, например 1500-2000лв.</span>
      </div>
      <div className='mb-5'>
        <p>
          Описание <span>*</span>
        </p>
        <textarea 
          className='rounded-2xl border-2 h-20 px-2 w-full overflow-y-auto'
      ></textarea>

        <span>Опишете позицията възможно най-точно</span>
      </div>

      <div>
        <Button text="Публикувай" />
      </div>
    </main>
  );
}