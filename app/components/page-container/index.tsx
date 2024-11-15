import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
	children,
	scrollable = true,
}: {
	children: React.ReactNode;
	scrollable?: boolean;
}) {
	return (
		<>
			{scrollable ? (
				<ScrollArea className='h-[calc(100dvh-96px)]'>
					<div className='h-full relative'>{children}</div>
				</ScrollArea>
			) : (
				<div className='h-full relative'>{children}</div>
			)}
		</>
	);
}
