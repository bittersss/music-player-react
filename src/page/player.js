import React from 'react';
import Progress from '../components/progress';
import './player.scss';
import { Link } from 'react-router'
import Pubsub from 'pubsub-js'
import $ from 'jquery';
import  'jplayer';

let duration=null;
class Player extends React.Component{
	constructor(props){
		super(props);
		this.progressChangeHandler=this.progressChangeHandler.bind(this);
		this.changeVolumeHandler=this.changeVolumeHandler.bind(this);
		this.play=this.play.bind(this);
		this.state={//类似与getInitialState（）
           progress:0,
           barColor:'#2f9842',
           volume:0,
           isPlay:true,
           leftTime:''
		};
	}
		// return (
  //         <div className="player-page">  
  //         <Progress
  //           progress={this.state.progress}
  //           onProgressChange={this.progressChangeHandler}
	 //        barColor={this.state.barColor}
  //         >
  //         </Progress>
  //         </div>
		// );
	componentDidMount(){
		$('#player').bind($.jPlayer.event.timeupdate,(e)=>{//绑定监听事件
			duration=e.jPlayer.status.duration;//获取音频文件的总时长
            this.setState({//触发组件的更新，调用render函数
            	// progress:Math.round(e.jPlayer.status.currentTime)
            	volume:e.jPlayer.options.volume*100,
                progress:e.jPlayer.status.currentPercentAbsolute,
                leftTime:this.formatTime(duration*(1-e.jPlayer.status.currentPercentAbsolute/100))
            });
		});
	}
	componentWillUnMount(){//解绑事件
		$('#player').unbind($.jPlayer.event.timeupdate);
		this.setState=(state,callback)=>{
			return;
		};
	}
	/*控制播放的进度条*/
	progressChangeHandler(progress){//用一个回调函数来完成父组件与子组件之间的通信
        //通过jQuery根据用户交互动态设置播放时间
        $("#player").jPlayer('play',duration*progress);//播放时间的变化触发了timeupdate，然后触发this.setstate然后触发render
        	this.setState({
        	isPlay:true
        });
	}
	/*控制音量的进度条*/
	changeVolumeHandler(progress){
        $('#player').jPlayer('volume',progress);
	}
	/*控制歌曲的播放和暂停*/
	play(){
		if(this.state.isPlay){
			$('#player').jPlayer('pause');
		}else{
			$('#player').jPlayer('play');
		}

		this.setState({
			isPlay:!this.state.isPlay
		});
	}
    playPrev(){
    	Pubsub.publish('PLAY_PREV');
    }
    playNext(){
    	Pubsub.publish('PLAY_NEXT');
    }
    formatTime(time){//对歌曲的剩余播放时间进行格式化处理
    	time=Math.floor(time);
    	let miniutes=Math.floor(time/60);
    	let seconds=Math.floor(time%60);

    	seconds=seconds<10 ? `0${seconds}` : seconds;//秒以两位数的形式输出
    	return `${miniutes}:${seconds}`;
    }
    repeatCycle(){
    	Pubsub.publish('CHANAGE_REPEAT');
    }

	render(){
	 return (
      <div className="container-player">
        <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{
                  top: 5,
                  left: -5
                }}></i>
                <div className="volume-wrapper">
                  <Progress
                     progress={this.state.volume}
                     onProgressChange={this.changeVolumeHandler}
                     barColor="#aaa"
                  >
                  </Progress>
                </div>
              </div>
            </div>
            <div style={{
              height: 10,
              lineHeight: '10px',
              marginTop: '20px'
            }}>
              <Progress
               progress= {this.state.progress}
               onProgressChange={this.progressChangeHandler}
               barColor={this.state.barColor}
              >
              </Progress>
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.playPrev}></i>
                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
                <i className="icon next ml20" onClick={this.playNext}></i>
              </div>
              <div className="-col-auto">
                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.repeatCycle}></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img
              src={this.props.currentMusicItem.cover}
              alt={this.props.currentMusicItem.title}
            />
          </div>
        </div>
      </div>
    );
	}
}

export default Player;