import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import svgLoader from "vite-svg-loader";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		/** 将 SVG 静态图转化为 Vue 组件 */
		svgLoader({ defaultImport: "url" }),
		/** SVG */
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), "src/assets/icon")],
			symbolId: "icon-[dir]-[name]"
		}),
	],
	base: "./",
	resolve: {
		alias: {
			 /** @ 符号指向 src 目录 */
			"@": path.resolve(__dirname, "./src"),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				charset: false,
			},
		},
	},
	server: {
		 /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
		 host: true, // host: "0.0.0.0"
		port: 3001,
		/** 启动自动打开浏览器 */
		open: true,
		/** 代理地址 */
		proxy: {
			"/service": {
				target: "http://localhost:3000/",
				// target: 'https://wanting615.com.cn/service/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	// 混淆器
	esbuild: {
		/** 打包时移除 console.log */
		pure: ["console.log"],
		/** 打包时移除 debugger */
		drop: ["debugger"],
		/** 打包时移除所有注释 */
		legalComments: "none"
	},
	build: {
		/** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
		chunkSizeWarningLimit: 2048,
		/** 禁用 gzip 压缩大小报告 */
		reportCompressedSize: false,
		/** 打包后静态资源目录 */
		assetsDir: "static",
		rollupOptions: {
			output: {
				/**
				 * 分块策略
				 * 1. 注意这些包名必须存在，否则打包会报错
				 * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
				 */
				manualChunks: {
					vue: ["vue", "vue-router", "pinia"],
					element: ["element-plus", "@element-plus/icons-vue"],
					vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
				}
			}
		}
	},
});
