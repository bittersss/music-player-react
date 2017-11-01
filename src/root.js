import React from 'react';
import Hearder from './components/header';
import Player from './page/player';
import MusicList from  './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
 import { Router, IndexRoute, Link, Route, browserHistory, hashHistory } from 'react-router'
import Pubsub from 'pubsub-js';
import { randomRange } from './config/util';

import $ from 'jquery';
import  'jplayer';

class MyApp extends React.Component{//主程序,最顶级组件
	constructor(props){
		super(props);
		this.state={
			musicList:MUSIC_LIST,
			currentMusicItem:MUSIC_LIST[0],
			repeatType:'cycle'
		};	
	}
	playMusic(musicItem){
		$('#player').jPlayer('setMedia',{
			mp3:musicItem.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem:musicItem
		});
	}
	playNext(type='next'){//播放上一首/下一首
		let index=this.findMusicIndex(this.state.currentMusicItem);
		let newIndex=null;
		let musicListLength=this.state.musicList.length
		if(type=='next'){
			newIndex=(index+1)%musicListLength;//防止是最后一首，index加1后溢出
		}else{
			newIndex=(index-1+musicListLength)%musicListLength;
		}

		this.playMusic(this.state.musicList[newIndex]);
	}
	findMusicIndex(musicItem){//查找当前歌曲在列表中的位置
		return this.state.musicList.indexOf(musicItem);
	}
	playWhenEnd(){//控制循环模式
		if(this.state.repeatType==='random'){//随机播放
			let index=this.findMusicIndex(this.state.currentMusicItem);
			let randomIndex=randomRange(0,this.state.musicList.length-1);
			while(randomIndex===index){
				randomIndex=randomRange(0,this.state.musicList.length-1);
			}
			this.playMusic(this.state.musicList[randomIndex]);
		}else if(this.state.repeatType==='once'){//单曲循环
			this.playMusic(this.state.currentMusicItem);
		}else{//列表循环
			this.playNext();
		}

	}
	componentDidMount(){
		$('#player').jPlayer({//初始设置,放在root根节点的话，页面的切换不会影响音乐的播放
			// ready:function(){
			// 	$(this).jPlayer('setMedia',{
			// 		mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
			// 	}).jPlayer('play');
			// },
			supplied:'mp3',
			wmode:'window'
		});
		this.playMusic(this.state.currentMusicItem);//播放音乐
		$('#player').bind($.jPlayer.event.ended,(e)=>{//音乐播放完则循环下一首
            this.playWhenEnd();
		})
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem)=>{//定义一个消息的订阅者
			if(this.state.currentMusicItem===musicItem){
				this.playNext('next');
			}
			this.setState({//对以前的列表进行过滤，更新列表
				musicList: this.state.musicList.filter(item=>{
					return item !==musicItem;
				})
			});
		})
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{//定义一个消息的订阅者
			this.playMusic(musicItem);
		})
		Pubsub.subscribe('PLAY_PREV',(msg,musicItem)=>{
			this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT',(msg,musicItem)=>{
			this.playNext('next');
		});

		let repeatList=[
            'cycle',
            'once',
            'random'
		];
		Pubsub.subscribe('CHANAGE_REPEAT',()=>{
			let index=repeatList.indexOf(this.state.repeatType);
			index=(index+1)%repeatList.length;
			this.setState({
				repeatType:repeatList[index]
			});
		});
	}
	componentWillUnMount(){//解绑事件
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
		Pubsub.unsubscribe('CHANAGE_REPEAT');
		$('#player').unbind($.jPlayer.event.ended);
	}
// {this.props.children}
 //          <MusicList
 //              currentMusicItem={this.state.currentMusicItem}
 //              musicList={this.state.musicList}
 //          ></MusicList>
	render(){
		return (
          <div>
          <Hearder />
          { React.cloneElement(this.props.children,this.state)}
          </div>
		);
	}
}

class Root extends React.Component{
       render(){
		return (
		 <Router history={hashHistory}>
		   <Route path="/" component={MyApp}>
            <IndexRoute component={Player} ></IndexRoute>
            <Route path="/list" component={MusicList}></Route> 
           </Route>
         </Router>
		);
	}
}

export default Root;