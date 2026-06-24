// Типҳои API — мувофиқи swagger store-api.softclub.tj

export interface SubCategory {
  id: number;
  subCategoryName: string;
}

export interface Category {
  id: number;
  categoryName: string;
  categoryImage: string;
  subCategories: SubCategory[];
}

export interface Product {
  id: number;
  productName: string;
  image: string;
  color: string;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  quantity: number;
  productInMyCart: boolean;
  categoryId: number;
  categoryName: string;
  productInfoFromCart: unknown | null;
}

export interface Color {
  id: number;
  colorName: string;
}

export interface Brand {
  id: number;
  brandName: string;
}

export interface MinMaxPrice {
  minPrice: number;
  maxPrice: number;
}

export interface ProductsData {
  products: Product[];
  colors: Color[];
  brands: Brand[];
  minMaxPrice: MinMaxPrice;
}

export interface PagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRecord: number;
  data: T;
  errors: string[];
  statusCode: number;
}

export interface ProductFilters {
  ProductName?: string;
  MinPrice?: number;
  MaxPrice?: number;
  BrandId?: number;
  ColorId?: number;
  CategoryId?: number;
  SubcategoryId?: number;
  PageNumber?: number;
  PageSize?: number;
}
