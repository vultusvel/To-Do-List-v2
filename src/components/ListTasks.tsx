import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDrag, useDrop } from 'react-dnd';
import { PropsHeader, Task, TaskProps } from '@/types';
import './styles.css'


const Section: React.FC<TaskProps> = ({
    status, tasks, setTasks, inProgress, closed,
}) => {
    const addItem = (id: string) => {
        setTasks((prev: any) => {
            const mTasks = prev.map((t: Task) => (t.id === id ? { ...t, status } : t));
            localStorage.setItem('tasks', JSON.stringify(mTasks));
            return mTasks;
        });
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item: Task) => addItem(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    let tasksToMap = tasks.filter((task: Task) => task.status === status);

    let text = 'ToDo';
    let bg = 'bg-slate-500';

    if (status === 'inprogress') {
        text = 'In Progress';
        bg = 'bg-purple-500';
        tasksToMap = inProgress;
    }

    if (status === 'closed') {
        text = 'Closed';
        bg = 'bg-green-500';
        tasksToMap = closed;
    }

    return (
        <div ref={drop} className={`w-64 ${isOver ? 'bg-slate-200' : ''}`}>
            <Header text={text} bg={bg} count={tasksToMap.length} />
            {tasksToMap.length > 0 && tasksToMap.map((task: Task, index: number) => <Tasks key={index} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    );
};

const Header: React.FC<PropsHeader> = ({ text, bg, count }) => (
    <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
        {text}
        <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
            {count}
        </div>
    </div>
);

const Tasks: React.FC<TaskProps> = ({ task, tasks, setTasks }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task?.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
    }));

    const handleRemove = (id: string | number) => {
        if (tasks) {
            const filteredTasks = tasks.filter((t: Task) => {
                if (typeof t === 'object' && t !== null && 'id' in t) {
                    return (t as { id: number | string }).id !== id;
                } else {
                    return t !== id;
                }
            });

            localStorage.setItem('tasks', JSON.stringify(filteredTasks));
            setTasks(filteredTasks);
            toast('Tasks removed', { icon: '💀' });
        }
    };
    return (
        <div ref={drag} className={`relative p-4 mt-8 shadow-md ${isDragging ? 'opacity-25' : 'opacity-100'} rounded-md cursor-grab`}>
            {task && (
                <>
                    <p className="cursor-grap taskName">{task.name}</p>
                    <button type="button" className="absolute bottom-1 right-1 text-slate-400 remove" onClick={() => handleRemove(task.id)}>
                        -
                    </button>
                </>
            )}
        </div>
    );
};

const ListTasks: React.FC<TaskProps> = ({ tasks, setTasks }) => {
    const [todos, setToDos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {
        const fTodos = tasks.filter((task: Task) => task.status === 'todo');
        const fInProgress = tasks.filter((task: Task) => task.status === 'inprogress');
        const fClosed = tasks.filter((task: Task) => task.status === 'closed');
        setToDos(fTodos);
        setInProgress(fInProgress);
        setClosed(fClosed);
    }, [tasks]);

    const statuses = ['todo', 'inprogress', 'closed'];

    return (
        <div className="flex gap-16 tasks">
            {statuses.map((status, index) => (
                <Section
                    key={index}
                    status={status}
                    tasks={tasks}
                    setTasks={setTasks}
                    todos={todos}
                    inProgress={inProgress}
                    closed={closed}
                />
            ))}

        </div>
    );
};

export default ListTasks;
