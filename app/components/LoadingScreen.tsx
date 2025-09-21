"use client";

import { motion } from "framer-motion";

const LoadingScreen = () => {
    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-black" />
            <div className="absolute inset-0 opacity-70">
                <div className="absolute inset-y-0 left-1/2 h-[140%] w-[140%] -translate-x-1/2 bg-[radial-gradient(circle,_rgba(250,204,21,0.18),_transparent_55%)] blur-3xl" />
                <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
                <div className="absolute right-[-10%] top-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
            </div>

            <motion.div
                aria-hidden
                className="absolute h-[440px] w-[440px] rounded-full border border-amber-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                aria-hidden
                className="absolute h-[560px] w-[560px] rounded-full border border-amber-500/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                aria-hidden
                className="absolute h-[320px] w-[320px] rounded-full border border-amber-400/30 blur-sm"
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 flex max-w-md flex-col items-center gap-6 text-center">
                <motion.span
                    className="inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-white/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-600 backdrop-blur-sm dark:border-amber-300/30 dark:bg-white/5 dark:text-amber-200"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                    <motion.span
                        className="h-2 w-2 rounded-full bg-amber-500"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    Loading Portfolio
                </motion.span>

                <motion.h1
                    className="text-3xl font-semibold leading-tight sm:text-4xl"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
                >
                    Crafting a
                    <span className="mx-2 inline-block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                        global-first
                    </span>
                    experience for you
                </motion.h1>

                <motion.p
                    className="max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
                >
                    Calibrating immersive visuals, curated projects, and a story-driven journey.
                    Hang tight while we prepare something special.
                </motion.p>

                <motion.div
                    className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-400"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
                >
                    <motion.span
                        className="flex h-2 w-12 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-700/60"
                        animate={{
                            backgroundPositionX: ["0%", "100%"],
                        }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            backgroundImage:
                                "linear-gradient(90deg, rgba(250,204,21,0.05) 0%, rgba(250,204,21,0.8) 50%, rgba(250,204,21,0.05) 100%)",
                            backgroundSize: "200% 100%",
                        }}
                    />
                    Preparing
                </motion.div>
            </div>
        </div>
    );
};

export default LoadingScreen;