export interface Goal {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
}

export interface CreateGoal {
  name: string;
  icon: string;
}
