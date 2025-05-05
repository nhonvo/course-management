
export interface Course {
    id: string;
    name: string;
    teacher: string;
    subscriptions: {
      id: string;
      month: string;
      expiryDate: string;
      hasRenewed: boolean;
    }[];
  }
  