// export const dynamic = "force-dynamic";
// ISR when used with generateStaticParams
export const revalidate = 420;

interface Post {
  title: string;
  content: string;
  slug: string;
}

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
    (res) => res.json()
  );

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  // deduped
  // with server components, need a full URL
  // Can also control caching at the fetch level
  const posts: Post[] = await fetch("http://localhost:3000/api/content", {
    // cache: "",
  }).then((res) => res.json());

  const post = posts.find((post) => post.slug === params.slug)!;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
