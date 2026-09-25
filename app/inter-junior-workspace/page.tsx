import InterJuniorWorkspace from '@/components/pages/InterJuniorWorkspace';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inter Junior Workspace | Beyond the School Wall',
  description: 'Four specialized starter courses in AI, Design, Creative Writing, and Public Speaking for secondary and middle school minds. Enforce parent consent and start learning.',
};

export default function InterJuniorWorkspacePage() {
  return <InterJuniorWorkspace />;
}
