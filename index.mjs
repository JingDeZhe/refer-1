import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import glob from 'fast-glob'

const resolve = (p) => fileURLToPath(new URL(p, import.meta.url))

async function start() {
  const childBuilds = await glob(['./*/index.mjs'], {
    cwd: resolve('.'),
  })

  for (let v of childBuilds) {
    import(`./${v}`)
  }

  const HTMLFiles = await glob(['./*/index.html'], {
    cwd: resolve('.'),
  })
  HTMLFiles.sort()
  const result = HTMLFiles.map((filepath) => {
    const arr = filepath.split('/')
    return `<li><a href="./${filepath}">${arr[1].startsWith('index.') ? arr[0] : filepath}</a></li>`
  }).join('\n')
  fs.writeFile(
    resolve('./index.html'),
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Refer 1</title>
        <link rel="stylesheet" href="./index.css" />
      </head>
      <body>
        <!-- generated by ./index.mjs -->
        <h1>Refer 1</h1>
        <ul>
          ${result}
        </ul>
      </body>
    </html>
  `,
    (err) => {}
  )
}

start()