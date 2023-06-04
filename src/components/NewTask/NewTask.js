

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../Hooks/use-http'

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequests } = useHttp();

 
 const createTask = (taskText, taskData) => {
  const generateId = taskData.name;
  const createdTask = { id: generateId, text: taskText};

  props.onAddTask(createdTask)
 }

 const enterTaskHandler = async( taskText) => {
  sendTaskRequests(
    {
      url: 'https://react-http-ke-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {text: taskText},
    },
    createTask.bind(null, taskText)
  )
 }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
