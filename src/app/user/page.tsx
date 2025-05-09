'use client';

import { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
};

export default function UserPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/user')
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user found</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">User Info</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
        </div>
    );
}
