import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailerRef = useRef<HTMLDivElement>(null);
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const trailer = trailerRef.current;
        if (!cursor || !trailer) return;

        let mouseX = 0;
        let mouseY = 0;
        let trailerX = 0;
        let trailerY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Immediate update for the main dot
            cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px) scale(${isPointer ? 1.5 : 1})`;

            // Check pointer status
            const target = e.target as HTMLElement;

            // Since we are hiding the default cursor, getComputedStyle(target).cursor might return 'none'.
            // We need robust checks for interactive elements.
            const isClickable =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT" ||
                target.tagName === "LABEL" ||
                target.closest("a") !== null ||
                target.closest("button") !== null ||
                target.getAttribute("role") === "button" ||
                (target.className && typeof target.className === 'string' && target.className.includes("cursor-pointer"));

            const shouldBePointer = !!isClickable;
            if (cursor.dataset.pointer !== String(shouldBePointer)) {
                cursor.dataset.pointer = String(shouldBePointer);
                trailer.dataset.pointer = String(shouldBePointer);

                const scale = shouldBePointer ? 1.5 : 1;
                cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px) scale(${scale})`;
            }
        };

        const animateTrailer = () => {
            // Linear interpolation (lerp) for smooth trailing
            const ease = 0.25;
            trailerX += (mouseX - trailerX) * ease;
            trailerY += (mouseY - trailerY) * ease;

            const scale = cursor.dataset.pointer === "true" ? 1.5 : 1;
            trailer.style.transform = `translate(${trailerX - 16}px, ${trailerY - 16}px) scale(${scale})`;

            requestAnimationFrame(animateTrailer);
        };

        window.addEventListener("mousemove", onMouseMove);
        const animationId = requestAnimationFrame(animateTrailer);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <>
            {/* Main Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out"
                style={{ transform: "translate(-100px, -100px)" }}
            />

            {/* Trailing Circle */}
            <div
                ref={trailerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
                style={{
                    transform: "translate(-100px, -100px)",
                    opacity: 0.6
                }}
            />
        </>
    );
};
