import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [date, setDate] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('my-todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === '') return;

    const selectedDate = date || new Date().toISOString().split("T")[0]; // Default today's date
    const currentTime = new Date().toLocaleString();

    setTodos([...todos, {
      id: uuidv4(),
      todo,
      date: selectedDate,
      createdAt: currentTime,
      isCompleted: false
    }]);
    setTodo('');
    setDate('');
  };

  const handleDelete = (e, id) => {
    const confirmation = window.prompt("Are you sure you want to delete this to-do? Type 'delete' to confirm:");
    if (confirmation?.toLowerCase() === 'delete') {
      setTodos(todos.filter(item => item.id !== id));
    } else {
      alert('Deletion cancelled.');
    }
  };

  const handleDeleteAll = () => {
    const confirmation = window.prompt("Are you sure you want to delete all todos? Type 'delete all' to confirm:");
    if (confirmation?.toLowerCase() === 'delete all') {
      setTodos([]);
      localStorage.removeItem('my-todos'); // Ensure local storage is cleared
    } else {
      alert('Deletion cancelled.');
    }
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
      const newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSave = (id) => {
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, todo: editText } : item
    );
    setTodos(newTodos);
    setEditId(null);
    setEditText('');
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center m-[15px]">
        <div
          className="m-2 h-[600px] w-[300px] border-b-black bg-url border-3 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: "url('https://mcdn.wallpapersafari.com/medium/95/54/nXPFks.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex justify-center">
            <video src="./src/assets/Animation.webm" autoPlay loop muted playsInline className="h-50 w-auto" />
          </div>

          <div className="flex flex-col p-2 space-y-4 w-full max-w-md mx-auto mt-4 relative z-10">
            {/* Input Fields */}
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                onChange={handleChange}
                value={todo}
                placeholder="Enter your task..."
                className=" placeholder-white font-bold flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
              <button
                type="submit"
                onClick={handleAdd}
                className="w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200 "
              >
                <img src="https://img.icons8.com/?size=100&id=fjGcUEEb5brP&format=png&color=000000" alt="+" />
              </button>
            </div>

            {/* Delete All Button */}
            <button
              onClick={handleDeleteAll}
              className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition duration-200 text-sm"
            >
              Delete All
            </button>

            {/* Todo List */}
            <div className="flex flex-col overflow-y-auto h-[300px] px-2 scrollbar-black">
              {todos.length === 0 && (
                <div className="text-center mt-4 text-white">No Todos to display</div>
              )}

              {todos.map((item) => (
                <div key={item.id} className="flex flex-col bg-white shadow-md p-2 rounded-md w-full mt-4 break-words">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 overflow-hidden w-[180px]">
                      <input
                        name={item.id}
                        type="checkbox"
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      {editId === item.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={handleEditChange}
                          className="px-2 py-1 border rounded-md text-sm w-full"
                        />
                      ) : (
                        <span className={`text-sm ${item.isCompleted ? 'line-through' : ''}`}>
                          {item.todo}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {editId === item.id ? (
                        <button
                          onClick={() => handleSave(item.id)}
                          className="text-green-500 hover:text-green-700 text-sm"
                        >
                          💾
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(item.id, item.todo)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          ✏️
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Created: {item.createdAt}<br />
                    Due: {item.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
