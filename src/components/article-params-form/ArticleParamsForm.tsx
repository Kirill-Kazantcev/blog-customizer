import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { Fragment, useState, useRef, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type Props = {
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({ onApply, onReset }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!isOpen) return;

			const target = event.target as Node;
			const isClickInsideSidebar = sidebarRef.current?.contains(target);
			const isClickOnArrow = arrowButtonRef.current?.contains(target);

			if (!isClickInsideSidebar && !isClickOnArrow) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	}, [isOpen]);

	const handleChange = (key: keyof ArticleStateType, option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			[key]: option,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
		setIsOpen(false);
	};

	return (
		<Fragment>
			<div ref={arrowButtonRef}>
				<ArrowButton
					isOpen={isOpen}
					onClick={() => setIsOpen((prev) => !prev)}
				/>
			</div>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<fieldset className={styles.group}>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) => handleChange('fontFamilyOption', option)}
							title='шрифт'
						/>
						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => handleChange('fontSizeOption', option)}
							title='размер шрифта'
						/>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) => handleChange('fontColor', option)}
							title='цвет шрифта'
						/>
					</fieldset>
					<Separator />
					<fieldset className={styles.group}>
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) => handleChange('backgroundColor', option)}
							title='цвет фона'
						/>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) => handleChange('contentWidth', option)}
							title='ширина контента'
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</Fragment>
	);
};
