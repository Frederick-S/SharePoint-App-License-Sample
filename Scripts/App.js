function importLicense() {
    var appTitle = $('#app-title').val();
    var productId = $('#product-id').val();
    var purchaserId = $('#purchaser-id').val();
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
            'cid="' + purchaserId + '" ' +
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

function validateLicense() {
    var productId = '{9ccda171-8cec-49ff-b11c-3500dbe67922}';
    var context = SP.ClientContext.get_current();
    var appLicenseCollection = SP.Utilities.Utility.getAppLicenseInformation(context, productId);

    context.executeQueryAsync(function (sender, args) {
        if (appLicenseCollection.get_count() > 0) {
            var rawXMLLicenseToken = appLicenseCollection.get_item(0).get_rawXMLLicenseToken();
            var rawXMLLicenseTokenEncoded = encodeURIComponent(rawXMLLicenseToken);
            var verificationServiceUrl = "https://verificationservice.officeapps.live.com/ova/verificationagent.svc/rest/verify?token=";

            var request = new SP.WebRequestInfo();
            request.set_url(verificationServiceUrl + rawXMLLicenseTokenEncoded);
            request.set_method("GET");

            var response = SP.WebProxy.invoke(context, request);

            context.executeQueryAsync(function () {
                $('#license-data').text(response.get_body());
            }, function () {
                alert(response.get_body());
            });
        } else {
            alert('No licene token is found.');
        }
    }, function (sender, args) {
        alert(args.get_message());
    });
}