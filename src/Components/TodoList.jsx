import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function TodoList({ todos, deleteTodo, startEditTodo }) {
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete it permanently",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(id);
        Swal.fire(
          'Deleted!',
          'Your todo has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id} className='flex justify-between items-center my-5 bg-gray-200 px-5 py-3 gap-5 rounded'>
          <p className='tracking-wider font-semibold w-full sm:w-80 break-words'>{todo.text}</p>
          <div className='flex gap-5'>
            <FontAwesomeIcon
              icon={faEdit}
              className='text-green-500 cursor-pointer'
              onClick={() => startEditTodo(todo)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className='text-red-500 cursor-pointer'
              onClick={() => handleDelete(todo.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
