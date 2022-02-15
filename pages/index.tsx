import { groq } from 'next-sanity'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

// Components
import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'

// Types
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="">
      <Head>
        <title>Medium Clone - with Typescript & Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="border-y border-gray-900 bg-medium-yellow">
        <div className="mx-auto flex max-w-7xl flex-row">
          <div className="ml-5 py-10 sm:ml-10 sm:basis-4/6">
            {/* Comment */}
            <h1 className="max-w-md font-serif text-5xl tracking-tight md:max-w-lg md:text-6xl md:leading-tight">
              Medium is a place to write, read, and connect
            </h1>
            <h2 className="max-w-sm py-5 leading-relaxed md:py-2">
              It's easy and free to post your thinking on any topic and connect
              with millions of readers.
            </h2>
            <button className="mt-2 rounded-full border border-gray-900 bg-gray-100 px-5 py-2">
              Start Writing
            </button>
          </div>
          <div className="sm:basis-2/6 md:inline-flex md:justify-end">
            <img
              className="hidden h-full w-96 object-cover pt-5 pr-5 md:inline-flex"
              src="/background-image.png"
              alt="medium-quotes"
            />
          </div>
        </div>
      </div>
      {/* Posts */}
      <div className="mx-auto flex max-w-7xl">
        <div className="ml-5 mb-1 flex items-center pt-5 text-sm font-semibold sm:ml-10">
          <img
            src="/trending_up.svg"
            alt="trending-up"
            className="mr-2 h-5 w-5 rounded-full border border-black p-0.5"
          />
          <span>TRENDING ON MEDIUM</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl">
        <div className="mx-auto grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <div className="flex">
              <p key={idx} className="p-2 pb-3 text-2xl text-gray-500">
                0{idx + 1}
              </p>

              <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className="cursor-pointer overflow-hidden rounded-lg">
                  <img
                    className="h-60 w-full object-cover "
                    src={urlFor(post.mainImage).url()!}
                    alt="post-image"
                  />
                  <div className="flex justify-between bg-white p-5">
                    <div>
                      <p className="text-lg font-bold">{post.title}</p>
                      <p className="mr-5 text-xs">{post.description}</p>
                      <p className="text-xs">by {post.author.name}</p>
                    </div>
                    <img
                      className="h-12 w-12 rounded-full "
                      src={urlFor(post.author.image).url()!}
                      alt="post-author"
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = groq`
    *[_type == 'post']{
      _id,
      title,
      author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
    }
  `

  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}
