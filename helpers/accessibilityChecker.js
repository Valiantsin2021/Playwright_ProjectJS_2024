import { AxeBuilder } from '@axe-core/playwright'
import { createHtmlReport } from 'axe-html-reporter'
import * as fs from 'fs'
import * as path from 'path'

export async function runAccessibilityCheck(page, testInfo, description) {
  const axeResults = await new AxeBuilder({ page }).withTags(['wcag22aa', 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()

  if (axeResults.violations.length > 0) {
    const reportDir = 'report/axe-core-reports'
    const reportPath = path.join(reportDir, `${description}-accessibility-report.html`)

    createHtmlReport({
      results: axeResults,
      options: {
        outputDir: reportDir,
        reportFileName: `${description}-accessibility-report.html`
      }
    })

    if (fs.existsSync(reportPath)) {
      await testInfo.attach(`${description}-accessibility-report`, {
        path: reportPath,
        contentType: 'text/html'
      })
    } else {
      console.error(`Failed to generate accessibility report at: ${reportPath}`)
    }

    // expect.soft(axeResults.violations, `Accessibility violations found in ${description} page`).toEqual([])
  }
}
