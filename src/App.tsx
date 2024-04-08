import Login from './components/Login/Login';
import MenuSidebar from './components/MenuSidebar/MenuSidebar';
import { useUserContext } from './context/AppContext';
import MainContainer from './components/MainContainer';

function App() {
  const { isUserLoggedIn } = useUserContext();
  return (
 
    <>
      {isUserLoggedIn ? (
        <>
          <MenuSidebar />
          <MainContainer />
        </>
      ) : (
        <Login />
      )}
    </>

    

  );
}

export default App;
