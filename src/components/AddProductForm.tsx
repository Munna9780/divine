import React, { useState } from 'react';
import { useProductSync } from '../hooks/useProductSync';

// Generate a simple unique ID since UUID installation failed
function generateUniqueId(): string {
  return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function AddProductForm() {
  const { addProduct } = useProductSync();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      id: generateUniqueId(),
      title,
      description,
      imageUrl,
      roomPreviewUrl: imageUrl,
      isActive: true,
      sizes: [
        {
          id: generateUniqueId(),
          width: 24,
          height: 18,
          depth: 1.5,
          price: 199.99,
          affiliateLink: ''
        }
      ]
    };

    addProduct(newProduct);
    
    // Reset form
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Product Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add Product
      </button>
    </form>
  );
}
