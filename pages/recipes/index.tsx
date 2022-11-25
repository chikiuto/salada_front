import axios from 'axios';
import React, { useState, FC, memo } from 'react';

type Recipe = {
	id: number;
	title: string;
	url: string;
	food_image_url: string;
	cost: string;
	material: string;
	indication: string;
}

type Props ={}

const TableComp: FC<{ recipes: Recipe[] }> = memo(( {recipes} ) => {
  return(
    <>
    {console.log('きたよ')}
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
          <td>
            <img src={ recipe.food_image_url } alt="food_img" style={{height: '120px'}}/>
            <br /><a href={ recipe.url } target="blank" >つくる</a>
          </td>
			  </tr>
			</tbody>
			)}
		</table>
    </>
  )
})

const App: FC = () => {
	// Hook を設定
	const [recipes, setRecipes] = useState([]);
	const [jikan, setJikan] = useState('');
	const [zairyou, setZairyou] = useState('');

  const API_URL = 'http://127.0.0.1:8000/recipes/index';
  
  // API実行
  const CallApi = () => {
		axios.get( API_URL, { params: { jikan: jikan, zairyou: zairyou } } ) 
		.then( async (results)  => {
			// APIレスポンスを取得
			const items = (await results).data;

			console.log( items )
      
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
    console.log('材料だよ')
	  setZairyou( event.target.value );
  }
  const jikanChange = (event: any) => {
    console.log('時間だよ')
	  setJikan( event.target.value );
  }
  const btnitems = [
	  { id: 0, message: "指定なし", value:'' },
	  { id: 1, message: "5分以内", value:'5分以内' },
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
        <button type="button" onClick={ () => CallApi() }>Exec</button>
		  </form>
		  <br />
      <TableComp recipes={ recipes } />
		</>
	);
};

export default App;