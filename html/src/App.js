import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routers from '@/router'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {
            routers.map((item) => {
              return <Route path={item.path} key={item.label} component={item.component}/>
            })
          }
        </Switch>
      </Router>
     </div>
  );
}

export default App;
