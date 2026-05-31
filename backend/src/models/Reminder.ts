// Reminder model for scheduling notifications

export interface Reminder {
  id: string;
  userId: string;
  type: 'water' | 'nutrition' | 'goal' | 'workout' | 'mood';
  title: string;
  description?: string;
  scheduledTime: Date; // Time of day (e.g., 08:00)
  frequency: 'daily' | 'weekly' | 'custom'; // daily, weekly, or specific days
  daysOfWeek?: number[]; // 0=Sunday, 1=Monday, etc.
  isActive: boolean;
  lastNotificationSent?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  meals: MealEntry[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MealEntry {
  id: string;
  mealPlanId: string;
  dayOfWeek: number; // 0-6
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodName: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  quantity?: number;
  unit?: string;
}
