import './App.css';
import TaskTable from './Compoenent/TaskTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import AddEditTask from './Compoenent/AddEditTask';
import './Compoenent/style.css'
import DeleteTaskModal from './Compoenent/DeleteTaskModal';
import Header from './Compoenent/Header';
import ActionHeaderComp from './Compoenent/ActionHeaderComp';

function App() {
  return (
    <>
      <Header />
      <div className='main-wrapper'>
        <ActionHeaderComp />
        <AddEditTask />
        <TaskTable />
        <DeleteTaskModal />
      </div></>
  );
}

export default App;
