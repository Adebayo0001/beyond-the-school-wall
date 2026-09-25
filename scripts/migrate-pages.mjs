import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('components/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

console.log(`Found ${files.length} pages to adapt.`);

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Ensure 'use client'; at top
  if (!content.trim().startsWith("'use client'") && !content.trim().startsWith('"use client"')) {
    content = `'use client';\n\n` + content;
  }

  // 2. Replace react-router-dom imports
  content = content.replace(/import\s*\{([^}]+)\}\s*from\s*['"]react-router-dom['"];?/g, (match, imports) => {
    const items = imports.split(',').map(s => s.trim());
    const nextImports = [];
    let hasLink = false;
    let nextNavImports = [];

    for (const item of items) {
      if (item === 'Link') {
        hasLink = true;
      } else if (item === 'useNavigate') {
        nextNavImports.push('useRouter');
      } else if (item === 'useLocation') {
        nextNavImports.push('usePathname');
      } else if (item === 'useParams') {
        nextNavImports.push('useParams');
      } else if (item === 'useSearchParams') {
        nextNavImports.push('useSearchParams');
      }
    }

    let result = '';
    if (hasLink) {
      result += `import Link from 'next/link';\n`;
    }
    if (nextNavImports.length > 0) {
      result += `import { ${Array.from(new Set(nextNavImports)).join(', ')} } from 'next/navigation';\n`;
    }
    return result.trimEnd();
  });

  // 3. Replace const navigate = useNavigate(); with const router = useRouter();
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);?/g, 'const router = useRouter();');
  // Replace navigate( with router.push(
  content = content.replace(/\bnavigate\(/g, 'router.push(');

  // 4. Replace location = useLocation()
  content = content.replace(/const\s+location\s*=\s*useLocation\(\);?/g, 'const pathname = usePathname();');
  content = content.replace(/\blocation\.pathname\b/g, 'pathname');

  // 5. Replace <Link to= with <Link href=
  content = content.replace(/<Link\s+to=/g, '<Link href=');
  // Also handle multiline <Link ... to=
  content = content.replace(/(<Link[^>]*?)\bto=([{"'])/g, '$1href=$2');

  // 6. Update relative imports
  content = content.replace(/from\s+['"]\.\.\/types['"]/g, `from '@/types'`);
  content = content.replace(/from\s+['"]\.\.\/lib\//g, `from '@/lib/`);
  content = content.replace(/from\s+['"]\.\.\/components\//g, `from '@/components/`);
  content = content.replace(/from\s+['"]\.\/components\//g, `from '@/components/`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${file}`);
}

console.log('Finished updating pages.');
