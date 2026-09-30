'use client';

import { useState, useTransition } from 'react';
import { updateProduct } from '../actions';

type ProductActionsProps = {
  id: string;
  stock: number;
  isAvailable: boolean;
};

const ProductActions = ({
  id,
  stock,
  isAvailable,
}: ProductActionsProps) => {
  const [currentStock, setCurrentStock] = useState(stock);
  const [available, setAvailable] = useState(isAvailable);
  const [isPending, startTransition] = useTransition();

  const saveChanges = () => {
    startTransition(async () => {
      try {
        await updateProduct(id, currentStock, available);
      } catch (error) {
        console.error(error);
        alert('Failed to update product');
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        type="number"
        min="0"
        value={currentStock}
        onChange={(e) => setCurrentStock(Number(e.target.value))}
        className="w-24 rounded-full border border-[#f3c58f] bg-white px-3 py-2 text-center text-sm text-[#4a2d1c] outline-none focus:border-[#7a2e0e]"
      />

      <button
        type="button"
        onClick={() => setAvailable(!available)}
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          available
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {available ? 'Available' : 'Unavailable'}
      </button>

      <button
        type="button"
        onClick={saveChanges}
        disabled={isPending}
        className="rounded-full bg-[#7a2e0e] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default ProductActions;
