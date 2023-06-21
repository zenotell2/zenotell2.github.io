import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoFormStyles.css";

export default function TodoForm({ setTodos, Todos }) {
  const [enterField, setEnterField] = useState(false);

  const [inputTextData, setInputTextData] = useState("");

  function SetTodoText() {
    setEnterField(false);

    if (inputTextData !== "") {
      const newTodo = {
        id: uuidv4(),
        text: inputTextData,
        completedStatus: false,
        tracking: false,
        changing: false,
      };

      setTodos([...Todos, newTodo]);
      setInputTextData("");
    }
  }

  return (
    <>
      {!enterField && (
        <div
          className="TodoButtonWrapper"
          onClick={
            enterField ? () => setEnterField(false) : () => setEnterField(true)
          }
        >
          <div className="TodoAddButtonText">Add Task</div>
        </div>
      )}
      {enterField && (
        <div className="TodoInputFieldsWrapper">
          <div className="InputField">
            <input
              type="text"
              placeholder="What are you working on?"
              value={inputTextData}
              onChange={(e) => setInputTextData(e.target.value)}
              name="inputTodoData"
            ></input>
          </div>
          <div className="AcceptFooter">
            <div className="ButtonsWrapper">
              <div onClick={() => setEnterField(false)}>Cancel</div>
              <div className="acceptButton" onClick={() => SetTodoText()}>
                Accept
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
