import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/libs/prismadb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  const buf = await (await req.blob()).text();
  const sig = req.headers.get("stripe-signature") as string;

  if (!sig) {
    return NextResponse.json(
      { message: "Missing the stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    if (err! instanceof Error) console.log(err);
    console.log(`Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;
      //   console.log("successssss", charge.shipping?.address);
      if (typeof charge.payment_intent === "string") {
        await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: {
            status: "complete",
            address: charge.shipping?.address,
            name: charge.shipping?.name,
            phone: charge.shipping?.phone,
          },
        });
      }
      break;
    default:
      console.log("Unhandled event type " + event.type);
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
