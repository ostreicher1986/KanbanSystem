import { cloneElement, ReactElement, ReactNode } from "react";

interface Props {
    contextProviders: ReactElement[];
    children: ReactNode;
}

const ContextProviderComposer: any = ({
    contextProviders,
    children,
}: Props) => {
    return contextProviders.reduceRight(
        (children, parent, index) => cloneElement(parent, { children }),
        children
    );
};

export default ContextProviderComposer;