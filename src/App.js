import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import  LeftBar from './Leftbar'
import  RightBar from './Righbar'
import {ThreeDots} from 'react-loader-spinner'

function App() {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = (val)=>{
    setIsLoading(val)
  }

  
  function renderLoader(){
    return (<div className='myloader'>
      <p>Transcribing</p>
      <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
    </div>)
  }

  return (
<div className="abc-firm-buj">
  <LeftBar/>
  <RightBar setLoading={setLoading} isLoading={isLoading}/>
  {isLoading && renderLoader()}
</div>
  );
}

export default App;
