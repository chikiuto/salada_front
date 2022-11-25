import axios from 'axios';
import React, { useState } from 'react';

type Recipe = {
	id: number;
	title: string;
	url: string;
	food_image_url: string;
	cost: string;
	material: string;
	indication: string;
}

type Props = {}

const App = () => {
	// 初期値を設定
	const [recipes, setRecipes] = useState([]);
	const [jikan, setJikan] = useState('');
	const [zairyou, setZairyou] = useState('');

  // API実行
  const API_URL = 'http://127.0.0.1:8000/recipes/index';
  const handleTestCallApi = () => {
		axios.get( API_URL, { params: { jikan: jikan, zairyou: zairyou } } ) 
		.then( async (results)  => {
			// APIレスポンスを取得
			const items = (await results).data;
			console.log( items )
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
  }

  const zairyouChange = ( event: any ) => {
	  setZairyou( event.target.value );
  }
  const jikanChange = (event: any) => {
	  setJikan( event.target.value );
  }
  const btnitems = [
	  { id: 0, message: "指定なし", value:'' },
	  { id: 1, message: "5分以内", value:'5分以内' },
  ];

	return (
		<div>
		  <h1>API実行する画面</h1>
		  <form>
			<div>
			  { btnitems.map( btn =>
				<label key={ btn.id }>
				<input type="radio" name="jikan" value={btn.value} onChange={ jikanChange } />
				{btn.message}
				</label>
			  )}
			</div>
			<input value={ zairyou } type="text" name="zairyou" onChange={ zairyouChange } />
			<button onClick={() => handleTestCallApi()}>Exec</button>
		  </form>
		  <br />
		  <table className="dataframe table table-bordered table-hover" >
			<thead>
			  <tr>
				<th>title</th>
				<th>Indication</th>
				<th>Cost</th>
				<th>Material</th>
				<th>image</th>
			  </tr>
			</thead>
			{ recipes && recipes.map( ( recipe:any ) =>
			<tbody key={recipe.id}>
			  <tr>
				<td>{ recipe.title }</td>
				<td>{ recipe.indication }</td>
				<td>{ recipe.cost }</td>
				<td>{ recipe.material && recipe.material.replace(/"|\]|\[/g,'') }</td>
				<td><img src={ recipe.food_image_url } alt="food_img" style={{height: '120px'}}/>
				<br /><a href={ recipe.url } target="blank" >つくる</a></td>
			  </tr>
			</tbody>
			)}
		  </table>
		</div>
	);
}

export default App;