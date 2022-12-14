import react, {useState} from 'react';
const quesions = [
	{t: 'Place', q: 'Mecca', a: 'Soudi Arabia'},
	{t: 'Place', q: 'Medina', a: 'Soudi Arabia'},
	{t: 'Place', q: 'Jeddah', a: 'Soudi Arabia'},
	{t: 'Place', q: 'Aden', a: 'Yemen'},
	{t: 'Place', q: 'Masirah Island', a: 'Oman'},
	{t: 'Place', q: 'Duqm', a: 'Oman'},
	{t: 'Place', q: 'Salalah', a: 'Oman'},
	{t: 'Place', q: 'Musandam Peninsula', a: 'Oman'},
	{t: 'Place', q: 'Jebel Ali', a: 'UAE'},
	{t: 'Place', q: 'Hama', a: 'Syria'},
	{t: 'Place', q: 'Homs', a: 'Syria'},
	{t: 'Place', q: 'Idlib', a: 'Syria'},
	{t: 'Place', q: 'Allepo', a: 'Syria'},
	{t: 'Lake', q: 'Lake Tiberias or Sea of Galilee', a: 'Israel'},
	{t: 'Place', q: 'Aqabah', a: 'Jordan'},
	{t: 'Place', q: 'Haifa', a: 'Israel'},
	{t: 'Place', q: 'Bandar Abbas', a: 'Iran'},
	{t: 'Place', q: 'Zahedan', a: 'Iran'},
	{t: 'Port', q: 'Bushehr', a: 'Iran'},
	{t: 'Place', q: 'Ramsar', a: 'Iran'},
	{t: 'Place', q: 'Mosul', a: 'Iraq'},
	{t: 'Place', q: 'Kirkuk', a: 'Iraq'},
	{t: 'Place', q: 'Baghdad', a: 'Iraq'},
	{t: 'Place', q: 'Al Basrah', a: 'Iraq'},
	{t: 'Place', q: 'Tikrit', a: 'Iraq'},
	{t: 'Place', q: 'Erbil', a: 'Iraq'},
	{t: 'Place', q: 'Mazhar-e-Sharif', a: 'Afghanistan'},
	{t: 'Place', q: 'Zaranj', a: 'Afghanistan'},
	{t: 'Place', q: 'Delaram', a: 'Afghanistan'},
	{t: 'Active Volcano', q: 'Mt. Sinabung', a: 'Indonesia'},
	{t: 'Active Volcano', q: 'Mt. Karakatoa', a: 'Indonesia'},
	{t: 'Active Volcano', q: 'Mt. Merapi', a: 'Indonesia'},
	{t: 'Active Volcano', q: 'Mt. Agong', a: 'Indonesia'},
	{t: 'Active Volcano', q: 'Mt. Batur', a: 'Indonesia'},
	{t: 'Active Volcano', q: 'Mt. Taal', a: 'Philippines'},
	{t: 'Active Volcano', q: 'Mt. Pintubo', a: 'Philippines'},
	{t: 'Active Volcano', q: 'Mt. Mayon', a: 'Philippines'},
	{t: 'Mountain', q: 'Zagros', 'a': 'Iran'},
	{t: 'Mountain', q: 'Elburz', 'a': 'Iran'},
	{t: 'Active Volcano', q: 'Mt. Damavand', 'a': 'Iran'},

	// {t: 'Volcano', q: '', a: ''},
];

function Question({data}) {
	const [showAnswer, setShowAnswer] = useState(false);
	return (
		<tr>
			<td>{data.t}</td>
			<td>{data.q}</td>
			<td className="btn btn-light" onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer?'Hide':'Show'}</td>
			<td style={{textAlign: 'center'}}>{showAnswer ? data.a : ''}</td>
		</tr>
	);
}

export default function Quiz() {
	const shuffled_qs = quesions
		.map(q=>({value: q, key: Math.random()}))
		.sort((a, b) => a.key - b.key);
	return (
		<table className="table table-striped margin-top-30 center">
			<thead>
				<tr>
					<th style={{width: '19%'}}>Type</th>
					<th style={{width: '38%'}}>Question</th>
					<th style={{width: '5%'}}></th>
					<th style={{width: '38%', textAlign: 'center'}}>Answer</th>
				</tr>
			</thead>
			<tbody>
				{shuffled_qs.map((q, idx) => <Question data={q.value} key={q.key}/>)}
			</tbody>
		</table>
	);
}