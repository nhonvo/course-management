// src/features/transactions/components/TransactionFilters.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TransactionFiltersProps } from 'src/models/TransactionFilters';


type Props = {
    filters: TransactionFiltersProps;
    handleChange: <K extends keyof TransactionFiltersProps>(key: K, value: string | boolean | number) => void;
};

export default function TransactionFilters({ filters, handleChange }: Props) {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                    type="date"
                    name="start_date"
                    value={filters.start_date}
                    onChange={(e) => handleChange('start_date', e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                    type="date"
                    name="end_date"
                    value={filters.end_date}
                    onChange={(e) => handleChange('end_date', e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="limit">Limit</Label>
                <Input
                    type="number"
                    name="limit"
                    value={filters.limit}
                    onChange={(e) => handleChange('limit', Number(e.target.value))}
                />
            </div>

            <div>
                <Label htmlFor="offset">Offset</Label>
                <Input
                    type="number"
                    name="offset"
                    value={filters.offset}
                    onChange={(e) => handleChange('offset', Number(e.target.value))}
                />
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Switch
                    checked={filters.clean}
                    onCheckedChange={(value) => handleChange('clean', value)}
                    id="clean"
                />
                <Label htmlFor="clean">Clean</Label>
            </div>
            <div>
                <Label htmlFor="search">Search</Label>
                <Input
                    type="text"
                    name="search"
                    placeholder="Search description..."
                    value={filters.search || ''}
                    onChange={(e) => handleChange('search', e.target.value)}
                />
            </div>

        </section>
    );
}
