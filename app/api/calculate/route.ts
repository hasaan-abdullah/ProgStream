import { NextResponse } from 'next/server';

type CalculateRequestBody = {
  requiredBottles: number;
  prices: number[];
  pieces: number[];
};

export const POST = async (request: Request) => {
  const { requiredBottles, prices, pieces }: CalculateRequestBody = await request.json();

  const result = { boxes: 0, packs: 0, bottles: 0 };
  let remainingBottles = requiredBottles;

  // First calculate the number of boxes
  if (remainingBottles >= pieces[2]) {
    result.boxes = Math.floor(remainingBottles / pieces[2]);
    remainingBottles %= pieces[2];
  }

  // Then calculate the number of packs
  if (remainingBottles >= pieces[1]) {
    result.packs = Math.floor(remainingBottles / pieces[1]);
    remainingBottles %= pieces[1];
  }

  // Finally, the remaining bottles
  result.bottles = remainingBottles;

  // Calculate the total price
  const totalPrice =
    result.boxes * prices[2] + result.packs * prices[1] + result.bottles * prices[0];

  return NextResponse.json({ ...result, price: totalPrice });
};
