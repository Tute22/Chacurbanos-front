interface LeftArrowIconProps {
    onClick: () => void
    className: string
}

export const LeftArrowIcon: React.FC<LeftArrowIconProps> = ({
    onClick,
    className,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            onClick={onClick}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18" />
            <path d="M8 12l4 4" />
            <path d="M8 12h8" />
            <path d="M12 8l-4 4" />
        </svg>
    )
}
