$(document).ready(function() {
	
	var $user = $('#paymentCardsContainer');
	var $checkout = $('div.paymentSystemSelector').first();

	if ($user.length) {
		$user.html($.trim(`
			<div class="paymentCardHeader row">
				<div class="header paymentCardHeader col-xs-3">Tarjeta</div>
				<div class="header paymentCardExpireDateHeader col-xs-3">Fecha de caducidad</div>
				<div class="header paymentCardUsedHeader col-xs-3">Utilizado</div>
				<div class=" col-xs-3"></div>
			</div>
			<div class="paymentCard row">
				<div class="field cardNumber col-xs-3">
					<div class="logo">
						<img src="/common/images/paymentsystems/visa.png" border="0" alt="Visa">
					</div>
					<span>454881******0004</span>
				</div>
				<div class="field expiryDate col-xs-3">
					12/2020
				</div>
				<div class="field used col-xs-3">1</div>
				<div class="delete col-xs-3">
					<form action="/user/paymentCards/delete" method="POST" data-fluid-form="DeletePaymentCardForm" class="has-validation-callback"><div class="form-message"></div>
						<input type="hidden" name="id" value="1">
						<button class="paymentCardDeleteButton btn btn-danger" type="submit">Eliminar</button>
					</form>
				</div>
			</div>
		`));
	}
	
	if ($checkout.length) {
		// support plugins
		var radio1 = '<input id="creditCardSelect_0" type="radio" reference="9" name="paymentSystem" value="9" data-fluid-event="change" data-fluid-function="setPaymentSystemToken" data-fluid-data="{&quot;token&quot;:&quot;&quot;}">';
		var radio2 = '<input id="creditCardSelect_1" type="radio" reference="9" name="paymentSystem" value="9" data-fluid-event="change" data-fluid-function="setPaymentSystemToken" data-fluid-data="{&quot;token&quot;:&quot;a4f0bb92023bca6fbffbc1855ae99964e93d98cc&quot;}">';
		var check = '<input type="checkbox" autocomplete="off" value="1" checked="checked" class="validate-required-check" name="paymentTokenizable9">';

		if ($('.jquery-radiobutton').length) {
			radio1 = `
				<div class="jquery-radiobutton-wrapper basketSelector paymentSystemSelector">
					<a data-radiobutton="radiobutton-link" class="jquery-radiobutton" href="#" name="creditCardSelect_0" rel="paymentSystem"></a>
				</div>
				<input class="sr-only" id="creditCardSelect_0" type="radio" reference="9" name="paymentSystem" value="9" data-fluid-event="change" data-fluid-function="setPaymentSystemToken" data-fluid-data="{&quot;token&quot;:&quot;&quot;}" style="position: absolute; top: -200px; left: -200px;">
			`;
			radio2 = `
				<div class="jquery-radiobutton-wrapper basketSelector paymentSystemSelector">
					<a data-radiobutton="radiobutton-link" class="jquery-radiobutton" href="#" name="creditCardSelect_1" rel="paymentSystem"></a>
				</div>
				<input class="sr-only" id="creditCardSelect_1" type="radio" reference="9" name="paymentSystem" value="9" data-fluid-event="change" data-fluid-function="setPaymentSystemToken" data-fluid-data="{&quot;token&quot;:&quot;a4f0bb92023bca6fbffbc1855ae99964e93d98cc&quot;}" style="position: absolute; top: -200px; left: -200px;">
			`;
		}
		if ($('.sbr-btn').length) {
			radio1 = `
				<input class="sbr-init" id="creditCardSelect_0" type="radio" reference="9" name="paymentSystem" value="9" data-fluid-event="change" data-fluid-function="setPaymentSystemToken" data-fluid-data="{&quot;token&quot;:&quot;&quot;}">
				<button id="creditCardSelect_0-sbr" class="sbr-btn sbr-default sbr-no-checked" data-sbr-name="paymentSystem" type="button"></button>
			`;

			radio2 = `
				<input class="sbr-init" id="creditCardSelect_1" type="radio" reference="9" name="paymentSystem" value="9" data-fluid-event="change" data-fluid-function="setPaymentSystemToken" data-fluid-data="{&quot;token&quot;:&quot;a4f0bb92023bca6fbffbc1855ae99964e93d98cc&quot;}">
				<button id="creditCardSelect_1-sbr" class="sbr-btn sbr-default sbr-no-checked" data-sbr-name="paymentSystem" type="button"></button>
			`;
		}
		if ($('.sbtc-btn').length) {
			check = `
				<input type="checkbox" autocomplete="off" value="1" checked="checked" class="sr-only validate-required-check" name="paymentTokenizable9">
				<button id="sbtc-cf623e2a-5e9e-ff69-ea83" class="sbtc-btn form-control sbtc-bootstrap sbtc-default sbtc-checked" type="button"><span class="sbtc-icon "></span></button>
			`;
		}

		$checkout.before($.trim(`
			<div class="basketSelector paymentSystemSelector">
				<label class="basketSelectorName paymentSystemSelectorName" for="paymentSystem_9">
					TPV
				</label>
				<label class="basketSelectorPrice shippingSelectorPrice" for="paymentSystem_9">
					<span class="price"><span class="integerPrice" content="0.00">0</span><span class="decimalPrice">.00</span><span class="currencySymbol">€</span></span>
				</label>
				<input type="hidden" name="paymentSystemToken" id="paymentReference" value="">
				<div class="paymentSystemsTokens">
					<div class="paymentSystemsTokenInfo">Tus tarjetas de crédito/débito</div>
					<div class="paymentSystemToken">
						<div class="check">
							${radio1}
						</div>
						<div class="cardNumber">
							<label for="creditCardSelect_0" class="title">&nbsp;Nueva tarjeta </label>
						</div>
					</div>
					<div class="paymentSystemToken">
						<div class="check">
							${radio2}
						</div>
						<div class="cardNumber">
							<div class="logo">
								<img src="/common/images/paymentsystems/visa.png" border="0" alt="Visa">
							</div>
							<label for="creditCardSelect_1" class="title">Tarjeta: </label>
							<label for="creditCardSelect_1" class="text">454881******0004</label>
						</div>
						<div class="expiryDate">
							<label for="creditCardSelect_1" class="title">Fecha de caducidad: </label>
							<label for="creditCardSelect_1" class="text">12/2020</label>
						</div>
					</div>
				</div>
				<div class="tokenize">
					${check}
					<span>Recordar datos de mi tarjeta para usarlos en futuras compras</span>
				</div>
			</div>
		`));
	}
});