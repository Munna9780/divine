import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=3540"
        alt="Elegant modern living room showcasing premium wall art from Divine Dazzle collection"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Transform Your Space
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl leading-8 max-w-2xl mx-auto">
            Discover our curated collection of premium wall art pieces, perfect for modern homes and creative spaces
          </p>
          <a
            href="#featured"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-white hover:text-black"
            aria-label="Browse our featured wall art collection"
          >
            Explore Collection
            <ChevronDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}