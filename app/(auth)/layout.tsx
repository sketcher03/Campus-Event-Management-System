const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-center min-h-screen w-full bg-stone-400">
            { children }
        </div>
    )
}

export default layout