import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TodoForm({ addTodo, editTodo }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (editTodo) {
      setInputValue(editTodo.text);
    } else {
      setInputValue("");
    }
  }, [editTodo]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Input field cannot be empty!',
      });
    } else {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add things here"
        className="border-2 border-r-0 border-gray-300 tracking-wide rounded-s-full py-2 px-5 w-full sm:w-96 focus:border-rose-400 focus:outline-none"
        onChange={handleChange}
        value={inputValue}
      />
      <button type="submit" className="submit-update-btn">
        {editTodo ? "Update" : "Submit"}
      </button>
    </form>
  );
}
