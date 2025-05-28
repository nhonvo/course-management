import Link from 'next/link';

const links = [
    { href: '/', label: 'Transactions' },
    { href: '/house-fee', label: 'House Fee' },
    { href: '/saving', label: 'Saving' },
];

export default function Sidebar() {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <aside className="w-64 bg-gray-100 border-r h-full p-4">
            <nav className="flex flex-col gap-4">
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`p-2 rounded hover:bg-gray-200 ${pathname.startsWith(href) ? 'bg-gray-300 font-semibold' : ''
                            }`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
