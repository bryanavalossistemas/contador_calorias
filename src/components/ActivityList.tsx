import { useMemo } from "react";
import type { Activity } from "../types";
import { categories } from "../data/db";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  const categoryName = useMemo(
    () => (categoryId: Activity["categoryId"]) => {
      return categories.find((category) => category.id === categoryId)!.name;
    },
    [activities]
  );

  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      {isEmptyActivities ? (
        <p className="text-center">No hay actividades aun</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  activity.categoryId === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(activity.categoryId)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} <span>Calorías</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { activityId: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="w-8 h-8 text-gray-800" />
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { activityId: activity.id },
                  })
                }
              >
                <XCircleIcon className="w-8 h-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
