# Process (assuming hosting is handled)

1. Download survey responses as a .csv
2. Run `node databaseWrite.js` (updating name to reflect survey responses)
3. Check links using hosted to see if working as intended
4. Run `node emailService.js` to send all emails. 