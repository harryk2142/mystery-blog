import type { AnchorHTMLAttributes, ReactNode } from "preact/compat";

type Props = {
	children: ReactNode;
} & AnchorHTMLAttributes;

export const LinkButton = ({ children, ...rest }: Props) => {
	return (
		<a class={"button"} {...rest}>
			{children}
		</a>
	);
};
