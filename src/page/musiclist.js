import React from 'react';
import MusicListItem from '../components/musiclistitem';

class MusicList extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let listEle=null;//定义一个节点
		listEle=this.props.musicList.map((item)=>{//map会返回一个新的数组，不会影响之前的数组;下面用一个组件musiclistitem来封装<li>
			return (
			<MusicListItem 
			   focus={item === this.props.currentMusicItem}
			   key={item.id}
			   musicItem={item}
			>
			   {item.title}
			</MusicListItem>
			);
		});
		return (
            <ul>
               { listEle }
            </ul>
		);
	}	
}

export default MusicList;