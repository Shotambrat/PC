export default NextAuth({
  providers: [
    CredentialsProviderCredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user"; // По умолчанию роль "user"
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role; // Добавляем роль пользователя в сессию
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});