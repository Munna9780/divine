import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { products as initialProducts } from './data/products';
import type { ArtProduct } from './types';

// In a real app, these would be environment variables
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState<string>();
  const [products, setProducts] = useState<ArtProduct[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleLogin = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError(undefined);
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleSaveProducts = (updatedProducts: ArtProduct[]) => {
    setProducts(updatedProducts);
    alert('Products saved successfully!');
  };

  if (isAdmin) {
    return (
      <AdminPanel
        products={products}
        onSave={handleSaveProducts}
        onLogout={handleLogout}
      />
    );
  }

  const activeProducts = products.filter((p) => p.isActive);

  return (
    <div className="min-h-screen bg-gray-50">
      {showLogin ? (
        <AdminLogin onLogin={handleLogin} error={loginError} onCancel={() => setShowLogin(false)} />
      ) : (
        <>
          <Header onAdminClick={() => setShowLogin(true)} />
          <Hero />
          
          <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <section id="featured" aria-label="Featured Artwork Collection">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Featured Artwork
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Carefully curated pieces to enhance your space. Each piece is selected for its unique artistic value and ability to transform any room.
              </p>
              
              <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
                {activeProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section id="about" className="mt-24">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">About Divine Dazzle</h2>
              <div className="mt-6 prose prose-lg">
                <p>
                  At Divine Dazzle, we believe that every space deserves to be transformed into a sanctuary of inspiration and beauty. Our carefully curated collection of premium wall art pieces is designed to elevate your home, office, or creative space.
                </p>
                <p>
                  Each piece in our collection is selected for its unique artistic value, superior quality, and ability to make a lasting impression. Whether you're looking for contemporary abstracts, stunning landscapes, or modern geometric designs, our diverse collection has something to complement every style and space.
                </p>
              </div>
            </section>
          </main>
          
          <footer className="mt-24 border-t bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                © 2025 Divine Dazzle. All rights reserved. Premium Wall Art Collection.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;