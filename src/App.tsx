import React from 'react';
import RenderTree from './Components/RenderTree';
import familyTree from './asset/data';
import { Person } from './asset/dataTypes';

const data = familyTree as Person[];

function App() {
  //validate data
  let validateTreeData = {ok:true,message:"Success"};

  if (validateTreeData.ok) {
    return (
      <div className="App">
        <h1 >Family tree</h1>
        <RenderTree initialTree={data} />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <h1>Error validating Dataset</h1>
        <p style={{ color: "red" }}>
          {validateTreeData.message}
        </p>
      </div>)
  }
}

export default App;

