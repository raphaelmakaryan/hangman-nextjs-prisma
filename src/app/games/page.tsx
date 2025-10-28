'use client';

import { useEffect, useState } from 'react';

type Game = {
    id: number;
    word: string;
    guessed: string[];
    status: 'playing' | 'won' | 'lost';
    createdAt: string;
};

export default function GameHistoryPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            const res = await fetch('/api/games');
            const data = await res.json();
            setGames(data);
            setLoading(false);
        };

        fetchGames();
    }, []);

    if (loading) return <p className="p-6 text-center">Loading games...</p>;

    if (games.length === 0)
        return <p className="p-6 text-center">No games played yet.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Game History</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Word</th>
                    <th className="border border-gray-300 px-4 py-2">Guessed Letters</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                </tr>
                </thead>
                <tbody>
                {games.map((game) => (
                    <tr key={game.id} className="text-center">
                        <td className="border border-gray-300 px-4 py-2">{game.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{game.word}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            {game.guessed.join(', ')}
                        </td>
                        <td
                            className={`border border-gray-300 px-4 py-2 font-semibold ${
                                game.status === 'won'
                                    ? 'text-green-600'
                                    : game.status === 'lost'
                                        ? 'text-red-600'
                                        : ''
                            }`}
                        >
                            {game.status}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            {new Date(game.createdAt).toLocaleString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}