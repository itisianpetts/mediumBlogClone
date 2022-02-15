import Link from 'next/link'

function Header() {
  return (
    <header className="bg-medium-yellow">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-5">
        <Link href="/">
          <img
            className="ml-5 box-border h-6 w-40 cursor-pointer object-contain sm:ml-5 md:ml-10"
            src="/medium-logo.png"
            alt="medium-logo"
          />
        </Link>

        <div className="mr-5 flex space-x-5 text-sm font-light md:mr-10">
          <div className="hidden items-center space-x-5 md:inline-flex">
            <h3 className="cursor-pointer">Our story</h3>
            <h3 className="cursor-pointer">Membership</h3>
            <h3 className="cursor-pointer">Write</h3>
          </div>
          <div className="items-center space-x-5">
            <h3 className="hidden cursor-pointer sm:inline-flex">Sign in</h3>
            <button className="inline-flex rounded-full  bg-black px-4 py-2 font-light text-white">
              Get started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
