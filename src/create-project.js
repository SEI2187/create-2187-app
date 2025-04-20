import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createProject({ projectName, language, features }) {
  console.log(chalk.blue('Creating your project...'));

  const projectDir = path.resolve(process.cwd(), projectName);

  // Create Next.js project with selected language
  const createCommand = `npx create-next-app@latest ${projectName} ${
    language === 'typescript' ? '--typescript' : '--js'
  } ${features.includes('tailwind') ? '--tailwind' : ''} ${
    features.includes('eslint') ? '--eslint' : ''
  } --app --src-dir --import-alias "@/*"`;
  
  execSync(createCommand, { stdio: 'inherit' });

  // Change to project directory
  process.chdir(projectDir);

  // Install additional dependencies based on selected features
  const dependencies = [];
  const devDependencies = [];

  if (features.includes('prettier')) {
    devDependencies.push('prettier', 'prettier-plugin-tailwindcss');
  }

  if (features.includes('shadcn')) {
    execSync('npx shadcn-ui@latest init', { stdio: 'inherit' });
  }

  if (features.includes('react-query')) {
    dependencies.push('@tanstack/react-query');
  }

  if (features.includes('zustand')) {
    dependencies.push('zustand');
  }

  if (features.includes('react-hook-form')) {
    dependencies.push('react-hook-form');
  }

  if (features.includes('prisma')) {
    devDependencies.push('prisma');
    dependencies.push('@prisma/client');
    execSync('npx prisma init', { stdio: 'inherit' });
  }

  // Install dependencies
  if (dependencies.length > 0) {
    execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
  }

  if (devDependencies.length > 0) {
    execSync(`npm install -D ${devDependencies.join(' ')}`, { stdio: 'inherit' });
  }

  console.log(chalk.green('\n✔ Project created successfully!'));
  console.log(chalk.yellow('\nNext steps:'));
  console.log(`  cd ${projectName}`);
  console.log('  npm run dev');

  if (features.includes('prisma')) {
    console.log(chalk.cyan('\nPrisma setup:'));
    console.log('  1. Update your database URL in .env');
    console.log('  2. Run npx prisma db push');
  }

  // After project creation, copy our custom template
  const templatePath = path.join(__dirname, '../templates/page.tsx');
  const targetPath = path.join(projectDir, 'src/app/page.tsx');
  
  // Only copy if typescript is selected, otherwise convert to .js
  if (language === 'typescript') {
    await fs.copy(templatePath, targetPath);
  } else {
    const content = await fs.readFile(templatePath, 'utf8');
    const jsContent = content
      .replace(/\.tsx/g, '.js')
      .replace(/: React\.FC/g, '')
      .replace(/: string/g, '')
      .replace(/: number/g, '')
      .replace(/: boolean/g, '')
      .replace(/: any/g, '');
    await fs.writeFile(targetPath.replace('.tsx', '.js'), jsContent);
  }
}