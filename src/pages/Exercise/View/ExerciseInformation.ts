export interface ExerciseListInfo {
  exerciseId: number;
  exerciseName: string;
  muscleGroupId: number;
}

export interface ExerciseInformation extends ExerciseListInfo {
  equipmentIds: number[];
}
