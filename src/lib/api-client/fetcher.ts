
const BASE_URL = process.env.NEXT_PUBLIC_BASE_ADDRESS ?? 'http://127.0.0.1:8000';
console.log('BASE_ADDRESS:', process.env.NEXT_PUBLIC_BASE_ADDRESS);

export async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(BASE_URL + url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'API error');
    }

    return res.json();
}
