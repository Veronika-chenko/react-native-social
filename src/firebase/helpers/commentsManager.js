import { addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config";

export const addCommentToPost = async (comments, postId, allComments) => {
    if (!comments) return;

    try {
        const postRef = await doc(collection(db, "posts"), postId);
        const commentsPromise = addDoc(collection(postRef, 'comments'), comments);
        const commentsCountPromise = updateDoc(postRef, { "comments": allComments.length + 1 });
        await Promise.all([commentsPromise, commentsCountPromise])
    } catch (error) {
        alert("Something went wrong")
        console.log(error.message);
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
        console.log(error.message)
    }
}