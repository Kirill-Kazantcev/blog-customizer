import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './App'; // Вынесли компонент App в отдельный файл для лучшей организации кода

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
