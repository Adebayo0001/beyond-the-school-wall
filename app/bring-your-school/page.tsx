import BringYourSchool from '@/components/pages/BringYourSchool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bring Your School | Beyond the School Wall',
  description: 'Integrate 21st-century AI literacy, design, and leadership into your school or college curriculum. Register your institution or book a consultation call with our team.',
};

export default function BringYourSchoolPage() {
  return <BringYourSchool />;
}
