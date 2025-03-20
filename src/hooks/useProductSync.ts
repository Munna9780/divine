import { useState, useEffect } from 'react';
import { products as defaultProducts } from '../data/products';

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  roomPreviewUrl: string;
  isActive: boolean;
  sizes: Array<{
    id: string;
    width: number;
    height: number;
    depth: number;
    price: number;
    affiliateLink: string;
  }>;
}

export const useProductSync = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Try to get products from localStorage, fallback to default
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : defaultProducts;
  });

  useEffect(() => {
    // Sync localStorage whenever products change
    localStorage.setItem('products', JSON.stringify(products));

    // Create a broadcast channel for cross-tab/browser communication
    const channel = new BroadcastChannel('product-sync');
    channel.postMessage({ type: 'UPDATE', products });

    // Listen for updates from other tabs/windows
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'UPDATE') {
        setProducts(event.data.products);
      }
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, [products]);

  const addProduct = (newProduct: Product) => {
    setProducts(prevProducts => {
      // Check if product already exists
      const existingProductIndex = prevProducts.findIndex(p => p.id === newProduct.id);
      
      if (existingProductIndex > -1) {
        // Update existing product
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = newProduct;
        return updatedProducts;
      }
      
      // Add new product
      return [...prevProducts, newProduct];
    });
  };

  const removeProduct = (productId: string) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  return { products, addProduct, removeProduct };
};
