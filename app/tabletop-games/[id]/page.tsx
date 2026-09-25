import TabletopProductDetail from '@/components/pages/TabletopProductDetail';
import { STORE_PRODUCTS, getTabletopProduct } from '@/lib/tabletopProducts';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return STORE_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getTabletopProduct(id);

  if (!product) {
    return {
      title: 'Board Game | Beyond the School Wall',
    };
  }

  return {
    title: `${product.title} | Buy Board Games | BTSW`,
    description: `${product.subtitle} Guaranteed delivery in 2–3 weeks across Nigeria & West Africa.`,
  };
}

export default async function TabletopProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TabletopProductDetail id={id} />;
}
