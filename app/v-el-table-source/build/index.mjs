import { shell } from "./exec.mjs";
import { readFile, writeFile } from "fs/promises";

const version = '0.1.0-rc.58'


    ; (async () => {
        const jsonStr = await readFile('build/package.json', { encoding: 'utf-8' })

        const json = JSON.parse(jsonStr)
        json.version = version

        const md = await readFile('README.md', { encoding: 'utf-8' })

        const mdRes = md.toString().replace(/npm-([\d\-.\w]+)-skyblue/mg, (m, m1) => {
            const ov = m1.replace('--', '-')
            if (ov != version)
                console.log(`\told version: ${ov}\n\tnew version: ${version}`)

            return `npm-${version.replace('-', '--')}-skyblue`
        })

        await Promise.allSettled([
            writeFile('../../packages/v-el-table/README.md', mdRes),
            writeFile('README.md', mdRes),
            writeFile('build/package.json', JSON.stringify(json, undefined, 2)),
            writeFile('../../packages/v-el-table/package.json', JSON.stringify(json, undefined, 2))
        ])

        shell('echo ok')
    })();
