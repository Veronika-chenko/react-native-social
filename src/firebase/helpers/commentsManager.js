import { addDoc, collection, getDocs, doc } from "firebase/firestore";
import { db } from "../config";

export const addCommentToPost = async (comments, postId) => {
    if (!comments) return;

    try {
        const postRef = await doc(collection(db, "posts"), postId);
        await addDoc(collection(postRef, 'comments'), comments);
    } catch (error) {
        alert("Something went wrong")
      console.log("!!!!coments", error.message);
    }
}

export const getAllComments = async (postId) => {
    let array = []
    try {
        const postRef = await doc(collection(db, "posts"), postId);
        const commentRef = await getDocs(collection(postRef, "comments"));

        commentRef.forEach((doc) => {
            array.push({ commentId: doc.id, ...doc.data() })
        });

        return array;
    } catch (error) {
        console.log("err in getComments: ", error.message)
    }
}