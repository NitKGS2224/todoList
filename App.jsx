import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
   const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });


  useEffect(() => {
   localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // const [todo, setTodo] = useState(""); // it is come from div text {todo}//
  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   let todoString = localStorage.getItem("todos");

  //   if (todoString) {
  //     let todos = JSON.parse(localStorage.getItem("todos"));
  //     setTodos(todos);
  //   }
  // }, []);

  // const saveToLS = (params) => {
    

  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };

  // it is the  todos array store all random value //

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    // saveToLS();
    setTodo("");
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLS(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id); //  i t is a new todo which declared for "edit"//
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    // saveToLS();
  };
  console.log(todo);

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh]">
        <div className="addTodo my-5">
          <h2 className=" text-lg font-bold">Add a Todo</h2>

          <input
            onChange={handleChange}
            value={todo}
            type="text "
            className="w-1/2"
          />
          <button
            onClick={handleAdd}
            className="bg-amber-500 hover :bg-amber-400 p-8 py-1 text -sm font-bold  text-white rounded-md mx-4"
          >
            Save
          </button>
        </div>
        <h2 className="text-xl font-bold"> Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5"> No Todos Display</div>}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-1/4 my -3  mb-3 justify-between"
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-amber-500 hover:bg-amber-400  p-8 py-1 text -sm font-bold  text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-amber-500 hover :bg-amber-400 p-8 py-1 text -sm font-bold  text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
