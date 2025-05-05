import { Subscription } from "./Subscription";

export interface Course {
  id: string;
  name: string;
  teacher: string;
  subscriptions: Subscription[]
}
