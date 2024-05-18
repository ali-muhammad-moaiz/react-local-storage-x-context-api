import { useState } from 'react'
import PropTypes from 'prop-types';
import { useData } from '../contexts'

TodoNote.propTypes = {
  todoNote: PropTypes.object.isRequired,
};

function TodoNote({todoNote}) {
  const {setTodosList} = useData();
  const [ifUpdate, setIfUpdate] = useState(false);
  const [todoMsgState, setTodoMsgState] = useState(todoNote.todoMsg);
  const [ifChecked, setIfChecked] = useState(todoNote.checked);

  const handleUpdate = () => {
    if(ifChecked)
      return;
    
    setIfUpdate((prevValue) => !prevValue);
    if(ifUpdate){
      setTodosList((existingTodosList) => {
        const existingIndex = existingTodosList.findIndex(todo => todo.id === todoNote.id);
        if (existingIndex !== -1) {
          todoNote.todoMsg = todoMsgState;
          const updatedTodosList = [...existingTodosList];
          updatedTodosList[existingIndex] = todoNote;
          return updatedTodosList;
        }
      });
    }
  }

  const handleComplete = () =>{
    setIfChecked((prevValue) => {
      if(prevValue)
        return prevValue;
      else{
        setTodosList((existingTodosList) => {
          const existingIndex = existingTodosList.findIndex(todo => todo.id === todoNote.id);
          if (existingIndex !== -1) {
            todoNote.checked = !prevValue;
            const updatedTodosList = [...existingTodosList];
            updatedTodosList[existingIndex] = todoNote;
            return updatedTodosList;
          }
        });
        return !prevValue;
      }
      });
  }

  return (
    <>
        <br />
        <div className="relative">
            <div className="flex items-center">
                <input onChange={handleComplete} checked={todoNote.checked} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 me-2"/>
                <input onChange={(e) => setTodoMsgState(e.target.value)} readOnly={!ifUpdate} value={todoMsgState} type="text" id="editNote" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <button onClick={handleUpdate} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{ifUpdate ? 'Save': 'Edit'}</button>
        </div> 
    </>
  )
}

export default TodoNote