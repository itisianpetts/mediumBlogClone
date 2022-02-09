import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Medium Clone - with Typescript & Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="border-y border-black bg-medium-yellow">
        <div className="mx-auto max-w-7xl">
          <div className="absolute mx-5 flex pt-10 md:mx-12">
            {/* Comment */}
            <div className="">
              <h1 className=" max-w-md font-serif text-5xl tracking-tight sm:text-6xl md:max-w-lg md:leading-tight">
                Medium is a place to write, read, and connect
              </h1>
              <h2 className="max-w-sm py-2 leading-relaxed">
                It's easy and free to post your thinking on any topic and
                connect with millions of readers.
              </h2>
              <button className="mt-2 rounded-full border border-black bg-gray-50 px-5 py-2">
                Start Writing
              </button>
            </div>
          </div>
          <div className="flex justify-end md:pt-24 lg:pt-12">
            <img
              className="h-96 w-96 opacity-0 md:mx-0 md:opacity-100 lg:mr-20 lg:mt-0"
              src="/background-image.png"
              alt="medium-quotes"
            />
          </div>
        </div>

        {/* Posts */}
      </div>
    </div>
  )
}
