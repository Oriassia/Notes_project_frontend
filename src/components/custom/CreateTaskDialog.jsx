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
import { toast } from "../ui/use-toast";
import { AuthContext } from "../context/AuthContext";

const CreateTaskDialog = ({ isOpen, onClose, onTaskCreated }) => {
  const [newTodoList, setNewTodoList] = useState([
    { title: "", isComplete: false },
  ]);
  const { loggedInUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  function handleTodoChange(index, field, value) {
    const updatedTodoList = newTodoList.map((todo, i) =>
      i === index ? { ...todo, [field]: value } : todo
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
      toast({
        title: "Task created successfully",
        description: `${newTask.title}`,
      });
      onClose();
    } catch (error) {
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
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" required />
          </div>
          <div>
            <Label htmlFor="body">Body</Label>
            <Textarea name="body" required />
          </div>
          <div>
            <Label>Todo List</Label>
            {newTodoList.map((todo, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 space-y-2"
              >
                <Input
                  type="text"
                  placeholder="Todo title..."
                  value={todo.title}
                  onChange={(ev) =>
                    handleTodoChange(index, "title", ev.target.value)
                  }
                />
                <Input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={(ev) =>
                    handleTodoChange(index, "isComplete", ev.target.checked)
                  }
                />
                <Button
                  type="button"
                  onClick={() => removeTodo(index)}
                  className="bg-red-500 hover:bg-red-700 text-white"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addTodo} className="mt-2">
              Add Todo
            </Button>
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
