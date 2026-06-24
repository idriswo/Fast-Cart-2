import api from "./axios";
import type {
  Category,
  PagedResponse,
  Product,
  ProductFilters,
  ProductsData,
} from "@/types";

/** Рӯйхати маҳсулот бо filter ва pagination */
export async function getProducts(
  filters: ProductFilters = {}
): Promise<PagedResponse<ProductsData>> {
  const { data } = await api.get<PagedResponse<ProductsData>>(
    "/Product/get-products",
    { params: filters }
  );
  return data;
}

/** Як маҳсулот аз рӯи id */
export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get("/Product/get-product-by-id", {
    params: { id },
  });
  return data?.data;
}

/** Ҳамаи категорияҳо */
export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<{ data: Category[] }>(
    "/Category/get-categories"
  );
  return data?.data ?? [];
}
