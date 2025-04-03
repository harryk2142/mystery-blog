export const callConfetti = async () => {
	const confetti = await import("https://esm.sh/canvas-confetti");

	confetti.default();
};
