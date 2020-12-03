import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Post from "./Post";
import TweetInput from "./TweetInput";
import AppleIcon from '@material-ui/icons/Apple';
const Feed = () => {
  // firebaseに作成した項目を受け取るための変数=useState
   const[posts, setPosts] = useState([
       {
           id:"",
           image:"",
           text:"",
           timestamp:null,

   },
   ]);
// 記述2 use Effectの処理を書く
// 画面が表示された直後に、FIREABSEにデータをとりにいく、USESTATEで更新
   useEffect(() => {
    const firebaseData = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);
console.log(posts);

return(
    <div>
        <AppleIcon ></AppleIcon>
{/*  TweetInputを読み込む*/}
        <TweetInput/>
    {/* 記述3.Postコンポーネントを表示するロジックを書きます */}
    {/* postsにデータが合ったら表示しますよという書き方 ＆＆で書く */}

    {posts && (
    <>
    {posts.map((postItem) => (
        <Post
        key={postItem.id}
        image={postItem.image}
        text={postItem.text}
        timestamp={postItem.timestamp}
        id={postItem.id}
        />
    ))}
    </>
)}
{/*  */}
    </div>

);
};

export default Feed;