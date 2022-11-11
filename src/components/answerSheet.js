import React from "react";
import Countdown from 'react-countdown';

import { Api, computeScore, upto2decimal } from "../utils";

const [spinner, saved, cross, tick, incorrect, none] = [
	"/icons/spinner.gif", 
	"/icons/blue_tick.webp",
	"/icons/cross.gif",
	"/icons/tick.png",
	"/icons/cross.png",
	"/icons/transparent.png"
];

class Options extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selected: props.selected || [], img: none };
	}

	updateImage = (img) => {
		this.setState({ img });
		setTimeout(() => this.setState({ img: none }), 1500);
	}

	handleClick = async (e, ch) => {
		const { attempt, question } = this.props;
		let selected = [];
		if (ch.uid !== this.state.selected) {
			selected = [ch.uid];
		}
		this.setState({ selected, img: spinner });
		Api.post(`/options`, { attempt, question: question._id, answer: selected })
		.then(res => this.updateImage(res.ok ? saved : cross))
		.catch(()=>this.updateImage(cross));
	}

	render() {
		const { index, question, disabled } = this.props;
		let { selected, img } = this.state;
		if (this.props.analysis) {
			const crt = question.correctAnswer.join('');
			const slt = selected.join('');
			if (crt === slt) img = tick;
			else if(!slt) img = none;
			else img = incorrect;
		}
		return (
			<tr>
				<td key={question._id}>{index+1}</td>
				{question.choices.map(ch => (
					<td key={ch._id}>
						<input
							type="radio"
							name={question._id}
							disabled={disabled}
							checked={selected.indexOf(ch.uid) !== -1}
							onChange={()=>{}}
							onClick={(e)=> this.handleClick(e, ch)}
						/>
					</td>)
				)}
				<td><img className="option-status" src={img}/></td>
			</tr>
		);
	}
}

class AnswerSheet extends React.Component {

	constructor(props) {
		super(props);
		this.state= { ended: props.analysis };
		this.answerSheet = this.answerSheet.bind(this);
		this.showTimer = this.showTimer.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAnalysisTable = this.showAnalysisTable.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps.options.reduce((res, e) => {
			res[e.question_id] = e.selected_answer;
			return res;
		}, { ended: nextProps.analysis }))
	}

	showTimer({ hours, minutes, seconds }) {
		return <span>({hours ? `${hours} Hours `: ''}{minutes} Min {seconds} Sec)</span>;
	}

	async handleSubmit() {
		this.setState({ ended: true });
		const res = await Api.post(`/attempt/end`, {id: this.props.attempt._id});
		if (!res.ok) {
			alert("Something went wrong!");
		} else {
			const ret = window.confirm("Responses saved. Reload the page to see analysis?");
			if (ret) window.location.reload();
		}
	}

	showAnalysisTable() {
		const {correct_n, incorrect_n, unmarked_n, total_n} = this.props.attempt;
		const total_marks = computeScore(this.props.attempt);
		return (
			<table border={2} style={{width:250}} className="table table-striped center margin-top-10">
				<thead>
					<tr>
						<td className="td-border-right"/>
						<td className="td-border-right">No.</td>
						<td>Marks</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="td-border-right">Correct <img className="option-status" src={tick}/> </td>
						<td className="td-border-right">{correct_n}</td>
						<td>{correct_n * 2}</td>
					</tr>
					<tr>
						<td className="td-border-right">Incorrect <img className="option-status" src={incorrect}/></td>
						<td className="td-border-right">{incorrect_n}</td>
						<td>-{upto2decimal(incorrect_n * 2 / 3)}</td>
					</tr>
					<tr>
						<td className="td-border-right">Unmarked</td>
						<td className="td-border-right">{unmarked_n}</td>
						<td>0</td>
					</tr>
					<tr className="tr-border-top">
						<td className="td-border-right">Total</td>
						<td className="td-border-right">{total_n}</td>
						<td>{total_marks}/{total_n*2}</td>
					</tr>
				</tbody>
			</table>
		);
	}
	
	answerSheet() {
		const { questions, attempt } = this.props;
    return questions.map((question, index) => {
      return (
        <Options
          key={question._id}
          index={index}
          attempt={attempt._id}
          question={question}
          selected={this.state[question._id]}
          disabled={this.state.ended}
          analysis={this.props.analysis}
        />
      );
    });
  }

	render() {
		const dt = this.props.attempt.ends_at;
		const n_show = this.state.ended || this.props.analysis || !dt;
		return (<>
			<h3 align="center"> Answersheet </h3>
      <div align="center">
      	{n_show? <b>Contest Ended</b>:
      		<Countdown 
      			date={dt} 
      			renderer={this.showTimer} 
      			onComplete={()=> this.setState({ended: true})} 
      	/>}
      </div>
      {this.props.analysis&&this.showAnalysisTable()}
      <table className="table table-striped center margin-top-10">
        <thead><tr>
        	<th/>
          {['A','B','C','D'].map(c => (<th key={c} style={{textAlign: "center"}}>{c}</th>))}
        </tr></thead>
        <tbody>{this.answerSheet()}</tbody>
      </table>
      <div align="center">
      	<button
      		disabled={n_show}
      		onClick={this.handleSubmit} 
      		className="btn btn-danger margin-bottom-30"
      	>
      		End & Submit
      	</button>
      </div>
		</>);
	}
}

export default AnswerSheet;
