import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent,
  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activity/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.activities
      .edit(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteActiviy = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.activities
      .delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading Activities..." />;
  }
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          setEditmode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActiviy}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
