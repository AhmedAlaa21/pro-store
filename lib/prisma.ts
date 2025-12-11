import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaNeon({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
}).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});

export default prisma;
