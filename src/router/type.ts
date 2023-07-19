import { defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

export interface RouteMeta {
	title?: string;
	needLogin?: boolean;
	keepAlive?: boolean;
}

export type Component<T extends any = any> =
	| ReturnType<typeof defineComponent>
	| (() => Promise<typeof import("*.vue")>)
	| (() => Promise<T>);

declare type Recordable<T = any> = Record<string, T>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
	name: string;
	meta?: RouteMeta;
	component?: Component | string;
	components?: Component;
	children?: AppRouteRecordRaw[];
	props?: Recordable;
	fullPath?: string;
}

export interface FileType {
	[k: string]: Component;
}
