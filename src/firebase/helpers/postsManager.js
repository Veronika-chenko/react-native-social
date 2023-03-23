import { addDoc, collection, getDocs, doc, query} from "firebase/firestore";
import { db } from "../config";

export const uploadPostToDb = async (post) => {
  if (!post) return;
  try { 
      
      const docRef = await addDoc(collection(db, "posts"), post);
      
    } catch (error) {
      console.log("!!!!!!!!", error.message);
    }
}

export const getPosts = async () => {
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
