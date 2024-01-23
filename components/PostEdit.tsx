"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

import Button from "@/components/Button";
import Modal from "@/components/Modal";

import { categoriesForEdit } from "@/utils/consts";

import styles from "./PostEdit.module.scss";
import ImagePlaceholder from "./Icons/ImagePlaceholder";
import { Reorder } from "framer-motion";
import ReorderItem from "@/components/ReorderItem";
import { uploadImageToStorage } from "@/lib/firebase/storage";
import { uploadPost } from "@/lib/firebase/firestore";

interface PostEditProps {
  id?: string;
}

interface Form {
  id?: string;
  title?: string;
  category?: string;
  spotifyLink?: string;
  startDate?: string;
  endDate?: string;
  thumbnail?: Blob;
  content?: any;
}

interface FormError {
  id?: string;
  title?: string;
  category?: string;
  date?: string;
  thumbnail?: string;
  content?: string;
}

export default function PostEdit({ id = "" }: PostEditProps) {
  // Form State
  const [form, setForm] = useState<Form>({});
  const [formError, setFormError] = useState<FormError>({});
  const [dateType, setDateType] = useState<"single" | "multiple">("single");
  const [content, setContent] = useState<any[]>([]);

  // Modal State
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"image" | "text">();

  // Styling
  const hiddenFileInput = useRef<any>(null);

  useEffect(() => {
    setForm((prev) => ({ ...prev, content: content }));
  }, [content]);

  useEffect(() => {
    if (form.title) {
      updateFormError("title", "");
    }
    if (form.category) {
      updateFormError("category", "");
    }
    if (dateType === "single" && form.startDate) {
      updateFormError("date", "");
    }
    if (dateType === "multiple" && form.startDate && form.endDate) {
      updateFormError("date", "");
    }
    if (form.thumbnail) {
      updateFormError("thumbnail", "");
    }
    if (form.content) {
      updateFormError("content", "");
    }
  }, [form]);

  const handleClear = () => {
    setForm({});
    setFormError({});
  };

  /**
   * Helper function to update controlled form state
   * @param e
   * @param type
   */
  const updateFormValue = (e: any, type: string) => {
    setForm((prev) => ({ ...prev, [type]: e.target.value }));
  };

  /**
   * Helper function to update controlled form state
   * @param e
   * @param type
   */
  const updateFormError = (type: string, errMsg: string) => {
    setFormError((prev) => ({ ...prev, [type]: errMsg }));
  };

  /**
   * Helper function to compress thumbnail image
   * @param e
   */
  const onThumbnailChange = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const compressedThumbnail = await imageCompression(e.target.files[0], {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      setForm({ ...form, thumbnail: compressedThumbnail });
    }
  };

  /**
   * Helper function to open modal
   * @param e
   * @param type
   */
  const handleOpenModal = (e: any, type: "image" | "text") => {
    e.preventDefault();
    setModalType(type);
    setOpenModal(true);
  };

  /**
   * Helper function to close modal
   */
  const handleCloseModal = () => {
    setModalType(undefined);
    setOpenModal(false);
  };

  /**
   * Handler for removing an index from content
   * @param {number} index
   */
  const handleRemoveContent = (index: number) => {
    const copy = [...content];
    if (index === 0) {
      copy.shift();
    } else if (index === content.length - 1) {
      copy.pop();
    } else {
      copy.splice(index, 1);
    }
    setContent(copy);
  };

  /**
   * Helper function to validate form
   * @returns boolean
   */
  const validateForm = () => {
    let error;
    if (!form.category) {
      updateFormError("category", "Must submit a category.");
      error = true;
    }
    if (!form.title) {
      updateFormError("title", "Must submit a title.");
      error = true;
    }
    if (dateType === "single") {
      if (!form.startDate) {
        updateFormError("date", "Must submit start date.");
        error = true;
      }
    } else if (dateType === "multiple") {
      if (!form.startDate || !form.endDate) {
        updateFormError("date", "Must submit both dates.");
        error = true;
      } else if (form.startDate && form.endDate) {
        const tempStartDate = new Date(form.startDate);
        const tempEndDate = new Date(form.endDate);
        if (tempStartDate > tempEndDate) {
          updateFormError("date", "End date must be later.");
          error = true;
        }
      }
    }
    if (!form.thumbnail) {
      updateFormError("thumbnail", "Must submit a thumbnail.");
      error = true;
    }
    if (!form.content || !form.content.length) {
      updateFormError("content", "Must submit at least something.");
      error = true;
    }
    return error;
  };

  /**
   * Helper function to submit controlled form
   * @param e
   */
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check for Errors
    const error = validateForm();
    if (error) return;

    // Use original ID or generate a new ID
    const postId = id || uuidv4();

    const datePosted = new Date();

    // Upload all photos
    const thumbnailUrl = await uploadImageToStorage(
      postId,
      "thumbnail",
      form.thumbnail
    );
    const contentToUpload = await Promise.all(
      form.content.map(async (section: any) => {
        if (section.type === "text") {
          return section;
        } else if (section.type === "image") {
          const imageID = section.id;
          const imageFile = section.tempImage;
          const storageImageUrl = await uploadImageToStorage(
            postId,
            imageID,
            imageFile
          );
          return {
            id: section.id,
            type: section.type,
            imageUrl: storageImageUrl,
            imageCaption: section.caption,
          };
        }
      })
    );

    const postToUpload = {
      id: postId,
      title: form.title,
      content: contentToUpload,
      datePosted,
      dateType,
      startDate: form.startDate ? new Date(form.startDate) : null,
      endDate: form.endDate ? new Date(form.endDate) : null,
      category: form.category,
      spotifyLink: form.spotifyLink || null,
    };

    await uploadPost(postId, thumbnailUrl, postToUpload);
  };

  return (
    <body className={styles.body}>
      <Link href="/" passHref className={styles.backToHome}>
        <Button text="← Back to Home" />
      </Link>
      <h1>{id ? "🛠️ Edit Post! 🛠️" : "🛠️ Create Post 🛠️"}</h1>
      <form onSubmit={onFormSubmit}>
        <div className={styles.category}>
          <label>Category:</label>
          <select
            onChange={(e) => updateFormValue(e, "category")}
            defaultValue={"--- Select ---"}
          >
            {[0, ...categoriesForEdit].map((category, i) =>
              i === 0 ? (
                <option disabled key={category}>
                  --- Select ---
                </option>
              ) : (
                <option key={category}>{category}</option>
              )
            )}
          </select>
          {formError.category && (
            <span className={styles.error}>{formError.category}</span>
          )}
        </div>
        <div className={styles.title}>
          <label>Title:</label>
          <input
            placeholder="Title"
            onChange={(e) => updateFormValue(e, "title")}
          />
          {formError.title && (
            <span className={styles.error}>{formError.title}</span>
          )}
        </div>
        <div className={styles.spotify}>
          <label>Spotify Link:</label>
          <input
            placeholder="Spotify Link"
            onChange={(e) => updateFormValue(e, "title")}
          />
        </div>
        <div className={styles.date}>
          <div className={styles.container}>
            <label>Dates:</label>
            <div className={styles.dateType}>
              <button
                type="button"
                className={classNames({
                  [styles.active]: dateType === "single",
                })}
                onClick={() => setDateType("single")}
              >
                Single
              </button>
              <button
                type="button"
                className={classNames({
                  [styles.active]: dateType === "multiple",
                })}
                onClick={() => setDateType("multiple")}
              >
                Range
              </button>
            </div>
            {dateType === "single" && (
              <input
                type="date"
                value={form?.startDate}
                onChange={(e) => updateFormValue(e, "startDate")}
                data-date=""
                data-date-format="DD MMMM YYYY"
              />
            )}
            {dateType === "multiple" && (
              <div className="date-range-container">
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateFormValue(e, "startDate")}
                  data-date=""
                  data-date-format="DD MMMM YYYY"
                />{" "}
                to{" "}
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => updateFormValue(e, "endDate")}
                  data-date=""
                  data-date-format="DD MMMM YYYY"
                />
              </div>
            )}
          </div>
          {formError.date && (
            <span className={styles.error}>{formError.date}</span>
          )}
        </div>
        <div className={styles.thumbnail}>
          <label>Thumbnail:</label>
          {form.thumbnail ? (
            <div className={styles.imageFilled}>
              <img src={URL.createObjectURL(form.thumbnail)} alt="Thumbnail" />
              <button onClick={(e) => updateFormValue(e, "thumbnail")}>
                Clear Thumbnail
              </button>
            </div>
          ) : (
            <button className={styles.image}>
              <div className={styles.placeholder}>
                <ImagePlaceholder />
                <p>Cover photo goes here!!!</p>
              </div>
              <input
                ref={hiddenFileInput}
                type="file"
                onChange={onThumbnailChange}
                onClick={onThumbnailChange}
              />
            </button>
          )}
          {formError.thumbnail && (
            <span className={styles.error}>{formError.thumbnail}</span>
          )}
        </div>
        <div className={styles.content}>
          <label>Content:</label>

          <Modal
            open={openModal}
            handleClose={handleCloseModal}
            content={content}
            setContent={setContent}
            type={modalType}
          />
          <div className={styles.items}>
            {formError.content && (
              <span className={styles.error}>{formError.content}</span>
            )}
            <Reorder.Group values={content} onReorder={setContent}>
              {content.map((section: any, i: number) => (
                <ReorderItem
                  key={section.id}
                  type={section.type}
                  value={section}
                  index={i}
                  handleRemoveContent={handleRemoveContent}
                />
              ))}
            </Reorder.Group>
          </div>
          <div className={styles.buttons}>
            <Button
              text="Add Image/Caption 🖼️"
              onClick={(e: any) => handleOpenModal(e, "image")}
            />
            <Button
              text="Add Text 📝"
              onClick={(e: any) => handleOpenModal(e, "text")}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button text="Clear All" onClick={handleClear} />
          <Button text="Post" />
        </div>
      </form>
    </body>
  );
}
