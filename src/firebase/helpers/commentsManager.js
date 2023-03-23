import { addDoc, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../config";

export const uploadCommnetToDb = async (comments, postId) => {
    if (!comments) return;
    try {   
        console.log("pre comments db");
        const postRef = await doc(collection(db, "posts"), postId);
        console.log("postRef: ", postRef)
        const commentRef = await addDoc(collection(postRef, 'comments'), comments);
        console.log("commentsRef: ", commentRef)
        
        console.log("Document comment written with ID: ", commentRef);
    } catch (error) {
      console.log("!!!!com", error.message);
    }
}

export const getComments = async () => {
    let array = []
    try {
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);

        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", {...doc.data()});
            array.push({postId: doc.id, ...doc.data()})
        });

        // console.log(28, array)
        return array
    } catch (error) {
        console.log("err in getPosts: ", error.message)
    }
}