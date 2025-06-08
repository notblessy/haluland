import { ApiResponse } from "@/lib/types";
import useSWR from "swr";

export type CategoryOptionType = {
  label: string;
  slug: string;
  value: number;
};

export const useCategoryOptions = () => {
  const pathKey = `v1/options/categories`;

  const { data, isLoading, isValidating } = useSWR<
    ApiResponse<CategoryOptionType[]>
  >(pathKey, { revalidateOnFocus: false });

  return {
    data: data?.data || [],
    loading: isLoading || isValidating,
  };
};
