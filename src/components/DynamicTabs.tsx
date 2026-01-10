import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TabData {
	id: string;
	title: string;
	content: ReactNode;
}

interface DynamicTabsProps {
	tabs: TabData[];
	defaultValue?: string;
	className?: React.ComponentProps<typeof Tabs>['className'];
	tabsListClassName?: React.ComponentProps<typeof TabsList>['className'];
	tabsTriggerClassName?: React.ComponentProps<typeof TabsTrigger>['className'];
	tabsContentClassName?: React.ComponentProps<typeof TabsContent>['className'];
}

export default function DynamicTabs({
	tabs,
	defaultValue,
	className,
	tabsListClassName,
	tabsTriggerClassName,
	tabsContentClassName,
}: DynamicTabsProps) {
	const defaultTab = defaultValue || tabs[0]?.id;

	return (
		<Tabs defaultValue={defaultTab} className={cn('w-full', className)}>
			<TabsList className={cn('p-6 w-full sm:w-auto', tabsListClassName)}>
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.id}
						value={tab.id}
						className={cn(
							'flex-1 sm:flex-none px-3 sm:px-6 py-2 text-sm sm:text-base',
							tabsTriggerClassName,
						)}
					>
						{tab.title}
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab) => (
				<TabsContent
					key={tab.id}
					value={tab.id}
					className={cn('mt-3 sm:mt-4', tabsContentClassName)}
				>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
}
