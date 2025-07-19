import axios from 'axios';

export const fetchAllLanguages = async (username) => {
    const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repos = reposRes.data;

    const languageData = {};

    for (const repo of repos) {
        try {
            const langRes = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/languages`);
            const repoLangs = langRes.data;

            for (const [lang, bytes] of Object.entries(repoLangs)) {
                languageData[lang] = (languageData[lang] || 0) + bytes;
            }
        } catch (err) {
            console.warn(`Skipping ${repo.name}:`, err.message);
        }
    }

    return languageData;
};
