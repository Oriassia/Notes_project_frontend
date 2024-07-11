import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Pin, PinOff, X } from "lucide-react";
import api from "@/services/api.service";
import TaskDetailsDialog from "./TaskDetailsDialog";
import { toastUtils as toast } from "@/lib/utils";

function TaskCard({
  task,
  handlePinnedChange,
  handleNoteEdit,
  setUserTasks,
  userTasks,
}) {
  // const [todoList, setTodoList] = useState(task.todoList);
  const [detailsDialogIsOpen, setDetailsDialogIsOpen] = useState(false);

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setUserTasks(userTasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting task.");
    }
  };

  return (
    <>
      <Card
        className={`relative border-4 border-opacity-45 ${
          task.isPinned ? "border-yellow-600" : "border-gray-500"
        } `}
      >
        {task.isPinned ? (
          <PinOff
            className="absolute top-4 right-3 cursor-pointer"
            onClick={() => handlePinnedChange(task._id, task.isPinned)}
          />
        ) : (
          <Pin
            className="absolute top-4 right-3 cursor-pointer"
            onClick={() => handlePinnedChange(task._id, task.isPinned)}
          />
        )}

        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-start">
          <button onClick={() => setDetailsDialogIsOpen(true)}>
            Show more
          </button>
        </CardFooter>
      </Card>

      <TaskDetailsDialog // triggers by state
        isOpen={detailsDialogIsOpen}
        onClose={() => setDetailsDialogIsOpen(false)}
        task={task}
        // setTodoList={setTodoList}
        // todoList={todoList}
        // handleTodoCheckBoxChange={handleTodoCheckBoxChange}
        handleNoteEdit={handleNoteEdit}
        handleDeleteTask={handleDeleteTask}
        // userTasks={userTasks}
        // setUserTasks={setUserTasks}
      />
    </>
  );
}

export default TaskCard;
