"use client";

export const VideoPlayer = ({ src }: { src: string }) => {
    return (
        <div className="overflow-hidden">
            <video
                style={{
                    width: "100dvw",
                    height: "100dvh",
                    overflow: "hidden",
                }}
                src={
                    window !== undefined && window.location
                        ? `${location.origin}/${src}`
                        : ""
                }
            />
            <div className="">

            </div>
        </div>
    );
};
