import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../config";

export const uploadImage = async (photoURI, path) => {
    if (!photoURI) return;

    const response = await fetch(photoURI);
    const blob = await response.blob();
    const extention = photoURI.split(".").pop();

    // const imageRef = ref(storage, `images/${uuidv4()}.${extention}`);
    const imageRef = ref(storage, `${path}/${uuidv4()}.${extention}`);

    await uploadBytes(imageRef, blob)
      .then(() => {
        alert("Image Uploaded");
      })
      .catch((e) => {
        alert("Oops, something went wrong");
      });

    const uploadedPhoto = await getDownloadURL(imageRef);
    return uploadedPhoto;
}
