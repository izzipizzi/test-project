export const API_URL = '/api';

export const API = {
  getAllPosts: (): string => `${API_URL}/posts`,
  addPost: (): string => `${API_URL}/posts`,
  getPostById: (postId: string): string => `${API_URL}/posts/${postId}`,
  getPostsByUser: (userId: string): string => `${API_URL}/posts/user/${userId}`,
  addPostLike: (): string => `${API_URL}/posts/like`,
};
