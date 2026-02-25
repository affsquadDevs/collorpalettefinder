import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-col min-h-[calc(100vh-72px)] bg-[#fafafa] text-gray-900 font-sans items-center justify-center px-6">
            <div className="text-center max-w-xl mx-auto">

                {/* Colorful 404 Header */}
                <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] leading-[1] font-extrabold tracking-tighter mb-4">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                        404
                    </span>
                </h1>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight">
                    Page not found
                </h2>

                <p className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
                </p>

                {/* Animated Gradient Button */}
                <div className="relative inline-block group">
                    <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition duration-500 animate-rgb blur-[6px]"></div>
                    <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-100 transition duration-500 animate-rgb"></div>
                    <Link
                        href="/"
                        className="relative inline-flex items-center justify-center px-10 py-4 md:px-12 md:py-4 rounded-2xl bg-gray-950 text-white text-[17px] font-semibold transition-transform duration-300 group-hover:scale-[0.98]"
                    >
                        Go Home
                    </Link>
                </div>

            </div>
        </main>
    );
}
