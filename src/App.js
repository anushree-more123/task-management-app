import './App.css';
import TaskTable from './Component/TaskTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import AddEditTask from './Component/AddEditTask';
import './Component/style.css'
import DeleteTaskModal from './Component/DeleteTaskModal';
import Header from './Component/Header';
import ActionHeaderComp from './Component/ActionHeaderComp';

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
