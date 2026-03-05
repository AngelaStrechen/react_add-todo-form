import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const user = usersFromServer.find(u => u.id === userId);

    const newTodo = {
      id: newId,
      title,
      userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setUserError(false);
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => {
          const user = usersFromServer.find(u => u.id === todo.userId);

          return (
            <article
              key={todo.id}
              data-id={todo.id}
              className={`TodoInfo ${
                todo.completed ? 'TodoInfo--completed' : ''
              }`}
            >
              <h2 className="TodoInfo__title">{todo.title}</h2>

              {user && (
                <a className="UserInfo" href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
};
