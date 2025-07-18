import axios from 'axios';

const GITHUB_API = 'https://github.com/kushansm';

export const fetchRepos = async (username) => {
    const response = await axios.get(`${GITHUB_API}/${username}/repos`);
    return response.data;
};

export const fetchRepoLanguages = async (username, repoName) => {
    const response = await axios.get(`${GITHUB_API}/${username}/${repoName}/languages`);
    return response.data;
};

export const fetchAllLanguages = async (username) => {
    const repos = await fetchRepos(username);
    const languageData = {};

    for (const repo of repos) {
        const repoLangs = await fetchRepoLanguages(username, repo.name);

        for (const [lang, bytes] of Object.entries(repoLangs)) {
            if (languageData[lang]) {
                languageData[lang] += bytes;
            } else {
                languageData[lang] = bytes;
            }
        }
    }

    return languageData;
};
