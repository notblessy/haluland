import api from "@/lib/api";
import useSWR, { mutate } from "swr";

import { useAuth } from "@/lib/auth-context";
import { ApiResponse, PaginatedResponse } from "@/lib/types";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

export type Tag = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type StoryType = {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  thumbnail_public_id: string | null;
  category_id: number | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
  };
  author?: {
    id: string;
    name: string;
    email: string;
    picture: string | null;
    created_at: string;
    updated_at: string;
  };
  tags?: Tag[];
  total_views?: number;
  total_comments?: number;
  total_likes?: number;
};

interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  status?: string;
  user_id?: string;
}

export type StoryRequestType = {
  author_id: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  thumbnail_public_id: string | null;
  category_id: number | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  published_at: string | null;
  tags?: number[];
};

export const useStories = () => {
  const router = useRouter();

  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sort, setSort] = useState<string>("-created_at");
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const pathKey = `v1/stories${
    user
      ? `?page=${page}&size=${size}&sort=${sort}&search=${search}&user_id=${userId}&status=${status}`
      : ""
  }`;
  const { data, error, isValidating } =
    useSWR<ApiResponse<PaginatedResponse<StoryType>>>(pathKey);

  const onAdd = useCallback(
    async (storyData: Partial<StoryRequestType>) => {
      setLoading(true);
      try {
        const { data: res } = await api.post<ApiResponse<null>>(
          "v1/stories",
          storyData
        );

        if (res.success) {
          mutate(pathKey);
          toast({
            title: "Success add story",
            description: "Story has been added",
          });

          router.push("/dashboard");
        } else {
          toast({
            title: "Something went wrong",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Failed to add story",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [pathKey, toast]
  );

  const onQuery = useCallback((props: QueryParams) => {
    if (props.page !== undefined) setPage(props.page);
    if (props.size !== undefined) setSize(props.size);
    if (props.sort !== undefined) setSort(props.sort);
    if (props.search !== undefined) setSearch(props.search);
    if (props.user_id !== undefined) setUserId(props.user_id);
    if (props.status !== undefined) setStatus(props.status);
  }, []);

  const onEdit = useCallback(
    async (id: string, story: Partial<StoryRequestType>) => {
      setEditLoading(true);
      try {
        const { data: res } = await api.patch<ApiResponse<null>>(
          `v1/stories/${id}`,
          story
        );

        if (res.success) {
          mutate(pathKey);
          toast({
            title: "Success edit story",
            description: "Story has been updated",
          });

          router.push("/dashboard");
        } else {
          toast({
            title: "Something went wrong",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Failed to edit story",
          variant: "destructive",
        });
      } finally {
        setEditLoading(false);
      }
    },
    [pathKey, toast]
  );

  const onDelete = useCallback(
    async (id: string) => {
      setDeleteLoading(true);
      try {
        const { data: res } = await api.delete<ApiResponse<null>>(
          `v1/stories/${id}`
        );

        if (res.success) {
          mutate(pathKey);
          toast({
            title: "Success delete story",
            description: "Story has been deleted",
          });

          router.push("/dashboard");
        } else {
          toast({
            title: "Something went wrong",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Failed to delete story",
          variant: "destructive",
        });
      } finally {
        setDeleteLoading(false);
      }
    },
    [pathKey, toast]
  );

  return {
    data: data?.data as
      | PaginatedResponse<StoryType>
      | {
          records: [];
          page_summary: { has_next: false; page: 1; size: 5; total: 0 };
        },
    onQuery,
    onAdd,
    delete: {
      onDelete,
      loading: deleteLoading,
    },
    edit: {
      onEdit,
      loading: editLoading,
    },
    loading: loading || (!error && !data) || isValidating,
  };
};

export const useStoryById = (id: string) => {
  const pathKey = `v1/stories/${id}`;

  const { data, isLoading, isValidating } =
    useSWR<ApiResponse<StoryType>>(pathKey);

  return {
    data: data?.data as StoryType | null,
    loading: isLoading || isValidating,
  };
};

export const useStory = (slug: string) => {
  const pathKey = `v1/public/stories/${slug}`;

  const { data, isLoading, isValidating } =
    useSWR<ApiResponse<StoryType>>(pathKey);

  return {
    data: data?.data as StoryType | null,
    loading: isLoading || isValidating,
  };
};
