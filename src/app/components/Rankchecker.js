'use client'
import { useState } from 'react';

const RankChecker = () => {
    const [website, setWebsite] = useState('');
    const [keyword, setKeyword] = useState('');
    const [rank, setRank] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resultsCount, setResultsCount] = useState(10); // State for the number of results to fetch
    const [searchResults, setSearchResults] = useState([]); // State to hold all search results

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (keyword.trim() === '') {
            alert('Vänligen ange ett sökord.');
            return;
        }

        setLoading(true);
        setRank(null);
        setSearchResults([]);

        try {
            const { rank, items } = await checkSearchRank(keyword, website);
            setRank(rank);
            setSearchResults(items);
        } catch (error) {
            console.error('Error:', error);
            alert('Det uppstod ett fel vid rankningskontrollen. Vänligen försök igen senare.');
        } finally {
            setLoading(false);
        }
    };

    const checkSearchRank = async (query, url) => {
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=${resultsCount}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const items = data.items || [];

            let rank = null;
            for (let i = 0; i < items.length; i++) {
                if (items[i].link === url) {
                    rank = i + 1;
                }
            }

            return { rank, items };
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
                <p className="text-red-600">Hemsidan {website} är inte bland de {resultsCount} bästa resultaten för sökordet '{keyword}'.</p>
            );
        }
    };

    const displayAllResults = () => {
        return (
            <ul className="mt-4 space-y-4">
                {searchResults.map((item, index) => (
                    <li key={index} className={`p-4 border rounded-md ${item.link === website ? 'border-blue-300 bg-blue-50' : 'border-gray-300'}`}>
                        <div className="text-sm text-gray-600">{index + 1}</div>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            {item.title}
                        </a>
                        <div className="text-xs text-gray-500">{item.link}</div>
                        <p className="text-sm text-gray-700">{item.snippet}</p>
                    </li>
                ))}
            </ul>
        );
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
                <p>Filter by number of searches:</p>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => setResultsCount(10)}
                        className={`px-4 py-2 rounded-md focus:outline-none ${resultsCount === 10 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        10
                    </button>
                    <button
                        type="button"
                        onClick={() => setResultsCount(50)}
                        className={`px-4 py-2 rounded-md focus:outline-none ${resultsCount === 50 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        50
                    </button>
                    <button
                        type="button"
                        onClick={() => setResultsCount(100)}
                        className={`px-4 py-2 rounded-md focus:outline-none ${resultsCount === 100 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        100
                    </button>
                </div>
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
                        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {rank !== null && displayRankingResult()}
                        {searchResults.length > 0 && displayAllResults()}
                    </>
                )}
            </div>
        </div>
    );
};

export default RankChecker;
