import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export type ArticleStateType = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [PageState, setPageState] = useState(defaultArticleState);
	const handleApply = (newState: Partial<ArticleStateType>) =>
		setPageState((prev) => ({ ...prev, ...newState }));
	const handleReset = () => {
		setPageState(defaultArticleState);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': PageState.fontFamilyOption.value,
					'--font-size': PageState.fontSizeOption.value,
					'--font-color': PageState.fontColor.value,
					'--container-width': PageState.contentWidth.value,
					'--bg-color': PageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} onReset={handleReset} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
