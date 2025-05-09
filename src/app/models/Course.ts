import mongoose, { Schema, Document } from 'mongoose';
import { Subscription } from './Subscription';
export interface Course1 {
  _id?: string;
  id: string;
  name: string;
  teacher: string;
  subscriptions: Subscription[];
}

export interface ISubscription {
  id: string;
  expiryDate: string;
  hasRenewed: boolean;
}

export interface ICourse extends Document {
  name: string;
  teacher: string;
  subscriptions: ISubscription[];
}

const SubscriptionSchema = new Schema<ISubscription>({
  id: { type: String, required: true },
  expiryDate: { type: String, required: true },
  hasRenewed: { type: Boolean, required: true }
});

const CourseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  teacher: { type: String, required: true },
  subscriptions: [SubscriptionSchema]
});

export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
