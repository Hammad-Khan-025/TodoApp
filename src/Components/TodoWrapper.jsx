import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

export default function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const addTodo = (text) => {
    if (editTodo) {
      // console.log(firebase.auth().currentUser)
      
      setTodos(todos.map(todo => (todo.id === editTodo.id ? { ...todo, text } : todo)));
      setEditTodo(null);
    } else {
      const newTodo = { id: uuidv4(), text };
      setTodos([...todos, newTodo]);
    } 
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditTodo = (todo) => {
    setEditTodo(todo);
  };

  const clearTodos = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete all todo item permanently",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos([]);
        Swal.fire(
          'Cleared!',
          'All todos have been cleared.',
          'success'
        );
      }
    });
  };

  return (
    <>
    <div className="bg-gradient-to-br from-rose-200 via-rose-400 to-rose-200 min-h-screen">
      <div className="flex justify-center sm:items-center px-3 py-10">
        <div className="shadow-2xl rounded-xl p-5 sm:p-10 w-full sm:w-[550px] bg-white">
          <h1 className="text-2xl md:text-3xl text-gray-900 font-bold tracking-widest text-center pb-10 uppercase">
            Todo App
          </h1>
          <TodoForm addTodo={addTodo} editTodo={editTodo} />

          <div className="my-10">
            <TodoList todos={todos} deleteTodo={deleteTodo} startEditTodo={startEditTodo} />
          </div>

          {todos.length > 0 && (
            <div className="text-center mt-4">
              <button
                className="text-red-500 hover:bg-red-200 px-3 py-1 rounded font-bold tracking-widest clear"
                onClick={clearTodos}
              >
                Clear Items
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
