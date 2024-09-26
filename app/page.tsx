"use client";

import React, { useState } from 'react'; // Ensure useState is imported
import { FaWineBottle } from "react-icons/fa6";
import { Loader } from "lucide-react"; // Optional loader icon

const BottleCalculator = () => {
  const [requiredBottles, setRequiredBottles] = useState<number>(0);
  const [result, setResult] = useState<{ bottles: number; packs: number; boxes: number; price: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requiredBottles < 0) {
      setError("Required bottles cannot be negative.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

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

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error calculating:', error);
      setError("An error occurred while calculating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-green-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          <FaWineBottle className="inline mr-2 text-blue-600" />
          Bottle Calculator
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="requiredBottles" className="block mb-2 text-lg font-semibold">
            Required Bottles:
          </label>
          <input
            type="number"
            id="requiredBottles"
            value={requiredBottles}
            onChange={(e) => setRequiredBottles(Number(e.target.value))}
            required
            min="0" // Prevent negative input
            aria-label="Required bottles"
            className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold rounded-lg p-3 w-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            aria-label="Calculate bottles"
          >
            {loading ? <Loader className="animate-spin h-5 w-5 mr-2" /> : 'Calculate'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}

        {result && (
          <div className="mt-6 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-xl">Calculation Result:</h2>
            <p>Bottles: <span className="font-bold">{result.bottles}</span></p>
            <p>Packs: <span className="font-bold">{result.packs}</span></p>
            <p>Boxes: <span className="font-bold">{result.boxes}</span></p>
            <p>Total Price: <span className="font-bold">€{result.price.toFixed(2)}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottleCalculator;
