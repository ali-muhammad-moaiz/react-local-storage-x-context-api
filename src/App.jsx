import { DataContextProvider } from './contexts';

import './App.css'
import TextForm from './components/TextForm'
import TextInput from './components/TextInput'

function App() {
  return (
    <DataContextProvider>
      <h1 className='font-bold py-3 text-4xl bg-slate-400'>To-do Notes</h1>
      <br />
      <TextForm/>
      <TextInput/>
    </DataContextProvider>
  )
}

export default App
