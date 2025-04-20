import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

export async function createProject({ projectName, typescript, tailwind }) {
  console.log(chalk.blue('Creating your project...'));

  const projectDir = path.resolve(process.cwd(), projectName);

  // Create Next.js project
  const createCommand = `npx create-next-app@latest ${projectName} ${typescript ? '--typescript' : '--js'} --tailwind --eslint --app --src-dir --import-alias "@/*"`;
  
  execSync(createCommand, { stdio: 'inherit' });

  console.log(chalk.green('\n✔ Project created successfully!'));
  console.log(chalk.yellow('\nNext steps:'));
  console.log(`  cd ${projectName}`);
  console.log('  npm run dev');
}