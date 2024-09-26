// app/api/calculate/route.ts

import { NextResponse } from 'next/server';

type CalculateRequestBody = {
  requiredBottles: number;
  prices: number[];
  pieces: number[];
};

type CalculateResponse = {
  bottles: number;
  packs: number;
  boxes: number;
  price: number;
};

export async function POST(request: Request) {
  const { requiredBottles, prices, pieces }: CalculateRequestBody = await request.json();

  // Call the calculation function
  const result = calculate(requiredBottles, prices, pieces);
  return NextResponse.json(result);
}

function calculate(requiredBottles: number, prices: number[], pieces: number[]): CalculateResponse {
  const bottlesPrice = prices[0];
  const packsPrice = prices[1];
  const boxPrice = prices[2];

  const bottlesInPack = pieces[1];
  const bottlesInBox = pieces[2];

  let bottles = 0;
  let packs = 0;
  let boxes = 0;

  // Calculate the number of boxes needed
  if (requiredBottles >= bottlesInBox) {
    boxes = Math.floor(requiredBottles / bottlesInBox);
    requiredBottles -= boxes * bottlesInBox;
  }

  // Calculate the number of packs needed
  if (requiredBottles >= bottlesInPack) {
    packs = Math.floor(requiredBottles / bottlesInPack);
    requiredBottles -= packs * bottlesInPack;
  }

  // Calculate the remaining bottles needed
  bottles = requiredBottles;

  // Calculate total price
  const totalPrice = bottles * bottlesPrice + packs * packsPrice + boxes * boxPrice;

  return {
    bottles,
    packs,
    boxes,
    price: totalPrice,
  };
}
