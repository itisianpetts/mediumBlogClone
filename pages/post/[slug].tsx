import { useState } from 'react'
import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Inputs {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <main>
      <Header />

      <img
        className="h-40 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt="main-image"
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-700">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt="author-image"
          />
          <div className="">
            <p className="text-sm font-extralight">
              {post.author.name} -{' '}
              <span className="font-light text-green-600">Follow</span>
            </p>
            <p className="text-sm font-extralight">
              {new Date(post._createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),

              h2: (props: any) => (
                <h2 className="my-5 text-xl font-bold" {...props} />
              ),

              li: ({ children }: any) => (
                <li className="ml-4 list-disc last-of-type:mb-2">{children}</li>
              ),

              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>

        <hr className="my-5 mx-auto max-w-lg border-yellow-500" />

        {submitted ? (
          <div className="my-10 mx-auto flex max-w-2xl flex-col  bg-yellow-500 py-10 text-white">
            <h3 className="mx-5 text-3xl font-bold">
              Thank you for Submitting your Comment!
            </h3>
            <p className="mx-5 mt-2">
              {' '}
              Once it has been approves,It will appear below!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
          >
            <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
            <h4 className="text-3xl font-bold">Leave a comment below</h4>
            <hr className="mt-2 py-3" />

            <input
              type="hidden"
              {...register('_id')}
              name="_id"
              value={post._id}
            />

            <label className="mb-5 block">
              {errors.name ? (
                <span className="text-red-500">The Name Field is Required</span>
              ) : (
                <span className="text-gray-700">Name</span>
              )}

              <input
                {...register('name', { required: true })}
                className="mt-1 block w-full rounded border py-2 px-3 shadow  outline-none ring-yellow-500 focus:ring"
                placeholder="Enter your name..."
                type="text"
              />
            </label>
            <label className="mb-5 block">
              {errors.email ? (
                <span className="text-red-500">
                  The Email Field is Required
                </span>
              ) : (
                <span className="text-gray-700">Email</span>
              )}
              <input
                {...register('email', { required: true })}
                className="mt-1 block w-full rounded border py-2 px-3 shadow  outline-none ring-yellow-500 focus:ring"
                placeholder="Enter your email..."
                type="text"
              />
            </label>
            <label className="mb-5 block">
              {errors.comment ? (
                <span className="text-red-500">
                  The Comment Field is Required
                </span>
              ) : (
                <span className="text-gray-700">Comment</span>
              )}
              <textarea
                {...register('comment', { required: true })}
                className="mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="Enter your comment..."
                rows={8}
              />
            </label>

            <input
              type="submit"
              className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow focus:outline-none"
            />
          </form>
        )}

        <div className="my-10 mx-auto flex max-w-2xl flex-col space-x-2 border border-yellow-500 p-10">
          <h3 className="pb-2 text-3xl">Comments</h3>

          {post.comments.map((comment) => (
            <div className="mt-2 " key={comment._id}>
              <p className="">{comment.comment}</p>
              <p className="text-sm">
                posted by{' '}
                <span className="text-yellow-500">{comment.name}</span>
              </p>
              <hr className="pb-2" />
            </div>
          ))}
        </div>
      </article>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `
    *[_type == 'post']{
      _id,
      slug {
      current
    }
  }
  `
  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author -> {
        name,
        image
      },
      'comments':*[_type == "comment" && post._ref == ^._id && approved == true],
        description,
        mainImage,
        slug,
        body
    }
  `
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 3600,
  }
}
