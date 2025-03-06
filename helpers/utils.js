/**
 * Generates a random string.
 */
export const generateRandomString = () => Math.random().toString(36).substring(2, 10) + Math.floor(Math.random() * 10)

/**
 * @param length
 * @returns {string}
 * Generates a random characters of a given length.
 */
export const generateRandomCharacters = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * the debounceDom function helps you wait until the DOM becomes stable,
 * where stability is defined by the absence of changes over a certain period.
 * This can be useful in scenarios where you need to wait for dynamic content
 * or loading processes to settle before performing further actions on the page.
 * @param page
 * @param pollDelay
 * @param stableDelay
 */
export const debounceDom = async (page, pollDelay = 50, stableDelay = 450) => {
  let markupPrevious = ''
  const timerStart = new Date()
  let isStable = false
  while (!isStable) {
    const markupCurrent = await page.evaluate(() => document.body.innerHTML)
    if (markupCurrent === markupPrevious) {
      const elapsed = new Date().getTime() - timerStart.getTime()
      isStable = stableDelay <= elapsed
    } else {
      markupPrevious = markupCurrent
    }
    if (!isStable) await new Promise(resolve => setTimeout(resolve, pollDelay))
  }
}
