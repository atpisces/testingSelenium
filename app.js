const express = require('express');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const app = express();
const port = 3000;

// Endpoint to run the Selenium script
app.get('/run-selenium', async (req, res) => {
  // Set Chrome options
  let options = new chrome.Options();

  // Initialize the WebDriver
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to Google and perform the search
    await driver.get('https://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    res.send('Selenium script executed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error executing Selenium script');
  } finally {
    // Quit the driver
    await driver.quit();
  }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
