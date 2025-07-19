import { useEffect, useState } from 'react';
import { fetchAllLanguages } from './services/githubApi';

function App() {
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLanguages = async () => {
            try {
                const data = await fetchAllLanguages('kushansm');
                console.log('Language Data:', data);
                setLanguages(data);
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoading(false);
            }
        };

        getLanguages();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">GitHub Tech Stack Visualizer</h1>
            {loading ? (
                <p className="text-gray-500">Loading language data...</p>
            ) : (
                <div className="text-left bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Languages Used:</h2>
                    <ul>
                        {Object.entries(languages).map(([lang, bytes]) => (
                            <li key={lang}>
                                <strong>{lang}:</strong> {bytes.toLocaleString()} bytes
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
