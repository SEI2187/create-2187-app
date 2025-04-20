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
  .description('Create a new Next.js project with optional TypeScript and Tailwind')
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
          type: 'confirm',
          name: 'typescript',
          message: 'Would you like to use TypeScript?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'tailwind',
          message: 'Would you like to use Tailwind CSS?',
          default: true,
        }
      ]);

      await createProject(answers);
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

program.parse();