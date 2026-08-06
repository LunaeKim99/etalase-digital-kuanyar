import { handle } from 'hono/vercel'

let _app: any
async function getApp() {
  if (!_app) {
    const mod = await import('../server/index')
    _app = mod.default
  }
  return _app
}

async function dispatch(req: Request) {
  try {
    const app = await getApp()
    return handle(app)(req)
  } catch (err: any) {
    console.error('[api/index init error]', err?.stack || err?.message || err)
    return new Response(
      JSON.stringify({ success: false, error: 'Function init failed', details: err?.message ?? 'Unknown' }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    )
  }
}

export const GET = (req: Request) => dispatch(req)
export const POST = (req: Request) => dispatch(req)
export const PUT = (req: Request) => dispatch(req)
export const DELETE = (req: Request) => dispatch(req)
export const PATCH = (req: Request) => dispatch(req)