import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique branch names
import { NextApiRequest, NextApiResponse } from 'next';
require('dotenv').config();

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    if (req.method === 'POST') {
        // Process the webhook payload from Builder.io
        const { data } = req.body;

        // Generate a unique branch name
        const branchName = `builder-update-${uuidv4()}`;

        // Example: Push the changes to a new branch in a GitHub repository
        try {
            const githubResponse = await axios.put(
                `https://api.github.com/repos/magdamarketinghackers/Hackers/git/refs`,
                {
                    ref: `refs/heads/${branchName}`,
                    sha: '9c9a54b1fce6335a459030eb233b84210372692f', // Replace 'master' with the branch you want to base the new branch off
                },
                {
                    headers: {
                        Authorization: `token ${process.env.YOUR_GITHUB_TOKEN!}`,
                    },
                }
            );

            // Push the changes to the newly created branchh
            await axios.put(`https://api.github.com/repos/magdamarketinghackers/Hackers/contents/path_to_your_file`, {
                message: 'Update from Builder.io webhook',
                content: Buffer.from(JSON.stringify(data)).toString('base64'),
                branch: branchName,
                // You may need to authenticate with GitHub here (e.g., using a personal access token)
                headers: {
                    Authorization: `token ${process.env.YOUR_GITHUB_TOKEN!}`,
                },
            });

            console.log('GitHub response:', githubResponse.data);
            res.status(200).json({ success: true });
        } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        // Now TypeScript knows this is an AxiosError
        console.error('Error pushing to GitHub:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    } else {
        // Handle the case where it's not an Axios error
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
}
    } else {
        res.status(405).end(); // Method Not Allowed
    }
} 






 