// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate fetching users from a database or an external API
    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];

    return res.status(200).json(users);
  }

  // Handle unsupported HTTP methods
  return res.status(405).json({ message: 'Method Not Allowed' });
}
