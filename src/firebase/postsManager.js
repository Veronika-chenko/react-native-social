import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const uploadPostToDb = async (post) => {
    if (!post) return;
    try {   
      console.log("pre post db");

        const docRef = await addDoc(collection(db, "posts"), post);
        
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("!!!!!!!!", error.message);
    }
}

export const getPosts = async() => {
    try {
        // console.log("i'm here")
        // const unsubscribe = onSnapshot(collection(db, "posts"),
        // const unsubscribe = get(collection(db, "posts"),
        //     querySnapshot => {
        //         const posts = querySnapshot.docs.map(doc => ({
        //             id: doc.id,
        //             ...doc.data()
        //         }));
        //         return posts
        // })
        const collectionRef = collection(db, "posts");
        const snapshot = await getDocs(collectionRef);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        console.log("err in getPosts: ", error.message)
    }
}