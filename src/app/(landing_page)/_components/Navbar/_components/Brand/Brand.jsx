import Link from "next/link";

export default function Brand({children, href}){
	return (
		<Link href={href}>
			<p className="font-bold text-xl font-exo2 text-white">
				{children}
			</p>
		</Link>
	);
}