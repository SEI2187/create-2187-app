import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="min-h-screen bg-[#0a0014] flex flex-col items-center justify-center p-24">
      <div class="relative z-10 max-w-5xl w-full">
        <div class="animate-pulse">
          <h1 class="text-7xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
            2187 Angular App
          </h1>
        </div>
        <p class="text-2xl text-center mb-8 text-purple-200 drop-shadow-[0_0_15px_rgba(216,180,254,0.5)]">
          Get started by editing
          <code class="font-mono font-bold bg-purple-900/30 px-2 py-1 rounded-md">
            src/app/app.component.ts
          </code>
        </p>
      </div>
    </main>
  `
})
export class AppComponent {
  title = '2187 Angular App';
}