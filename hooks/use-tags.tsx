import { ApiResponse } from "@/lib/types";
import useSWR from "swr";

export type TagOptionType = {
  label: string;
  value: number;
};

export const useTagOptions = () => {
  const pathKey = `v1/options/tags`;

  const { data, isLoading, isValidating } =
    useSWR<ApiResponse<TagOptionType[]>>(pathKey);

  return {
    data: data?.data || [],
    loading: isLoading || isValidating,
  };
};
