import TaskContainer from "./components/TaskContainer/TaskContainer.client";
import GetTodosAction from "./actions/GetTodosAction";
import GetPriorityCountsAction from "./actions/GetPriorityCounts";

export default async function Home() {
  const initialTasks = await GetTodosAction();
  const priorityCounts = await GetPriorityCountsAction();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <TaskContainer
        initialTasks={initialTasks}
        priorityCounts={priorityCounts}
      />
    </div>
  );
}
