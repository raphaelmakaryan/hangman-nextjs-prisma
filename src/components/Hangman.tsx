'use client';
import { useState, useEffect } from 'react';

export default function Hangman() {
    const [word, setWord] = useState('');
    const [guessed, setGuessed] = useState<string[]>([]);
    const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

    const fetchWord = async () => {
        const res = await fetch('/api/words');
        const data = await res.json();
        setWord(data.word);
    };

    useEffect(() => {
        fetchWord();
    }, []);

    const handleGuess = (letter: string) => {
        if (status !== 'playing' || guessed.includes(letter)) return;
        const newGuessed = [...guessed, letter];
        setGuessed(newGuessed);

        const wrongGuesses = newGuessed.filter(l => !word.includes(l));
        if (wrongGuesses.length >= 6) setStatus('lost');
        else if (word.split('').every(l => newGuessed.includes(l))) setStatus('won');
    };

    useEffect(() => {
        if (status !== 'playing' && word) {
            fetch('/api/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word, guessed, status }),
            });
        }
    }, [status]);

    return (
        <div className="flex flex-col items-center p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Hangman 🪓</h1>

            <div className="mb-4 text-2xl tracking-widest">
                {word
                    .split('')
                    .map(l => (guessed.includes(l) || status !== 'playing' ? l : '_'))
                    .join(' ')}
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
                {'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => (
                    <button
                        key={letter}
                        onClick={() => handleGuess(letter)}
                        className={`p-2 rounded ${
                            guessed.includes(letter) ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                        disabled={guessed.includes(letter) || status !== 'playing'}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            <p className="text-xl">
                {status === 'won' && '🎉 You Won!'}
                {status === 'lost' && `😢 You Lost! The word was "${word}"`}
                {status === 'playing' && `Wrong guesses: ${guessed.filter(l => !word.includes(l)).length} / 6`}
            </p>

            {status !== 'playing' && (
                <button
                    onClick={() => {
                        setGuessed([]);
                        setStatus('playing');
                        fetchWord();
                    }}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                    Play Again
                </button>
            )}
        </div>
    );
}
