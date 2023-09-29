const posts = [
  {
    title: "Introduction to JavaScript",
    slug: "introduction-to-javascript",
    content: "JavaScript is a high-level, interpreted programming language.",
  },
  {
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    title: "Understanding Async/Await",
    slug: "understanding-async-await",
    content: "Async/Await makes asynchronous code easier to read and write.",
  },
  {
    title: "Web Development Basics",
    slug: "web-development-basics",
    content:
      "Learn the basics of HTML, CSS, and JavaScript to build web applications.",
  },
  {
    title: "Exploring Node.js",
    slug: "exploring-nodejs",
    content: "Node.js allows you to run JavaScript on the server.",
  },
];

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json("Not logged in");
  }
  return NextResponse.json(posts);
}
