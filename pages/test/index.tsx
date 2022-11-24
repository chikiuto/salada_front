import axios from 'axios';
import React, { Component } from 'react';

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

export default class App extends Component< {}, { recipes: Recipe[], jikan: string, zairyou: string } > {
  // 初期値を設定
  constructor(props:Props) {
    super(props);
    this.state = {
      recipes: [],
      jikan: '',
      zairyou: ''
    };
  }
  // API実行
  API_URL = 'http://127.0.0.1:8000/recipes/index';
  handleTestCallApi() {
    axios.get( this.API_URL, { params: { jikan: this.state.jikan , zairyou: this.state.zairyou } } ) 
    .then( async (results)  => {
      // APIレスポンスを取得
      const items = (await results).data;
      console.log( items )
      this.setState( { recipes: items } );
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

  zairyouChange = ( event: any ) => {
    this.setState({ zairyou: event.target.value });
  }
  jikanChange = (event: any) => {
    this.setState({ jikan: event.target.value });
  }
  btnitem = [
    { id: 0, message: "指定なし", value:'' },
    { id: 1, message: "5分以内", value:'5分以内' },
  ];


  render() {
    return (
      <div>
        <div>
          <h1>API実行する画面</h1>
          <form>
            <div>
              { this.btnitem.map( btn =>
                <label key={ btn.id }>
                <input type="radio" name="jikan" value={btn.value} onChange={ this.jikanChange } />
                {btn.message}
                </label>
              )}
            </div>
            <input value={this.state.zairyou} type="text" name="zairyou" onChange={ this.zairyouChange } />
            <button onClick={() => this.handleTestCallApi()}>Exec</button>
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
            { this.state.recipes && this.state.recipes.map( ( recipe ) =>
            <tbody key={recipe.id}>
              <tr>
                <td>{ recipe.title }</td>
                <td>{ recipe.indication }</td>
                <td>{ recipe.cost }</td>
                <td>{ recipe.material && recipe.material.replace(/"|\]|\[/g,'') }</td>
                <td><img src={ recipe.food_image_url } alt="food_img" style={{height: '120px'}}/>
                <br /><a href={ recipe.url }>つくる</a></td>
              </tr>
            </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
}