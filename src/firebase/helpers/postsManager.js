import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config";

export const uploadPostToDb = async (post) => {
  if (!post) return;
  try {
      await addDoc(collection(db, "posts"), post);
    } catch (error) {
      console.log(error.message);
    }
}

export const getPosts = async () => {
    let array = []
    try {
        const postsRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsRef);

        querySnapshot.forEach((doc) => {
            array.push({postId: doc.id, ...doc.data()})
        });

        return array
    } catch (error) {
        console.log(error.message)
    }
}
