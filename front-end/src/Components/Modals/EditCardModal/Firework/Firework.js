import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function Firework() {
    const thisCard = useSelector((state) => state.card);
    const [completedTasks, setCompletedTasks] = useState(thisCard.completedTasks);
    const [tasks, setTasks] = useState([
        { id: 1, text: "Task 1", completed: false },
        { id: 2, text: "Task 2", completed: false },
        { id: 3, text: "Task 3", completed: false },
    ]);

    const handleTaskComplete = (taskId) => {
        const completedTask = tasks.find((task) => task.id === taskId);
        completedTask.completed = true;
        setTasks(tasks.filter((task) => task.id !== taskId));
        setCompletedTasks([...completedTasks, completedTask]);
    };

    return (
        <div className="App">
            <h1>Tasks</h1>
            <div className="tasks">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} onComplete={handleTaskComplete} />
                ))}
            </div>
            <h1>Completed Tasks</h1>
            <div className="completed-tasks">
                {completedTasks.map((task) => (
                    <CompletedTask key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

function Task({ task, onComplete }) {
    const handleComplete = () => {
        onComplete(task.id);
    };

    return (
        <div className="task">
            <div className="task-text">{task.text}</div>
            <button onClick={handleComplete}>Complete</button>
        </div>
    );
}

function CompletedTask({ task }) {
    return <div className="completed-task">{task.text}</div>;
}

export default Firework;