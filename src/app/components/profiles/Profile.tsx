import profileData from './profile-mock.json';

export default function Profile({id}: {id:string}) {
  return (
    <h1 className="text-3xl font-bold underline text-sky-300">{profileData.name}</h1>
  )
}
