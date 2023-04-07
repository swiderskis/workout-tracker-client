import ButtonSpan from "../../../components/Button/ButtonSpan";
import IntegerSelectInput from "../../../components/Form/IntegerSelectInput";
import IntegerTextInput from "../../../components/Form/IntegerTextInput";
import equipment from "../../../enums/equipment";
import useNameFromEnum from "../../../hooks/useNameFromEnum";
import { SessionExercise } from "../../../interfaces/SessionInformation";

interface SessionExerciseElementProps {
  exercise: SessionExercise;
  exerciseIndex: number;
  updateWeight: (
    weight: number,
    exerciseIndex: number,
    weightIndex: number
  ) => void;
  updateReps: (reps: number, exerciseIndex: number, repsIndex: number) => void;
  addSet: (exerciseIndex: number) => void;
  removeSet: (exerciseIndex: number, setIndex: number) => void;
}

function SessionExerciseElement(props: SessionExerciseElementProps) {
  return (
    <>
      <h4>{`${useNameFromEnum(props.exercise.equipmentId, equipment)} 
      ${props.exercise.exerciseName}`}</h4>
      <table className="w3-table w3-striped w3-centered">
        <thead>
          <tr className="w3-light-grey">
            <td>Weight</td>
            <td>Reps</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {props.exercise.weight.map((element, index) => (
            <tr key={index}>
              <td>
                <div>
                  <IntegerTextInput
                    name={`${props.exercise.exerciseEquipmentLinkId}-set-${
                      index + 1
                    }`}
                    value={element}
                    onChange={(weight) =>
                      props.updateWeight(weight, props.exerciseIndex, index)
                    }
                  />
                </div>
              </td>
              <td>
                <IntegerSelectInput
                  value={props.exercise.reps[index]}
                  maxValue={30}
                  onChange={(reps) =>
                    props.updateReps(reps, props.exerciseIndex, index)
                  }
                />
              </td>
              <td>
                <ButtonSpan
                  value="Remove"
                  onClick={() => props.removeSet(props.exerciseIndex, index)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td />
            <td />
            <td>
              <ButtonSpan
                value="Add"
                onClick={() => props.addSet(props.exerciseIndex)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default SessionExerciseElement;
