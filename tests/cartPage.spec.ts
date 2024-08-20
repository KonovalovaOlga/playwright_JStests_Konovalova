import { test, Page, expect } from "@playwright/test";

test.only('Adding item to the cart and check its correct price on Review and Payments', async ({ page }) => {
  //Step 1: Login to the shop
  await page.goto('https://magento.softwaretestingboard.com/customer/account/login/');
  await page.fill('#email', 'martolyaa@gmail.com'); 
  await page.fill('#pass', '!i97cYkHxBriVsW'); 
  await page.locator('button:has-text("Sign In")').click();

  //Step 2: Go to the jackets page /men/tops-men/jackets-men.html
  await page.goto('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');

  //Step 3. Select 'Proteus Fitness Jackshirt' jacket of size M, color blue and add it to the cart
  //Extract price for later comparison on the "Review and Payment" page
  const jacketPriceLocator = page.locator('#product-price-430');
  await jacketPriceLocator.waitFor({ state: 'visible' });
  const jacketPriceText = await jacketPriceLocator.textContent();
  const jacketPriceNumber = parseFloat(jacketPriceText.replace(/[^0-9.]/g, ''));

  await page.locator('#option-label-size-143-item-168').first().click();
  await page.locator('#option-label-color-93-item-50').first().click();
  await page.locator('button:has-text("Add to Cart")').first().click();

  //Step 4. Go to the checkout page 
  await page.locator('.action.showcart').click();
  await page.locator('.action.showcart.active').isVisible();
  await page.locator('button#top-cart-btn-checkout[type="button"]').click();
  // await page.goto('https://magento.softwaretestingboard.com/checkout/')

  //Step 5. Click on 'next' on the shipping section to navigate to the 'Review and Payments' page
  const firstNameInput = page.locator('[name="firstname"]');
  await expect(firstNameInput).toBeVisible(); 
  await firstNameInput.fill('FirstName');

  const lastNameInput = page.locator('[name="lastname"]');
  await expect(lastNameInput).toBeVisible(); 
  await lastNameInput.fill('LastName');

  const companyInput = page.locator('[name="company"]');
  await expect(companyInput).toBeVisible(); 
  await companyInput.fill('CompanyName');

  const streetAddressInput = page.locator('[name="street[0]"]');
  await expect(streetAddressInput).toBeVisible(); 
  await streetAddressInput.fill('123 Main street');

  const cityInput = page.locator('[name="city"]');
  await expect(cityInput).toBeVisible(); 
  await cityInput.fill('Vancouver');

  //Country
  const countrySelect = page.locator('select[name="country_id"]');
  await countrySelect.click();
  await countrySelect.selectOption({ value: 'CA' });
  
  //Province
  const regionSelect = page.locator('select[name="region_id"]');
  await regionSelect.click();
  await regionSelect.selectOption({ value: '70' });

  const postcodeInput = page.locator('[name="postcode"]');
  await postcodeInput.fill('1A2 B3C');

  const telephoneInput = page.locator('[name="telephone"]');
  await telephoneInput.fill('1234567890');

  //Shipping Methods choice
  const radioButton = page.locator('input[name="ko_unique_1"].radio');
  await radioButton.check();
  await expect(radioButton).toBeChecked();
  //Extract shipping price for later comparison on the "Review and Payment" page
  const shippingPriceLocator = page.locator('span.price[data-bind="text: getFormattedPrice(method.price_excl_tax)"]').first();
  await shippingPriceLocator.waitFor({ state: 'visible' });
  const shippingPriceText = await shippingPriceLocator.textContent();
  const shippingPriceNumber = parseFloat(shippingPriceText.replace(/[^0-9.]/g, ''));

  //Step 6. Verify that on the  'Review and Payments' you can see the correct 'Cart Subtotal' price
  await page.locator('button[type="submit"].button.action.continue.primary').click();
  //Taking the product price, shipping cost and the final price from the final box on the payment page 
  //for comparison
  const cartSubtotalLocator = page.locator(".amount[data-th='Cart Subtotal']");
  // await cartSubtotalLocator.waitFor({ state: 'visible' });
  // const cartSubtotalText = await cartSubtotalLocator.textContent();
  // const cartSubtotalNumber = parseFloat(cartSubtotalLocator.replace(/[^0-9.]/g, ''));

  const shippingLocator = page.locator(".price[data-th='Shipping']");
  // await shippingLocator.waitFor({ state: 'visible' });
  // const shippingText = await shippingLocator.textContent();
  // const shippingNumber = parseFloat(shippingText.replace(/[^0-9.]/g, ''));

  const orderTotalLocator = page.locator(".price[data-th='Order Total']");
  // await orderTotalLocator.waitFor({ state: 'attached', timeout: 60000 });
  // const orderTotalText = await orderTotalLocator.textContent();
  // const orderTotalNumber = parseFloat(orderTotalText.replace(/[^0-9.]/g, ''));

  // jacketPriceNumber = cartSubtotalNumber
  // shippingPriceNumber = shippingNumber
  // jacketPriceNumber + shippingNumber = orderTotalNumber
}, 120000);

