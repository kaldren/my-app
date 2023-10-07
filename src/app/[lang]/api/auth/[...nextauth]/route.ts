import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "34784809313-lalfgb3qees9eruqbn8v61hugsqv18pv.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
});

export { handler as GET, handler as POST };