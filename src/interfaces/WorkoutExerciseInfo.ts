interface WorkoutExerciseBase {
  exerciseId: number;
  exerciseName: string;
  muscleGroupId: number;
}

export interface WorkoutExerciseInfo extends WorkoutExerciseBase {
  exerciseEquipmentLinkIds: number[];
  equipmentIds: number[];
}

export interface WorkoutExerciseSelection extends WorkoutExerciseBase {
  sets: number;
  reps: number;
  exerciseEquipmentLinkId: number;
  equipmentId: number;
}
