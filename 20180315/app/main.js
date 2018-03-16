'use strict';
import 'semantic-ui/semantic.min.css!';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link ,IndexRoute} from 'react-router';

class App extends React.Component{
    componentDidMount(){
        console.log('Tv is mount')

    }
    componentWillMount(){
        console.log('app is willmoument')

    }
    componentDidUpdate(){

    }
    render() {
        return (
            <div>
                <h1>App</h1>
               <div className="ui secondary pointing menu">
               <Link to='/' clssName='item'>首页</Link>
               <Link to='/tv' clssName='item' query={{orderBy:'data'}}>节目</Link>

               </div>
                {this.props.children}
            </div>
        )
    }

}
class TV extends React.Component{
    componentDidMount(){
        

    }
    constructor(props){
        super(props)
    }
    render() {

        let {query}=this.props.location;
        return (
            <div>
                <div className="ui messge info">
                </div>
                {this.props.children}
            </div>

        )

    }

}
class Show extends React.Component{
    constructor(props){
        super(props)

    }
    render() {
        return (
           <h3>电视节目列表</h3>
        )

    }
}
class Home extends React.Component{
    componentDidMount(){
        console.log('home componentDidMount')

    }
  render(){
      return (<h1>这是电视列表</h1>)
  } 
}
class ShowIndex extends React.Component{
    render(){
        return (<h1>这是节目列表</h1>)
    } 
  }
ReactDOM.render((
    <Router>
        <Route path="./" component={App}>
            <IndexRoute component={Home} /> 
            <Route path="/" component={TV}>
               <IndexRoute component={ShowIndex} /> 
                <Route path="/show/:id" component={Show} onLeave={handleLeave} onEnter={handleEnter}/>>
                <diReact from="show/:id" to="/show/:id" />>
            </Route>

        </Route>
    </Router>
), document.getElementById('App'));