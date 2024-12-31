import { Header } from "./Header";
import { Outlet } from "react-router";

function App() {
  return (
    <div className='min-h-screen bg-base-200 animate-fade'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <Header />
        <div className='flex flex-col items-center space-y-8 animate-fade'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
