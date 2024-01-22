import Post from "@/components/Post";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <Post postId={id} />;
}
