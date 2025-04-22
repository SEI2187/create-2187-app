export default function App() {
  return (
    <main className="min-h-screen bg-[#0a0014] flex flex-col items-center justify-center p-24">
      <div className="relative z-10 max-w-5xl w-full">
        <div className="animate-pulse">
          <h1 className="text-7xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
            2187 Remix App
          </h1>
        </div>
        <p className="text-2xl text-center mb-8 text-purple-200 drop-shadow-[0_0_15px_rgba(216,180,254,0.5)]">
          Get started by editing{' '}
          <code className="font-mono font-bold bg-purple-900/30 px-2 py-1 rounded-md">
            app/root.tsx
          </code>
        </p>
      </div>
    </main>
  )
}