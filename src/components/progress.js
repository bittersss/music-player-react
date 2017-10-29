import './progress.scss';
import React from 'react';

class Progress extends React.Component{
	constructor(props){
		super(props);
		this.changeProgress=this.changeProgress.bind(this);//不加这一行的话会报（refs undefined）的错误
	}
	// getDefaultProps(){
	// 	return{
	// 		barColor:'#2f9842'
	// 	}
	// }
	changeProgress(e){
		e.preventDefault();

        let progressBar=this.refs.progressBar;
        let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        this.props.onProgressChange&&this.props.onProgressChange(progress);//通过回调函数与父组件通信
	}
	render(){
		// let barStyle={
		// 	width:'${this.props.progress}%'
        //注意这里${}%两边的并不是单引号，而是tab上面的那个点！！！
		// };

		return(
		<div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
		   <div className="progress" style={{width:`${this.props.progress}%`,background:this.props.barColor}}></div>
		</div>
		);
	}
}
export default Progress;