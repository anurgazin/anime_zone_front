type ErrorProps = {
    error: string;
}

export default function Error({ error }: ErrorProps) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-anton text-red-600">Error</h2>
                <p className="mt-4 font-antonio text-gray-700">{error}</p>
            </div>
        </div>
    );
};
