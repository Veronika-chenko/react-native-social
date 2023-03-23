import { addDoc, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../config";

export const addCommentToPost = async (comments, postId) => {
    if (!comments) return;
    try {   
        console.log("pre comments db");
        const postRef = await doc(collection(db, "posts"), postId);
        // console.log("postRef: ", postRef)
        const commentRef = await addDoc(collection(postRef, 'comments'), comments);
        // console.log("commentsRef: ", commentRef)
        
        console.log("Document comment written with ID: ", commentRef);
    } catch (error) {
      console.log("!!!!coments", error.message);
    }
}

export const getAllComments = async (postId) => {
    let array = []
    try {
        const postRef = await doc(collection(db, "posts"), postId);
        const commentRef = await getDocs(collection(postRef, "comments"));
        // console.log("all commentRef:", commentRef.docs.length)
        // if(commentRef)
        commentRef.forEach((doc) => {
            console.log(doc.id, " => ", {...doc.data()});
            array.push({ commentId: doc.id, ...doc.data() })
        });

        return array;
    } catch (error) {
        console.log("err in getComments: ", error.message)
    }
}