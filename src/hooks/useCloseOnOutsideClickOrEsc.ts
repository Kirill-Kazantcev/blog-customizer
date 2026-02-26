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

			if (target instanceof HTMLElement) {
				const isInteractiveElement =
					target.closest('button') ||
					target.closest('.select') ||
					target.closest('[role="listbox"]') ||
					target.closest('[role="option"]') ||
					target.closest('.radio-group') ||
					target.closest('input') ||
					target.closest('label');
				if (isInteractiveElement) {
					return;
				}
			}

			const isClickInsideSidebar = elementRef.current?.contains(target);

			const isClickOnArrow = excludeRef?.current?.contains(target);

			if (!isClickInsideSidebar && !isClickOnArrow) {
				onClose();
			}
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
