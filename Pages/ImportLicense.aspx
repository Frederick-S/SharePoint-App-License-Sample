<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <link href="../Content/App.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Import License
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="UserSectionHead">
        <label>App Title</label>
    </div>
    <div class="UserSectionBody">
        <input type="text" value="SharePoint App License Sample" class="input-text" id="app-title" />
    </div>
    <div class="UserSectionHead">
        <label>Product Id</label>
    </div>
    <div class="UserSectionBody">
        <input type="text" value="{9ccda171-8cec-49ff-b11c-3500dbe67922}" class="input-text" id="product-id" disabled="disabled" />
    </div>
    <div class="UserSectionBody">
        <input type="text" value="32F3E7FC559F4F49" class="input-text" id="purchaser-id" />
        <input type="button" value="Generate" id="generate-purchaser-id" />
    </div>
    <div class="UserSectionHead">
        <label>Provider Name</label>
    </div>
    <div class="UserSectionBody">
        <input type="text" value="Provider" class="input-text" id="provider-name" />
    </div>
    <div class="UserSectionHead">
        <label>License Type</label>
    </div>
    <div class="UserSectionBody">
        <select id="license-type">
            <option value="Free" selected="selected">Free</option>
            <option value="Paid">Paid</option>
            <option value="Trial">Trial</option>
        </select>
    </div>
    <div class="UserSectionHead">
        <label>User Limit</label>
    </div>
    <div class="UserSectionBody">
        <select id="user-limit" disabled="disabled">
            <option value="0" selected="selected">Unlimited</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
    </div>
    <div class="UserSectionHead">
        <label>Expiration</label>
    </div>
    <div class="UserSectionBody">
        <select id="expiration" disabled="disabled">
            <option value="30" selected="selected">30 days</option>
            <option value="-1">expired</option>
        </select>
    </div>
    <div class="UserSectionBody">
        <button id="import-license">Import License</button>
    </div>
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript">
        $('#license-type').change(function () {
            var $userLimit = $('#user-limit');
            var $expiration = $('#expiration');

            switch ($(this).val()) {
                case 'Free':
                    $userLimit.prop('disabled', true);
                    $expiration.prop('disabled', true);
                    break;
                case 'Paid':
                    $userLimit.prop('disabled', false);
                    $expiration.prop('disabled', true);
                    break;
                case 'Trial':
                    $userLimit.prop('disabled', false);
                    $expiration.prop('disabled', false);
                    break;
                default:
                    break;
            }
        });

        var hex8 = function () {
            return Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
        }

        $('#generate-purchaser-id').click(function () {
            $('#purchaser-id').val(hex8() + hex8());
        });

        $('#import-license').click(function () {
            importLicense();

            return false;
        });
    </script>
</asp:Content>
