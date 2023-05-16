import { Fragment } from 'react';
import './GlobalStyles.scss';

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

const GlobalStyles = ({ children }: Props) => {
    return <Fragment>{children}</Fragment>;
};

export default GlobalStyles;
