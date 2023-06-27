#!/bin/bash

# Define plugin details
PLUGIN_SLUG="my-api-plugin"
PLUGIN_NAME="My API Plugin"
PLUGIN_VERSION="1.0.0"
PLUGIN_AUTHOR="Your Name"
PLUGIN_URL="https://example.com"

# Create temporary folder
TMP_DIR="$(pwd)/${PLUGIN_SLUG}-tmp"
mkdir "${TMP_DIR}"

# Create main plugin file
PLUGIN_FILE="${TMP_DIR}/${PLUGIN_SLUG}.php"
touch "${PLUGIN_FILE}"

# Add plugin header to the main file
cat > "${PLUGIN_FILE}" << EOL
<?php
/*
Plugin Name: ${PLUGIN_NAME}
Version: ${PLUGIN_VERSION}
Author: ${PLUGIN_AUTHOR}
Author URI: ${PLUGIN_URL}
*/

// Plugin code goes here...
EOL

# Create templates folder
TEMPLATES_DIR="${TMP_DIR}/templates"
mkdir "${TEMPLATES_DIR}"

# Copy HTML files to templates folder
cp "views/index.html" "${TEMPLATES_DIR}/index.html"
cp "views/login.html" "${TEMPLATES_DIR}/login.html"

# Create shortcode callbacks in the main file
cat >> "${PLUGIN_FILE}" << EOL

// Shortcode callback for account creation view
function create_account_shortcode_callback(\$atts) {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/create-account.php');
    return ob_get_clean();
}
add_shortcode('create-account', 'create_account_shortcode_callback');

// Shortcode callback for account information view
function account_information_shortcode_callback(\$atts) {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/account-information.php');
    return ob_get_clean();
}
add_shortcode('account-information', 'account_information_shortcode_callback');
EOL

# Create plugin zip archive
PLUGIN_ARCHIVE="$(pwd)/${PLUGIN_SLUG}.zip"
zip -r "${PLUGIN_ARCHIVE}" "${TMP_DIR}"/*

# Cleanup temporary folder
rm -rf "${TMP_DIR}"

# Provide instructions to the user
echo "Plugin zip archive created!"
echo "You can find your plugin archive at '${PLUGIN_ARCHIVE}'."
echo "You can now import this zip file into WordPress as a new plugin."
