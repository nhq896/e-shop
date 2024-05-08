import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  // const currentUser = await getCurrentUser();

  // if (!currentUser || currentUser.role !== "ADMIN") {
  //   return NextResponse.error();
  // }

  const body = await request.json();
  const { id, color, quantity } = body;

  if (
    color !== null &&
    color !== undefined &&
    quantity != null &&
    quantity !== undefined
  ) {
    const product = await prisma.product.update({
      where: { id: id },
      data: {
        images: {
          updateMany: {
            where: {
              color: color,
            },
            data: {
              quantity,
            },
          },
        },
      },
    });

    return NextResponse.json(product);
  }

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  // console.log(product);

  if (product !== null && product !== undefined) {
    const allOutOfStock = product.images.every((image) => {
      return image.quantity === 0;
    });

    if (allOutOfStock) {
      const updatedProduct = await prisma.product.update({
        where: { id: id },
        data: { inStock: false },
      });
      return NextResponse.json(updatedProduct);
    }
  }

  return NextResponse.json(product);
}
