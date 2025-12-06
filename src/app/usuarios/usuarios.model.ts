export interface User {
  id: number;
  name: string;
  lastName?: string;
  documentId?: string;
  phone?: string;
  address?: string;
  state?: string;
  country?: string;

  email: string;
  role: string;

  createdAt: string;
  updatedAt: string;
}