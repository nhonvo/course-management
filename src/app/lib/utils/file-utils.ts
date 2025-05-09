import { Course } from '@/app/models/Course';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/app/data/courses.json');

export async function readData() {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
}

export async function writeData(data: Course[]) {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}
