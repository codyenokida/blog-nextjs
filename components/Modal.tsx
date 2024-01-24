import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

import Button from "@/components/Button";
import ImagePlaceholder from "@/components/Icons/ImagePlaceholder";

import styles from "./Modal.module.scss";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  type: "text" | "image" | undefined;
  content: any[];
  setContent: (content: any[]) => void;
}

export default function Modal({
  open,
  type,
  content,
  setContent,
  handleClose,
}: ModalProps) {
  // Text Inputs
  const [text, setText] = useState<string>("");

  // Image Inputs
  const [image, setImage] = useState<Blob>();
  const [caption, setCaption] = useState<string>("");
  const hiddenFileInput = useRef(null);

  /**
   * Function that handles image change
   * @param {Event} event
   */
  const onImageChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const compressedImage = await imageCompression(event.target.files[0], {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      setImage(compressedImage);
    }
  };

  /**
   * Handles posting
   */
  const handlePost = () => {
    let item = {};
    if (type === "image") {
      item = {
        id: uuidv4(),
        type,
        tempImage: image,
        caption,
      };
    } else {
      item = {
        id: uuidv4(),
        type,
        text,
      };
    }
    setContent([...content, item]);
    setText("");
    setImage(undefined);
    setCaption("");
    handleClose();
  };

  if (type === "image") {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className={styles.modal}>
          <h1>Upload Image</h1>
          {image ? (
            <div className={styles.imageFilled}>
              <img src={URL.createObjectURL(image)} alt="Image to upload" />
              <Button text="Clear Photo" onClick={() => setImage(undefined)} />
            </div>
          ) : (
            <button className={styles.image}>
              <div className={styles.placeholder}>
                <ImagePlaceholder />
                <p>Photo goes here!!!</p>
              </div>
              <input
                ref={hiddenFileInput}
                type="file"
                onChange={onImageChange}
                onClick={onImageChange}
              />
            </button>
          )}
          <label>Caption (not required)</label>
          <input
            className={styles.caption}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className={styles.buttons}>
            <Button text="Close" onClick={handleClose} />
            <Button text="Post" onClick={handlePost} />
          </div>
        </DialogContent>
      </Dialog>
    );
  } else if (type === "text") {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className={styles.modal}>
          <h1>Write Text</h1>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <div className={styles.buttons}>
            <Button text="Close" onClick={handleClose} />
            <Button text="Post" onClick={handlePost} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
