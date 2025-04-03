import type { ButtonHTMLAttributes, ReactNode } from "preact/compat";

type Props = {
	children: ReactNode;
} & ButtonHTMLAttributes;

export const Button = ({ children, ...rest }: Props) => {
	return <button {...rest}>{children}</button>;
};

export default Button;
