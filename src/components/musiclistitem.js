import React from 'react';
import './musiclistitem.scss';
import Pubsub from 'pubsub-js';

class MusicListItem extends React.Component{
	constructor(props){
        super(props);
	}
	playMusic(musicItem){
		Pubsub.publish('PLAY_MUSIC',musicItem);//把事件发出去，让事件的订阅者去处理
	}
	deleteMusic(musicItem,e){
		e.stopPropagation();//阻止冒泡
		Pubsub.publish('DELETE_MUSIC',musicItem);
	}
	render(){
		let musicItem=this.props.musicItem;
		return(
            <li onClick={this.playMusic.bind(this,musicItem)} className={`components-musiclistitem row ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong>-{musicItem.artist}</p>
                <p onClick={this.deleteMusic.bind(this,musicItem)} className="-col-auto delete"></p>
            </li>
		);
	}
}

export default MusicListItem;