export default function Page({ params }: { params: { slug: string } }) {
    return <div>Current User: {params.slug}</div>
  }