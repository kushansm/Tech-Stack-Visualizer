import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function fetchAllLanguages(username) {
    try {
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        const repos = reposResponse.data;
        const languagesData = {};

        // Fetch languages for each repo with token
        for (const repo of repos) {
            try {
                const langResponse = await axios.get(repo.languages_url, {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`,
                    },
                });
                const repoLangs = langResponse.data;
                for (const [lang, bytes] of Object.entries(repoLangs)) {
                    languagesData[lang] = (languagesData[lang] || 0) + bytes;
                }
            } catch (err) {
                console.warn(`Skipping ${repo.name}: ${err.message}`);
            }
        }
        return languagesData;
    } catch (error) {
        console.error('Error fetching repos:', error);
        throw error;
    }
}
