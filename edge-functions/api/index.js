/**
 * EdgeOne Makers Edge Function - /api 端点
 *
 * 独立于 Cloudflare Workers 的 server/index.ts，仅运行在 EdgeOne 边缘节点。
 * 路由：/api 与 /api/ 由本文件处理；/api/* 子路径需额外创建 [[default]].js。
 *
 * EdgeOne Edge Functions 使用文件路由：
 *   edge-functions/api/index.js  ->  /api
 *
 * Handler 签名：export function onRequest(context: EventContext): Response | Promise<Response>
 * context 包含：request, env, params, next, waitUntil
 */

export function onRequest(context) {
	const { request, env } = context;
	const url = new URL(request.url);

	return Response.json(
		{
			name: 'EdgeOne',
			platform: 'makers',
			runtime: 'edge-functions',
			path: url.pathname,
			timestamp: Date.now(),
			env: env?.DEPLOY_ENV || 'production',
		},
		{
			headers: {
				'Cache-Control': 'no-store',
				'Access-Control-Allow-Origin': '*',
			},
		},
	);
}
