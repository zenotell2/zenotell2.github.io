import "./TodoListStyles.css";

import trash_box from "../../icons/4115238_delete_trash_icon.png";
import follow_blank from "../../icons/8674885_ic_fluent_form_new_regular_icon.png";

export default function Todo({
  todo,
  DeleteTasksHandler,
  ToggleHandler,
  PersonAim,
  ChangingAimText,
  setChangingStatus,
  SettingData,
}) {
  return (
    <div className={todo.completedStatus ? "todo-done" : "todo"}>
      <div className="todo-text-wrapper">
        <>{todo.tracking && <div className="tracking-block"></div>}</>

        <div className="functionality-wrapper">
          <div
            className={
              todo.completedStatus ? "set-to-done" : "set-to-done-not-done"
            }
            onClick={() => ToggleHandler(todo.id)}
          ></div>
          <div
            className={todo.completedStatus ? "follow-not-follow" : "follow"}
            onClick={() => PersonAim(todo.id)}
            style={todo.completedStatus ? { zIndex: "-1" } : { zIndex: "0" }}
          >
            <img src={follow_blank} alt="follow" width={20} />
          </div>

          <>
            {todo.changing && (
              <div className="text-changing">
                <input
                  type="text"
                  onChange={(e) => setChangingStatus(e.target.value)}
                  name="text-changing"
                ></input>
                <div
                  className="save-changes-button"
                  onClick={() => SettingData(todo.id)}
                >
                  Save
                </div>
              </div>
            )}
          </>

          <>
            {!todo.changing && (
              <div
                className={todo.completedStatus ? "todo-text-done" : ""}
                onDoubleClick={() => ChangingAimText(todo.id)}
              >
                {todo.text}
              </div>
            )}
          </>
        </div>

        <div className="trash" onClick={() => DeleteTasksHandler(todo.id)}>
          <img src={trash_box} alt="trash-box" width={22}></img>
        </div>
      </div>
    </div>
  );
}
