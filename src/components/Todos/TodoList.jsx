import "./TodoListStyles.css";

import Todo from "./Todo";

export default function TodoList({
  Todos,
  DeleteTasksHandler,
  ToggleHandler,
  PersonAim,
  personAim,
  ChangingAimText,
  setChangingStatus,
  SettingData,
}) {
  return (
    <div className="TodoListWrapper">
      <>
        {Todos.length !== 0 && (
          <div className="ChosenTodo">
            <div className="number-one-text-wrapper">#1</div>
            <div className="following-task">
              ToDo: <span className="todoTextWrapper">{personAim}</span>
            </div>
          </div>
        )}
      </>

      {Todos.map((textData) => {
        return (
          <Todo
            todo={textData}
            DeleteTasksHandler={DeleteTasksHandler}
            ToggleHandler={ToggleHandler}
            PersonAim={PersonAim}
            ChangingAimText={ChangingAimText}
            setChangingStatus={setChangingStatus}
            SettingData={SettingData}
            key={textData.id}
          ></Todo>
        );
      })}
    </div>
  );
}
