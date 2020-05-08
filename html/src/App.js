import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
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

          <Redirect path="/" to="/login" />
        </Switch>
      </Router>
     </div>
  );
}

export default App;
