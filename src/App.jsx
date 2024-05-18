import './App.css'
import { DataContextProvider } from './contexts';
import TextForm from './components/TextForm'
import TodoNote from './components/TodoNote'
import { useEffect, useState } from 'react';

function App() {
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todosList');

    if (storedTodos) {
      const existingTodos = JSON.parse(storedTodos);
      setTodosList(existingTodos);
    }
  }, []);
  
  useEffect(() => {
    if(todosList && todosList.length > 0)
      localStorage.setItem('todosList', JSON.stringify(todosList))
  }, [todosList]);

  return (
    <DataContextProvider value={{todosList, setTodosList}}>
      <h1 className='font-bold py-3 text-4xl bg-slate-400'>To-do Notes</h1>
      <br />
      <TextForm/>
      {
        todosList.map((todoNote) => {
          if(todoNote.id)
            return (
              <div key={todoNote.id}>
                <TodoNote todoNote={todoNote} />
              </div>
            );
        })
      }
    </DataContextProvider>
  )
}

export default App
