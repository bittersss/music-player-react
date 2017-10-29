
import './header.scss';
import React from 'react';

class Header extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
           <div className="components-header row">
                <img className="-col-auto" src="./images/music.png" width="40" alt=""/>
                <h1 className="caption">React Music Player</h1>
           </div>
		);
	}
}

Header.defaultProps = {};

export default Header;