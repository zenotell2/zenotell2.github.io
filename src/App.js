import { useState } from "react";
import "./App.css";

import Timer from "./components/TimerVisualComp";
import TodoForm from "./components/Todos/TodoForm";
import TodoList from "./components/Todos/TodoList";

function App() {
  const [Todos, setTodos] = useState([]);
  const [personAim, setPersonAim] = useState("");
  const [changingStatus, setChangingStatus] = useState("");

  // delete todo tasks
  function DeleteTasksHandler(id) {
    setTodos(Todos.filter((todo) => todo.id !== id));
  }

  // tasks toggler
  function ToggleHandler(id) {
    setTodos(
      Todos.map((todo) => {
        if (todo.id === id) {
          if (todo.tracking) {
            setPersonAim("");
          }
          return {
            ...todo,
            completedStatus: !todo.completedStatus,
            tracking: false,
          };
        } else {
          return { ...todo };
        }
      })
    );
  }

  function PersonAim(id) {
    setTodos(
      Todos.map((todo) => {
        if (todo.id === id) {
          const buff = {
            ...todo,
            tracking: !todo.tracking,
          };
          if (buff.tracking) {
            setPersonAim(todo.text);
          } else {
            setPersonAim("");
          }
          return buff;
        } else {
          return { ...todo, tracking: false };
        }
      })
    );
  }

  function ChangingAimText(id) {
    setTodos(
      Todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            changing: !todo.changing,
          };
        } else {
          return {
            ...todo,
            changing: false,
          };
        }
      })
    );
  }

  function SettingData(id) {
    setTodos(
      Todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: changingStatus,
            changing: false,
          };
        } else {
          return { ...todo, changing: false };
        }
      })
    );
  }

  return (
    <div className="App">
      <Timer></Timer>
      <TodoList
        Todos={Todos}
        DeleteTasksHandler={DeleteTasksHandler}
        ToggleHandler={ToggleHandler}
        PersonAim={PersonAim}
        personAim={personAim}
        ChangingAimText={ChangingAimText}
        setChangingStatus={setChangingStatus}
        SettingData={SettingData}
      ></TodoList>
      <TodoForm setTodos={setTodos} Todos={Todos}></TodoForm>
    </div>
  );
}

export default App;
