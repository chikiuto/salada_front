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

const API_URL = 'http://127.0.0.1:8000/recipes/index';

export default class App extends Component<{}, { recipes: Recipe[], jikan: string }> {
  // 初期値を設定
  constructor(props:Props) {
    super(props);
    this.state = {
      recipes: [],
      jikan: ''
    };
  }

  /**
   * APIを実行する
   */
  handleTestCallApi() {
    axios
    .get(API_URL, 
      // { params: { test_param: this.state.test_param } } 
    ) 
    .then( async (results)  => {
      const items = (await results).data; // APIレスポンスを取得する
      console.log( items )
      this.setState( { recipes: items } );
    })
    .catch((error) => {
      if (error.response) {
        // 200系以外の時にエラーが発生する
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // 上記以外のエラーが発生した場合
        console.log('Error', error.message);
      }
    });
  }
  /**
   * 変更があった場合、test_paramを更新する
   * 今回test_paramは使用しないが、パラメータ設定方法の一つとして記載する
   */
  handleChange = ( event: any ) => {
    this.setState({ jikan: event.target.value });
  }

  render() {
    return (
      <div className="app">
        <div>
            <h1>API実行する画面</h1>
            <form>
              <input value={this.state.jikan} type="text" name="jikan" onChange={ this.handleChange } />
              <button onClick={() => this.handleTestCallApi()}>Exec</button>
            </form>
            <br />
          <table>
            <thead>
              <tr>
                <th>title</th>
              </tr>
            </thead>
            { this.state.recipes && this.state.recipes.map((recipe) => 
            <tbody key={recipe.id}>
                <tr>
                  <td>{recipe.title}</td>
                </tr>
            </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
}