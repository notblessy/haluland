import useSWR from "swr";

import { useAuth } from "@/lib/auth-context";
import { ApiResponse, PaginatedResponse } from "@/lib/types";
import { useCallback, useState, useEffect } from "react";
import { StoryType } from "./use-story";

interface QueryParams {
  size?: number;
  sort?: string;
  search?: string;
  categoryId?: string;
  categorySlug?: string;
  tagIds?: number[];
}

export const useSearch = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sort, setSort] = useState<string>("-published_at");
  const [search, setSearch] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categorySlug, setCategorySlug] = useState<string>("");
  const [tagIds, setTagIds] = useState<number[]>([]);

  const [accumulatedData, setAccumulatedData] = useState<StoryType[]>([]);
  const [hasNext, setHasNext] = useState(true);

  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("size", size.toString());
  queryParams.append("sort", sort);

  if (search) queryParams.append("search", search);
  if (categoryId) queryParams.append("category_id", categoryId);
  if (tagIds.length > 0) queryParams.append("tag_ids", tagIds.join(","));
  if (categorySlug) queryParams.append("category_slug", categorySlug);

  const pathKey = `v1/stories?${queryParams.toString()}`;

  const { data, error, isValidating } =
    useSWR<ApiResponse<PaginatedResponse<StoryType>>>(pathKey);

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setAccumulatedData(data?.data?.records);
    } else {
      setAccumulatedData((prev) => [...prev, ...data?.data?.records]);
    }

    setHasNext(data?.data?.page_summary?.has_next);
  }, [data, page]);

  const onQuery = useCallback((props: QueryParams) => {
    if (props.size !== undefined) setSize(props.size);
    if (props.sort !== undefined) setSort(props.sort);
    if (props.search !== undefined) setSearch(props.search);
    if (props.categoryId !== undefined) setCategoryId(props.categoryId);
    if (props.tagIds !== undefined) setTagIds(props.tagIds);
    if (props.categorySlug !== undefined) setCategorySlug(props.categorySlug);

    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    if (hasNext && !isValidating) {
      setPage((prev) => prev + 1);
    }
  }, [hasNext, isValidating]);

  return {
    data: {
      records: accumulatedData,
      page_summary: {
        has_next: hasNext,
        page,
        size,
        total: data?.data?.page_summary?.total ?? 0,
      },
    },
    loading: isValidating && page === 1,
    loadingMore: isValidating && page > 1,
    onQuery,
    loadMore,
    hasNext,
  };
};
