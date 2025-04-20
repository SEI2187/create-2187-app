# create-2187-app

A modern CLI tool to create Next.js applications with a beautiful purple neon theme and optional features.

## Features

- 🚀 Next.js 13+ with App Router
- 🎨 Beautiful purple neon theme out of the box
- 💜 TypeScript/JavaScript support
- 🎯 Interactive CLI with arrow key navigation
- ✨ Multiple feature selection with checkboxes

## Usage

```bash
npx create-2187-app my-app
```
## Installation

# create-2187-app

A customizable starter template for modern web apps, featuring your favorite tools out of the box.

## 🚀 Available Features

You can select from the following features during project creation:

- **Tailwind CSS** – Utility-first CSS framework  
- **ESLint** – Code linting  
- **Prettier** – Code formatting  
- **shadcn/ui** – Re-usable components  
- **React Query** – Data fetching and caching  
- **Zustand** – State management  
- **React Hook Form** – Form handling  
- **Prisma** – Database ORM  

## 📦 Usage Guide

### 1. Create a new project

```bash
npx create-2187-app my-app
```

### 2. Select features

- Use ↑ and ↓ arrow keys to navigate options  
- Use `Spacebar` to check/uncheck features  
- Press `Enter` to confirm your selection  

### 3. Start the app

```bash
cd my-app
npm run dev
```

## 🧱 Project Structure

```plaintext
my-app/
├── src/
│   ├── app/
│   │   └── page.tsx
│   └── ...
├── public/
├── package.json
└── ...
```

### Prisma

If you selected **Prisma**:

1. Update your database URL in `.env`  
2. Run the following command:  
   ```bash
   npx prisma db push
   ```

### shadcn/ui

If you selected **shadcn/ui**:

1. Components will be available in `src/components/ui`  
2. Use the CLI to add new components:  
   ```bash
   npx shadcn-ui add button
   ```

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📄 License

MIT

## 👤 Author

**SEI2187**

## 💬 Support

If you have any questions or need help, please [open an issue](https://github.com/) on GitHub.
