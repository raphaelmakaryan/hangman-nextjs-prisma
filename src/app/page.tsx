import Hangman from '@/components/Hangman';
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <Hangman />
            <Link
                href="/games"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                View Game History
            </Link>
        </main>
    );
}