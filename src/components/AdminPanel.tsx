import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import type { ArtProduct, SizeVariant } from '../types';

interface AdminPanelProps {
  products: ArtProduct[];
  onSave: (products: ArtProduct[]) => void;
  onLogout: () => void;
}

export function AdminPanel({ products: initialProducts, onSave, onLogout }: AdminPanelProps) {
  const [products, setProducts] = useState<ArtProduct[]>(initialProducts);

  const addProduct = () => {
    const newProduct: ArtProduct = {
      id: Date.now().toString(),
      title: '',
      description: '',
      imageUrl: '',
      roomPreviewUrl: '',
      isActive: true,
      sizes: [],
    };
    setProducts([...products, newProduct]);
  };

  const addSize = (productId: string) => {
    const newSize: SizeVariant = {
      id: Date.now().toString(),
      width: 0,
      height: 0,
      depth: 1.5,
      price: 0,
      affiliateLink: '',
    };
    setProducts(
      products.map((p) =>
        p.id === productId
          ? { ...p, sizes: [...p.sizes, newSize] }
          : p
      )
    );
  };

  const updateProduct = (productId: string, updates: Partial<ArtProduct>) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, ...updates } : p
      )
    );
  };

  const updateSize = (productId: string, sizeId: string, updates: Partial<SizeVariant>) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? {
              ...p,
              sizes: p.sizes.map((s) =>
                s.id === sizeId ? { ...s, ...updates } : s
              ),
            }
          : p
      )
    );
  };

  const removeProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const removeSize = (productId: string, sizeId: string) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? { ...p, sizes: p.sizes.filter((s) => s.id !== sizeId) }
          : p
      )
    );
  };

  const handleSave = () => {
    onSave(products);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    placeholder="Product Title"
                    value={product.title}
                    onChange={(e) =>
                      updateProduct(product.id, { title: e.target.value })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                  />
                  <textarea
                    placeholder="Product Description"
                    value={product.description}
                    onChange={(e) =>
                      updateProduct(product.id, { description: e.target.value })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    rows={2}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={product.imageUrl}
                      onChange={(e) =>
                        updateProduct(product.id, { imageUrl: e.target.value })
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    />
                    <input
                      type="url"
                      placeholder="Room Preview URL"
                      value={product.roomPreviewUrl}
                      onChange={(e) =>
                        updateProduct(product.id, {
                          roomPreviewUrl: e.target.value,
                        })
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="ml-4 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Size Variants</h3>
                  <button
                    onClick={() => addSize(product.id)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Size
                  </button>
                </div>
                <div className="space-y-4">
                  {product.sizes.map((size) => (
                    <div
                      key={size.id}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-6 items-center"
                    >
                      <input
                        type="number"
                        placeholder="Width"
                        value={size.width || ''}
                        onChange={(e) =>
                          updateSize(product.id, size.id, {
                            width: parseFloat(e.target.value),
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Height"
                        value={size.height || ''}
                        onChange={(e) =>
                          updateSize(product.id, size.id, {
                            height: parseFloat(e.target.value),
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Depth"
                        value={size.depth || ''}
                        onChange={(e) =>
                          updateSize(product.id, size.id, {
                            depth: parseFloat(e.target.value),
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={size.price || ''}
                        onChange={(e) =>
                          updateSize(product.id, size.id, {
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      />
                      <input
                        type="url"
                        placeholder="Affiliate Link"
                        value={size.affiliateLink}
                        onChange={(e) =>
                          updateSize(product.id, size.id, {
                            affiliateLink: e.target.value,
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      />
                      <button
                        onClick={() => removeSize(product.id, size.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addProduct}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>
    </div>
  );
}