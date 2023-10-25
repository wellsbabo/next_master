import NextAuth from "next-auth";
import { connectDB } from "@/util/database";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// @ts-ignore
import bcrypt from 'bcrypt';

// @ts-ignore
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'd9ccb86b18546ff95563',
      clientSecret: '9ab7d1017a5296f61a4d1e11d6e9597393c702f8',
    }),
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      //입력 받을 것은 직접 선택
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db('forum');
        let user = await db.collection('member').findOne({email : credentials!.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials!.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }
    })
  ],
  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일
  },
  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => { //타입스크립트 에러. 실행은 잘됨
      if (user) {
        // 토큰에 넣어보낼 정보
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
        token.user.role = user.role
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    // 유저 세션 정보를 출력할 때 어떤 데이터를 출력할 수 있게 만들지
    session: async ({ session, token }) => { //타입스크립트 에러. 실행은 잘됨
      session.user = token.user;  // 토큰의 모든 데이터를 보냄
      return session;
    },
  },

  secret : process.env.NEXTAUTH_SECRET
};
// @ts-ignore
export default NextAuth(authOptions);