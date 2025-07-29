export interface Session {
  id: string;
  user: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}
