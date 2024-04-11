import Login from './components/Login/Login';
import MenuSidebar from './components/MenuSidebar/MenuSidebar';
import { useUserContext } from './context/AppContext';
import MainContainer from './components/MainContainer';

function App() {
  const { isUserLoggedIn } = useUserContext();
  return (
 
    <>
     {isUserLoggedIn ? (
       <div className="flex flex-col h-full">
       <div className="h-[55px] bg-[#212121]">
        <div className='w-[280] h-[0px] border border-slate-400 mt-[50px]'></div>
       </div>
         <MenuSidebar />
       <div className="h-[55px] bg-[#212121]">
        <div className='w-[280px] h-[50px] border border-slate-500 '>
          <div className='ml-auto text-slate-50 text-xs ml-[22px] mt-[12px]'>
            <span>ProBuilt Sample Company, Inc</span>
          </div>
          <div className='text-slate-50 text-xs ml-[22px] mt-[1px]'>
            <span>User: Placeholder</span>
          </div>
        </div>
       </div>

     </div>
      ) : (
        <Login />
      )}
    </>

    

  );
}

export default App;


{/**

<div> // main wrapper flex-col
                    <div> // top container flex-row
                        <div></div>// sidebar
                        <div></div>// content (where your calenders and content is placed)
                    </div>
                    <div>   // bottom container flex-row
                        <div> // bottom footer with 100% width
                            <div></div> // bottom of the sidebar that includes company name and username
                            <div></div> // bottom footer that extends the page fully
                        </div>
                    </div>
</div>





  this one work with dups


       <div className="flex flex-col h-full">
          <div className="h-[100px] bg-[#212121]"></div>

          <div className="flex-growS overflow-auto">
            <MenuSidebar />
            <MainContainer />
          </div>

          <div className="h-[100px] bg-[#212121]"></div>

        </div>

*/}


