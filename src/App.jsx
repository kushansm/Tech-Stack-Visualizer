import { useEffect, useState } from 'react';
import { fetchAllLanguages } from './services/githubApi';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6">GitHub Tech Stack Visualizer</h1>
            {loading ? (
                <p className="text-gray-500">Loading language data...</p>
            ) : (
                <div className="w-full max-w-xl bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Languages Used</h2>
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
