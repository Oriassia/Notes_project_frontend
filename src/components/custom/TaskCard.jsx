import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Pin, PinOff, X } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogContentComp from "./DialogContentComp";
import api from "@/services/api.service";
import { toast } from "../ui/use-toast";

function TaskCard({
  task,
  handlePinnedChange,
  handleNoteEdit,
  renderTasks,
  userTasks,
}) {
  const [todoList, setTodoList] = useState(task.todoList);

  const handleTodoCheckBoxChange = async (todoInput) => {
    const updatedTodos = todoList.map((todoitem) =>
      todoitem._id === todoInput._id
        ? { ...todoitem, isComplete: !todoitem.isComplete }
        : todoitem
    );
    setTodoList(updatedTodos);
    try {
      await api.put(`/tasks/${task._id}`, {
        todoList: updatedTodos,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  async function handleDeleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`);
      renderTasks(userTasks.filter((task) => task._id !== taskId));
      toast({
        title: "Note deleted sucssfully",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <Card className="relative">
        <X
          className="absolute top-3 left-3"
          onClick={() => handleDeleteTask(task._id)}
        />

        {task.isPinned ? (
          <Pin
            className="absolute top-4 right-3 cursor-pointer"
            onClick={() => handlePinnedChange(task._id, task.isPinned)}
          />
        ) : (
          <PinOff
            className="absolute top-4 right-3 cursor-pointer"
            onClick={() => handlePinnedChange(task._id, task.isPinned)}
          />
        )}

        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <DialogTrigger>
          <CardFooter>Show more</CardFooter>
        </DialogTrigger>
        <DialogContentComp
          task={task}
          todoList={todoList}
          setTodoList={setTodoList}
          handleTodoCheckBoxChange={handleTodoCheckBoxChange}
          handleNoteEdit={handleNoteEdit}
        />
      </Card>
    </Dialog>
  );
}

export default TaskCard;
