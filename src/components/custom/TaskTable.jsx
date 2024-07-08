import React from "react";
import { Table } from "../ui/table";

const TaskTable = ({ tasks, handlePinnedChange }) => (
  <Table className="min-w-full border border-gray-200 dark:border-gray-700">
    <thead>
      <tr className="bg-gray-100 dark:bg-gray-800">
        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
          Title
        </th>
        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
          Description
        </th>
        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
          Body
        </th>
        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
          Completed Todos
        </th>
        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">
          Pinned
        </th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task) => (
        <tr key={task._id} className="even:bg-gray-50 dark:even:bg-gray-900">
          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
            {task.title}
          </td>
          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
            {task.description}
          </td>
          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
            {task.body}
          </td>
          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
            {`${task.todoList.filter((todo) => todo.isComplete).length} / ${
              task.todoList.length
            }`}
          </td>
          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
            <input
              type="checkbox"
              checked={task.isPinned}
              onChange={() => handlePinnedChange(task._id, task.isPinned)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TaskTable;
