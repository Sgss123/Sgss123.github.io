import { renderToString } from 'vue/server-renderer'
import { createAppInstance } from '../src/main'
import { createAppRouter } from '../src/router'

function getHtmlShell(content: string, title: string) {
  return `<!DOCTYPE html>
<html lang="zh-CN" class="dark" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="geekBlog — 探索技术的无限可能" />
    <title>${title}</title>
    <meta name="ssr" content="true" />
  </head>
  <body>
    <div id="app">${content}</div>
  </body>
</html>`
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url)

		if (url.pathname.startsWith('/api/')) {
			return Response.json({
				name: 'Cloudflare',
			})
		}

		if (url.pathname.startsWith('/assets/') || url.pathname.includes('.')) {
			const assetResponse = await (env as { ASSETS?: { fetch: (request: Request) => Promise<Response> } }).ASSETS?.fetch?.(request)
			if (assetResponse) {
				return assetResponse
			}
		}

		const router = createAppRouter()
		const app = createAppInstance(router)

		try {
			await router.push(url.pathname + url.search)
			await router.isReady()
			const html = await renderToString(app)
			const title = (router.currentRoute.value.meta?.title as string | undefined) || 'MFJip612'
			return new Response(getHtmlShell(html, title), {
				headers: {
					'content-type': 'text/html; charset=utf-8',
				},
			})
		} catch (error) {
			console.error('SSR render failed', error)
			return new Response(getHtmlShell('<main><h1>页面渲染失败</h1></main>', 'MFJip612'), {
				headers: {
					'content-type': 'text/html; charset=utf-8',
				},
			})
		}
	},
} satisfies ExportedHandler<Env>;
