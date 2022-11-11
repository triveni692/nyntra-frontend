import React, { useState } from "react";
import { Api } from "../utils";
import { useNavigate } from "react-router-dom";

export default function StartContest({ disabled, contest }) {
	const [spinner, setSpinner] = useState(false);
	const navigate = useNavigate();

	function handleClick() {
		setSpinner(true);

		const handleSuccess = (attempt) => {
			navigate(`/contest/${attempt.contest_id}/attempt/${attempt._id}`);
			setSpinner(false);
		}

		const handleFailure = (err) => {
			console.log("err: ", err);
			alert("Something went wrong!");
			setSpinner(false);
		}

		Api.post(`/attempt`, {contest: contest._id})
		.then(res => {
			if(res.ok) res.json().then(handleSuccess);
			else handleFailure(res);
		})
		.catch(err => {
			handleFailure(err);
		})
	}

	if (disabled) {
		return <a className="btn btn-primary disabled">Start</a>
	}
	if (spinner) {
		return <div className="spinner-border text-primary" role="status"/>
	}
	const live = contest.running;
	return <a className={`btn btn-${live?'success':'primary'}`} onClick={handleClick}>{live?'Running':'Start'}</a>

}