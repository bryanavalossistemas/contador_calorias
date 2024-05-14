import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/db";
import type { Activity } from "../types";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activity-reducer";

type FormProps = {
  dispatch: React.Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  categoryId: 0,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);
  useEffect(() => {
    if (state.activeId) {
      setActivity(
        state.activities.find((activity) => activity.id === state.activeId)!
      );
    }
  }, [state.activeId]);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    setActivity({
      ...activity,
      [e.target.id]: e.target.id === "name" ? e.target.value : +e.target.value,
    });
  }

  function isValidActivity() {
    const { name, calories, categoryId } = activity;
    if (name === "" || categoryId === 0 || calories === 0) {
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="categoryId" className="font-bold">
          Categoría:
        </label>
        <select
          onChange={handleChange}
          id="categoryId"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.categoryId}
        >
          <option disabled value={0}>
            Seleccionar Categoría
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          onChange={handleChange}
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja"
          value={activity.name}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          value={activity.calories}
          onChange={handleChange}
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. 300, 500"
        />
      </div>

      <input
        disabled={!isValidActivity()}
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold text-white uppercase cursor-pointer disabled:opacity-25"
        value={
          activity.categoryId === 0
            ? "Guardar Comida o Guardar Ejercicio"
            : activity.categoryId === 1
            ? "Guardar Comida"
            : "Guardar Ejercicio"
        }
      />
    </form>
  );
}
