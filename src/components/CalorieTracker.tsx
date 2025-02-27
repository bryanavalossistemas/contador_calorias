import { useMemo } from "react";
import { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.categoryId === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBorned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.categoryId === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBorned,
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorías
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />

        <CalorieDisplay calories={caloriesBorned} text="Quemadas" />

        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
}
