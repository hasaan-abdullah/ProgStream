import { NextResponse } from 'next/server';

export async function GET() {
  const priceList = {
    pricelist: [
      {
        piece: {
          name: " 1 Bottle Price",
          price: 2.3,
          pack: {
            name: "12-pack",
            price: 25,
            box: {
              name: "Big box",
              price: 230
            }
          }
        }
      }
    ]
  };

  return NextResponse.json(priceList);
}
