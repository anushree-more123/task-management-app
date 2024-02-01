import './App.css';
import TaskTable from './Compoenent/TaskTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddEditTask from './Compoenent/AddEditTask';
import './Compoenent/style.css'
import DeleteTaskModal from './Compoenent/DeleteTaskModal';

function App() {
  return (
    <div className='main-wrapper'>
      <AddEditTask />
      <TaskTable />
      <DeleteTaskModal />
    </div>
  );
}

export default App;
