import { NextResponse } from 'next/server';

export async function GET() {
  const priceList = {
    pricelist: [
      {
        piece: {
          name: "One Bottle",
          quantity:"1",
          price: 2.3,
          pack: {
            name: "A Pack contains 12 Bottles",
            quantity:"12",
            price: 25,
            box: {
              name: "A Big box contains 120 Bottles",
              quantity:"120",
              price: 230
            }
          }
        }
      }
    ]
  };

  return NextResponse.json(priceList);
}
