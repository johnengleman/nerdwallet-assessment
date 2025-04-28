import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import GetTodosAction from "./actions/GetTodosAction";
import GetPriorityCountsAction from "./actions/GetPriorityCounts";
import TaskContainer from "./components/TaskContainer/TaskContainer.client";

export default async function Home() {
  const initialTasks = await GetTodosAction();
  const priorityCounts = await GetPriorityCountsAction();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width="100vw">
        <TaskContainer
          initialTasks={initialTasks}
          priorityCounts={priorityCounts}
        />
      </Box>
    </Container>
  );
}
