import { PrismaClient } from "@/generated/prisma/client";

import path from 'path';

// Get absolute path to database
const getDatabaseUrl = () => {
    const dbPath = process.env.DATABASE_URL || 'file:./dev.db';

    // If it's a relative path, convert to absolute
    if (dbPath.startsWith('file:./')) {
        const absolutePath = path.join(process.cwd(),'prisma', dbPath.substring(6));
        return `file:${absolutePath}`;
    }

    return dbPath;
};

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        datasources: {
            db: {
                url: getDatabaseUrl(),
            },
        },
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;