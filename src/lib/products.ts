export type Product = {
  id: string;
  name: string;
  code: string;
  ean: string | null;
  price: number | null;
  image: string | null;
  description: string | null;
  category: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  count: number;
};

export type Catalog = {
  products: Product[];
  categories: Category[];
  /** ISO date the catalog snapshot was recovered */
  recovered: string;
};

export function formatPrice(price: number | null): string | null {
  if (price == null) return null;
  return new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
