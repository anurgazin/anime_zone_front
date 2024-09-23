export default function About() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* About */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-anton text-orange-400 mb-4">About Anime Zone</h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Welcome to <span className="font-anton text-orange-400">Anime Zone</span>, your ultimate destination for discovering, exploring, and sharing your passion for anime! Whether you are a seasoned otaku or new to the world of anime, our platform provides a vibrant community where you can find and engage with content that matches your interests.
                </p>
            </div>

            {/* Offer */}
            <div className="mb-12">
                <h1 className="text-3xl font-anton text-orange-400 mb-6">What We Offer</h1>
                <ol className="list-decimal list-inside space-y-6 text-lg text-gray-700 leading-relaxed">
                    <li>
                        <span className="text-gray-900 font-bold font-antonio">Discover New Anime:</span> Explore a vast library of anime series and movies across various genres, from action-packed adventures to heartwarming romances. Our constantly updated collection ensures you never miss out on the latest releases or hidden gems.
                    </li>
                    <li>
                        <span className="text-gray-900 font-bold font-antonio">Rate and Review Anime:</span> After watching an anime, you can rate it on a scale of 1 to 10, helping others in the community discover the best shows. Write reviews to share your thoughts and see what other fans are saying.
                    </li>
                    <li>
                        <span className="text-gray-900 font-bold font-antonio">Build Your Personal Anime Lists:</span>
                        <ul className="list-disc list-inside ml-6 space-y-4">
                            <li>
                                <span className="text-gray-900 font-bold font-antonio">Favorite Anime List:</span> Create your personalized list of favorite anime series and movies. Easily keep track of the shows you love the most and share your recommendations with other users.
                            </li>
                            <li>
                                <span className="text-gray-900 font-bold font-antonio">Favorite Characters List:</span> Anime is filled with iconic characters. With our site, you can curate your own list of beloved anime characters and celebrate the ones that made a lasting impact on you.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span className="text-gray-900 font-bold font-antonio">Search by Genre and More:</span> Looking for something specific? Use our search filters to find anime by genre, release date, rating, or even by studio. We make it easy for you to find exactly what you’re in the mood for.
                    </li>
                </ol>
            </div>

            {/* Join */}
            <div className="text-center">
                <h1 className="text-3xl font-anton text-orange-400 mb-4">Join the Anime Community</h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    By joining <span className="font-anton text-orange-400">Anime Zone</span>, you’re not just signing up for a website—you’re becoming part of a community of passionate anime fans. Share your lists, explore new shows, and engage in conversations that bring the world of anime to life.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Ready to dive into the world of anime? <span className="font-anton text-orange-400">Join us now</span> and start your anime adventure!
                </p>
            </div>
        </div>
    );
}
