import './App.css';
import {useState} from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoFooter from './TodoFooter';

function reducer(state, action) {
  if (action.type === 'add') {
    return [
      ...state,
      {
        id: Math.random(),
        text: action.payload.text,
        isCompleted: false,
      },
    ];
  } else if (action.type === 'delete') {
    return state.filter((t) => t.id !== action.payload.id);
  } else if (action.type === 'change') {
    return state.map((todo) => {
        if (todo.id === action.payload.newTodo.id) {
          return action.payload.newTodo;
        }
        return todo;
      });
  } else if (action.type === 'isCompleted') {
    return state.filter((todo) => !todo.isCompleted);
  }
}

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  return [state, (action) => {
    const newState = reducer(state, action);
    setState(newState);
  }];
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [
    {
      id: Math.random(),
      text: 'JavaScript',
      isCompleted: false,
    },
    {
      id: Math.random(),
      text: 'React JS',
      isCompleted: false,
    },
    {
      id: Math.random(),
      text: 'Node JS',
      isCompleted: false,
    },
  ]);

  return (
    <div className="App">
      <TodoForm onAdd={(text) => {
        dispatch({
          type: 'add',
          payload: {
            text: text,
          },
        });
      }} />
      <TodoList 
        todos={todos} 
        onDelete={(todo) => {
          dispatch({
            type: 'delete',
            payload: {
              id: todo.id,
            },
          });
        }}
        onChange={(newTodo) => {
          dispatch({
            type: 'change',
            payload: {
              newTodo: newTodo,
            }
          });
        }}
      />
      <TodoFooter todos={todos} onClearCopleted={()=> {
        dispatch({
          type: 'isCompleted',
          payload: {
            isCompleted: todos.isCompleted,
          },
        });
      }} />
    </div>
  );
}

export default App;
