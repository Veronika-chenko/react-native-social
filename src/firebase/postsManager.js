import { v4 as uuidv4 } from "uuid";
// import { ref, push, set } from "firebase/database";
import { addDoc, collection, onSnapshot, QuerySnapshot, get, getDocs } from "firebase/firestore";
import { db } from "./config";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/authSelectors";
// const postCollection = firestore().collection('posts');
// const postCollection = collection(db, 'posts');

// const addPost = () => {}
// const { email, nickname } = useAuth();
// const {email, userId} = useSelector(selectUser);

export const addPost = async (postData) => {
    
    console.log("userId: ", userId)
    if (!postData) return;
    console.log("postData:", postData)
    // try {
    //     const docRef = await addDoc(collection(db, "posts"), postData)
    //     console.log("Document written with ID: ", docRef.id);
    // } catch (error) {
    //     console.error("Error adding document: ", error);
    // }
}
// export const addPost = async (postData) => {
//     if (!postData) return;
//     const { title, photoURI, region, location } = postData;
    // const { userId, nickname} = useAuth();
//     console.log("postData:", postData)
//     const postId = uuidv4();
//     // postCollection.doc(postId).set({
//     // const postRef = await ref(db, 'posts/' + userId)
//     // console.log("postRef", postRef)
//     // const newPostRef = await push(postRef);
//     // await set(newPostRef, {...postData})

//     // push(ref(db, 'posts/' + postId), {
//     //     ...postData
//     // })
//     // }).then(result => {
//     //     console.log("result:", result)
//     // })
// }

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