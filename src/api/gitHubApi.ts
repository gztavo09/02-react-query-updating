import axios from "axios";

// Obtain acess token from github
// 1. Login in Github
// 2. next step, find "settings" in user options
// 3. developer settings
// 4. fine-grained tokens
// 5. Generate new token - intereaction limits(read-only)

export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})