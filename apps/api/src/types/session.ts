export interface Session {
  id: string;
  user: {
    email: string;
    firstname: string;
    lastname: string;
    role: string[];
  };
}
