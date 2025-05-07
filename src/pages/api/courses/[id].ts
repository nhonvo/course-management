import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') return res.status(405).end('Method Not Allowed');

  if (!ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const { db } = await connectToDatabase();
    const course = await db.collection('courses').findOne({ _id: new ObjectId(id as string) });

    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json({
      id: course._id.toString(),
      name: course.name,
      teacher: course.teacher,
      subscriptions: course.subscriptions || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
