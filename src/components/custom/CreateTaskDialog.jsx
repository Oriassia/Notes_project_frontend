import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/services/api.service";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { AuthContext } from "../context/AuthContext";
import { toastUtils as toast } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { CircleMinus } from "lucide-react";

const CreateTaskDialog = ({
  isOpen,
  onTaskCreated,
  // createTaskDialogIsOpen,
  setCreateTaskDialogIsOpen,
}) => {
  const [newTodoList, setNewTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function onClose() {
    setCreateTaskDialogIsOpen(false);
    setNewTodoList([]);
  }

  function handleTodoChange(index, title) {
    const updatedTodoList = newTodoList.map((todo, i) =>
      i === index ? { ...todo, title: title } : todo
    );
    setNewTodoList(updatedTodoList);
  }

  function addTodo() {
    setNewTodoList([...newTodoList, { title: "", isComplete: false }]);
  }

  function removeTodo(index) {
    const updatedTodos = newTodoList.filter((_, i) => i !== index);
    setNewTodoList(updatedTodos);
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    const formData = new FormData(ev.target);
    const newTask = {
      title: formData.get("title"),
      description: formData.get("description"),
      body: formData.get("body"),
      todoList: newTodoList,
    };

    try {
      const { data } = await api.post("/tasks", newTask);
      onTaskCreated(data.task);
      onClose();
      toast({
        title: "Task created successfully",
        description: `${newTask.title}`,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error creating task",
        description: error.message || "An error occurred",
        status: "error",
      });
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input name="title" required />
          </div>
          <div>
            <Label htmlFor="description" className={"flex gap-1 pb-1"}>
              <div className="">Description</div>
              <div className="text-gray-500 text-xs">(optional)</div>
            </Label>
            <Textarea name="description" />
          </div>
          {/* <div>
            <Label htmlFor="body" className={"flex gap-1 pb-1"}>
              <div className="">Body</div>
              <div className="text-gray-500 text-xs">(optional)</div>
            </Label>{" "}
            <Textarea name="body" />
          </div> */}
          <div>
            <Label htmlFor="description" className={"flex gap-1 pb-1"}>
              <div className="">Todo List</div>
              <div className="text-gray-500 text-xs">(optional)</div>
            </Label>
            <ul className="flex flex-col space-y-2">
              {newTodoList.map((todo, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Input
                    type="text"
                    placeholder="Todo title..."
                    value={todo.title}
                    onChange={(ev) =>
                      handleTodoChange(index, "title", ev.target.value)
                    }
                  />
                  <CircleMinus className="" onClick={() => removeTodo(index)} />
                </li>
              ))}
            </ul>
            <div
              onClick={addTodo}
              className="flex gap-1 mt-3 items-center text-sm"
            >
              <CirclePlus size={20} />
              Add Todo
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
