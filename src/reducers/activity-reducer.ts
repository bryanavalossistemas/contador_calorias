import type { Activity } from "../types";

export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { activityId: Activity["id"] } }
  | { type: "delete-activity"; payload: { activityId: Activity["id"] } }
  | { type: "restart-app" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

export const initialState: ActivityState = {
  activities: localStorage.getItem("activities")
    ? JSON.parse(localStorage.getItem("activities")!)
    : [],
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.activityId,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.activityId
      ),
    };
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
