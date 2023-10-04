// 'use client' // to use this component as client-side rendering/client component in place of server-side rendering/server component

// This is the homepage
// This is what we see when we open localhost:3000

// _ means, our own CSS styling(globals.css), - means from tailwind CSS
import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      {/* Feeds */}
      <Feed />
    </section>
  )
}

export default Home
