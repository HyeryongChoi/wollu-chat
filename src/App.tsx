import LoginDialog from '@components/LoginDialog/LoginDialog';
import RegisterDialog from '@components/RegisterDialog/RegisterDialog';
import Spreadsheet from '@components/Spreadsheet/Spreadsheet';

function App() {
  return (
    <div className='relative w-full'>
      <Spreadsheet renderItems={[LoginDialog, RegisterDialog]} />
    </div>
  );
}

export default App;
