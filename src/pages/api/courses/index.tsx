import React, { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

const Home = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch('/api/users');
            const data: User[] = await response.json();
            setUsers(data);
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Home;
