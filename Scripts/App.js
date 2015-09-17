function importLicense() {
    var appTitle = $('#app-title').val();
    var productId = $('#product-id').val();
    var providerName = $('#provider-name').val();
    var licenseType = $('#license-type').val();
    var userLimit = $('#user-limit').val();
    var trialExpiration = $('#expiration').val();
    var licenseExpiration = 30;

    var isFree = licenseType === 'Free';
    var isPaid = licenseType === 'Paid';
    var isTrial = licenseType === 'Trial';
    var isSiteLicensed = isFree || parseInt(userLimit) === 0;

    var start = new Date();
    var expirationEnd = new Date(start.getTime() + parseInt(trialExpiration) * 86400000);
    var licenseEnd = new Date(start.getTime() + licenseExpiration * 86400000);

    var rawXMLLicenseToken =
        '<r>' +
            '<t ' +
            'aid="WA900006056" ' +
            'pid="' + productId + '" ' +
            'cid="32F3E7FC559F4F49" ' +
            (!isFree ? 'ts="' + userLimit + '" ' : 'ts="0" ') +
            'et="' + licenseType + '" ' +
            'ad="' + start.toISOString() + '" ' +
            (isTrial ? 'ed="' + expirationEnd.toISOString() + '" ' : '') +
            'sd="' + start.toISOString() + '" ' +
            'te="' + licenseEnd.toISOString() + '" ' +
            (isSiteLicensed ? 'sl="true" ' : 'sl="false" ') +
            'test="true"' +
            '/>' +
            '<d>VNNAnf36IrkyUVZlihQJNdUUZl/YFEfJOeldWBtd3IM=</d>' +
        '</r>';

    var context = SP.ClientContext.get_current();
    SP.Utilities.Utility.importAppLicense(context, rawXMLLicenseToken, 'en-US', 'US', appTitle, 'http://www.office.com', providerName, 5);

    context.executeQueryAsync(function (sender, args) {
        alert('License is imported successfully.');
    }, function (sender, args) {
        alert(args.get_message());
    });
}