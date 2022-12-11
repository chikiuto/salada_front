import React, { FC } from "react";
import { GetServerSideProps } from "next";
import axios from "axios"
import Link from 'next/link'
import Image from "next/image";

import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Button,
  } from '@chakra-ui/react'

type Report = {
	id: number;
	gen: string;
	sex: string;
	comment: string;
	user_id: number;
	recipe_id: number;
	title: string;
	food_image_url: string;
}

type Props = {
	reports: Report[];
}

const Home: FC<Props> = (props) => {
	return (
	<div>
		<Link href="/recipe">
		<Button bg='green.200' rounded='base' >サラダを作る</Button>

		</Link>
		<h2>みんなが作ったサラダ</h2>
		<TableContainer>
			<Table variant='simple'>
				<Thead>
					<Tr>
						<Th>Gen</Th>
						<Th>Sex</Th>
						<Th>Comment</Th>
						<Th>recipe title</Th>
						<Th>Image</Th>
					</Tr>
				</Thead>
				{props.reports && props.reports.map((report) =>
				<Tbody key={report.id}>
					<Tr>
						<Td>{report.gen}</Td>
						<Td>{report.sex}</Td>
						<Td>{report.comment}</Td>
						<Td>{report.title}</Td>
						<Td><Image src={ report.food_image_url } alt="food_img" width={100} height={100}/></Td>
					</Tr>
				</Tbody>
				)}
			</Table>
		</TableContainer>
	</div>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const API_URL = 'https://sarada-api.onrender.com/';
	// const API_URL = 'http://127.0.0.1:8000';
	const res = axios.get( API_URL );
	const items = (await res).data;
	return {
		props: {
			reports: items
			},
	};
}

export default Home;