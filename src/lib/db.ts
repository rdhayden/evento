// This is how Prisma recomends setting up a singleton client and reusing it rather
// than creating a new instance each time

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// globalThis in Node is a global object like the window object in browsers
// This declares the type for globalThis to include our PrismaClientSingleton
// The Typescript 'as' keyword is a type assertion that tells the compiler to treat
// globalThis as having this specific shape
// Type assertions only allow coercion to a more specific or less specific type
// which sometimes prevents more complex but valid type conversions
// So here we first assert it as unknown to bypass strict type checking and
// then assert it as our desired type
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// If prisma already exists on globalForPrisma use it, otherwise create a new instance
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
