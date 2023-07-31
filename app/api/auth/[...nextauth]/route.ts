import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/libs/prismadb';
import { error } from 'console';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        // For using sign up form 
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label:'email', type: 'text'},
                password: {label:'password', type: 'password'},
            },
            async authorize(credentials) {

                //User not found
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid C redentials');
                }
                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                //user have signed us using google or github so can't use sign in form
                if(!user || !user?.hashedPassword){
                    throw new Error("Invalid Credentials")
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password,user.hashedPassword);

                if(!isCorrectPassword){
                    throw new Error('Invalid Credentials');
                }

                return user;

            },
        })
    ],

    debug: process.env.NODE_ENV == 'development',

    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST};