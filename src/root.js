import React from 'react';
import Hearder from './components/header';
import Player from './page/player';
import MUSIC_LIST from './config/musiclist';

import $ from 'jquery';
import  'jplayer';


class Root extends React.Component{
	constructor(props){
		super(props);
		
	}
	componentDidMount(){
		$('#player').jPlayer({//初始设置,放在root根节点的话，页面的切换不会影响音乐的播放
			ready:function(){
				$(this).jPlayer('setMedia',{
					mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play');
			},
			supplied:'mp3',
			wmode:'window'
		});
	}
	
	render(){
		return (
          <div>
          <Hearder />
          <Player></Player>
          </div>
		);
	}
}

Root.defaultProps={};

export default Root;