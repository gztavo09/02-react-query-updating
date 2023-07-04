import axios from "axios";

export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})