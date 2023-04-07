export interface SessionDetails {
  name: string;
  date: Date;
  exercises: SessionExercise[];
}

export interface SessionExercise {
  exerciseEquipmentLinkId: number;
  exerciseName: string;
  equipmentId: number;
  weight: number[];
  reps: number[];
}
