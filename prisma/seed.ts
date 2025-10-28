import 'dotenv/config';
import { prisma } from '@/lib/prisma';

async function main() {
    const words = ['nextjs', 'javascript', 'database', 'react', 'hangman', 'typescript'];

    for (const word of words) {
        await prisma.word.upsert({
            where: { text: word },
            update: {},
            create: { text: word },
        });
    }

    console.log('Seeded words ✅');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });