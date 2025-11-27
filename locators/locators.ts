// locators.ts

import { ProductPage } from "../pages/ProductPage";

export const locators = {
    registrationPage: {
        declineCookiesButton: { type: 'role', value: { role: 'button', name: 'Decline' } },
        loginButton: { type: 'role', value: { role: 'button', name: 'Login' } },
        createAccountButton: { type: 'role', value: { role: 'button', name: 'Create an Account' } },
        firstNameInput: { type: 'role', value: { role: 'textbox', name: 'First Name' } },
        lastNameInput: { type: 'role', value: { role: 'textbox', name: 'Last Name' } },
        companyInput: { type: 'role', value: { role: 'textbox', name: 'Company, Institution or Organization' } },
        emailInput: { type: 'role', value: { role: 'textbox', name: 'Email Address' } },
        termsCheckbox: { type: 'role', value: { role: 'checkbox', name: /I have read and agreed to/i } },
        submitButton: { type: 'role', value: { role: 'button', name: 'Create Account' } },
        successHeading: { type: 'role', value: { role: 'heading', name: 'PLEASE CHECK YOUR EMAIL.' } },
        resetLinkParagraph: { type: 'text', value: 'Please click the link below to create a password for your account:' },
        firstNameError: { type: 'xpath', value: "//label[text()='First Name']/..//p[contains(text(),'This field is required')]" },
        lastNameError: { type: 'xpath', value: "//label[text()='Last Name']/..//p[contains(text(),'This field is required')]" },
        companyError: { type: 'xpath', value: "//label[text()='Company, Institution or Organization']/..//p[contains(text(),'This field is required')]" },
        emailError: { type: 'xpath', value: "//label[text()='Email Address']/..//p[contains(text(),'This field is required')]" },
    },

    loginPage: {
        loginButton: { type: 'role', value: { role: 'button', name: 'Login' } },
        closeLoginFormBtn: { type: 'role', value: { role: 'button', name: 'clos' } },
        emailInput: { type: 'role', value: { role: 'textbox', name: 'Email Address' } },
        passwordInput: { type: 'role', value: { role: 'textbox', name: 'Password' } },
        submitButton: { type: 'role', value: { role: 'button', name: 'Log In' } },
        missingEmailError: { type: 'xpath', value: "//label[text()='Email Address']/..//p[contains(text(),'This field is required')]" },
        missingPasswordError: { type: 'xpath', value: "//label[text()='Password']/..//p[contains(text(),'This field is required')]" },
        invalidEmailError: { type: 'xpath', value: "//label[text()='Email Address']/..//p[contains(text(),'Email must be a valid email')]" },
        errorText: { type: 'text', value: 'You have entered an invalid' },

    },

    megaMenu: {
        productsHeading: { type: 'css', value: 'h3:has-text("Products")' },
        servicesHeading: { type: 'css', value: 'h3:has-text("Services")' },
        learningCenterHeading: { type: 'css', value: 'h3:has-text("Learning Center")' },
        aboutFortisHeading: { type: 'css', value: 'h3:has-text("About Fortis")' },
        megaMenuContainer: { type: 'testId', value: 'mega-menu-container' },
        submitButton: { type: 'role', value: { role: 'button', name: 'Create Account' } },
        searchSubmitBtn: { type: 'css', value: '.aa-SubmitButton' },
        searchAutoComplete: { type: 'css', value: '#autocomplete' },
        diagnosticComponents: { type: 'text', value: 'Diagnostic Components' },
        controlSwabs: { type: 'role', value: { role: 'link', name: 'Control Swabs' } },
        contractRAndD: { type: 'text', value: 'Contract R&D Services' },
        spatialBiology: { type: 'xpath', value: "//a/p[text()='Spatial Biology Services']" },
        fortisInFocus: { type: 'text', value: 'Fortis in Focus' },
        focusOnAutophagy: { type: 'role', value: { role: 'link', name: 'Focus on Autophagy' } },
        loginButton: { type: 'role', value: { role: 'button', name: 'Login' } },
        headingH3: { type: 'css', value: 'h3' },
    },

    myAccountPage: {
        logoutHeading: { type: 'role', value: { role: 'heading', name: 'Log Out' } },

    },

    tempEmailPage: {
        mailInput: { type: 'css', value: '#mail' },
        emailSubject: { type: 'css', value: 'a.viewLink.title-subject.nu-reward' },
        passwordResetLink: { type: 'xpath', value: "//div[@class='inbox-data-content-intro']//a[contains(text(),'resetpasswordconfirm')]" },
    },

    homePage: {
        searchBox: { type: 'role', value: { role: 'searchBox', name: 'Submit' } },
        productItems: { type: 'css', value: '.productviewstructure .productviewlistItem' },
        newTagDiv: { type: 'css', value: 'div.MuiBox-root.mui-style-10gzxa' },
        searchViewGridorList: { type: 'css', value: 'div.product-list-view, div.product-grid-view' },
    },

    productPage: {
        goToCartButton: { type: 'role', value: { role: 'button', name: 'Go to Cart' } },
        addToCartButton: { type: 'role', value: { role: 'button', name: 'Add to Cart' } },
        cartConfirmDialog: { type: 'css', value: '[data-testid="title-component"] h3' },
        firstRow: { type: 'css', value: '.MuiFormGroup-root[role="radiogroup"]>div:first-of-type' },
        firstRowCode: { type: 'css', value: 'div[aria-label="Web Quantity"].MuiFormGroup-root[role="radiogroup"]>div:nth-of-type(1)>p:nth-of-type(1)' },
        firstRowPrice: { type: 'css', value: 'div[aria-label="Web Quantity"].MuiFormGroup-root[role="radiogroup"]>div:nth-of-type(1)>p:nth-of-type(2)' }
    },

    cartPage: {
        cartPageHeading: { type: 'role', value: { role: 'heading', name: 'Shopping Cart' } },
        quantityInput: { type: 'role', value: { role: 'textbox', name: 'quantity' } },
        subTotalValue: { type: 'xpath', value: "//h4[text()='Subtotal']/following-sibling::div//h4[@data-testid='price-text']" },

        // Checkout buttons & steps
        checkoutButton: { type: 'role', value: { role: 'button', name: 'Checkout' } },
        continueButton: { type: 'role', value: { role: 'button', name: 'Continue' } },
        placeOrderButton: { type: 'role', value: { role: 'button', name: 'Place Order' } },
        orderConfirmationText: { type: 'xpath', value: "//div[@data-testid='order-confirmation-new']/div[2]/span[1]" },

        // Shipping address fields
        firstNameInput: { type: 'role', value: { role: 'textbox', name: 'First Name' } },
        lastNameInput: { type: 'role', value: { role: 'textbox', name: 'Last Name' } },
        companyInput: { type: 'role', value: { role: 'textbox', name: 'Company Institution or' } },
        phoneInput: { type: 'role', value: { role: 'textbox', name: 'Phone Number' } },
        streetInput: { type: 'role', value: { role: 'textbox', name: 'Street Address' } },
        cityInput: { type: 'role', value: { role: 'textbox', name: 'City' } },
        stateDropdown: { type: 'role', value: { role: 'combobox', name: 'State' } },
        zipInput: { type: 'role', value: { role: 'textbox', name: 'Zip code' } },
        saveAddressButton: { type: 'role', value: { role: 'button', name: 'Save Address' } },
        savedAddressCard: { type: 'xpath', value: "//div[@data-testid='address-card']" },
        creditCardInfo: { type: 'css', value: '[data-testid="credit-card-view"] span' },


        // Shipping
        shippingRadio: { type: 'role', value: { role: 'radio', name: /Fortis Shipping/ } },

        // Payment
        paymentTypeOption: { type: 'testId', value: 'payment-types' },
        addNewCardButton: { type: 'role', value: { role: 'button', name: 'Add New Card' } },
        cardNumberInput: { type: 'role', value: { role: 'textbox', name: 'Card Number' } },
        expiryInput: { type: 'role', value: { role: 'textbox', name: 'Expires (MM/YYYY)' } },
        cvvInput: { type: 'role', value: { role: 'textbox', name: 'CVV Code' } },
        shippingCheckbox: { type: 'role', value: { role: 'checkbox', name: 'Use my shipping address' } },
        termsCheckbox: { type: 'role', value: { role: 'checkbox', name: 'termsConditions' } },

        //Checkout
        checkOutHeading: { type: 'xpath', value: "//h1[text()='Checkout']" },

        //Review Order
        reviewOrderHeading: { type: 'xpath', value: "//h2[text()='Review Order']" },

        // Confirmation
        orderNumberText: { type: 'xpath', value: "//*[contains(text(), 'Order #')]" },
        thankYouHeading: { type: 'role', value: { role: 'heading', name: 'Thank You!' } },
        totalPriceHeading: { type: 'role', value: { role: 'heading', name: '$507.00' } }
    },

    resetPasswordPage: {
        newPasswordInput: { type: 'role', value: { role: 'textbox', name: 'New Password' } },
        confirmPasswordInput: { type: 'role', value: { role: 'textbox', name: 'Confirm password' } },
        resetPasswordButton: { type: 'role', value: { role: 'button', name: 'Reset Password' } },
        successHeading: { type: 'role', value: { role: 'heading', name: 'Password Reset Successful' } },
        loginButton: { type: 'role', value: { role: 'button', name: 'Log In' } },
    },


} as const;
