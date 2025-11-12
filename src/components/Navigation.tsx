import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
	onNavigate: (section: "hero" | "learn" | "tokenize" | "create") => void;
	currentSection: string;
}

export const Navigation = ({ onNavigate, currentSection }: NavigationProps) => {
	const [minimized, setMinimized] = useState(false);
	const location = useLocation();

	// Determine if we're on the main page or a dedicated page
	const isMainPage = location.pathname === "/";
	const isCreatePage = location.pathname === "/create";

	useEffect(() => {
		let lastScroll = 0;
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			setMinimized(currentScroll > 100 && currentScroll > lastScroll);
			lastScroll = currentScroll;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleNavigate = (
		section: "hero" | "learn" | "tokenize" | "create",
	) => {
		setMinimized(true);
		onNavigate(section);
	};

	// Determine active section for highlighting
	const getActiveClass = (section: string) => {
		const sectionMatch =
			(isMainPage && currentSection === section) ||
			(isCreatePage && section === "create");
		return sectionMatch ? "opacity-100" : "opacity-40";
	};

	return (
		<nav
			className={`fixed top-0 left-0 z-50 flex items-center gap-4 md:gap-8 transition-all duration-300 ${
				minimized ? "p-2 md:p-3" : "p-4 md:p-8"
			}`}
		>
			<Link
				to="/"
				className={`font-light tracking-tight hover:opacity-60 transition-all duration-300 ${
					minimized ? "text-lg md:text-xl" : "text-2xl md:text-4xl"
				}`}
			>
				TOKENIZERS
			</Link>
			<div
				className={`flex gap-3 md:gap-6 transition-all duration-300 ${
					minimized ? "text-[10px] md:text-xs" : "text-xs md:text-sm"
				}`}
			>
				{isMainPage ? (
					<>
						<button
							type="button"
							onClick={() => handleNavigate("learn")}
							className={`hover:opacity-60 transition-opacity ${getActiveClass("learn")}`}
						>
							learn
						</button>
						<button
							type="button"
							onClick={() => handleNavigate("tokenize")}
							className={`hover:opacity-60 transition-opacity ${getActiveClass("tokenize")}`}
						>
							tokenize
						</button>
						<Link
							to="/create"
							className={`hover:opacity-60 transition-opacity ${getActiveClass("create")}`}
						>
							create
						</Link>
					</>
				) : (
					<>
						<Link
							to="/"
							className={`hover:opacity-60 transition-opacity ${getActiveClass("learn")}`}
						>
							learn
						</Link>
						<Link
							to="/"
							className={`hover:opacity-60 transition-opacity ${getActiveClass("tokenize")}`}
						>
							tokenize
						</Link>
						<Link
							to="/create"
							className={`hover:opacity-60 transition-opacity ${getActiveClass("create")}`}
						>
							create
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};
