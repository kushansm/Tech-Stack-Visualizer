import { useState } from 'react';
import { fetchAllLanguages } from './services/githubApi';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
    const [urlInput, setUrlInput] = useState('');
    const [username, setUsername] = useState('');
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const extractUsername = (url) => {
        // Try to extract username from full URL or just return input if it's just username
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname !== 'github.com') {
                return null; // Not a GitHub URL
            }
            // URL path format: /username or /username/...
            const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
            return pathParts.length > 0 ? pathParts[0] : null;
        } catch {
            // If input is not a full URL, treat as username string directly (no spaces)
            if (/^[a-zA-Z0-9-]+$/.test(url)) return url;
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLanguages({});
        const extractedUsername = extractUsername(urlInput.trim());
        if (!extractedUsername) {
            setError('Please enter a valid GitHub profile URL or username.');
            return;
        }
        setUsername(extractedUsername);
        setLoading(true);
        try {
            const data = await fetchAllLanguages(extractedUsername);
            if (Object.keys(data).length === 0) {
                setError('No language data found for this user.');
            } else {
                setLanguages(data);
            }
        } catch (err) {
            setError('Error fetching language data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: Object.keys(languages),
        datasets: [
            {
                label: 'Bytes of Code',
                data: Object.values(languages),
                backgroundColor: [
                    '#6366F1',
                    '#F59E0B',
                    '#10B981',
                    '#EF4444',
                    '#8B5CF6',
                    '#3B82F6',
                    '#EC4899',
                    '#22D3EE',
                    '#F97316',
                ],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 gap-6">
            <h1 className="text-3xl font-bold mb-2">GitHub Tech Stack Visualizer</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-xl">
                <label htmlFor="github-url" className="block text-lg font-semibold mb-2">
                    Enter GitHub profile URL or username:
                </label>
                <input
                    id="github-url"
                    type="text"
                    placeholder="e.g. https://github.com/kushansm or kushansm"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Fetch Languages'}
                </button>
            </form>

            {error && <p className="text-red-600 font-semibold">{error}</p>}

            {!loading && Object.keys(languages).length > 0 && (
                <div className="w-full max-w-xl bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Languages Used by <span className="text-indigo-600">{username}</span>
                    </h2>
                    <ul className="mb-4">
                        {Object.entries(languages).map(([lang, bytes]) => (
                            <li key={lang}>
                                <strong>{lang}:</strong> {bytes.toLocaleString()} bytes
                            </li>
                        ))}
                    </ul>
                    <Pie data={chartData} />
                </div>
            )}
        </div>
    );
}

export default App;
