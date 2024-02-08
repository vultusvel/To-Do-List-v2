import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ListTasks from '../src/components/ListTasks';
import CreateTasks from '../src/components/CreateTasks';
import { Task } from './types';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks !== null) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div>
        <CreateTasks tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
