export interface SessionExercise {
  exerciseEquipmentLinkId: number;
  exerciseName: string;
  equipmentId: number;
  weight: number[];
  reps: number[];
}

export interface SessionDetails {
  name: string;
  date: Date;
  exercises: SessionExercise[];
}

export interface SessionSubmitDetails {
  name: string;
  date: string;
  exercises: SessionExercise[];
}
