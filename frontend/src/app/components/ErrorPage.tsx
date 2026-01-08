import Link from "next/link";

export default function ErrorPage({ showHomePage }: { showHomePage: boolean }) {
  return (
    <div className="flex flex-col flex-1 justify-center items-center w-full min-h-165 p-20 text-3xl text-gray-400">
      <div className="flex flex-col items-center">
        <span>Something went wrong!</span>
        <span>Please try again later</span>
      </div>
      <span className="my-10 text-9xl">o_0</span>
      {showHomePage ? (
        <Link
          href={"/"}
          className="mt-10 text-blue-400 funnel-text text-2xl font-light"
        >
          Go to home page
        </Link>
      ) : null}
    </div>
  );
}
