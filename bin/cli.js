#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProject } from '../src/create-project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .name('create-2187-app')
  .description('Create a new Next.js project with optional features')
  .argument('[project-directory]', 'Project directory name')
  .action(async (projectDirectory) => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is your project named?',
          default: projectDirectory || 'my-2187-app',
        },
        {
          type: 'list',
          name: 'language',
          message: 'Select a language:',
          choices: [
            { name: 'TypeScript', value: 'typescript' },
            { name: 'JavaScript', value: 'javascript' }
          ],
        },
        {
          type: 'checkbox',
          name: 'features',
          message: 'Select additional features:',
          choices: [
            { name: 'Tailwind CSS', value: 'tailwind', checked: true },
            { name: 'ESLint', value: 'eslint', checked: true },
            { name: 'Prettier', value: 'prettier' },
            { name: 'shadcn/ui', value: 'shadcn' },
            { name: 'React Query', value: 'react-query' },
            { name: 'Zustand (State Management)', value: 'zustand' },
            { name: 'React Hook Form', value: 'react-hook-form' },
            { name: 'Prisma', value: 'prisma' }
          ],
        }
      ]);

      await createProject(answers);
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

program.parse();