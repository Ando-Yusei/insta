import React,{useState,useEffect} from 'react'
import "./style.css";
import { storage,db } from "./firebase";

const DeleteInputData = (id) => {
  db.collection("posts").doc(id).delete();
  console.log("削除されました！",id);
};
// データが上から渡ってきますよ=props
// ↓  分割代入        const Post = (props) => {

const Post = ({text,image,timestamp,id}) => {
  return (
    <div className="postdate">
      
      {/* 記述1.テキスト情報が渡ってくる */}
      <div>{text}</div>
      {/* 記述2.画像を表示 imgタグを使う */}
      {/* 記述4.画像がある時だけ表示 */}
      {/* [?]:参考演算子 [?]のあとはtrue [:]のあとはfalse  */}  

      {image ? (
        <div>
          <img src={image} alt="" width="200px" height="auto" />
        </div>
      ) : (
        <h1>no image</h1>
      )}
      {/* 記述3.日付を表示 注意！jsの形式に変換が必要! */}
      {/*  (timestamp を表示するには、JSの機能のnew DATEへ変換「?」が必要*/}
      <div className="timestamp">{new Date(timestamp?.toDate()).toLocaleString()} </div>
      <button onClick={() => DeleteInputData(id)}>削除</button>
     

    </div>

  );
};
export default Post;