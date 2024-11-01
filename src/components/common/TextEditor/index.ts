import dynamic from 'next/dynamic';

export default dynamic(() => import('./TextEditor'), { ssr: false });
