function TodoItem({todo, onChange, onDelete}) {
  return (
    <div>
      <label>
        <input type='checkbox' checked={todo.isCompleted} onChange={(e) => {
          onChange({
            ...todo,
            isCompleted: e.target.checked,
          });
        }} />
        {todo.text}
        <button onClick={() => {
          onDelete(todo);
        }}>x</button>
      </label>
    </div>
  );
}

export default TodoItem;