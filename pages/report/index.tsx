import React, { useState, FC } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
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
	FormControl,
  FormLabel,
	Input,
	Select,
	Button,
	Box,
  } from '@chakra-ui/react'

const ReportTable: FC = () => {
	const router = useRouter();
	router.isReady;
	const img_url:any = router.query.img_url;
	return (
	<>
		<h2>投稿の確認</h2>
		<TableContainer>
			<Table variant='simple' colorScheme="green">
				<Thead>
					<Tr>
						<Th>Recipe id</Th>
						<Th>title</Th>
						<Th>image</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>{ router.query.recipe_id }</Td>
						<Td>{ router.query.title }</Td>
						<Td>
							<Image src={ img_url } alt="food_img" width="200" height="200"/>
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>

		<br />
	</>
	)
}

const ReportIndex: FC = () => {
	const router = useRouter();

	// Hook を設定
	const [sex, setSex] = useState('');
	const [gen, setGen] = useState('');
	const [comment, setComment] = useState('');
	const [thanks, setThanks] = useState('');

  const selectSex = ( event: any ) => {
	  setSex( event.target.value );
  }
  const selectGen = (event: any) => {
	  setGen( event.target.value );
  }
  const putComment = (event: any) => {
	  setComment( event.target.value );
  }

  const sexitems = [
	  { id: 0, message: "男性", value:'男性' },
	  { id: 1, message: "女性", value:'女性' },
	  { id: 2, message: "その他", value:'その他' },
  ];
  const genitems = [
	  { id: 0, message: "20代未満", value:'20代未満' },
	  { id: 1, message: "20代", value:'20代' },
	  { id: 2, message: "30代", value:'30代' },
	  { id: 3, message: "40代", value:'40代' },
	  { id: 4, message: "50代", value:'50代' },
	  { id: 5, message: "60代以上", value:'60代以上' },
  ];
  
  // API実行
	const API_URL = 'https://sarada-api.onrender.com/report/create';
	// const API_URL = 'http://127.0.0.1:8000/report/create';
  const CallApi = () => {
		axios.post(
			API_URL, 
			{ gen: gen,
				sex: sex,
				comment: comment,
				recipe_id: router.query.recipe_id, 
				user_id: router.query.user_id }
		);
		setThanks( "thank!!" )　;
	}

	return (
		<>
      <ReportTable />
			<Box>よろしければあなたが作ったサラダを共有してください！！<br />
			↓ で性別と年代を選択して「共有する」を押してください！！
			</Box>
			<br />
		  <FormControl as='fieldset' width={300} >
				<FormLabel>性別</FormLabel>
				<Select name="sex" onChange={ selectSex } placeholder='性別を選択'>
					{ sexitems.map( btn =>
						<option key={ btn.id } value={btn.value}>{ btn.message }</option>
					)}
				</Select>
				<br />
				<FormLabel>年代</FormLabel>
				<Select name="gen" onChange={ selectGen }　placeholder='年代を選択'>
					{ genitems.map( btn =>
						<option key={ btn.id } value={btn.value}>{ btn.message }</option>
					)}
				</Select>
				<br />
				コメント<br />
				<Input value={ comment } type="text" name="comment" onChange={ putComment } placeholder='200文字以内'/>
				<br />
        {/* ↓↓ 参考：https://qiita.com/haruraruru/items/53614e739437bf7e5b1c */}
        <Button type="submit" mt={4} onClick={ () => CallApi() }>共有する</Button>
				<Box fontSize={100}>{ thanks }</Box>
		  </FormControl>
			<br />
			<Link href={ { pathname: '/' } }><Button bg='green.200' rounded='base' >トップに戻る</Button></Link>
		</>
	);
};

export default ReportIndex;