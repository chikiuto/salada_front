import axios from 'axios';
import React, { useState, FC } from 'react';
import Link from 'next/link'
import Image from 'next/image';
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
  } from '@chakra-ui/react'

type Recipe = {
	id: number;
	title: string;
	url: string;
	food_image_url: string;
	cost: string;
	material: string;
	indication: string;
}

const TableComp: FC<{ recipes: Recipe[] }> = ( {recipes} ) => {
  return(
    <>
		<TableContainer>
			<Table variant='simple' colorScheme="green">
				<Thead>
					<Tr>
						<Th>title</Th>
						<Th>image</Th>
						<Th>Indication</Th>
						<Th>Cost</Th>
						<Th>Material</Th>
					</Tr>
				</Thead>
				{ recipes && recipes.map( ( recipe:any ) => {
					const reportInfo = {
						recipe_id: recipe.id,
						title: recipe.title,
						img_url: recipe.food_image_url
					};
					return (
						<Tbody key={ recipe.id }>
							<Tr>
								<Td>{ recipe.title }</Td>
								<Td>
									<Image src={ recipe.food_image_url } alt="food_img" width={100} height={100}/>
									<Link href={ recipe.url } target="blank" > レシピを見る </Link>
									<br />
									- - - -
									<br />
									<Link href={ { pathname: '/report', query: reportInfo } }> 
										<Button bg='green.200' rounded='base' >作ったよ !</Button>
									</Link>
								</Td>
								<Td>{ recipe.indication }</Td>
								<Td>{ recipe.cost }</Td>
								<Td>{ recipe.material && recipe.material.replace(　/"|\]|\[/g,　''　) }</Td>
							</Tr>
						</Tbody>
					)}
				)}
			</Table>
		</TableContainer>
    </>
  )
}

const RecipeIndex: FC = () => {
	// Hook を設定
	const [recipes, setRecipes] = useState([]);
	const [jikan, setJikan] = useState('');
	const [zairyou, setZairyou] = useState('');

  const API_URL = 'https://sarada-api.onrender.com/recipes/index';
//   const API_URL = 'http://127.0.0.1:8000/recipes/index';
  
  // API実行
  const CallApi = () => {
		axios.get( API_URL, { params: { jikan: jikan, zairyou: zairyou } } ) 
		.then( async (results)  => {
		// APIレスポンスを取得
		const items = (await results).data;  
		// console.log( items )
    // recipes に格納
		setRecipes( items );
		})
		.catch((error) => {
		if (error.response) {
		// 200系以外のエラー
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
		} else if (error.request) {
		console.log(error.request);
		} else {
		// 上記以外のエラー
		console.log('Error', error.message);
		}
		});
  };

  const zairyouChange = ( event: any ) => {
	  setZairyou( event.target.value );
  }
  const jikanChange = (　event: any　) => {
	  setJikan( event.target.value );
  }

  const btnitems = [
	  { id: 0, message: "指定なし", value:'' },
	  { id: 1, message: "5分以内", value:'5分以内' },
	  { id: 2, message: "約10分", value:'約10分' },
	  { id: 3, message: "約15分", value:'約15分' },
	  { id: 4, message: "約30分", value:'約30分' },
	  { id: 5, message: "約1時間", value:'約1時間' },
	  { id: 6, message: "1時間以上", value:'1時間以上' },
  ];

	return (
		<>
		  <h1>サラダを探しのAPI</h1>
			<br />
		  <FormControl as='fieldset' width={300}>
				<FormLabel>時間</FormLabel>
				<Select name="jikan" onChange={ jikanChange }>
					{ btnitems.map( btn =>
						<option key={ btn.id } value={ btn.value　}>{ btn.message}</option>
					)}
				</Select>
				<br />
				<FormLabel>材料</FormLabel>
				<Input value={ zairyou } name="zairyou" onChange={ zairyouChange } placeholder='レタス'/>
				{/* ↓↓ 参考：https://qiita.com/haruraruru/items/53614e739437bf7e5b1c */}
				<Button type="submit" mt={4} onClick={ () => CallApi() }>さがす</Button>
		  </FormControl>
		  <br />
      <TableComp recipes={ recipes } />
		</>
	);
};

export default RecipeIndex;