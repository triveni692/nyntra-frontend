import React from "react";

class Question extends React.Component {
	constructor(props) {
		super(props);
		this.state = { show_answer: false };
	}

	getOption(idx, choices) {
		const highlight = this.state.show_answer && this.props.data.correctAnswer.includes(choices[idx]['uid']);
		return (
			<td bgcolor={highlight?'#80ff80':''} valign="top" width="50%">
				<table><tbody><tr>
						<td valign="top"><strong>{"ABCD"[idx]})</strong></td>
						<td className="padding-left-10"><div dangerouslySetInnerHTML={{ __html: choices[idx]["content"] }}></div></td>
				</tr></tbody></table>
			</td>
		);
	}

	render () {
		const {props} = this;
		const choices = props.data.choices;

		return (
			<tr><td>
				<table className="margin-top-30 border-10" width="1000px"><tbody>
					<tr>
					   <td colSpan={2}><b>Question {props.index + 1}</b></td>
					</tr>
					<tr>
						<td colSpan={2}> <div dangerouslySetInnerHTML={{ __html: props.data.content }}></div> </td>
					</tr>
					<tr>
						{this.getOption(0, choices)}
						{this.getOption(1, choices)}
					</tr>
					<tr>
						{this.getOption(2, choices)}
						{this.getOption(3, choices)}
					</tr>
					<tr>
						<td colSpan={2}><div className="btn btn-outline-primary" onClick={()=>this.setState({show_answer: !this.state.show_answer})} >Show Answer</div></td>
					</tr>
					{this.state.show_answer &&
						<tr>
							<td colSpan={2}><div dangerouslySetInnerHTML={{__html: props.data.solution_explanation}}></div></td>
						</tr>
					}
				</tbody></table></td>
			</tr>
		);
	}
}

export default Question;