import React from 'react'
import {Switch,Route,HashRouter,Link} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Disease from './pages/disease-related/index'
import NoMatch from './pages/nomatch/nomatch'
export default class Router extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                        <Route path={'/'} component={()=>
                            <Admin>
                                <Switch>
                                    <Route path={'/admin/disease'} component={Disease}/>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }/>
                </App>
            </HashRouter>
        )
    }
}