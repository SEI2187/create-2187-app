import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createProject({ projectName, framework, language, features }) {
  console.log(chalk.blue(`Creating your ${framework} project...`));

  const projectDir = path.resolve(process.cwd(), projectName);

  // Framework-specific creation commands
  const commands = {
    nextjs: `npx create-next-app@latest ${projectName} ${
      language === 'typescript' ? '--typescript' : '--js'
    } ${features.includes('tailwind') ? '--tailwind' : ''} ${
      features.includes('eslint') ? '--eslint' : ''
    } --app --src-dir --import-alias "@/*"`,
    
    react: `npx create-react-app ${projectName} ${
      language === 'typescript' ? '--template typescript' : ''
    }`,
    
    vue: `npx create-vue@latest ${projectName} ${
      language === 'typescript' ? '--typescript' : ''
    }`,
    
    angular: `npx @angular/cli new ${projectName} ${
      language === 'typescript' ? '' : '--strict false'
    } --style css --routing true`,
    
    svelte: `npx create-svelte@latest ${projectName} ${
      language === 'typescript' ? '--template skeleton-typescript' : '--template skeleton'
    }`,
    
    remix: `npx create-remix@latest ${projectName} ${
      language === 'typescript' ? '--typescript' : '--js'
    }`
  };

  // Execute framework creation command
  execSync(commands[framework], { stdio: 'inherit' });

  // Change to project directory
  process.chdir(projectDir);

  // Install additional dependencies based on selected features
  const dependencies = [];
  const devDependencies = [];

  if (features.includes('prettier')) {
    devDependencies.push('prettier');
    if (features.includes('tailwind')) {
      devDependencies.push('prettier-plugin-tailwindcss');
    }
  }

  // Framework-specific feature installations
  switch (framework) {
    case 'nextjs':
    case 'react':
    case 'remix':
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
      break;

    case 'vue':
      if (features.includes('pinia')) {
        dependencies.push('pinia');
      }
      if (features.includes('vue-query')) {
        dependencies.push('@tanstack/vue-query');
      }
      break;

    case 'angular':
      if (features.includes('ngrx')) {
        dependencies.push('@ngrx/store @ngrx/effects @ngrx/entity');
      }
      break;

    case 'svelte':
      if (features.includes('sveltekit')) {
        execSync('npm create svelte@latest', { stdio: 'inherit' });
      }
      break;
  }

  // Common feature: Prisma
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

  // Copy template if it's a Next.js project
  if (framework === 'nextjs') {
    const templatePath = path.join(__dirname, '../templates/page.tsx');
    const targetPath = path.join(projectDir, 'src/app/page.tsx');
    
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

  // Apply purple theme based on framework
  const templateDir = path.join(__dirname, '../templates', framework);
  const themeFiles = await fs.readdir(templateDir);

  for (const file of themeFiles) {
    const templatePath = path.join(templateDir, file);
    let targetPath;

    switch (framework) {
      case 'nextjs':
        targetPath = path.join(projectDir, 'src/app', file);
        break;
      case 'react':
        targetPath = path.join(projectDir, 'src', file);
        break;
      case 'vue':
        targetPath = path.join(projectDir, 'src/components', file);
        break;
      case 'angular':
        targetPath = path.join(projectDir, 'src/app', file);
        break;
      case 'svelte':
        targetPath = path.join(projectDir, 'src/routes', file);
        break;
      case 'remix':
        targetPath = path.join(projectDir, 'app', file);
        break;
    }

    if (language === 'typescript') {
      await fs.copy(templatePath, targetPath);
    } else {
      const content = await fs.readFile(templatePath, 'utf8');
      const jsContent = content
        .replace(/\.tsx?/g, '.js')
        .replace(/: React\.FC/g, '')
        .replace(/: string/g, '')
        .replace(/: number/g, '')
        .replace(/: boolean/g, '')
        .replace(/: any/g, '');
      await fs.writeFile(targetPath.replace(/\.tsx?$/, '.js'), jsContent);
    }
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
}