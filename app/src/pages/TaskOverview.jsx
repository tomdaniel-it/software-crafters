import { collection, orderBy, query, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useCallback, useContext, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../utils/firebase';

function TaskOverview() {
    const taskInput = useRef();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
  
    const [tasksCollection, tasksLoading] = useCollection(
      query(
        collection(db, '/tasks'),
        orderBy('finished', 'asc'),
        orderBy('createdAt', 'desc'),
      )
    );
    const tasks = tasksCollection?.docs;
  
    const addTask = useCallback(() => {
      const title = taskInput.current.value;
      if (!title?.trim()) return;
  
      addDoc(collection(db, '/tasks'), {
        title,
        finished: false,
        createdAt: new Date().getTime()
      }).then(() => {
        taskInput.current.value = '';
      });
    }, [taskInput]);
  
    const updateTask = (taskId, isFinished) => {
      updateDoc(doc(db, 'tasks', taskId), {
        finished: isFinished,
      }).catch(err => alert(err.message));
    };
  
    const deleteTask = (taskId) => {
      deleteDoc(doc(db, 'tasks', taskId));
    };

    const logout = () => {
      auth.logout().then(() => {
        navigate('/login');
      })
    }
  
    return (
        <>
            <button className='bg-gray-300 px-2 py-1 rounded mb-5' onClick={logout}>Logout</button>
            <div className='taskContainer'>
                {!tasksLoading && tasks?.map(task => {
                  const taskId = task.id;
                  const taskData = task.data();

                  return (
                    <div key={taskId} className='task w-full flex mb-4 p-5 bg-gray-200 inline-block rounded'>
                      <div className='flex-grow'>
                          <span className='align-middle'>{taskData.title}</span>
                      </div>
                      {
                          taskData.finished
                          ? <span
                              className='bg-green-300 px-2 py-1 cursor-pointer hover:bg-green-400 rounded'
                              onClick={() => updateTask(taskId, false)}
                              >DONE</span>
                          : <span
                              className='bg-orange-300 px-2 py-1 cursor-pointer hover:bg-orange-400 rounded'
                              onClick={() => updateTask(taskId, true)}
                              >TODO</span>
                      }
                      <button className='ml-3 align-middle' onClick={() => deleteTask(taskId)}>x</button>
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
