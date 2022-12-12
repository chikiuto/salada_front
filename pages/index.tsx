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
	TableCaption,
	TableContainer,
	Button,
	Box,
	Text,
	Center,
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
	created_at:string;
}

type Props = {
	reports: Report[];
}

const Home: FC<Props> = (props) => {
	return (
	<Box>
		<Box 
			h={600}
			backgroundImage="url('/top.jpg')"
			backgroundPosition="center"
			backgroundRepeat="no-repeat" 
			backgroundColor={"green.500"}
			position="relative"
		>
			<Box position="absolute" top="10" left="10" >
				<Text fontSize='9xl' color='green.50'>Saladays</Text>
				<Link href="/recipe">
					<Button bg='red.100' rounded='base' m={3} fontSize='2xl'>サラダを作る</Button>
				</Link>
			</Box>
		</Box>
		<br />
		<TableContainer>
			<Table variant='simple'>
				<TableCaption>みんなが作ったサラダ</TableCaption>
				<Thead>
					<Tr>
						<Th>Gen</Th>
						<Th>Sex</Th>
						<Th>Comment</Th>
						<Th>recipe title</Th>
						<Th>Image</Th>
						<Th>date</Th>
					</Tr>
				</Thead>
				{props.reports && props.reports.map((report) =>
				<Tbody key={report.id}>
					<Tr>
						<Td>{ report.gen }</Td>
						<Td>{ report.sex }</Td>
						<Td>{ report.comment }</Td>
						<Td>{ report.title }</Td>
						<Td><Image src={ report.food_image_url } alt="food_img" width={100} height={100}/></Td>
						<Td>{ report.created_at }</Td>
					</Tr>
				</Tbody>
				)}
			</Table>
		</TableContainer>
	</Box>
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