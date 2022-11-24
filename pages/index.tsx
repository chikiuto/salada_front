import React, { FC } from "react";
import { GetServerSideProps } from "next";
import axios from "axios"

type Report = {
	id: number;
	age: string;
	sex: string;
	comment: string;
	user_id: number;
	recipe_id: number;
}

type Props = {
	reports: Report[];
}

const Home: FC<Props> = (props) => {
	return (
	<div>
		<h2>Reportの一覧</h2>
		<table className="dataframe table table-bordered table-hover">
			<thead>
				<tr>
					<th>Age</th>
					<th>Sex</th>
					<th>Comment</th>
					<th>user_id</th>
					<th>recipe_id</th>
				</tr>
			</thead>
			{props.reports.map((report) =>
			<tbody key={report.id}>
				<tr>
					<td>{report.age}</td>
					<td>{report.sex}</td>
					<td>{report.comment}</td>
					<td>{report.user_id}</td>
					<td>{report.recipe_id}</td>
				</tr>
			</tbody>
			)}
		</table>
	</div>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const res = axios.get( 'http://127.0.0.1:8000/' );
	const items = (await res).data;
	return {
		props: {
			reports: items
			},
	};
}

export default Home;