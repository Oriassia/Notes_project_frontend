import React, { useContext, useEffect, useState, useMemo } from "react";
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
import { SkeletonCard } from "./SkeletonCard";
import { toastUtils as toast } from "@/lib/utils";

function Tasks() {
  const { loggedInUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTableView, setIsTableView] = useState(false);
  const [createTaskDialogIsOpen, setCreateTaskDialogIsOpen] = useState(false);

  const pinnedTasks = userTasks.filter((task) => task.isPinned);

  const unPinnedTasks = userTasks.filter((task) => !task.isPinned);

  useEffect(() => {
    if (loggedInUser) fetchUserTasks();
    else navigate("/");
  }, [loggedInUser, navigate]);

  const fetchUserTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setUserTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      logout();
      setError("Failed to fetch tasks.");
      toast.error("Failed to fetch tasks.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleNoteEdit = async (taskId, newData) => {
    try {
      const updatedTasks = userTasks.map((task) =>
        task._id === taskId ? { ...task, ...newData } : task
      );
      setUserTasks(updatedTasks);
      await api.put(`/tasks/${taskId}`, newData);
      toast.success("Task updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task.");
    }
  };

  const handlePinnedChange = async (taskId, isPinned) => {
    const updatedTasks = userTasks.map((task) =>
      task._id === taskId ? { ...task, isPinned: !isPinned } : task
    );
    setUserTasks(updatedTasks);
    try {
      await api.put(`/tasks/${taskId}`, { isPinned: !isPinned });
      toast.success("Task pin status updated.");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task.");
    }
  };

  const handleTaskCreated = (newTask) => {
    setUserTasks([...userTasks, newTask]);
    toast.success("Task created successfully.");
  };

  const toggleView = () => setIsTableView((prev) => !prev);

  if (error) return <div>{error}</div>;

  const renderTaskCards = (tasks) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          handlePinnedChange={handlePinnedChange}
          handleNoteEdit={handleNoteEdit}
          setUserTasks={setUserTasks}
          userTasks={userTasks}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="p-10 flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="text-4xl font-semibold leading-none tracking-tight">
            My Tasks
          </div>
          <div className="flex justify-between items-center">
            <Button onClick={() => setCreateTaskDialogIsOpen(true)}>
              Create Task
            </Button>
            <div className="flex flex-col items-center gap-3">
              {isTableView ? (
                <FaTh onClick={toggleView} size={"25px"} />
              ) : (
                <FaThList onClick={toggleView} size={"25px"} />
              )}
              <span className="ml-2">
                {isTableView ? "Table View" : "Card View"}
              </span>
            </div>
          </div>
        </div>
        <Separator />

        {loading ? (
          <SkeletonCard /> // while loading
        ) : userTasks.length === 0 ? (
          <div>Looks like you dont have any task, Good job !</div>
        ) : isTableView ? (
          <TaskTable
            tasks={userTasks}
            handlePinnedChange={handlePinnedChange}
          /> // Table view
        ) : (
          // Cards view
          <div className="flex flex-col gap-5">
            {pinnedTasks.length > 0 && (
              <>
                <div className="text-2xl font-semibold leading-none tracking-tight">
                  Pinned Tasks
                </div>
                {renderTaskCards(pinnedTasks)}
                <Separator />
              </>
            )}
            <div className="text-2xl font-semibold leading-none tracking-tight">
              Unpinned Tasks
            </div>
            {renderTaskCards(unPinnedTasks)}
          </div>
        )}
        <CreateTaskDialog
          isOpen={createTaskDialogIsOpen}
          createTaskDialogIsOpen={createTaskDialogIsOpen}
          setCreateTaskDialogIsOpen={setCreateTaskDialogIsOpen}
          onTaskCreated={handleTaskCreated}
        />
      </div>
    </>
  );
}

export default Tasks;
