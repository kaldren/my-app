import Profile from '@/app/components/profiles/Profile';

export default function Page({ params }: { params: { id: string } }) {
  return <div><Profile id={params.id} /></div>
}