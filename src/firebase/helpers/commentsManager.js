import { addDoc, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../config";

export const addCommentToPost = async (comments, postId) => {
    if (!comments) return;
    try {   
        console.log("pre comments db");
        const postRef = await doc(collection(db, "posts"), postId);
        console.log("postRef: ", postRef)
        const commentRef = await addDoc(collection(postRef, 'comments'), comments);
        console.log("commentsRef: ", commentRef)
        
        console.log("Document comment written with ID: ", commentRef);
    } catch (error) {
      console.log("!!!!coments", error.message);
    }
}

export const getAllComments = async (postId) => {
    let array = []
    try {
        // const postsRef = collection(db, "posts");
        // const querySnapshot = await getDocs(postsRef);
        const postRef = await doc(collection(db, "posts"), postId);
        // const commentRef = await doc(collection(postRef, "comments"), postId);
        const commentRef = await getDocs(collection(postRef, "comments"));
        console.log("all commentRef:", commentRef)

        commentRef.forEach((doc) => {
            console.log(doc.id, " => ", {...doc.data()});
            array.push({postId: doc.id, ...doc.data()})
        });

        // console.log(28, array)
        // console.log(28, commentRef)
        return array
    } catch (error) {
        console.log("err in getComments: ", error.message)
    }
}