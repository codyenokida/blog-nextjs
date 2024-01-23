// This file only contains types of blog post content
import { Timestamp } from "firebase/firestore";

export {};

declare global {
  interface Content {
    type: "text" | "image";
    text?: string;
    imageUrl?: string;
    imageCaption?: string;
  }

  interface Comment {
    datePosted: string;
    author: string;
    content: string;
  }

  interface BlogPostData {
    id: string;
    title: string;
    category: string;
    dateType: "single" | "multiple";
    startDate: Timestamp;
    endDate?: Timestamp;
    datePosted: Timestamp;
    content: Content[];
    spotifyLink?: string;
    comments?: Comment[];
  }

  interface BlogPostItem {
    id: string;
    title: string;
    category: string;
    datePosted: Timestamp;
    thumbnail: string;
  }

  interface FirestoreQuery {
    id?: string;
    category?: string;
    order?: "asc" | "desc";
  }
}
