import LifeCompassApp from "@/components/life-compass-app";
import { Compass } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-12 bg-background">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline flex items-center justify-center gap-3">
            <Compass className="w-10 h-10" />
            Life Compass
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Visualize your life balance and get AI-powered recommendations for a more fulfilling life.
          </p>
        </header>
        <LifeCompassApp />
      </div>
    </main>
  );
}
