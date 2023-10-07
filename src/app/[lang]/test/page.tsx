export default async function Page({ params }: { params: { lang: string } }) {
    return (
        <p>Hi {params.lang}</p>
    )
  }