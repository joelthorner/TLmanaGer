// if exists plugins check or radio:
// sbtc-btn
var possiblePlunginRadio = '';
var possiblePlunginCheck = '';

if ($('.jquery-radiobutton-wrapper').length) 
	possiblePlunginRadio = `<div class="jquery-radiobutton-wrapper basketSelector paymentSystemSelector"><a data-radiobutton="radiobutton-link" class="jquery-radiobutton" href="#" name="paymentSystem_14" rel="paymentSystem"></a></div>`;

if ($('.sbtc-btn').length) 
	possiblePlunginCheck = `<button id="sbtc-097ce182-b220-27bd-a7cb" class="sbtc-btn btn btn-default sbtc-bootstrap sbtc-default sbtc-checked" type="button"><span class="sbtc-icon glyphicon glyphicon-ok"></span></button>`;


$('.basketSelectors.paymentSystemSelectors')
	.prepend(`
<input type="hidden" name="paymentSystemToken" id="paymentReference" value="">
<div class="paymentSystemsTokens">
	<div class="paymentSystemsTokenInfo">Tus tarjetas de crÃ©dito/dÃ©bito</div>
	<div class="paymentSystemToken">
		<div class="check">
			${possiblePlunginRadio}
			<input id="creditCardSelect_1" type="radio" reference="9" name="paymentSystem" value="9" data-fluid-event="change" data-fluid-function="setPaymentSystemToken" data-fluid-data="{&quot;token&quot;:&quot;a4f0bb92023bca6fbffbc1855ae99964e93d98cc&quot;}">
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
`);

$('.basketSelectors.paymentSystemSelectors')
	.find('.basketSelector.paymentSystemSelector')
	.first()
	.append(`
<div class="tokenize">
	<input type="checkbox" autocomplete="off" value="1" checked="checked" class="validate-required-check" name="paymentTokenizable9">
	${possiblePlunginCheck}
	<span>Recordar datos de mi tarjeta para usarlos en futuras compras</span>
</div>
`);
