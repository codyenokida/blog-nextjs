import PostEdit from "@/components/PostEdit";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <PostEdit id={id} />;
}
