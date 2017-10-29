import React from 'react';
import Progress from '../components/progress';
import './player.scss';

import $ from 'jquery';
import  'jplayer';

let duration=null;
class Player extends React.Component{
	constructor(props){
		super(props);
		this.state={//类似与getInitialState（）
           progress:'-',
           barColor:'#2f9842'
		};
	}
	componentDidMount(){
		$('#player').bind($.jPlayer.event.timeupdate,(e)=>{//绑定监听事件
			duration=e.jPlayer.status.duration;//获取音频文件的总时长
            this.setState({//触发组件的更新，调用render函数
            	// progress:Math.round(e.jPlayer.status.currentTime)
                progress:e.jPlayer.status.currentPercentAbsolute
            });
		});
	}
	componentWillUnMount(){//解绑事件
		$('#player').unbind($.jPlayer.event.timeupdate);
	}
	progressChangeHandler(progress){//用一个回调函数来完成父组件与子组件之间的通信
        //通过jQuery根据用户交互动态设置播放时间
        $("#player").jPlayer('play',duration*progress);//播放时间的变化触发了timeupdate，然后触发this.setstate然后触发render

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

	render(){
	 return (

      <div className="container-player">
        <h1 className="caption">我的私人音乐坊 &gt;</h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">歌曲名称</h2>
            <h3 className="music-artist mt10">歌手</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-2:00</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{
                  top: 5,
                  left: -5
                }}></i>
                <div className="volume-wrapper">
                  音量控制部分
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
              />
            </div>
            <div className="mt35 row">
              <div>
                <i className="icon prev"></i>
                <i className="icon ml20 play"></i>
                <i className="icon next ml20"></i>
              </div>
              <div className="-col-auto">
                <i className="icon repeat-cycle"></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img
              src=""
              alt="歌曲名称"
            />
          </div>
        </div>
      </div>
    );

	}
}

export default Player;