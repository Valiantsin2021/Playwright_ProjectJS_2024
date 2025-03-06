class VideoDownloadPage {
  /**
   * Class constructor for BasePage.
   * @constructor
   * @param {import('@playwright/test').Page} page - Page passed in the constructor of the Page Object Model.
   */
  constructor(page) {
    this.page = page
  }

  locators = {
    getVideoDownloadHeader: () => this.page.getByLabel('Video Download').getByText('Video Download')
  }
}

export default VideoDownloadPage
