import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { Task, TaskProps } from '@/types';
import './styles.css'

const CreateTasks: React.FC<TaskProps> = ({ setTasks }) => {
  const [task, setTask] = useState({
    id: '',
    name: '',
    status: 'todo',
  });

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault();
    if (task.name.length < 3) {
      toast.error('Error');
      return;
    }

    setTasks((prev: Task[]) => {
      const list = [...prev, task];
      localStorage.setItem('tasks', JSON.stringify(list));
      return list;
    });
    toast.success('Task created');

    setTask({
      id: '',
      name: '',
      status: 'todo',
    });
  };
  return (
    <div>
      <form className='form' >
        <TextField
          label="Filled"
          variant="filled"
          value={task.name}
          className='text'
          onChange={(e) => {
            setTask({ ...task, id: uuidv4(), name: e.target.value });
          }}
        />
        <Button
        className='button'
          href="#"
          variant="contained"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateTasks;
