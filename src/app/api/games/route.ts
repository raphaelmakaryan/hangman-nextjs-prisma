import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
    const games = await prisma.game.findMany({ orderBy: { createdAt: 'desc' } });

    const parsed = games.map((g) => ({
        ...g,
        guessed: JSON.parse(g.guessed), // convert JSON string back to array
    }));

    return NextResponse.json(parsed);
}

export async function POST(req: Request) {
    const data = await req.json();

    // Convert guessed array to JSON string
    const newGame = await prisma.game.create({
        data: {
            word: data.word,
            guessed: JSON.stringify(data.guessed), // <-- important
            status: data.status,
        },
    });

    return NextResponse.json(newGame);
}
