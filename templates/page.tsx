export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0014] flex flex-col items-center justify-center p-24">
      <div className="relative z-10 max-w-5xl w-full items-center justify-between">
        <div className="animate-pulse">
          <h1 className="text-7xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
            2187 App
          </h1>
        </div>
        <p className="text-2xl text-center mb-8 text-purple-200 drop-shadow-[0_0_15px_rgba(216,180,254,0.5)]">
          Get started by editing{' '}
          <code className="font-mono font-bold bg-purple-900/30 px-2 py-1 rounded-md">
            src/app/page.tsx
          </code>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <a
            href="https://nextjs.org/docs"
            className="group rounded-lg border border-purple-500/30 bg-purple-900/10 px-5 py-4 transition-all hover:bg-purple-900/30 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold text-purple-300">
              Documentation{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-purple-200/60">
              Explore the Next.js documentation to get started.
            </p>
          </a>
          
          <a
            href="https://github.com/SEI2187/create-2187-app"
            className="group rounded-lg border border-purple-500/30 bg-purple-900/10 px-5 py-4 transition-all hover:bg-purple-900/30 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold text-purple-300">
              Templates{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-purple-200/60">
              Discover and deploy 2187 example templates.
            </p>
          </a>
        </div>
      </div>
    </main>
  )
}