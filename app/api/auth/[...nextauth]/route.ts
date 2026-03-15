import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [CredentialsProvider({
        name: 'Email',
        credentials: {
            email: { label:"Email", placeholder: "you@example.com" },
            password: { label: "Password", placeholder: "••••••••" }
        },
        async authorize(credentials) {
            console.log(credentials);
            return null
        }
    })],
    pages: {
        signIn: '/login'
    }
});

export { handler as GET, handler as POST };