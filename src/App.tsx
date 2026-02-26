import { useState, CSSProperties } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import styles from './styles/index.module.scss';
import './styles/index.scss';

export const App = () => {
	const [pageState, setPageState] = useState(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		setPageState(newState);
	};

	const handleReset = () => {
		setPageState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApply}
				onReset={handleReset}
				currentState={pageState}
			/>
			<Article />
		</main>
	);
};
