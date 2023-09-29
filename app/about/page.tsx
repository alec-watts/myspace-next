
// Will know to use dynamic because page fetches no data.
export const dynamic = 'force-static'; // Being explicit

import { Metadata } from "next";

// Type the metadata
export const metadata: Metadata = {
  title: 'About Us',
  description: 'We are a social media company',
}

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>We are a social media. Hi Alec! This is a static page.</p>
    </div>
  )
}