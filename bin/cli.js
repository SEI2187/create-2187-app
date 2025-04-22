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
  .description('Create a new project with your favorite framework')
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
          name: 'framework',
          message: 'Select a framework:',
          choices: [
            { name: 'Next.js', value: 'nextjs' },
            { name: 'React', value: 'react' },
            { name: 'Vue', value: 'vue' },
            { name: 'Angular', value: 'angular' },
            { name: 'Svelte', value: 'svelte' },
            { name: 'Remix', value: 'remix' }
          ],
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
          choices: ({ framework }) => {
            const commonFeatures = [
              { name: 'ESLint', value: 'eslint', checked: true },
              { name: 'Prettier', value: 'prettier' },
            ];

            const nextFeatures = [
              { name: 'Tailwind CSS', value: 'tailwind', checked: true },
              { name: 'shadcn/ui', value: 'shadcn' },
              { name: 'React Query', value: 'react-query' },
              { name: 'Zustand (State Management)', value: 'zustand' },
              { name: 'React Hook Form', value: 'react-hook-form' },
              { name: 'Prisma', value: 'prisma' }
            ];

            switch (framework) {
              case 'nextjs':
                return [...commonFeatures, ...nextFeatures];
              case 'react':
                return [...commonFeatures, ...nextFeatures];
              case 'vue':
                return [...commonFeatures, 
                  { name: 'Tailwind CSS', value: 'tailwind' },
                  { name: 'Pinia (State Management)', value: 'pinia' },
                  { name: 'Vue Query', value: 'vue-query' }
                ];
              case 'angular':
                return [...commonFeatures,
                  { name: 'Tailwind CSS', value: 'tailwind' },
                  { name: 'NgRx', value: 'ngrx' }
                ];
              case 'svelte':
                return [...commonFeatures,
                  { name: 'Tailwind CSS', value: 'tailwind' },
                  { name: 'SvelteKit', value: 'sveltekit' }
                ];
              case 'remix':
                return [...commonFeatures, ...nextFeatures];
              default:
                return commonFeatures;
            }
          }
        }
      ]);

      await createProject(answers);
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

program.parse();