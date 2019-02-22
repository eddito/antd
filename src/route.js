import React from 'react';
import {Switch,Route,HashRouter,Link} from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Disease from './pages/disease-related/index';
import Questionnaire from './pages/questionnaire/index';
import Check from './pages/check/index';
import Fill from './pages/fill/index';
import Edit from './pages/edit/index';
import UserInfo from './pages/userinfo/index';
import History from './pages/history/index';
import HistoryDetail from './pages/history-detail/index';
import NoMatch from './pages/nomatch/nomatch';

export default class Router extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                        <Route path={'/'} render={()=>
                            <Admin>
                                <Switch>
                                    <Route path={'/admin/disease'} component={Disease}/>
                                    <Route path={'/admin/syndromeType'} component={Questionnaire }/>
                                    <Route exact path="/fill" component={Fill} />
                                    <Route exact path="/check" component={Check} />
                                    <Route exact path="/edit" component={Edit} />
                                    <Route exact path="/admin/userinfo" component={UserInfo} />
                                    <Route exact path="/history" component={History} />
                                    <Route exact path="/historyDetail" component={HistoryDetail} />
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }/>
                </App>
            </HashRouter>
        )
    }
}