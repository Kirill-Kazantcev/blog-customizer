import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { Fragment, useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useCloseOnOutsideClickOrEsc } from 'src/hooks/useCloseOnOutsideClickOrEsc';

type Props = {
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
	currentState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
	currentState,
}: Props) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(currentState);

	const sidebarRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useCloseOnOutsideClickOrEsc({
		isOpen: isFormOpen,
		onClose: () => setIsFormOpen(false),
		elementRef: sidebarRef,
		excludeRef: arrowButtonRef,
	});

	const handleChange =
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[key]: option,
			}));
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		// Не закрываем форму!
	};

	const handleFormReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(currentState);
		onReset();
		// Не закрываем форму!
	};

	const toggleForm = () => {
		setIsFormOpen((prev) => !prev);
		if (!isFormOpen) {
			setFormState(currentState);
		}
	};

	return (
		<Fragment>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			</div>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<fieldset className={styles.group}>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleChange('fontFamilyOption')}
							title='шрифт'
						/>
						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
							title='размер шрифта'
						/>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleChange('fontColor')}
							title='цвет шрифта'
						/>
					</fieldset>
					<Separator />
					<fieldset className={styles.group}>
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleChange('backgroundColor')}
							title='цвет фона'
						/>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleChange('contentWidth')}
							title='ширина контента'
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</Fragment>
	);
};
