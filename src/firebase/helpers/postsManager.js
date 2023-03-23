import { addDoc, collection, getDocs, doc, query} from "firebase/firestore";
import { db } from "../config";
import { getAllComments } from "./commentsManager";

export const uploadPostToDb = async (post) => {
    if (!post) return;
    try {   
      // console.log("pre post db");

        const docRef = await addDoc(collection(db, "posts"), post);
        
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("!!!!!!!!", error.message);
    }
}

export const getUserPosts = async (userId) => {
  try {
    const q = query(
        collection(db, "posts"),
        where("userId", "==", userId)
      );
    
  } catch (error) {
    
  }
} 

export const getPosts = async () => {
  // console.log("we are in getPosts fn")
    let array = []
    try {
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);

        // querySnapshot.forEach(async(doc) => {
        querySnapshot.forEach(async(doc) => {
            // console.log(doc.id, " => ", {...doc.data()});
          // try {
          // const comments = await getAllComments(doc.id)
          // console.log("comments: ", comments)
          // const arrayOfComment = comments.map(item => item.data)
            // console.log("comments: ", comments)
            // array.push({ postId: doc.id, comments: comments, ...doc.data() })
          array.push({ postId: doc.id, ...doc.data() })
          //   (async () => {
          //     const comments = await getAllComments(doc.id)
          //     array.push({ postId: doc.id, comments: comments, ...doc.data() })
          //     return array
          // })

          // } catch (error) {
          //   console.log(222222222222222, "catch:", error.message)
          // }
          // console.log(35, array)
          // array.push({ postId: doc.id, ...doc.data(), comments: [...comments] })
          
        });

        // console.log(28, array)
        return array
    } catch (error) {
        console.log("err in getPosts: ", error.message)
    }
}

// export const getPosts = async () => {
//     let array = []
//     try {
//         const postsRef = collection(db, "posts");
//         const querySnapshot = await getDocs(postsRef);

//         querySnapshot.forEach((doc) => {
//             // console.log(doc.id, " => ", {...doc.data()});
//             array.push({postId: doc.id, ...doc.data()})
//         });

//         // console.log(28, array)
//         return array
//     } catch (error) {
//         console.log("err in getPosts: ", error.message)
//     }
// }
