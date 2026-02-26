import { useEffect } from 'react';

type UseCloseOnOutsideClickOrEscProps = {
	isOpen: boolean;
	onClose: () => void;
	elementRef: React.RefObject<HTMLElement>;
	excludeRef?: React.RefObject<HTMLElement>;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpen,
	onClose,
	elementRef,
	excludeRef,
}: UseCloseOnOutsideClickOrEscProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (elementRef.current?.contains(target)) {
				return;
			}

			if (excludeRef?.current?.contains(target)) {
				return;
			}

			onClose();
		};

		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscKey);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [isOpen, onClose, elementRef, excludeRef]);
};
