import { fileURLToPath, URL } from 'node:url'
import Koa from 'koa'
import serve from 'koa-static'
import cors from '@koa/cors'

const resolve = (p) => fileURLToPath(new URL(p, import.meta.url))

const app = new Koa()
app.use(cors())
app.use(serve(resolve('./')))

app.listen(5177, () => {
  console.log('listening: http://localhost:5177')
})
