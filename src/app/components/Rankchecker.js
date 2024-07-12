'use client'
import { useState } from 'react';

const RankChecker = () => {
    const [website, setWebsite] = useState('');
    const [keyword, setKeyword] = useState('');
    const [rank, setRank] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (keyword.trim() === '') {
            alert('Vänligen ange ett sökord.');
            return;
        }

        setLoading(true);

        try {
            const rank = await checkSearchRank(keyword, website);
            setRank(rank);
        } catch (error) {
            console.error('Error:', error);
            alert('Det uppstod ett fel vid rankningskontrollen. Vänligen försök igen senare.');
        } finally {
            setLoading(false);
        }
    };

    const checkSearchRank = async (query, url) => {
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=10`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const items = data.items || [];

            for (let i = 0; i < items.length; i++) {
                if (items[i].link === url) {
                    return i + 1;
                }
            }

            return null;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    const displayRankingResult = () => {
        if (rank !== null) {
            return (
                <p className="text-green-600">Hemsidan {website} är rankad som #{rank} för sökordet '{keyword}'.</p>
            );
        } else {
            return (
                <p className="text-red-600">Hemsidan {website} är inte bland de 10 bästa resultaten för sökordet '{keyword}'.</p>
            );
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value.trim())}
                    placeholder="Ange webbadress (ex: https://www.example.com)"
                    className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Ange sökord"
                    className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                >
                    Kolla rankning
                </button>
            </form>

            <div id="resultContainer" className="mt-4">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader"></div>
                    </div>
                ) : (
                    rank !== null && displayRankingResult()
                )}
            </div>
        </div>
    );
};

export default RankChecker;
