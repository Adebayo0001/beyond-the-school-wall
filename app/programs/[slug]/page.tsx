import ProgramDetail from '@/components/pages/ProgramDetail';

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProgramDetail slug={slug} />;
}
