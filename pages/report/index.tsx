import React, { useState, FC } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import Link from 'next/link'
import Image from "next/image";


const ReportTable: FC = () => {
	const router = useRouter();
	router.isReady;
	const img_url:any = router.query.img_url;
	return (
	<div>
		<h2>投稿の確認</h2>
		<table className="dataframe table table-bordered table-hover">
			<thead>
				<tr>
					<th>Recipe id</th>
					<th>title</th>
					<th>image</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{ router.query.recipe_id }</td>
					<td>{ router.query.title }</td>
					<td>
						<img src={ img_url } alt="food_img" width="176"/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
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
		setThanks( "thank!!");
	}

	return (
		<>
      <ReportTable />

			<p>よろしければあなたが作ったサラダを共有してください！！<br />
			↓ で性別と年代を選択して「共有する」を押してください！！
			</p>
			<br />
		  <form>
        <div>
		<h4>性別</h4>
          { sexitems.map( btn =>
          <div key={ btn.id }>
            <label>
              <input type="radio" name="sex" value={btn.value} onChange={ selectSex } />
              { btn.message }
            </label>
            <br />
          </div>
          )}
        </div>
				<br /> - - - - <br />
				<div>
					<h4>世代</h4>
          { genitems.map( btn =>
          <div key={ btn.id }>
            <label>
              <input type="radio" name="gen" value={btn.value} onChange={ selectGen } />
              { btn.message }
            </label>
            <br />
          </div>
          )}
        </div>
				<br />
				<p>コメント</p>
				<input value={ comment } type="text" name="comment" onChange={ putComment } />
				<br />
        {/* ↓↓ 参考：https://qiita.com/haruraruru/items/53614e739437bf7e5b1c */}
        <button type="button" onClick={ () => CallApi() }>共有する</button>
				{ thanks }
		  </form>
			<br />
			<Link href={ { pathname: '/' } }>トップに戻る</Link>

		  <br />
		</>
	);
};

export default ReportIndex;