import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const tasks = [
  {
    id: 2,
    title: 'Connect Firebase to our app',
    finished: false,
  },
  {
    id: 1,
    title: 'Create basic React app',
    finished: true,
  }
];

function TaskOverview() {
    const taskInput = useRef();
    const navigate = useNavigate();
  
    const addTask = useCallback(() => {
      const title = taskInput.current.value;
      if (!title?.trim()) return;

      // TODO: Add task to firestore
  
      taskInput.current.value = '';
    }, [taskInput]);
  
    const updateTask = (taskId, isFinished) => {
      // TODO: Update task to firestore
    };
  
    const deleteTask = (taskId) => {
      // TODO: Delete task in firestore
    };

    const logout = () => {
      // TODO: Log out firestore auth

      navigate('/login');
    }
  
    return (
        <>
            <button className='bg-gray-300 px-2 py-1 rounded mb-5' onClick={logout}>Logout</button>
            <div className='taskContainer'>
                {tasks?.map(task => {
                  return (
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
                  );
                })}
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
        </>
    );
}

export default TaskOverview;
