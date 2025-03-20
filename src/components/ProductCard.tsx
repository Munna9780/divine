import React, { useState } from 'react';
import { ExternalLink, Maximize2, Info } from 'lucide-react';
import type { ArtProduct, SizeVariant } from '../types';

interface ProductCardProps {
  product: ArtProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSize, setSelectedSize] = useState<SizeVariant | null>(() => 
    product.sizes.length > 0 ? product.sizes[0] : null
  );

  if (product.sizes.length === 0) {
    return (
      <div className="group relative rounded-xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{product.title}</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 line-clamp-2">{product.description}</p>
          <p className="mt-4 text-sm text-red-600">Currently unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <img
          src={showPreview ? product.roomPreviewUrl : product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white"
          aria-label={showPreview ? "Show artwork" : "Show room preview"}
        >
          <Maximize2 className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{product.title}</h3>
        <p className="mt-2 text-sm sm:text-base text-gray-600 line-clamp-2">{product.description}</p>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Select Size:</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`rounded-lg border px-2 py-1 sm:px-3 sm:py-2 text-sm transition-all ${
                  selectedSize?.id === size.id
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {size.width}" × {size.height}"
              </button>
            ))}
          </div>
        </div>

        {selectedSize && (
          <>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-600">
                  {selectedSize.width}" × {selectedSize.height}" × {selectedSize.depth}"
                </span>
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                ${selectedSize.price}
              </span>
            </div>

            <a
              href={selectedSize.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white transition-all hover:bg-gray-800"
            >
              View on Amazon
              <ExternalLink className="h-4 w-4" />
            </a>
          </>
        )}
      </div>
    </div>
  );
}