import React from 'react';
import { Frame, Settings } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
}

export function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Frame className="h-8 w-8" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
             Divine Dazzle
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex gap-6">
              <a href="#featured" className="text-gray-600 hover:text-gray-900">
                Featured
              </a>
              <a href="#collections" className="text-gray-600 hover:text-gray-900">
                Collections
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
            </nav>
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Admin Login"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}