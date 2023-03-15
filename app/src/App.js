import { useRef } from 'react';
import './App.css';

const tasks = [
  {
    id: 1,
    title: 'Take out the trash',
    finished: false,
  },
  {
    id: 2,
    title: 'Write a basic react app',
    finished: true,
  }
];

function App() {
  const taskInput = useRef();

  const addTask = () => {
    const title = taskInput.current.value;
    if (!title?.trim()) return;

    console.log('ADDING TASK', title);
  };

  const updateTask = (taskId, isFinished) => {
    console.log('UPDATING TASK', taskId, isFinished);
  };

  const deleteTask = (taskId) => {
    console.log('DELETING TASK', taskId);
  };

  return (
    <div className="App mx-80 my-40">
      <div className='taskContainer'>
        {
          tasks.map(task => (
            <div key={task.id} className='task w-full flex mb-4 p-5 bg-gray-200 inline-block rounded'>
              <div className='flex-grow'>
                <span className='align-middle'>{task.title}</span>
              </div>
              {
                task.finished
                  ? <span
                      className='bg-green-300 px-2 py-1 cursor-pointer hover:bg-green-400 rounded'
                      onClick={() => updateTask(task.id, false)}
                    >DONE</span>
                  : <span
                      className='bg-orange-300 px-2 py-1 cursor-pointer hover:bg-orange-400 rounded'
                      onClick={() => updateTask(task.id, true)}
                    >TODO</span>
              }
              <button className='ml-3 align-middle' onClick={() => deleteTask(task.id)}>x</button>
            </div>
          ))
        }
      </div>
      <div className='my-10'>
        <hr/>
      </div>
      <div>
        <input
          ref={taskInput}
          className='block border center mx-auto mb-5 rounded px-2 py-2 min w-80'
          type='text'
          placeholder='Write your task...'
        />
        <button
          onClick={addTask}
          className='addTask center block rounded mx-auto px-10 py-4 bg-green-500 hover:bg-green-600 text-white'
        >
          Add task
        </button>
      </div>
    </div>
  );
}

export default App;
