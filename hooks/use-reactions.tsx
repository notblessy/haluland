import api from "@/lib/api";

import { ApiResponse } from "@/lib/types";
import { useCallback, useState } from "react";

export const useReactions = () => {
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);

  const onLike = useCallback(async (storyId: string) => {
    setLoading(true);
    try {
      await api.post<ApiResponse<null>>(`v1/likes/${storyId}`);
    } catch (error) {
      console.error("Failed to track view for story:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onDislike = useCallback(async (storyId: string) => {
    setLoading(true);
    try {
      await api.delete<ApiResponse<null>>(`v1/likes/${storyId}`);
    } catch (error) {
      console.error("Failed to remove like for story:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onComment = useCallback(async (storyId: string, content: string) => {
    setCommentLoading(true);
    try {
      await api.post<ApiResponse<null>>(`v1/comments`, {
        story_id: storyId,
        content,
      });
    } catch (error) {
      console.error("Failed to add comment for story:", error);
    } finally {
      setCommentLoading(false);
    }
  }, []);

  const onDeleteComment = useCallback(async (commentId: string) => {
    setDeleteCommentLoading(true);
    try {
      await api.delete<ApiResponse<null>>(`v1/comments/${commentId}`);
    } catch (error) {
      console.error("Failed to delete comment for story:", error);
    } finally {
      setDeleteCommentLoading(false);
    }
  }, []);

  return {
    onLike,
    onDislike,
    onComment,
    onDeleteComment,
    loading: loading,
    commentLoading: commentLoading,
    deleteCommentLoading: deleteCommentLoading,
  };
};
