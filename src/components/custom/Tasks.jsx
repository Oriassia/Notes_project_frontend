import React, { useContext, useEffect, useState } from "react";
import api from "@/services/api.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TaskCard from "./TaskCard";
import TaskTable from "./TaskTable";
import CreateTaskDialog from "./CreateTaskDialog";
import { FaThList, FaTh } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

function Tasks() {
  const { loggedInUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTableView, setIsTableView] = useState(false);
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);

  const pinnedTasks = userTasks.filter((task) => task.isPinned);
  const unPinnedTasks = userTasks.filter((task) => !task.isPinned);

  useEffect(() => {
    if (loggedInUser) {
      fetchUserTasks();
    } else {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const fetchUserTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setUserTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      logout();
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleNoteEdit = async (taskId, newData) => {
    try {
      const updatedTasks = userTasks.map((task) =>
        task._id === taskId ? { ...task, ...newData } : task
      );
      renderTasks(updatedTasks);

      await api.put(`/tasks/${taskId}`, newData);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const renderTasks = (updatedTasks) => {
    setUserTasks(updatedTasks);
  };

  const handlePinnedChange = async (taskId, isPinned) => {
    const updatedTasks = userTasks.map((task) =>
      task._id === taskId ? { ...task, isPinned: !isPinned } : task
    );
    setUserTasks(updatedTasks);
    try {
      await api.put(`/tasks/${taskId}`, {
        isPinned: !isPinned,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setUserTasks([...userTasks, newTask]);
  };

  const toggleView = () => {
    setIsTableView((prev) => !prev);
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4 p-7">
        <div className="text-4xl font-semibold leading-none tracking-tight">
          My Tasks
        </div>
        <div className="flex flex-col items-center gap-3">
          <Switch
            checked={isTableView}
            onClick={toggleView}
            aria-label="Toggle between card and table view"
            className="flex items-center"
          ></Switch>
          {isTableView ? <FaTh size={"25px"} /> : <FaThList size={"25px"} />}
          <span className="ml-2">
            {isTableView ? "Table View" : "Card View"}
          </span>
        </div>
      </div>
      <Button onClick={() => setIsCreateTaskDialogOpen(true)} className="mr-4">
        Create Task
      </Button>
      <CreateTaskDialog
        isOpen={isCreateTaskDialogOpen}
        onClose={() => setIsCreateTaskDialogOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
      {isTableView ? (
        <TaskTable tasks={userTasks} handlePinnedChange={handlePinnedChange} />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 p-7">
            {pinnedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                handlePinnedChange={handlePinnedChange}
                handleNoteEdit={handleNoteEdit}
                renderTasks={renderTasks}
              />
            ))}
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-3 p-7">
            {unPinnedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                handlePinnedChange={handlePinnedChange}
                handleNoteEdit={handleNoteEdit}
                userTasks={userTasks}
                renderTasks={renderTasks}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Tasks;
