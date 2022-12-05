import axios from 'axios';
import React, { useState, FC } from 'react';
import Link from 'next/link'
import Image from 'next/image';

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
			{ recipes && recipes.map( ( recipe:any ) => {
				const reportInfo = { recipe_id: recipe.id,
															title: recipe.title,
															img: recipe.food_image_url };
				return (
					<tbody key={ recipe.id }>
						<tr>
							<td>{ recipe.title }</td>
							<td>{ recipe.indication }</td>
							<td>{ recipe.cost }</td>
							<td>{ recipe.material && recipe.material.replace(/"|\]|\[/g,'') }</td>
							<td>
								<Image src={ recipe.food_image_url } alt="food_img" height={120}/>
								<br />
								<a href={ recipe.url } target="blank" > レシピを見る </a>
								<p>- - - -</p>
								<Link	href={ { pathname: '/report', query: reportInfo } }> 作ったよ！</Link>
							</td>
						</tr>
					</tbody>
				)}
			)}
		</table>
    </>
  )
}

const RecipeIndex: FC = () => {
	// Hook を設定
	const [recipes, setRecipes] = useState([]);
	const [jikan, setJikan] = useState('');
	const [zairyou, setZairyou] = useState('');

  const API_URL = 'https://sarada-api.onrender.com/recipes/index';
  
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
	  { id: 2, message: "約10分", value:'約10分' },
	  { id: 3, message: "約15分", value:'約15分' },
	  { id: 4, message: "約30分", value:'約30分' },
	  { id: 5, message: "約1時間", value:'約1時間' },
	  { id: 5, message: "1時間以上", value:'1時間以上' },
  ];

	return (
		<>
		  <h1>API実行する画面</h1>
		  <form>
        <div>
          { btnitems.map( btn =>
          <div key={ btn.id }>
            <label>
              <input type="radio" name="jikan" value={btn.value} onChange={ jikanChange } />
              { btn.message }
            </label>
              <br />
          </div>
          )}
        </div>
        <input value={ zairyou } type="text" name="zairyou" onChange={ zairyouChange } />
        {/* ↓↓ 参考：https://qiita.com/haruraruru/items/53614e739437bf7e5b1c */}
        <button type="button" onClick={ () => CallApi() }>さがす</button>
		  </form>
		  <br />
      <TableComp recipes={ recipes } />
		</>
	);
};

export default RecipeIndex;