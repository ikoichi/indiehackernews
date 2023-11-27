import { NextResponse } from "next/server";
import rawBody from "raw-body";
import crypto from "crypto";
import { Readable } from "stream";
import { headers } from "next/headers";
import { prismaClient } from "@/prisma/db";

export async function POST(request: Request) {
  const body = await rawBody(Readable.from(Buffer.from(await request.text())));
  const headersList = headers();
  const payload = JSON.parse(body.toString());
  const sigString = headersList.get("x-signature");
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET as string;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const signature = Buffer.from(
    Array.isArray(sigString) ? sigString.join("") : sigString || "",
    "utf8"
  );

  // validate signature
  if (!crypto.timingSafeEqual(digest, signature)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
  }

  const userEmail = payload.data.attributes.user_email;

  const user = await prismaClient.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    console.error("User not found");

    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  const subscription = await prismaClient.userPlan.findFirst({
    where: {
      userId: user.id,
    },
  });

  const lemonProductId = payload.data.attributes.product_id.toString();
  const subscriptionPlan = await prismaClient.subscriptionPlan.findFirst({
    where: {
      productId: lemonProductId,
    },
  });

  if (!subscriptionPlan) {
    throw Error(`Lemon productId received ${lemonProductId} not found`);
  }

  if (!subscription) {
    if (!subscriptionPlan) {
      throw Error("Subscription plan " + lemonProductId);
    }

    await prismaClient.userPlan.create({
      data: {
        userId: user.id,
        planId: subscriptionPlan?.id,
        lemonOrderId: payload.data.attributes.order_id.toString(),
        lemonProductId: payload.data.attributes.product_id.toString(),
        lemonVariantId: payload.data.attributes.variant_id.toString(),
        lemonPlanName: payload.data.attributes.product_name,
        lemonPlanPrice: subscriptionPlan.price,
        lemonSubscriptionId: payload.data.id.toString(),
        validUntil: new Date(payload.data.attributes.renews_at),
        updateUrl: payload.data.attributes.urls.update_payment_method,
        status: payload.data.attributes.status.toUpperCase(),
      },
    });
  }

  if (subscription) {
    await prismaClient.userPlan.update({
      where: {
        id: subscription.id,
      },
      data: {
        userId: user.id,
        planId: subscriptionPlan?.id,
        lemonOrderId: payload.data.attributes.order_id.toString(),
        lemonProductId: payload.data.attributes.product_id.toString(),
        lemonVariantId: payload.data.attributes.variant_id.toString(),
        lemonPlanName: payload.data.attributes.product_name,
        lemonPlanPrice: subscriptionPlan.price,
        lemonSubscriptionId: payload.data.id.toString(),
        validUntil: new Date(payload.data.attributes.renews_at),
        updateUrl: payload.data.attributes.urls.update_payment_method,
        status: payload.data.attributes.status.toUpperCase(),
      },
    });
  }

  return NextResponse.json({ result: true }, { status: 200 });
}
