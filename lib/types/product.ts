import { z } from "zod";
import { insertProductSchema } from "../validators";
export type TProduct = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: number;
  createdAt: Date;
};
