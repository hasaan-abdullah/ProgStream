"use client";

import React, { useState } from 'react';

const BottleCalculator = () => {
  const [requiredBottles, setRequiredBottles] = useState<number>(0);
  const [result, setResult] = useState<{ bottles: number; packs: number; boxes: number; price: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const prices = [2.3, 25, 230]; // Prices for bottles, packs, and boxes
    const pieces = [1, 12, 120]; // Quantities in each package

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requiredBottles, prices, pieces }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error calculating:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Bottle Calculator</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <label htmlFor="requiredBottles" className="block mb-2">
          Required Bottles:
        </label>
        <input
          type="number"
          id="requiredBottles"
          value={requiredBottles}
          onChange={(e) => setRequiredBottles(Number(e.target.value))}
          required
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
          Calculate
        </button>
      </form>

      {loading && <p className="mt-4">Calculating...</p>}

      {result && (
        <div className="mt-4 bg-gray-200 p-4 rounded">
          <h2 className="font-semibold">Calculation Result:</h2>
          <p>Bottles: {result.bottles}</p>
          <p>Packs: {result.packs}</p>
          <p>Boxes: {result.boxes}</p>
          <p>Total Price: €{result.price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default BottleCalculator;
