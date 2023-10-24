import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'd9ccb86b18546ff95563',
      clientSecret: '9ab7d1017a5296f61a4d1e11d6e9597393c702f8',
    }),
  ],
  secret : 'wellsbabo'
};
export default NextAuth(authOptions); 