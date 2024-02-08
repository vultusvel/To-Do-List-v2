export interface PropsHeader {
    text: string
    bg: string
    count: number
}

export interface Task {
    id: string;
    name: string;
    status: string;
}

export interface TaskProps {
    task?: { id: number | string; name: string | number };
    tasks: any;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    status?: string
    todos?: string[]
    inProgress?: string[]
    closed?: string[]
}