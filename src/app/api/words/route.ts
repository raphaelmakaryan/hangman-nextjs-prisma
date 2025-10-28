import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const words = await prisma.word.findMany();
    if (words.length === 0) {
        return NextResponse.json({ word: 'hangman' });
    }
    const randomWord = words[Math.floor(Math.random() * words.length)].text;
    return NextResponse.json({ word: randomWord });
}