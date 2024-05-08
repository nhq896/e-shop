import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
  page?: number;
}

export const pageNum = 20;

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm, page } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (category === "All" || (category === "" && searchTerm === "")) {
      const products = await prisma.product.findMany({
        skip: (page ?? 1 - 1) * pageNum,
        take: pageNum,
        include: {
          reviews: {
            include: {
              user: true,
            },
            orderBy: { createdDate: "desc" },
          },
        },
      });

      return products;
    }

    const products = await prisma.product.findMany({
      skip: (page ?? 1 - 1) * pageNum,
      take: pageNum,
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: { createdDate: "desc" },
        },
      },
    });

    const productsList = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: { createdDate: "desc" },
        },
      },
    });

    return productsList;
  } catch (error: any) {
    throw new Error(error);
  }
}
